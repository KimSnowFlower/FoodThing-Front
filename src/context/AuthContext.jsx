import { createContext, useContext, useMemo, useState, useEffect } from "react";

// api
import api from "../lib/api";
import { userApi } from "../lib/userApi";

const AuthContext = createContext(null);
const TOKEN_NAME = "access_token";

// Safe cookie tuils
function hasDocument() {
    return typeof document !== "undefined";
}

function getCookie(name) {
    if (!hasDocument()) return null;

    const m = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));

    return m ? decodeURIComponent(m[1]) : null;
}

function deleteCookie(name) {
    if (!hasDocument()) return;

    // Path=/ 필수, 만료 과거로
    document.cookie = `${name}=; Expires=Thu, 01 Jan 1970 00:00:00 GMT; Path=/; SameSite=Lax${location?.protocol === "https:" ? "; Secure" : ""
        }`;

    try {
        localStorage.setItem("__auth_event__", JSON.stringify({ t: Date.now(), ev: "logout" }));
    } catch { }
}


function setCookie(name, value, days = 7) {
    if (!hasDocument()) return;

    const expires = new Date(Date.now() + days * 864e5).toUTCString();

    document.cookie = `${name}=${encodeURIComponent(
        value
    )}; Expires=${expires}; Path=/; SameSite=Lax${location?.protocol === "https:" ? "; Secure" : ""
        }`;

    try {
        localStorage.setItem("__auth_event__", JSON.stringify({ t: Date.now(), ev: "login" }));
    } catch { }
}

// JWT helpers
function decodeJwt(token) {
    try {
        const base64Url = token.split(".")[1];

        if (!base64Url) return null;

        const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        const json = decodeURIComponent(
            atob(base64)
                .split("")
                .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
                .join("")
        );

        return JSON.parse(json);
    } catch {
        return null;
    }
}

// 안전 정책: exp 없으면 만료로로 간주
function isExpired(token) {
    const p = decodeJwt(token);

    if (!p?.exp) return true;

    const nowSec = Math.floor(Date.now() / 1000);

    return p.exp <= nowSec;
}

function deriveUserFromToken(token) {
    const p = decodeJwt(token) || {};

    return {
        id: p.id ?? p.userId ?? p.sub ?? null,
        email: p.email ?? p.userEmail ?? null,
        name: p.name ?? p.userName ?? p.nickname ?? null,
    };
}

// initial bootstrap (sync)
function bootstrapFromCookie() {
    const token = getCookie(TOKEN_NAME);

    if (!token || isExpired(token)) {
        if (token && isExpired(token)) deleteCookie(TOKEN_NAME);
        return { authed: false, user: null };
    }

    return { authed: true, user: deriveUserFromToken(token) };
}

export function AuthProvider({ children }) {
    const boot = bootstrapFromCookie();
    const [authed, setAuthed] = useState(boot.authed);
    const [user, setUser] = useState(boot.user);
    const [loading, setLoading] = useState(false);

    // 탭 간 로그인/로그아웃 동기화
    useEffect(() => {
        function onStorage(e) {
            if (e.key !== "__auth_event__" || !e.newValue) return;

            try {
                const { ev } = JSON.parse(e.newValue);

                if (ev === "logout") {
                    setAuthed(false);
                    setUser(null);
                }
                else if (ev === "login") {
                    const t = getCookie(TOKEN_NAME);

                    if (t && !isExpired(t)) {
                        setAuthed(true);
                        setUser(deriveUserFromToken(t));
                    }
                }
            } catch (e) {

            }
        }

        window.addEventListener("storage", onStorage);

        return () => window.removeEventListener("storage", onStorage);
    }, []);

    const login = async (email, password) => {
        setLoading(true);

        try {
            const res = await userApi.login({ email, password });

            const token =
                res.data?.access_token ||
                res.data?.accessToken ||
                res.data?.token ||
                res.data?.jwt;

            if (!token) {
                throw new Error("로그인 응답에 access token이 없습니다.");
            }

            setCookie(TOKEN_NAME, token, 7);

            const nextUser = deriveUserFromToken(token);
            setUser(nextUser);
            setAuthed(true);

            try {
                localStorage.setItem(TOKEN_NAME, token);
            } catch { }

            return { ok: true }
        } catch (e) {
            return {
                ok: false,
                error: e?.message || "로그인 중 오류가 발생했습니다.",
            };
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        deleteCookie(TOKEN_NAME);

        try {
            localStorage.removeItem(TOKEN_NAME);
        } catch { }

        setUser(null);
        setAuthed(false);
    };

    const value = useMemo(
        () => ({ authed, user, loading, login, logout }),
        [authed, user, loading]
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
    const ctx = useContext(AuthContext);

    if (!ctx) throw new Error("useAuth must be used within AuthProvider");

    return ctx;
}
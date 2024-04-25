declare module 'flask-session-cookie-decoder' {
    export function decodeFlaskSessionCookieJson(cookie: string): string;
    export function decodeFlaskSessionCookieJsonWithZlib(cookie: string): string;
}
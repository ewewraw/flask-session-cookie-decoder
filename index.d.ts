declare module 'flask-session-cookie-decoder' {
    export function decodeFlaskSessionCookieJson(cookie: string): string;
    export function decodeFlaskSessionCookieJsonWithZlibModule(cookie: string): string;

    export function decodeFlaskSessionCookieJsonWithZlibjs(cookie: string): string;

}
declare module 'flask-session-cookie-decoder' {
    export function decodeSessionCookieJson(cookie: string): string;
}
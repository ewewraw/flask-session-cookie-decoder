declare module 'flask-session-cookie-decoder' {
    export function getDecodedSessionCookieJson(cookie: string): string;
}
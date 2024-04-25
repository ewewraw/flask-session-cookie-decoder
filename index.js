const zlib2 = require("zlibt2");
import zlib from "zlib"
const Buffer = typeof window !== 'undefined' ? (window.Buffer || require("buffer").Buffer) : require("buffer").Buffer;

/**
 * Decodes a Flask session cookie, extracting and decompressing the data stored within it.
 * @param {string} cookie - The Flask session cookie to decode. This cookie should be a string representing the Flask session cookie obtained from the client's request.
 * @returns {string} A string representing the decoded JSON object contained within the Flask session cookie.
 */
function decodeFlaskSessionCookieJson(cookie) {
    let compressed = false;
    let payload = cookie;

    if (payload.startsWith('.')) {
        compressed = true;
        try {
            payload = payload.slice(1);
        } catch (error) {
            return `[Cookie string is compressed (starts with '.'), but it may be corrupt:  ${error}]`;
        }
    }

    const data = payload.split(".")[0];
    let decodedData = ''
    // Check if Buffer is available (Node.js environment)
    if (typeof Buffer !== 'undefined') {
        try {
            decodedData = Buffer.from(data, 'base64').toString('utf-8');
        } catch (error) {
            return `[base64 decode error:  ${error}]`;
        }
    } else {
    //     TODO: use an alternative method to decode
        return  '[Error: Buffer class is not defined in the current context.]'
    }

    if (compressed) {
        try {
            const inflate = new zlib2.Inflate(Buffer.from(data, 'base64'));
            const uncompressedData = inflate.decompress();
            decodedData = Buffer.from(uncompressedData).toString('utf-8');
        } catch (error) {
            return `[Decompression error:  ${error}]`;
        }
    }

    return decodedData;
}

function decodeFlaskSessionCookieJsonWithZlib(cookie) {
    let compressed = false;
    let payload = cookie;

    if (payload.startsWith('.')) {
        compressed = true;
        try {
            payload = payload.slice(1);
        } catch (error) {
            return `[Cookie string is compressed (starts with '.'), but it may be corrupt:  ${error}]`;
        }
    }

    const data = payload.split(".")[0];
    let decodedData = ''
    // Check if Buffer is available (Node.js environment)
    if (typeof Buffer !== 'undefined') {
        try {
            decodedData = Buffer.from(data, 'base64').toString('utf-8');
        } catch (error) {
            return `[base64 decode error:  ${error}]`;
        }
    } else {
        //     TODO: use an alternative method to decode
        return  '[Error: Buffer class is not defined in the current context.]'
    }

    if (compressed) {
        try {
            const uncompressedData = zlib.inflateSync(Buffer.from(data, 'base64'));
            decodedData = Buffer.from(uncompressedData).toString('utf-8');
        } catch (error) {
            return `[Decompression error:  ${error}]`;
        }
    }

    return decodedData;
}

module.exports = {decodeFlaskSessionCookieJson, decodeFlaskSessionCookieJsonWithZlib};

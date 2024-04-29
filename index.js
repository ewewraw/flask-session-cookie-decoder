const pako = require("pako");

/**
 * Decodes a Flask session cookie, extracting and decompressing the data stored within it.
 * @param {string} cookie - The Flask session cookie to decode. This cookie should be a string representing the Flask session cookie obtained from the client's request.
 * @returns {string} A string representing the decoded JSON object contained within the Flask session cookie.
 */
function getDecodedSessionCookieJson(cookie) {
    if (!cookie) {
        console.error("Input error: no cookie passed");
        return "";
    }

    let decodedData = "";

    try {
        if (cookie.startsWith(".")) {   // if content zipped
            let data = cookie.split('.')[1].replace(/_/g, '/').replace(/-/g, '+');
            decodedData = atob(data);
        } else {
            let data = cookie.split('.')[0].replace(/_/g, '/').replace(/-/g, '+');
            decodedData = atob(data);
        }
    } catch (atobError) {
        console.error("Error decoding base64:", atobError.message);
        return "Error decoding base64: " + atobError.message;
    }

    let binaryData = new Uint8Array(decodedData.length);

    try {
        for (let i = 0; i < decodedData.length; i++) {
            binaryData[i] = decodedData.charCodeAt(i);
        }
    } catch (binaryDataError) {
        console.error("Error creating binary data:", binaryDataError.message);
        return "Error creating binary data: " + binaryDataError.message;
    }

    try {
        decodedData = pako.inflate(binaryData, {to: 'string'});
    } catch (pakoError) {
        console.error("Error decompressing data with pako:", pakoError.message);
        return "Error decompressing data with pako: " + pakoError.message;
    }

    return decodedData;
}

module.exports = {
    getDecodedSessionCookieJson
};

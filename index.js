const pako = require("pako");

/**
 * Decodes a Flask session cookie, extracting and decompressing the data stored within it.
 * @param {string} cookie - The Flask session cookie to decode. This cookie should be a string representing the Flask session cookie obtained from the client's request.
 * @returns {string} A string representing the decoded JSON object contained within the Flask session cookie.
 */
function getDecodedSessionCookieJson(cookie) {
    if (!cookie || cookie === '') {
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

    if (!decodedData) {
        console.error("Failed to decode base64 - decoded data is empty");
        return "Failed to decode base64 - decoded data is empty";
    }

    let binaryData = new Uint8Array(decodedData.length);

    if (!binaryData) {
        console.error("Failed to parse binary array - decoded data is empty");
        return "Failed to parse binary array - decoded data is empty";
    }

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


/**
 * Retrieves the value of a cookie by its name from the browser's cookies.
 * @param {string} name - The name of the cookie whose value is to be retrieved.
 * @returns {string} The value of the cookie specified by the provided name. If the cookie is not found, an empty string is returned.
 */
function getCookieValueByName(name) {
    const regex = new RegExp(`(^| )${name}=([^;]+)`)
    const match = document.cookie.match(regex)
    if (match) {
        return match[2]
    } else {
        console.error("No cookie with name '", name, "' found");
        return ''
    }
}

module.exports = {
    getDecodedSessionCookieJson,
    getCookieValueByName
};

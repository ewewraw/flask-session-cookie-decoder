# Flask Session Cookie Decoder

A Node.js module for decoding Flask session cookies, allowing you to extract and decompress the data stored within them.

## Installation

To install the package, use npm:

```bash
npm install flask-session-cookie-decoder
```


## Usage

```javascript
const { getDecodedSessionCookieJson } = require('flask-session-cookie-decoder');

const cookie = 'YOUR_FLASK_SESSION_COOKIE_STRING_HERE';
const decodedData = getDecodedSessionCookieJson(cookie);

console.log(decodedData);
```

## Function Signature
```typescript
getDecodedSessionCookieJson(cookie: string): string
```


### Parameters
* cookie (string): The Flask session cookie to decode. This should be a string representing the Flask session cookie obtained from the client's request.
### Returns
* A string representing the decoded JSON object contained within the Flask session cookie.

## Example
```javascript
const { getDecodedSessionCookieJson } = require('flask-session-cookie-decoder');

const cookie = "eyJpZCI6NSwibmFtZSI6Iml0c2Rhbmdlcm91cyJ9.6YP6T0BaO67XP--9UzTrmurXSmg"
const decodedData = getDecodedSessionCookieJson(cookie);

console.log(decodedData); // {"id": 5, "name": "itsdangerous"}
```
## License
This project is licensed under the [MIT License](LICENSE) - see the LICENSE file for details.
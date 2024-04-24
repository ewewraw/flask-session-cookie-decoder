# Flask Session Cookie Decoder

A Node.js module for decoding Flask session cookies, allowing you to extract and decompress the data stored within them.

## Installation

To install the package, use npm:

```bash
npm install flask-session-cookie-decoder
```


## Usage

```javascript
const { decodeFlaskSessionCookieJson } = require('flask-session-cookie-decoder');

const cookie = 'YOUR_FLASK_SESSION_COOKIE_STRING_HERE';
const decodedData = decodeFlaskSessionCookieJson(cookie);

console.log(decodedData);
```

## Function Signature
```typescript
decodeFlaskSessionCookieJson(cookie: string): string
```


### Parameters
* cookie (string): The Flask session cookie to decode. This should be a string representing the Flask session cookie obtained from the client's request.
### Returns
* A string representing the decoded JSON object contained within the Flask session cookie.

## Example
```javascript
const { decodeFlaskSessionCookieJson } = require('flask-session-cookie-decoder');

const cookie = 'YOUR_FLASK_SESSION_COOKIE_STRING_HERE';
const decodedData = decodeFlaskSessionCookieJson(cookie);

console.log(decodedData);
```
## License
This project is licensed under the MIT License - see the LICENSE file for details.
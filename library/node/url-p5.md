---
title: "URL (part 5 of 6)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/url.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# URL (part 5 of 6)

### `url.fileURLToPath(url[, options])`

* `url` {URL | string} The file URL string or URL object to convert to a path.
* `options` {Object}
  * `windows` {boolean|undefined} `true` if the `path` should be
    return as a windows filepath, `false` for posix, and
    `undefined` for the system default.
    **Default:** `undefined`.
* Returns: {string} The fully-resolved platform-specific Node.js file path.

This function ensures the correct decodings of percent-encoded characters as
well as ensuring a cross-platform valid absolute path string.

**Security Considerations:**

This function decodes percent-encoded characters, including encoded dot-segments
(`%2e` as `.` and `%2e%2e` as `..`), and then normalizes the resulting path.
This means that encoded directory traversal sequences (such as `%2e%2e`) are
decoded and processed as actual path traversal, even though encoded slashes
(`%2F`, `%5C`) are correctly rejected.

**Applications must not rely on `fileURLToPath()` alone to prevent directory
traversal attacks.** Always perform explicit path validation and security checks
on the returned path value to ensure it remains within expected boundaries
before using it for file system operations.

```mjs
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);

new URL('file:///C:/path/').pathname;      // Incorrect: /C:/path/
fileURLToPath('file:///C:/path/');         // Correct:   C:\path\ (Windows)

new URL('file://nas/foo.txt').pathname;    // Incorrect: /foo.txt
fileURLToPath('file://nas/foo.txt');       // Correct:   \\nas\foo.txt (Windows)

new URL('file:///你好.txt').pathname;      // Incorrect: /%E4%BD%A0%E5%A5%BD.txt
fileURLToPath('file:///你好.txt');         // Correct:   /你好.txt (POSIX)

new URL('file:///hello world').pathname;   // Incorrect: /hello%20world
fileURLToPath('file:///hello world');      // Correct:   /hello world (POSIX)
```

```cjs
const { fileURLToPath } = require('node:url');
new URL('file:///C:/path/').pathname;      // Incorrect: /C:/path/
fileURLToPath('file:///C:/path/');         // Correct:   C:\path\ (Windows)

new URL('file://nas/foo.txt').pathname;    // Incorrect: /foo.txt
fileURLToPath('file://nas/foo.txt');       // Correct:   \\nas\foo.txt (Windows)

new URL('file:///你好.txt').pathname;      // Incorrect: /%E4%BD%A0%E5%A5%BD.txt
fileURLToPath('file:///你好.txt');         // Correct:   /你好.txt (POSIX)

new URL('file:///hello world').pathname;   // Incorrect: /hello%20world
fileURLToPath('file:///hello world');      // Correct:   /hello world (POSIX)
```

### `url.fileURLToPathBuffer(url[, options])`

* `url` {URL | string} The file URL string or URL object to convert to a path.
* `options` {Object}
  * `windows` {boolean|undefined} `true` if the `path` should be
    return as a windows filepath, `false` for posix, and
    `undefined` for the system default.
    **Default:** `undefined`.
* Returns: {Buffer} The fully-resolved platform-specific Node.js file path
  as a {Buffer}.

Like `url.fileURLToPath(...)` except that instead of returning a string
representation of the path, a `Buffer` is returned. This conversion is
helpful when the input URL contains percent-encoded segments that are
not valid UTF-8 / Unicode sequences.

**Security Considerations:**

This function has the same security considerations as `url.fileURLToPath()`.
It decodes percent-encoded characters, including encoded dot-segments
(`%2e` as `.` and `%2e%2e` as `..`), and normalizes the path. **Applications
must not rely on this function alone to prevent directory traversal attacks.**
Always perform explicit path validation on the returned buffer value before
using it for file system operations.

### `url.format(URL[, options])`

* `URL` {URL} A WHATWG URL object
* `options` {Object}
  * `auth` {boolean} `true` if the serialized URL string should include the
    username and password, `false` otherwise. **Default:** `true`.
  * `fragment` {boolean} `true` if the serialized URL string should include the
    fragment, `false` otherwise. **Default:** `true`.
  * `search` {boolean} `true` if the serialized URL string should include the
    search query, `false` otherwise. **Default:** `true`.
  * `unicode` {boolean} `true` if Unicode characters appearing in the host
    component of the URL string should be encoded directly as opposed to being
    Punycode encoded. **Default:** `false`.
* Returns: {string}

Returns a customizable serialization of a URL `String` representation of a
WHATWG URL object.

The URL object has both a `toString()` method and `href` property that return
string serializations of the URL. These are not, however, customizable in
any way. The `url.format(URL[, options])` method allows for basic customization
of the output.

```mjs
import url from 'node:url';
const myURL = new URL('https://a:b@測試?abc#foo');

console.log(myURL.href);
// Prints https://a:b@xn--g6w251d/?abc#foo

console.log(myURL.toString());
// Prints https://a:b@xn--g6w251d/?abc#foo

console.log(url.format(myURL, { fragment: false, unicode: true, auth: false }));
// Prints 'https://測試/?abc'
```

```cjs
const url = require('node:url');
const myURL = new URL('https://a:b@測試?abc#foo');

console.log(myURL.href);
// Prints https://a:b@xn--g6w251d/?abc#foo

console.log(myURL.toString());
// Prints https://a:b@xn--g6w251d/?abc#foo

console.log(url.format(myURL, { fragment: false, unicode: true, auth: false }));
// Prints 'https://測試/?abc'
```

### `url.pathToFileURL(path[, options])`

* `path` {string} The path to convert to a File URL.
* `options` {Object}
  * `windows` {boolean|undefined} `true` if the `path` should be
    treated as a windows filepath, `false` for posix, and
    `undefined` for the system default.
    **Default:** `undefined`.
* Returns: {URL} The file URL object.

This function ensures that `path` is resolved absolutely, and that the URL
control characters are correctly encoded when converting into a File URL.

```mjs
import { pathToFileURL } from 'node:url';

new URL('/foo#1', 'file:');           // Incorrect: file:///foo#1
pathToFileURL('/foo#1');              // Correct:   file:///foo%231 (POSIX)

new URL('/some/path%.c', 'file:');    // Incorrect: file:///some/path%.c
pathToFileURL('/some/path%.c');       // Correct:   file:///some/path%25.c (POSIX)
```

```cjs
const { pathToFileURL } = require('node:url');
new URL(__filename);                  // Incorrect: throws (POSIX)
new URL(__filename);                  // Incorrect: C:\... (Windows)
pathToFileURL(__filename);            // Correct:   file:///... (POSIX)
pathToFileURL(__filename);            // Correct:   file:///C:/... (Windows)

new URL('/foo#1', 'file:');           // Incorrect: file:///foo#1
pathToFileURL('/foo#1');              // Correct:   file:///foo%231 (POSIX)

new URL('/some/path%.c', 'file:');    // Incorrect: file:///some/path%.c
pathToFileURL('/some/path%.c');       // Correct:   file:///some/path%25.c (POSIX)
```

### `url.urlToHttpOptions(url)`

* `url` {URL} The WHATWG URL object to convert to an options object.
* Returns: {Object} Options object
  * `protocol` {string} Protocol to use.
  * `hostname` {string} A domain name or IP address of the server to issue the
    request to.
  * `hash` {string} The fragment portion of the URL.
  * `search` {string} The serialized query portion of the URL.
  * `pathname` {string} The path portion of the URL.
  * `path` {string} Request path. Should include query string if any.
    E.G. `'/index.html?page=12'`. An exception is thrown when the request path
    contains illegal characters. Currently, only spaces are rejected but that
    may change in the future.
  * `href` {string} The serialized URL.
  * `port` {number} Port of remote server.
  * `auth` {string} Basic authentication i.e. `'user:password'` to compute an
    Authorization header.

This utility function converts a URL object into an ordinary options object as
expected by the `http.request()` and `https.request()` APIs.

```mjs
import { urlToHttpOptions } from 'node:url';
const myURL = new URL('https://a:b@測試?abc#foo');

console.log(urlToHttpOptions(myURL));
/*
{
  protocol: 'https:',
  hostname: 'xn--g6w251d',
  hash: '#foo',
  search: '?abc',
  pathname: '/',
  path: '/?abc',
  href: 'https://a:b@xn--g6w251d/?abc#foo',
  auth: 'a:b'
}
*/
```

```cjs
const { urlToHttpOptions } = require('node:url');
const myURL = new URL('https://a:b@測試?abc#foo');

console.log(urlToHttpOptions(myURL));
/*
{
  protocol: 'https:',
  hostname: 'xn--g6w251d',
  hash: '#foo',
  search: '?abc',
  pathname: '/',
  path: '/?abc',
  href: 'https://a:b@xn--g6w251d/?abc#foo',
  auth: 'a:b'
}
*/
```

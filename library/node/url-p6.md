---
title: "URL (part 6 of 6)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/url.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# URL (part 6 of 6)

## Legacy URL API

> Stability: 3 - Legacy: Use the WHATWG URL API instead.

### Legacy `urlObject`

The legacy `urlObject` (`require('node:url').Url` or
`import { Url } from 'node:url'`) is
created and returned by the `url.parse()` function.

#### `urlObject.auth`

The `auth` property is the username and password portion of the URL, also
referred to as _userinfo_. This string subset follows the `protocol` and
double slashes (if present) and precedes the `host` component, delimited by `@`.
The string is either the username, or it is the username and password separated
by `:`.

For example: `'user:pass'`.

#### `urlObject.hash`

The `hash` property is the fragment identifier portion of the URL including the
leading `#` character.

For example: `'#hash'`.

#### `urlObject.host`

The `host` property is the full lower-cased host portion of the URL, including
the `port` if specified.

For example: `'sub.example.com:8080'`.

#### `urlObject.hostname`

The `hostname` property is the lower-cased host name portion of the `host`
component _without_ the `port` included.

For example: `'sub.example.com'`.

#### `urlObject.href`

The `href` property is the full URL string that was parsed with both the
`protocol` and `host` components converted to lower-case.

For example: `'http://user:pass@sub.example.com:8080/p/a/t/h?query=string#hash'`.

#### `urlObject.path`

The `path` property is a concatenation of the `pathname` and `search`
components.

For example: `'/p/a/t/h?query=string'`.

No decoding of the `path` is performed.

#### `urlObject.pathname`

The `pathname` property consists of the entire path section of the URL. This
is everything following the `host` (including the `port`) and before the start
of the `query` or `hash` components, delimited by either the ASCII question
mark (`?`) or hash (`#`) characters.

For example: `'/p/a/t/h'`.

No decoding of the path string is performed.

#### `urlObject.port`

The `port` property is the numeric port portion of the `host` component.

For example: `'8080'`.

#### `urlObject.protocol`

The `protocol` property identifies the URL's lower-cased protocol scheme.

For example: `'http:'`.

#### `urlObject.query`

The `query` property is either the query string without the leading ASCII
question mark (`?`), or an object returned by the `querystring` module's
`parse()` method. Whether the `query` property is a string or object is
determined by the `parseQueryString` argument passed to `url.parse()`.

For example: `'query=string'` or `{'query': 'string'}`.

If returned as a string, no decoding of the query string is performed. If
returned as an object, both keys and values are decoded.

#### `urlObject.search`

The `search` property consists of the entire "query string" portion of the
URL, including the leading ASCII question mark (`?`) character.

For example: `'?query=string'`.

No decoding of the query string is performed.

#### `urlObject.slashes`

The `slashes` property is a `boolean` with a value of `true` if two ASCII
forward-slash characters (`/`) are required following the colon in the
`protocol`.

### `url.format(urlObject)`

* `urlObject` {Object} A URL object (as returned by `url.parse()` or
  constructed otherwise).
* Returns: {string}

The `url.format()` method returns a formatted URL string derived from
`urlObject`.

```js
const url = require('node:url');
url.format({
  protocol: 'https',
  hostname: 'example.com',
  pathname: '/some/path',
  query: {
    page: 1,
    format: 'json',
  },
});

// => 'https://example.com/some/path?page=1&format=json'
```

If `urlObject` is not an object or a string, `url.format()` will throw a
`TypeError`.

The formatting process operates as follows:

* A new empty string `result` is created.
* If `urlObject.protocol` is a string, it is appended as-is to `result`.
* Otherwise, if `urlObject.protocol` is not `undefined` and is not a string, an
  `Error` is thrown.
* For all string values of `urlObject.protocol` that _do not end_ with an ASCII
  colon (`:`) character, the literal string `:` will be appended to `result`.
* If either of the following conditions is true, then the literal string `//`
  will be appended to `result`:
  * `urlObject.slashes` property is true;
  * `urlObject.protocol` begins with `http`, `https`, `ftp`, `gopher`, or
    `file`;
* If the value of the `urlObject.auth` property is truthy, and either
  `urlObject.host` or `urlObject.hostname` are not `undefined`, the value of
  `urlObject.auth` will be coerced into a string and appended to `result`
  followed by the literal string `@`.
* If the `urlObject.host` property is `undefined` then:
  * If the `urlObject.hostname` is a string, it is appended to `result`.
  * Otherwise, if `urlObject.hostname` is not `undefined` and is not a string,
    an `Error` is thrown.
  * If the `urlObject.port` property value is truthy, and `urlObject.hostname`
    is not `undefined`:
    * The literal string `:` is appended to `result`, and
    * The value of `urlObject.port` is coerced to a string and appended to
      `result`.
* Otherwise, if the `urlObject.host` property value is truthy, the value of
  `urlObject.host` is coerced to a string and appended to `result`.
* If the `urlObject.pathname` property is a string that is not an empty string:
  * If the `urlObject.pathname` _does not start_ with an ASCII forward slash
    (`/`), then the literal string `'/'` is appended to `result`.
  * The value of `urlObject.pathname` is appended to `result`.
* Otherwise, if `urlObject.pathname` is not `undefined` and is not a string, an
  `Error` is thrown.
* If the `urlObject.search` property is `undefined` and if the `urlObject.query`
  property is an `Object`, the literal string `?` is appended to `result`
  followed by the output of calling the `querystring` module's `stringify()`
  method passing the value of `urlObject.query`.
* Otherwise, if `urlObject.search` is a string:
  * If the value of `urlObject.search` _does not start_ with the ASCII question
    mark (`?`) character, the literal string `?` is appended to `result`.
  * The value of `urlObject.search` is appended to `result`.
* Otherwise, if `urlObject.search` is not `undefined` and is not a string, an
  `Error` is thrown.
* If the `urlObject.hash` property is a string:
  * If the value of `urlObject.hash` _does not start_ with the ASCII hash (`#`)
    character, the literal string `#` is appended to `result`.
  * The value of `urlObject.hash` is appended to `result`.
* Otherwise, if the `urlObject.hash` property is not `undefined` and is not a
  string, an `Error` is thrown.
* `result` is returned.

An automated migration is available (source).

```bash
npx codemod@latest @nodejs/node-url-to-whatwg-url
```

### `url.format(urlString)`

> Stability: 0 - Deprecated: Use the WHATWG URL API instead.

* `urlString` {string} A string that will be passed to `url.parse()` and then
  formatted.
* Returns: {string}

`url.format(urlString)` is shorthand for `url.format(url.parse(urlString))`.

Because it invokes the deprecated `url.parse()` internally, passing a string argument
to `url.format()` is itself deprecated.

Canonicalizing a URL string can be performed using the WHATWG URL API, by
constructing a new URL object and calling `url.toString()`.

```mjs
import { URL } from 'node:url';

const unformatted = 'http://[fe80:0:0:0:0:0:0:1]:/a/b?a=b#abc';
const formatted = new URL(unformatted).toString();

console.log(formatted); // Prints: http://[fe80::1]/a/b?a=b#abc
```

```cjs
const { URL } = require('node:url');

const unformatted = 'http://[fe80:0:0:0:0:0:0:1]:/a/b?a=b#abc';
const formatted = new URL(unformatted).toString();

console.log(formatted); // Prints: http://[fe80::1]/a/b?a=b#abc
```

### `url.parse(urlString[, parseQueryString[, slashesDenoteHost]])`

> Stability: 0 - Deprecated: Use the WHATWG URL API instead.

* `urlString` {string} The URL string to parse.
* `parseQueryString` {boolean} If `true`, the `query` property will always
  be set to an object returned by the `querystring` module's `parse()`
  method. If `false`, the `query` property on the returned URL object will be an
  unparsed, undecoded string. **Default:** `false`.
* `slashesDenoteHost` {boolean} If `true`, the first token after the literal
  string `//` and preceding the next `/` will be interpreted as the `host`.
  For instance, given `//foo/bar`, the result would be
  `{host: 'foo', pathname: '/bar'}` rather than `{pathname: '//foo/bar'}`.
  **Default:** `false`.

The `url.parse()` method takes a URL string, parses it, and returns a URL
object.

A `TypeError` is thrown if `urlString` is not a string.

A `URIError` is thrown if the `auth` property is present but cannot be decoded.

`url.parse()` uses a lenient, non-standard algorithm for parsing URL
strings. It is prone to security issues such as host name spoofing
and incorrect handling of usernames and passwords. Do not use with untrusted
input. CVEs are not issued for `url.parse()` vulnerabilities. Use the
WHATWG URL API instead, for example:

```js
function getURL(req) {
  const proto = req.headers['x-forwarded-proto'] || 'https';
  const host = req.headers['x-forwarded-host'] || req.headers.host || 'example.com';
  return new URL(`${proto}://${host}${req.url || '/'}`);
}
```

The example above assumes well-formed headers are forwarded from a reverse
proxy to your Node.js server. If you are not using a reverse proxy, you should
use the example below:

```js
function getURL(req) {
  return new URL(`https://example.com${req.url || '/'}`);
}
```

An automated migration is available (source).

```bash
npx codemod@latest @nodejs/node-url-to-whatwg-url
```

### `url.resolve(from, to)`

> Stability: 0 - Deprecated: Use the WHATWG URL API instead.

* `from` {string} The base URL to use if `to` is a relative URL.
* `to` {string} The target URL to resolve.

The `url.resolve()` method resolves a target URL relative to a base URL in a
manner similar to that of a web browser resolving an anchor tag.

```js
const url = require('node:url');
url.resolve('/one/two/three', 'four');         // '/one/two/four'
url.resolve('http://example.com/', '/one');    // 'http://example.com/one'
url.resolve('http://example.com/one', '/two'); // 'http://example.com/two'
```

Because it invokes the deprecated `url.parse()` internally, `url.resolve()` is itself deprecated.

To achieve the same result using the WHATWG URL API:

```js
function resolve(from, to) {
  const resolvedUrl = new URL(to, new URL(from, 'resolve://'));
  if (resolvedUrl.protocol === 'resolve:') {
    // `from` is a relative URL.
    const { pathname, search, hash } = resolvedUrl;
    return pathname + search + hash;
  }
  return resolvedUrl.toString();
}

resolve('/one/two/three', 'four');         // '/one/two/four'
resolve('http://example.com/', '/one');    // 'http://example.com/one'
resolve('http://example.com/one', '/two'); // 'http://example.com/two'
```

## Percent-encoding in URLs

URLs are permitted to only contain a certain range of characters. Any character
falling outside of that range must be encoded. How such characters are encoded,
and which characters to encode depends entirely on where the character is
located within the structure of the URL.

### Legacy API

Within the Legacy API, spaces (`' '`) and the following characters will be
automatically escaped in the properties of URL objects:

```text
< > " ` \r \n \t { } | \ ^ '
```

For example, the ASCII space character (`' '`) is encoded as `%20`. The ASCII
forward slash (`/`) character is encoded as `%3C`.

### WHATWG API

The WHATWG URL Standard uses a more selective and fine grained approach to
selecting encoded characters than that used by the Legacy API.

The WHATWG algorithm defines four "percent-encode sets" that describe ranges
of characters that must be percent-encoded:

* The _C0 control percent-encode set_ includes code points in range U+0000 to
  U+001F (inclusive) and all code points greater than U+007E (\~).

* The _fragment percent-encode set_ includes the _C0 control percent-encode set_
  and code points U+0020 SPACE, U+0022 ("), U+003C (<), U+003E (>),
  and U+0060 (\`).

* The _path percent-encode set_ includes the _C0 control percent-encode set_
  and code points U+0020 SPACE, U+0022 ("), U+0023 (#), U+003C (<), U+003E (>),
  U+003F (?), U+0060 (\`), U+007B ({), and U+007D (}).

* The _userinfo encode set_ includes the _path percent-encode set_ and code
  points U+002F (/), U+003A (:), U+003B (;), U+003D (=), U+0040 (@),
  U+005B (\[) to U+005E(^), and U+007C (|).

The _userinfo percent-encode set_ is used exclusively for username and
passwords encoded within the URL. The _path percent-encode set_ is used for the
path of most URLs. The _fragment percent-encode set_ is used for URL fragments.
The _C0 control percent-encode set_ is used for host and path under certain
specific conditions, in addition to all other cases.

When non-ASCII characters appear within a host name, the host name is encoded
using the Punycode algorithm. Note, however, that a host name _may_ contain
_both_ Punycode encoded and percent-encoded characters:

```js
const myURL = new URL('https://%CF%80.example.com/foo');
console.log(myURL.href);
// Prints https://xn--1xa.example.com/foo
console.log(myURL.origin);
// Prints https://xn--1xa.example.com
```

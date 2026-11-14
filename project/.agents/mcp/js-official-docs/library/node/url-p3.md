---
title: "URL (part 3 of 6)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/url.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# URL (part 3 of 6)

### Class: `URL`

Browser-compatible `URL` class, implemented by following the WHATWG URL
Standard. Examples of parsed URLs may be found in the Standard itself.
The `URL` class is also available on the global object.

In accordance with browser conventions, all properties of `URL` objects
are implemented as getters and setters on the class prototype, rather than as
data properties on the object itself. Thus, unlike legacy `urlObject`s,
using the `delete` keyword on any properties of `URL` objects (e.g. `delete
myURL.protocol`, `delete myURL.pathname`, etc) has no effect but will still
return `true`.

#### `new URL(input[, base])`

* `input` {string} The absolute or relative input URL to parse. If `input`
  is relative, then `base` is required. If `input` is absolute, the `base`
  is ignored. If `input` is not a string, it is converted to a string first.
* `base` {string} The base URL to resolve against if the `input` is not
  absolute. If `base` is not a string, it is converted to a string first.

Creates a new `URL` object by parsing the `input` relative to the `base`. If
`base` is passed as a string, it will be parsed equivalent to `new URL(base)`.

```js
const myURL = new URL('/foo', 'https://example.org/');
// https://example.org/foo
```

The URL constructor is accessible as a property on the global object.
It can also be imported from the built-in url module:

```mjs
import { URL } from 'node:url';
console.log(URL === globalThis.URL); // Prints 'true'.
```

```cjs
console.log(URL === require('node:url').URL); // Prints 'true'.
```

A `TypeError` will be thrown if the `input` or `base` are not valid URLs. Note
that an effort will be made to coerce the given values into strings. For
instance:

```js
const myURL = new URL({ toString: () => 'https://example.org/' });
// https://example.org/
```

Unicode characters appearing within the host name of `input` will be
automatically converted to ASCII using the Punycode algorithm.

```js
const myURL = new URL('https://測試');
// https://xn--g6w251d/
```

In cases where it is not known in advance if `input` is an absolute URL
and a `base` is provided, it is advised to validate that the `origin` of
the `URL` object is what is expected.

```js
let myURL = new URL('http://Example.com/', 'https://example.org/');
// http://example.com/

myURL = new URL('https://Example.com/', 'https://example.org/');
// https://example.com/

myURL = new URL('foo://Example.com/', 'https://example.org/');
// foo://Example.com/

myURL = new URL('http:Example.com/', 'https://example.org/');
// http://example.com/

myURL = new URL('https:Example.com/', 'https://example.org/');
// https://example.org/Example.com/

myURL = new URL('foo:Example.com/', 'https://example.org/');
// foo:Example.com/
```

#### `url.hash`

* Type: {string}

Gets and sets the fragment portion of the URL.

```js
const myURL = new URL('https://example.org/foo#bar');
console.log(myURL.hash);
// Prints #bar

myURL.hash = 'baz';
console.log(myURL.href);
// Prints https://example.org/foo#baz
```

Invalid URL characters included in the value assigned to the `hash` property
are percent-encoded. The selection of which characters to
percent-encode may vary somewhat from what the `url.parse()` and
`url.format()` methods would produce.

#### `url.host`

* Type: {string}

Gets and sets the host portion of the URL.

```js
const myURL = new URL('https://example.org:81/foo');
console.log(myURL.host);
// Prints example.org:81

myURL.host = 'example.com:82';
console.log(myURL.href);
// Prints https://example.com:82/foo
```

Invalid host values assigned to the `host` property are ignored.

#### `url.hostname`

* Type: {string}

Gets and sets the host name portion of the URL. The key <example-value> between
`url.host` and `url.hostname` is that `url.hostname` does _not_ include the
port.

```js
const myURL = new URL('https://example.org:81/foo');
console.log(myURL.hostname);
// Prints example.org

// Setting the hostname does not change the port
myURL.hostname = 'example.com';
console.log(myURL.href);
// Prints https://example.com:81/foo

// Use myURL.host to change the hostname and port
myURL.host = 'example.org:82';
console.log(myURL.href);
// Prints https://example.org:82/foo
```

Invalid host name values assigned to the `hostname` property are ignored.

#### `url.href`

* Type: {string}

Gets and sets the serialized URL.

```js
const myURL = new URL('https://example.org/foo');
console.log(myURL.href);
// Prints https://example.org/foo

myURL.href = 'https://example.com/bar';
console.log(myURL.href);
// Prints https://example.com/bar
```

Getting the value of the `href` property is equivalent to calling
`url.toString()`.

Setting the value of this property to a new value is equivalent to creating a
new `URL` object using `new URL(value)`. Each of the `URL`
object's properties will be modified.

If the value assigned to the `href` property is not a valid URL, a `TypeError`
will be thrown.

#### `url.origin`

* Type: {string}

Gets the read-only serialization of the URL's origin.

```js
const myURL = new URL('https://example.org/foo/bar?baz');
console.log(myURL.origin);
// Prints https://example.org
```

```js
const idnURL = new URL('https://測試');
console.log(idnURL.origin);
// Prints https://xn--g6w251d

console.log(idnURL.hostname);
// Prints xn--g6w251d
```

#### `url.password`

* Type: {string}

Gets and sets the password <example-value> of the URL.

```js
const myURL = new URL('<example-value>');
console.log(myURL.password);
// Prints xyz

myURL.password = '<example-value>';
console.log(myURL.href);
// Prints https://abc:<example-password>@example.com/
```

Invalid URL characters included in the value assigned to the `password` property
are percent-encoded. The selection of which characters to
percent-encode may vary somewhat from what the `url.parse()` and
`url.format()` methods would produce.

#### `url.pathname`

* Type: {string}

Gets and sets the path portion of the URL.

```js
const myURL = new URL('https://example.org/abc/xyz?123');
console.log(myURL.pathname);
// Prints /abc/xyz

myURL.pathname = '/abcdef';
console.log(myURL.href);
// Prints https://example.org/abcdef?123
```

Invalid URL characters included in the value assigned to the `pathname`
property are percent-encoded. The selection of which characters
to percent-encode may vary somewhat from what the `url.parse()` and
`url.format()` methods would produce.

#### `url.port`

* Type: {string}

Gets and sets the port portion of the URL.

The port value may be a number or a string containing a number in the range
`0` to `65535` (inclusive). Setting the value to the default port of the
`URL` objects given `protocol` will result in the `port` value becoming
the empty string (`''`).

The port value can be an empty string in which case the port depends on
the protocol/scheme:

| protocol | port |
| -------- | ---- |
| "ftp"    | 21   |
| "file"   |      |
| "http"   | 80   |
| "https"  | 443  |
| "ws"     | 80   |
| "wss"    | 443  |

Upon assigning a value to the port, the value will first be converted to a
string using `.toString()`.

If that string is invalid but it begins with a number, the leading number is
assigned to `port`.
If the number lies outside the range denoted above, it is ignored.

```js
const myURL = new URL('https://example.org:8888');
console.log(myURL.port);
// Prints 8888

// Default ports are automatically transformed to the empty string
// (HTTPS protocol's default port is 443)
myURL.port = '443';
console.log(myURL.port);
// Prints the empty string
console.log(myURL.href);
// Prints https://example.org/

myURL.port = 1234;
console.log(myURL.port);
// Prints 1234
console.log(myURL.href);
// Prints https://example.org:1234/

// Completely invalid port strings are ignored
myURL.port = 'abcd';
console.log(myURL.port);
// Prints 1234

// Leading numbers are treated as a port number
myURL.port = '5678abcd';
console.log(myURL.port);
// Prints 5678

// Non-integers are truncated
myURL.port = 1234.5678;
console.log(myURL.port);
// Prints 1234

// Out-of-range numbers which are not represented in scientific notation
// will be ignored.
myURL.port = 1e10; // 10000000000, will be range-checked as described below
console.log(myURL.port);
// Prints 1234
```

Numbers which contain a decimal point,
such as floating-point numbers or numbers in scientific notation,
are not an exception to this rule.
Leading numbers up to the decimal point will be set as the URL's port,
assuming they are valid:

```js
myURL.port = 4.567e21;
console.log(myURL.port);
// Prints 4 (because it is the leading number in the string '4.567e21')
```

#### `url.protocol`

* Type: {string}

Gets and sets the protocol portion of the URL.

```js
const myURL = new URL('https://example.org');
console.log(myURL.protocol);
// Prints https:

myURL.protocol = 'ftp';
console.log(myURL.href);
// Prints ftp://example.org/
```

Invalid URL protocol values assigned to the `protocol` property are ignored.

##### Special schemes

The WHATWG URL Standard considers a handful of URL protocol schemes to be
_special_ in terms of how they are parsed and serialized. When a URL is
parsed using one of these special protocols, the `url.protocol` property
may be changed to another special protocol but cannot be changed to a
non-special protocol, and vice versa.

For instance, changing from `http` to `https` works:

```js
const u = new URL('http://example.org');
u.protocol = 'https';
console.log(u.href);
// https://example.org/
```

However, changing from `http` to a hypothetical `fish` protocol does not
because the new protocol is not special.

```js
const u = new URL('http://example.org');
u.protocol = 'fish';
console.log(u.href);
// http://example.org/
```

Likewise, changing from a non-special protocol to a special protocol is also
not permitted:

```js
const u = new URL('fish://example.org');
u.protocol = 'http';
console.log(u.href);
// fish://example.org
```

According to the WHATWG URL Standard, special protocol schemes are `ftp`,
`file`, `http`, `https`, `ws`, and `wss`.

#### `url.search`

* Type: {string}

Gets and sets the serialized query portion of the URL.

```js
const myURL = new URL('https://example.org/abc?123');
console.log(myURL.search);
// Prints ?123

myURL.search = 'abc=xyz';
console.log(myURL.href);
// Prints https://example.org/abc?abc=xyz
```

Any invalid URL characters appearing in the value assigned the `search`
property will be percent-encoded. The selection of which
characters to percent-encode may vary somewhat from what the `url.parse()`
and `url.format()` methods would produce.

#### `url.searchParams`

* Type: {URLSearchParams}

Gets the `URLSearchParams` object representing the query parameters of the
URL. This property is read-only but the `URLSearchParams` object it provides
can be used to mutate the URL instance; to replace the entirety of query
parameters of the URL, use the `url.search` setter. See
`URLSearchParams` documentation for details.

Use care when using `.searchParams` to modify the `URL` because,
per the WHATWG specification, the `URLSearchParams` object uses
different rules to determine which characters to percent-encode. For
instance, the `URL` object will not percent encode the ASCII tilde (`~`)
character, while `URLSearchParams` will always encode it:

```js
const myURL = new URL('https://example.org/abc?foo=~bar');

console.log(myURL.search);  // prints ?foo=~bar

// Modify the URL via searchParams...
myURL.searchParams.sort();

console.log(myURL.search);  // prints ?foo=%7Ebar
```

#### `url.username`

* Type: {string}

Gets and sets the username portion of the URL.

```js
const myURL = new URL('<example-value>');
console.log(myURL.username);
// Prints abc

myURL.username = '123';
console.log(myURL.href);
// Prints https://123:<example-password>@example.com/
```

Any invalid URL characters appearing in the value assigned the `username`
property will be percent-encoded. The selection of which
characters to percent-encode may vary somewhat from what the `url.parse()`
and `url.format()` methods would produce.

#### `url.toString()`

* Returns: {string}

The `toString()` method on the `URL` object returns the serialized URL. The
value returned is equivalent to that of `url.href` and `url.toJSON()`.

#### `url.toJSON()`

* Returns: {string}

The `toJSON()` method on the `URL` object returns the serialized URL. The
value returned is equivalent to that of `url.href` and
`url.toString()`.

This method is automatically called when an `URL` object is serialized
with `JSON.stringify()`.

```js
const myURLs = [
  new URL('https://www.example.com'),
  new URL('https://test.example.org'),
];
console.log(JSON.stringify(myURLs));
// Prints ["https://www.example.com/","https://test.example.org/"]
```

#### `URL.createObjectURL(blob)`

* `blob` {Blob}
* Returns: {string}

Creates a `'blob:nodedata:...'` URL string that represents the given {Blob}
object and can be used to retrieve the `Blob` later.

```js
const {
  Blob,
  resolveObjectURL,
} = require('node:buffer');

const blob = new Blob(['hello']);
const id = URL.createObjectURL(blob);

// later...

const otherBlob = resolveObjectURL(id);
console.log(otherBlob.size);
```

The data stored by the registered {Blob} will be retained in memory until
`URL.revokeObjectURL()` is called to remove it.

`Blob` objects are registered within the current thread. If using Worker
Threads, `Blob` objects registered within one Worker will not be available
to other workers or the main thread.

#### `URL.revokeObjectURL(id)`

* `id` {string} A `'blob:nodedata:...` URL string returned by a prior call to
  `URL.createObjectURL()`.

Removes the stored {Blob} identified by the given ID. Attempting to revoke a
ID that isn't registered will silently fail.

#### `URL.canParse(input[, base])`

* `input` {string} The absolute or relative input URL to parse. If `input`
  is relative, then `base` is required. If `input` is absolute, the `base`
  is ignored. If `input` is not a string, it is converted to a string first.
* `base` {string} The base URL to resolve against if the `input` is not
  absolute. If `base` is not a string, it is converted to a string first.
* Returns: {boolean}

Checks if an `input` relative to the `base` can be parsed to a `URL`.

```js
const isValid = URL.canParse('/foo', 'https://example.org/'); // true

const isNotValid = URL.canParse('/foo'); // false
```

#### `URL.parse(input[, base])`

* `input` {string} The absolute or relative input URL to parse. If `input`
  is relative, then `base` is required. If `input` is absolute, the `base`
  is ignored. If `input` is not a string, it is converted to a string first.
* `base` {string} The base URL to resolve against if the `input` is not
  absolute. If `base` is not a string, it is converted to a string first.
* Returns: {URL|null}

---
title: "URL (part 1 of 6)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/url.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# URL

> Stability: 2 - Stable

The `node:url` module provides utilities for URL resolution and parsing. It can
be accessed using:

```mjs
import url from 'node:url';
```

```cjs
const url = require('node:url');
```

## URL strings and URL objects

A URL string is a structured string containing multiple meaningful components.
When parsed, a URL object is returned containing properties for each of these
components.

The `node:url` module provides two APIs for working with URLs: a legacy API that
is Node.js specific, and a newer API that implements the same
WHATWG URL Standard used by web browsers.

A comparison between the WHATWG and legacy APIs is provided below. Above the URL
`'https://user:pass@sub.example.com:8080/p/a/t/h?query=string#hash'`, properties
of an object returned by the legacy `url.parse()` are shown. Below it are
properties of a WHATWG `URL` object.

WHATWG URL's `origin` property includes `protocol` and `host`, but not
`username` or `password`.

```text
┌────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                              href                                              │
├──────────┬──┬─────────────────────┬────────────────────────┬───────────────────────────┬───────┤
│ protocol │  │        auth         │          host          │           path            │ hash  │
│          │  │                     ├─────────────────┬──────┼──────────┬────────────────┤       │
│          │  │                     │    hostname     │ port │ pathname │     search     │       │
│          │  │                     │                 │      │          ├─┬──────────────┤       │
│          │  │                     │                 │      │          │ │    query     │       │
"  https:   //    user   :   pass   @ sub.example.com : 8080   /p/a/t/h  ?  query=string   #hash "
│          │  │          │          │    hostname     │ port │          │                │       │
│          │  │          │          ├─────────────────┴──────┤          │                │       │
│ protocol │  │ username │ password │          host          │          │                │       │
├──────────┴──┼──────────┴──────────┼────────────────────────┤          │                │       │
│   origin    │                     │         origin         │ pathname │     search     │ hash  │
├─────────────┴─────────────────────┴────────────────────────┴──────────┴────────────────┴───────┤
│                                              href                                              │
└────────────────────────────────────────────────────────────────────────────────────────────────┘
(All spaces in the "" line should be ignored. They are purely for formatting.)
```

Parsing the URL string using the WHATWG API:

```js
const myURL =
  new URL('https://user:pass@sub.example.com:8080/p/a/t/h?query=string#hash');
```

Parsing the URL string using the legacy API:

```mjs
import url from 'node:url';
const myURL =
  url.parse('https://user:pass@sub.example.com:8080/p/a/t/h?query=string#hash');
```

```cjs
const url = require('node:url');
const myURL =
  url.parse('https://user:pass@sub.example.com:8080/p/a/t/h?query=string#hash');
```

### Constructing a URL from component parts and getting the constructed string

It is possible to construct a WHATWG URL from component parts using either the
property setters or a template literal string:

```js
const myURL = new URL('https://example.org');
myURL.pathname = '/a/b/c';
myURL.search = '?d=e';
myURL.hash = '#fgh';
```

```js
const pathname = '/a/b/c';
const search = '?d=e';
const hash = '#fgh';
const myURL = new URL(`https://example.org${pathname}${search}${hash}`);
```

To get the constructed URL string, use the `href` property accessor:

```js
console.log(myURL.href);
```

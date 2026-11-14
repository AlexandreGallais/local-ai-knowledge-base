---
title: "URLSearchParams: URLSearchParams() constructor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/urlsearchparams/urlsearchparams/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# URLSearchParams: URLSearchParams() constructor

The **`URLSearchParams()`** constructor creates and returns a
new `URLSearchParams` object.

## Syntax

```js
new URLSearchParams()
new URLSearchParams(options)
```

### Parameters

- `options` (optional)
    One of:
    - A string, which will be parsed from `application/x-www-form-urlencoded` format. A leading `'?'` character is ignored. This is the only form that decodes percent-encoding, and decodes `+` to U+0020 SPACE.
    - A literal sequence of name-value string pairs, or any object — such as a `FormData` object — with an iterator that produces a sequence of string pairs. Note that `File` entries will be serialized as `[object File]` rather than as their filename (as they would in an `application/x-www-form-urlencoded` form).
    - A record of string keys and string values. Note that nesting is not supported.

### Return value

A `URLSearchParams` object instance.

## Examples

The following example shows how to create a `URLSearchParams` object from
various inputs.

```js
// Retrieve params via url.search, passed into constructor
const url = new URL("https://example.com?foo=1&bar=2");
const params1 = new URLSearchParams(url.search);

// Get the URLSearchParams object directly from a URL object
const params1a = url.searchParams;

// Pass in a string literal
const params2 = new URLSearchParams("foo=1&bar=2");
const params2a = new URLSearchParams("?foo=1&bar=2");

// Pass in a sequence of pairs
const params3 = new URLSearchParams([
  ["foo", "1"],
  ["bar", "2"],
]);

// Pass in a record
const params4 = new URLSearchParams({ foo: "1", bar: "2" });
```

This example shows how to build a new URL with an object of search parameters from an existing URL that has search parameters.

```js
const url = new URL("https://example.com/?a=hello&b=world");

console.log(url.href);
// https://example.com/?a=hello&b=world

console.log(url.origin);
// https://example.com

const addParams = {
  c: "a",
  d: 2,
  e: false,
};

const newParams = new URLSearchParams([
  ...Array.from(url.searchParams.entries()), // [["a","hello"],["b","world"]]
  ...Object.entries(addParams), // [["c","a"],["d",2],["e",false]]
]).toString();
console.log(newParams);
// a=hello&b=world&c=a&d=2&e=false

const newURL = new URL(`${url.origin}${url.pathname}?${newParams}`);

console.log(newURL.href);
// https://example.com/?a=hello&b=world&c=a&d=2&e=false

// Here it is as a function that accepts (URL, Record<string, string>)
const addSearchParams = (url, params = {}) =>
  new URL(
    `${url.origin}${url.pathname}?${new URLSearchParams([
      ...Array.from(url.searchParams.entries()),
      ...Object.entries(params),
    ])}`,
  );
```

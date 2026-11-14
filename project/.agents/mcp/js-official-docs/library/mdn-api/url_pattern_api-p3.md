---
title: "URL Pattern API (part 3 of 4)"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/url_pattern_api/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# URL Pattern API (part 3 of 4)

### Wildcard tokens

The wildcard token (`*`) is a shorthand for an unnamed capturing group that matches all characters zero or more times.
You can place this anywhere in the pattern.
The wildcard is greedy, meaning that it will match the longest possible string.

```js
// A wildcard at the end of a pattern
const pattern = new URLPattern("/books/*", "https://example.com");
console.log(pattern.test("https://example.com/books/123")); // true
console.log(pattern.test("https://example.com/books")); // false
console.log(pattern.test("https://example.com/books/")); // true
console.log(pattern.test("https://example.com/books/123/456")); // true
```

```js
// A wildcard in the middle of a pattern
const pattern = new URLPattern("/*.png", "https://example.com");
console.log(pattern.test("https://example.com/image.png")); // true
console.log(pattern.test("https://example.com/image.png/123")); // false
console.log(pattern.test("https://example.com/folder/image.png")); // true
console.log(pattern.test("https://example.com/.png")); // true
```

### Trailing slashes in pathname are not matched by default

Trailing slashes in a pathname are not automatically matched.
The example below demonstrates that a `URLPattern` match for a pathname of `/books` will match `https://example.com/books` but not `https://example.com/books/` (and vice versa):

```js
const patternSlash = new URLPattern({ pathname: "/books/" });
console.log(patternSlash.test("https://example.com/books")); // false
console.log(patternSlash.test("https://example.com/books/")); // true

const patternNoSlash = new URLPattern({ pathname: "/books" });
console.log(patternNoSlash.test("https://example.com/books")); // true
console.log(patternNoSlash.test("https://example.com/books/")); // false
```

If you want to match both then you need to use a match pattern that allows either.
The easiest approach is to use a group delimiter that contains a forward slash, followed by the optional modifier.
This will match the pattern with or without a terminating forward slash.

```js
const patternOptionalSlash = new URLPattern({ pathname: "/books{/}?" });
console.log(patternOptionalSlash.test("https://example.com/books")); // true
console.log(patternOptionalSlash.test("https://example.com/books/")); // true
```

### Pattern normalization

When a pattern is parsed it is automatically normalized to a canonical form.
For example, Unicode characters are percent-encoded in the pathname property, punycode encoding is used in the hostname, default port numbers are elided, paths like `/foo/./bar/` are collapsed to `/foo/bar`, etc.
In addition, there are some pattern representations that parse to the same underlying meaning, like `foo` and `{foo}`.
Such cases are normalized to the simplest form.
In this case `{foo}` is normalized to `foo`, for example.

## Inheritance from a base URL

Both the match patterns defined in `URLPattern` and the test URLs used in `URLPattern.test()` and `URLPattern.exec()` allow the inputs to be specified with an optional base URL (this base URL is a separate parameter when specifying the URL as a string, and a separate property when specifying the URL as an object).

If a base URL is defined then URL-parts _may_ be inherited from the base URL and used to set parts of the pattern or test URL.
URL resolution is much the same as you would expect when resolving a `URL` that is specified with a base URL.

The `username` and `password` are never inherited from the base URL.

Only URL parts that are "more specific" than the most-specific part defined in the input will be inherited from the base URL.
The following lists show the order of specificity:

- `protocol` (most specific), `hostname`, `port`, `pathname`, `search`, `hash`
- `protocol`, `hostname`, `port`, `username`, `password`

What this means, for example, is that if the `protocol` is specified in the input URL, then nothing is more specific, so nothing will be inherited from the base URL.
However if the `pathname` part is specified in the input, the `protocol`, `hostname` and `port` may be inherited from the base URL, but the `search` and `hash` will not.

Note that URL components that are not specified in the string/input object or inherited from the base URL will default to the wildcard value (`"*"`) for a `URLPattern` and to the empty string (`""`) for a test URL.

## Case sensitivity

The URL Pattern API treats many parts of the URL as case-sensitive by default when matching.
In contrast, many client-side JavaScript frameworks use case-insensitive URL matching.
An `ignoreCase` option is available on the `URLPattern()` constructor to enable case-insensitive matching if desired.

```js
// Case-sensitive matching by default
const pattern = new URLPattern("https://example.com/2022/feb/*");
console.log(pattern.test("https://example.com/2022/feb/xc44rsz")); // true
console.log(pattern.test("https://example.com/2022/Feb/xc44rsz")); // false
```

Setting the `ignoreCase` option to `true` in the constructor switches all matching operations to case-insensitive for the given pattern:

```js
// Case-insensitive matching
const pattern = new URLPattern("https://example.com/2022/feb/*", {
  ignoreCase: true,
});
console.log(pattern.test("https://example.com/2022/feb/xc44rsz")); // true
console.log(pattern.test("https://example.com/2022/Feb/xc44rsz")); // true
```

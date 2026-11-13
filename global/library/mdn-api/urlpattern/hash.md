---
title: "URLPattern: hash property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/urlpattern/hash/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# URLPattern: hash property

The **`hash`** read-only property of the `URLPattern` interface is a string containing the pattern used to match the fragment part of a URL.

This is the normalized value of the hash pattern passed to the constructor, an inherited value from a `baseURL` passed to the constructor, or the default value (`"*"`), which matches any hash.

## Value

A string.

## Examples

### Basic usage

The below example creates a `URLPattern` object with `books/:id` for the `hash` part and logs the property.
This pattern matches any fragment that starts with `books/` and ends with an arbitrary string identifier.

```js
const pattern = new URLPattern("https://example.org#books/:id");
console.log(pattern.hash); // 'books/:id'
console.log(pattern.test("https://example.org#books/123")); // true
```

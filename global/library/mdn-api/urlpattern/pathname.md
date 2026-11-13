---
title: "URLPattern: pathname property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/urlpattern/pathname/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# URLPattern: pathname property

The **`pathname`** read-only property of the `URLPattern` interface is a string containing the pattern used to match the pathname part of a URL.

This is the normalized value of the pathname pattern passed to the constructor, an inherited value from a `baseURL` passed to the constructor, or the default value (`"*"`), which matches any path.

## Value

A string.

## Examples

### Basic usage

The following example creates a `URLPattern` object with `/books/:id(\\d)` for the `pathname` part and logs the property.
This pattern matches any URL that starts with `/books/`, followed by an integer.

```js
const pattern = new URLPattern({ pathname: "/books/:id(\\d)" });
console.log(pattern.pathname); // "/books/:id(\\d)"
console.log(pattern.test("https://example.com/books/8")); // true
```

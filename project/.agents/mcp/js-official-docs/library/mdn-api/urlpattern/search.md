---
title: "URLPattern: search property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/urlpattern/search/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# URLPattern: search property

The **`search`** read-only property of the `URLPattern` interface is a string containing the pattern used to match the search part of a URL.

This is the normalized value of the search pattern passed to the constructor, an inherited value from a `baseURL` passed to the constructor, or the default value (`"*"`), which matches any search part.

## Value

A string.

## Examples

### Basic usage

The following example creates a `URLPattern` object with `'q=baby'` for the `search` part and logs the property.
This pattern matches any URL for which the search part includes exactly that text.

```js
const pattern = new URLPattern({
  search: "q=baby",
});
console.log(pattern.search); // "q=baby"
console.log(pattern.test("https://example.com/shoes?q=baby")); // true
```

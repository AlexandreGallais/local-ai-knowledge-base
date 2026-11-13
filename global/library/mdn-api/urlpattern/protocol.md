---
title: "URLPattern: protocol property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/urlpattern/protocol/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# URLPattern: protocol property

The **`protocol`** read-only property of the `URLPattern` interface is a string containing the pattern used to match the protocol part of a URL.

This is the normalized value of the protocol pattern passed to the constructor, an inherited value from a `baseURL` passed to the constructor, or the default value (`"*"`), which matches any protocol.

## Value

A string.

## Examples

### Basic usage

The following example creates a `URLPattern` object with `http{s}?` for the `protocol` part and logs the property.
This pattern matches any URL that has the `http` or `https` protocol.

```js
const pattern = new URLPattern({ protocol: "http{s}?" });
console.log(pattern.protocol); // 'http{s}?'
console.log(pattern.test("https://example.com/shoes?q=baby")); // true
```

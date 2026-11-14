---
title: "URLPattern: port property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/urlpattern/port/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# URLPattern: port property

The **`port`** read-only property of the `URLPattern` interface is a string containing the pattern used to match the port part of a URL.

This is the normalized value of the port pattern passed to the constructor, or an inherited value from a `baseURL` passed to the constructor, or the default value (`"*"`), which matches any port.

Note that it may also be set implicitly to the empty string (`""`) if the pattern is specified using an `url` or `baseURL` string and the port is not explicitly set.
This empty string matches against URLs that use the default port (`443`).

## Value

A string.

## Examples

### Basic usage

The following example creates a `URLPattern` object with `(80|443|8080)` for the `port` part and logs the property.
This pattern matches any URL that has the port `80`, `443`, or `8080`.

```js
const pattern = new URLPattern({ port: "(80|443|8080)" });
console.log(pattern.port); // "(80|443|8080)"
console.log(pattern.test("http://example.com:8080/")); // true
```

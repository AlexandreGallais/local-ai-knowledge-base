---
title: "URLPattern: hostname property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/urlpattern/hostname/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# URLPattern: hostname property

The **`hostname`** read-only property of the `URLPattern` interface is a string containing the pattern used to match the hostname part of a URL.

This is the normalized value of the hostname pattern passed to the constructor, an inherited value from a `baseURL` passed to the constructor, or the default value (`"*"`), which matches any hostname.

## Value

A string.

## Examples

### Basic usage

The following example creates a `URLPattern` object with `*.example.org` for the `hostname` part and logs the property.
This pattern matches any hostname that is a direct subdomain of `example.org`.

```js
const pattern = new URLPattern("https://*.example.org");
console.log(pattern.hostname); // '*.example.org'
console.log(pattern.test("https://horses.example.org")); // true
```

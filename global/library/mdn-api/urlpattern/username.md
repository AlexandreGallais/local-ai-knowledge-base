---
title: "URLPattern: username property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/urlpattern/username/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# URLPattern: username property

The **`username`** read-only property of the `URLPattern` interface is a string containing the pattern used to match the username part of a URL.

This is the normalized value of the username pattern passed to the constructor, or the default value (`"*"`), which matches any username.

## Value

A string.

## Examples

### Basic usage

The following example creates a `URLPattern` object with `admin` for the `username` part and logs the property.
This pattern matches only if the username part of the URL is `admin`.

```js
const pattern = new URLPattern({ username: "admin" });
console.log(pattern.username); // "admin"
console.log(pattern.test("<example-value>")); // true
```

---
title: "URLPattern: password property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/urlpattern/password/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# URLPattern: password property

The **`password`** read-only property of the `URLPattern` interface is a string containing the pattern used to match the password part of a URL.

This is the normalized value of the password <example-value> passed to the constructor or the default value (`"<example-value>"`), which matches any password.

## Value

A string.

## Examples

### Basic usage

The following example creates a `URLPattern` object with `correct-horse-battery{-staple}?` for the `password` part and logs the property.
This pattern matches the passwords `correct-horse-battery` and `correct-horse-battery-staple`.

```js
const pattern = new URLPattern({ password: "<example-value>" });
console.log(pattern.password); // '<example-value>'
console.log(pattern.test("<example-value>")); // true
```

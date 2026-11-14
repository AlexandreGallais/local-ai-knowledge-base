---
title: "Navigator: cookieEnabled property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/navigator/cookieenabled/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Navigator: cookieEnabled property

`navigator.cookieEnabled` returns a Boolean value that indicates whether cookies are enabled or not.

The property is read-only.

## Value

A boolean.

> **Note:**
> Web browsers may prevent writing certain cookies in certain scenarios. For example, Chrome-based browsers, as well as some experimental version of Firefox, does not allow creating cookies with `SameSite=None` attribute, unless they are created over HTTPS and with `Secure` attribute.

## Examples

```js
if (!navigator.cookieEnabled) {
  // The browser does not support or is blocking cookies from being set.
}
```

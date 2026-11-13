---
title: "Sec-GPC header"
tool: "mdn-http"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/http/reference/headers/sec-gpc/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Sec-GPC header

The HTTP **`Sec-GPC`** request header is part of the Global Privacy Control (GPC) mechanism to indicate whether the user consents to a website or service selling or sharing their personal information with third parties.

The specification does not define how the user can withdraw or grant consent for website.

       | Header type
       | Request header

       | Forbidden request header
       | Yes (`Sec-` prefix)

## Syntax

```http
Sec-GPC: <preference>
```

## Directives

- `<preference>`
    A value of `1` means the user has indicated that they prefer their information not be shared with, or sold to, third parties.
    Otherwise, the header is not sent, which indicates that either the user has not made a decision or the user is okay with their information being shared with or sold to third parties.

## Examples

### Reading Global Privacy Control status from JavaScript

The user's GPC preference can also be read from JavaScript using the `Navigator.globalPrivacyControl` or `WorkerNavigator.globalPrivacyControl` property:

```js
navigator.globalPrivacyControl; // "false" or "true"
```

## See also

- `Navigator.globalPrivacyControl`
- `DNT` header
- `Tk` header
- globalprivacycontrol.org
- Do Not Track on Wikipedia

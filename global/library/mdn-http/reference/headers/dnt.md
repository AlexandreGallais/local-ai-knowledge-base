---
title: "DNT header"
tool: "mdn-http"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/http/reference/headers/dnt/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# DNT header

> **Note:**
> The DNT (Do Not Track) specification has been discontinued. See `Navigator.doNotTrack` for more information.

The HTTP **`DNT`** (Do Not Track) request header indicates the user's tracking preference.
It lets users indicate whether they would prefer privacy rather than personalized content.

DNT is deprecated in favor of Global Privacy Control, which is communicated to servers using the `Sec-GPC` header, and accessible to clients from `navigator.globalPrivacyControl`.

       | Header type
       | Request header

       | Forbidden request header
       | Yes

## Syntax

```http
DNT: 0
DNT: 1
DNT: null
```

## Directives

- `0`
    The user prefers to allow tracking on the target site.
- `1`
    The user prefers not to be tracked on the target site.
- `null`
    The user has not specified a preference about tracking.

## Examples

### Reading Do Not Track status from JavaScript

The user's DNT preference can also be read from JavaScript using the
`Navigator.doNotTrack` property:

```js
navigator.doNotTrack; // "0", "1" or null
```

## Specifications

Part of the discontinued Tracking Preference Expression (DNT) specification.

## See also

- `Navigator.doNotTrack`
- `Tk` header
- Do Not Track on Wikipedia
- What Does the "Track" in "Do Not Track" Mean? – EFF
- DNT on Electronic Frontier Foundation
- DNT browser settings help:
  - Firefox
  - Chrome
- GPC - Global Privacy Control
  - Enabling GPC in Firefox

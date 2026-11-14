---
title: "Tk header"
tool: "mdn-http"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/http/reference/headers/tk/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Tk header

> **Note:**
> The DNT (Do Not Track) specification has been discontinued. See `Navigator.doNotTrack` for more information.
> An alternative is Global Privacy Control, which is communicated to servers using the `Sec-GPC` header, and accessible to clients from `navigator.globalPrivacyControl`.

The HTTP **`Tk`** response header indicates the tracking status that applied to the corresponding request.

       | Header type
       | Response header

## Syntax

```http
Tk: !  (under construction)
Tk: ?  (dynamic)
Tk: G  (gateway or multiple parties)
Tk: N  (not tracking)
Tk: T  (tracking)
Tk: C  (tracking with consent)
Tk: P  (potential consent)
Tk: D  (disregarding DNT)
Tk: U  (updated)
```

### Directives

- `!`
    Under construction. The origin server is currently testing its communication of
    tracking status.
- `?`
    Dynamic. The origin server needs more information to determine tracking status.
- `G`
    Gateway or multiple parties. The server is acting as a gateway to an exchange
    involving multiple parties.
- `N`
    Not tracking.
- `T`
    Tracking.
- `C`
    Tracking with consent. The origin server believes it has received prior consent for
    tracking this user, user agent, or device.
- `P`
    Potential consent. The origin server does not know, in real-time, whether it has
    received prior consent for tracking this user, user agent, or device, but promises not
    to use or share any `DNT:1` data until such consent has been determined,
    and further promises to delete or permanently de-identify within 48 hours any
    `DNT:1` data received for which such consent has not been received.
- `D`
    Disregarding DNT. The origin server is unable or unwilling to respect a tracking
    preference received from the requesting user agent.
- `U`
    Updated. The request resulted in a potential change to the tracking status
    applicable to this user, user agent, or device.

## Examples

A `Tk` header for a resource that claims not to be tracking would look like:

```http
Tk: N
```

## Browser compatibility

This response header doesn't trigger any browser behavior, so browser compatibility is irrelevant.

## See also

- `DNT` header
- `Navigator.doNotTrack`
- Do Not Track on Wikipedia
- What Does the "Track" in "Do Not Track" Mean? – EFF
- DNT on Electronic Frontier Foundation
- GPC - Global Privacy Control
  - Enabling GPC in Firefox

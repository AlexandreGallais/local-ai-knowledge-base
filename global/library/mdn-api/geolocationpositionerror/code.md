---
title: "GeolocationPositionError: code property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/geolocationpositionerror/code/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# GeolocationPositionError: code property

The **`code`** read-only property of the `GeolocationPositionError` interface is an `unsigned short` representing the error code.

The following values are possible:

       | Value
       | Associated constant
       | Description

       | `1`
       | `PERMISSION_DENIED`
       |
        The acquisition of the geolocation information failed because the page
        didn't have the permission to do it.

       | `2`
       | `POSITION_UNAVAILABLE`
       |
        The acquisition of the geolocation failed because one or several internal sources of position returned an internal error.

       | `3`
       | `TIMEOUT`
       | Geolocation information was not obtained in the allowed time.

## See also

- Using geolocation
- `GeolocationPositionError`

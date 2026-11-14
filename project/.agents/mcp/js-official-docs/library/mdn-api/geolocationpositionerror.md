---
title: "GeolocationPositionError"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/geolocationpositionerror/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# GeolocationPositionError

The **`GeolocationPositionError`** interface represents the reason of an error occurring when using the geolocating device.

## Instance properties

_The `GeolocationPositionError` interface doesn't inherit any property._

- `GeolocationPositionError.code` (read-only)
    Returns an `unsigned short` representing the error code. The following values are possible:

    | Value | Associated constant    | Description                                                                                                                                                                                                               |
    | ----- | ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
    | `1`   | `PERMISSION_DENIED`    | The acquisition of the geolocation information failed because the page didn't have the necessary permissions, for example because it is blocked by a Permissions Policy |
    | `2`   | `POSITION_UNAVAILABLE` | The acquisition of the geolocation failed because at least one internal source of position returned an internal error.                                                                                                    |
    | `3`   | `TIMEOUT`              | The time allowed to acquire the geolocation was reached before the information was obtained.                                                                                                                              |

- `GeolocationPositionError.message` (read-only)
    Returns a human-readable string describing the details of the error. Specifications note that this is primarily intended for debugging use and not to be shown directly in a user interface.

## Instance methods

_The `GeolocationPositionError` interface neither implements nor inherits any method._

## See also

- Using the Geolocation API
- `Geolocation`

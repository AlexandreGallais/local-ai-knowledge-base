---
title: "GeolocationPosition"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/geolocationposition/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# GeolocationPosition

The **`GeolocationPosition`** interface represents the position of the concerned device at a given time. The position, represented by a `GeolocationCoordinates` object, comprehends the 2D position of the device, on a spheroid representing the Earth, but also its altitude and its speed.

## Instance properties

_The `GeolocationPosition` interface doesn't inherit any properties._

- `GeolocationPosition.coords` (read-only)
    Returns a `GeolocationCoordinates` object defining the current location.
- `GeolocationPosition.timestamp` (read-only)
    Returns a timestamp, given as Unix time in milliseconds, representing the time at which the location was retrieved.

## Instance methods

_The `GeolocationPosition` interface doesn't inherit any methods._

- `GeolocationPosition.toJSON()`
    Returns a JSON-serializable plain object representing the `GeolocationPosition` object. Automatically called by `JSON.stringify()`.

## See also

- Using the Geolocation API
- `Geolocation`

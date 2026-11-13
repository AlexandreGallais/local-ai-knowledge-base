---
title: "GeolocationCoordinates: heading property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/geolocationcoordinates/heading/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# GeolocationCoordinates: heading property

The **`heading`** read-only property of the `GeolocationCoordinates` interface is a `double` representing the direction in which the device is traveling. This value, specified in degrees, indicates how far off from heading due north the device is. `0` degrees represents true north, and the direction is determined clockwise (which means that east is `90` degrees and west is `270` degrees). If `GeolocationCoordinates.speed` is `0` or the device is not able to provide heading information, `heading` is `null`.

## Value

A `double` representing the direction in which the device is traveling.

## See also

- Using the Geolocation API
- `GeolocationCoordinates`

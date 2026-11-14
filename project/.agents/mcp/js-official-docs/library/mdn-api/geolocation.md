---
title: "Geolocation"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/geolocation/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Geolocation

The **`Geolocation`** interface represents an object able to obtain the position of the device programmatically. It gives Web content access to the location of the device. This allows a website or app to offer customized results based on the user's location.

An object with this interface is obtained using the `navigator.geolocation` property implemented by the `Navigator` object.

> **Note:**
> For security reasons, when a web page tries to access location information, the user is notified and asked to grant permission. Be aware that each browser has its own policies and methods for requesting this permission.

## Instance properties

_The `Geolocation` interface neither implements, nor inherits any property._

## Instance methods

_The `Geolocation` interface doesn't inherit any method._

- `Geolocation.getCurrentPosition()`
    Determines the device's current location and gives back a `GeolocationPosition` object with the data.
- `Geolocation.watchPosition()`
    Returns a `long` value representing the newly established callback function to be invoked whenever the device location changes.
- `Geolocation.clearWatch()`
    Removes the particular handler previously installed using `watchPosition()`.

## See also

- Using geolocation

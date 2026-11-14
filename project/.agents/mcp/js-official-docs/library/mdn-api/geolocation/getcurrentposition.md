---
title: "Geolocation: getCurrentPosition() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/geolocation/getcurrentposition/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Geolocation: getCurrentPosition() method

The **`getCurrentPosition()`** method of the `Geolocation` interface is used to get the current position of the device.

Note that in addition to requiring a secure context this feature may be blocked by the `geolocation` `Permissions-Policy`, and also requires that explicit permission be granted by the user.
If required, the user will be prompted when this method is called.
The permission state can be queried using the `geolocation` user permission in the Permissions API.

## Syntax

```js
getCurrentPosition(success)
getCurrentPosition(success, error)
getCurrentPosition(success, error, options)
```

### Parameters

- `success`
    A callback function that takes a `GeolocationPosition` object as its
    sole input parameter.
- `error` (optional)
    An optional callback function that takes a `GeolocationPositionError`
    object as its sole input parameter.
- `options` (optional)
    An optional object including the following parameters:
    - `maximumAge` (optional)
        A positive `long` value indicating the maximum age in milliseconds of a possible cached position that is acceptable to return. If set to `0`, it means that the device cannot use a cached position and must attempt to retrieve the real current position. If set to `Infinity` the device must return a cached position regardless of its age. Default: `0`.
    - `timeout` (optional)
        A positive `long` value representing the maximum length of time (in milliseconds) the device is allowed to take in order to return a position. The default value is `Infinity`, meaning that `getCurrentPosition()` won't return until the position is available.
    - `enableHighAccuracy` (optional)
        A boolean value that indicates the application would like to receive the best possible results. If `true` and if the device is able to provide a more accurate position, it will do so. Note that this can result in slower response times or increased power consumption (with a GPS chip on a mobile device for example). On the other hand, if `false`, the device can take the liberty to save resources by responding more quickly and/or using less power. Default: `false`.

### Return value

None (`undefined`).

## Examples

```js
const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};

function success(pos) {
  const crd = pos.coords;

  console.log("Your current position is:");
  console.log(`Latitude: ${crd.latitude}`);
  console.log(`Longitude: ${crd.longitude}`);
  console.log(`More or less ${crd.accuracy} meters.`);
}

function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}

navigator.geolocation.getCurrentPosition(success, error, options);
```

## See also

- Using the Geolocation API
- `Navigator.geolocation`

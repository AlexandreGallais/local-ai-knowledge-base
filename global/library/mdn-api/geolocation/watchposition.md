---
title: "Geolocation: watchPosition() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/geolocation/watchposition/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Geolocation: watchPosition() method

The **`watchPosition()`** method of the `Geolocation` interface is used to register a handler function that will be called automatically each time the position of the device changes.
You can also, optionally, specify an error handling callback function.

Note that in addition to requiring a secure context this feature may be blocked by the `geolocation` `Permissions-Policy`, and also requires that explicit permission be granted by the user.
If required, the user will be prompted when this method is called.
The permission state can be queried using the `geolocation` user permission in the Permissions API.

## Syntax

```js
watchPosition(success)
watchPosition(success, error)
watchPosition(success, error, options)
```

### Parameters

- `success`
    A callback function that takes a `GeolocationPosition` object as an input parameter.
- `error` (optional)
    An optional callback function that takes a `GeolocationPositionError` object as an input parameter.
- `options` (optional)
    An optional object that provides configuration options for the location watch.
    See `Geolocation.getCurrentPosition()` for more details on possible options.

### Return value

An integer ID that identifies the registered handler.
The ID can be passed to the `Geolocation.clearWatch()` to unregister the handler.

## Examples

```js
let id;
let target;
let options;

function success(pos) {
  const crd = pos.coords;

  if (target.latitude === crd.latitude && target.longitude === crd.longitude) {
    console.log("Congratulations, you reached the target");
    navigator.geolocation.clearWatch(id);
  }
}

function error(err) {
  console.error(`ERROR(${err.code}): ${err.message}`);
}

target = {
  latitude: 0,
  longitude: 0,
};

options = {
  enableHighAccuracy: false,
  timeout: 5000,
  maximumAge: 0,
};

id = navigator.geolocation.watchPosition(success, error, options);
```

## See also

- Using the Geolocation API
- The interface it belongs to, `Geolocation`, and the way to access it —
  `Navigator.geolocation`.
- The opposite operation: `Geolocation.clearWatch()`
- A similar method: `Geolocation.getCurrentPosition()`

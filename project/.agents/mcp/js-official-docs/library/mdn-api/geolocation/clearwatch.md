---
title: "Geolocation: clearWatch() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/geolocation/clearwatch/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Geolocation: clearWatch() method

The **`clearWatch()`** method of the `Geolocation` interface is used to unregister location/error monitoring handlers previously installed using `Geolocation.watchPosition()`.

## Syntax

```js
clearWatch(id)
```

### Parameters

- `id`
    The ID number returned by the `Geolocation.watchPosition()` method when
    installing the handler you wish to remove.

### Return value

None (`undefined`).

## Examples

```js
let id;
let target;
let options;

function success(pos) {
  const crd = pos.coords;

  if (target.latitude === crd.latitude && target.longitude === crd.longitude) {
    console.log("Congratulations, you've reached the target!");
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

- Using geolocation
- `Geolocation`
- `Geolocation.watchPosition()`
- `Geolocation.getCurrentPosition()`

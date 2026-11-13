---
title: "DeviceOrientationEvent: requestPermission() static method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/deviceorientationevent/requestpermission_static/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# DeviceOrientationEvent: requestPermission() static method

The **`requestPermission()`** static method of the `DeviceOrientationEvent` interface requests the user's permission to access device orientation data from the accelerometer and gyroscope sensors. It can also request permission to access magnetometer data when absolute orientation is needed. This method requires transient activation, meaning that it must be triggered by a UI event such as a button click.

## Syntax

```js
DeviceOrientationEvent.requestPermission()
DeviceOrientationEvent.requestPermission(absolute)
```

### Parameters

- `absolute` (optional)
    A boolean indicating whether absolute orientation data is needed. When `true`, the permission request also includes the magnetometer sensor. Defaults to `false`.

### Return value

A `Promise` that resolves with a string which is either `"granted"` or `"denied"`.

### Exceptions

The returned promise rejects with the following exceptions:

- `NotAllowedError` `DOMException`
    The permission state is `"prompt"` and the calling function does not have transient activation.

## Security

Transient user activation is required. The user has to interact with the page or a UI element in order for this feature to work.

## Examples

### Requesting device orientation permission on click

```js
document.querySelector("button").addEventListener("click", async () => {
  if (typeof DeviceOrientationEvent.requestPermission !== "function") {
    // The feature is not available, or does not need permission.
    return;
  }

  const permission = await DeviceOrientationEvent.requestPermission();
  if (permission === "granted") {
    window.addEventListener("deviceorientation", (event) => {
      console.log(`Alpha: ${event.alpha}`);
      console.log(`Beta: ${event.beta}`);
      console.log(`Gamma: ${event.gamma}`);
    });
  }
});
```

### Requesting absolute orientation permission

When absolute orientation data is needed (e.g., for compass-based applications), pass `true` as the `absolute` parameter. This additionally requests access to the magnetometer.

```js
document.querySelector("button").addEventListener("click", async () => {
  if (typeof DeviceOrientationEvent.requestPermission !== "function") {
    return;
  }

  const permission = await DeviceOrientationEvent.requestPermission(true);
  if (permission === "granted") {
    window.addEventListener("deviceorientationabsolute", (event) => {
      console.log(`Absolute alpha: ${event.alpha}`);
    });
  }
});
```

## See also

- `DeviceOrientationEvent`
- `DeviceMotionEvent.requestPermission()`
- `deviceorientation` event
- `deviceorientationabsolute` event
- `Detecting device orientation`

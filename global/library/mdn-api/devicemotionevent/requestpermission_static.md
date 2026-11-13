---
title: "DeviceMotionEvent: requestPermission() static method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/devicemotionevent/requestpermission_static/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# DeviceMotionEvent: requestPermission() static method

The **`requestPermission()`** static method of the `DeviceMotionEvent` interface requests the user's permission to access device motion data from the accelerometer and gyroscope sensors. This method requires transient activation, meaning that it must be triggered by a UI event such as a button click.

## Syntax

```js
DeviceMotionEvent.requestPermission()
```

### Parameters

None.

### Return value

A `Promise` that resolves with a string which is either `"granted"` or `"denied"`.

### Exceptions

The returned promise rejects with the following exceptions:

- `NotAllowedError` `DOMException`
    The permission state is `"prompt"` and the calling function does not have transient activation.

## Security

Transient user activation is required. The user has to interact with the page or a UI element in order for this feature to work.

## Examples

### Requesting device motion permission on click

```js
document.querySelector("button").addEventListener("click", async () => {
  if (typeof DeviceMotionEvent.requestPermission !== "function") {
    // The feature is not available, or does not need permission.
    return;
  }

  const permission = await DeviceMotionEvent.requestPermission();
  if (permission === "granted") {
    window.addEventListener("devicemotion", (event) => {
      console.log(`Acceleration X: ${event.acceleration.x}`);
      console.log(`Acceleration Y: ${event.acceleration.y}`);
      console.log(`Acceleration Z: ${event.acceleration.z}`);
    });
  }
});
```

## See also

- `DeviceMotionEvent`
- `DeviceOrientationEvent.requestPermission()`
- `devicemotion` event
- `Detecting device orientation`

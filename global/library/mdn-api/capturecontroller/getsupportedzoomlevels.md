---
title: "CaptureController: getSupportedZoomLevels() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/capturecontroller/getsupportedzoomlevels/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CaptureController: getSupportedZoomLevels() method

The `CaptureController` interface's **`getSupportedZoomLevels()`** method returns the different zoom levels that the captured display surface supports.

## Syntax

```js
getSupportedZoomLevels()
```

### Parameters

None.

### Return value

An array of numbers representing the different zoom levels that the captured display surface supports.

### Exceptions

- `InvalidStateError` `DOMException`
    The capturing `MediaStream` returned by the originating `MediaDevices.getDisplayMedia()` call is no longer capturing, for example because the associated `MediaStreamTrack` objects have had `stop()` called on them.
- `NotSupportedError` `DOMException`
    The surface type being captured is not a browser tab.

## Examples

### Basic `getSupportedZoomLevels()` usage

In our live demo, shown in Using the Captured Surface Control API, we grab the supported zoom levels of the captured display surface by running `getSupportedZoomLevels()`, storing the resulting array in a variable called `zoomLevels`:

```js
const zoomLevels = controller.getSupportedZoomLevels();
```

This is later used in a function called `updateZoomButtonState()`. The problem this solves is that, if you try to zoom out below the minimum supported zoom level, or zoom in above the maximum supported zoom level, `decreaseZoomLevel()`/`increaseZoomLevel()` will throw an `InvalidStateError` `DOMException`.

> **Note:**
> It is generally a best practice to call `decreaseZoomLevel()` and `increaseZoomLevel()` from within a `try...catch` block because the zoom level could be changed asynchronously by an entity other than the application, which might lead to an error being thrown. For example, the user might directly interact with the captured surface to zoom in or out.

The `updateZoomButtonState()` function avoids this issue by first making sure both the "Zoom out" and "Zoom in" buttons are enabled. It then does two checks:

- If the current zoom level is equal to the minimum supported zoom level (stored in the first value of the `zoomLevels` array), we disable the "Zoom out" button so the user can't zoom out any further.
- If the current zoom level is equal to the maximum supported zoom level (stored in the last value of the `zoomLevels` array), we disable the "Zoom in" button so the user can't zoom in any further.

```js
function updateZoomButtonState() {
  decBtn.disabled = false;
  incBtn.disabled = false;
  if (controller.zoomLevel === zoomLevels[0]) {
    decBtn.disabled = true;
  } else if (controller.zoomLevel === zoomLevels[zoomLevels.length - 1]) {
    incBtn.disabled = true;
  }
}
```

## See also

- Screen Capture API
- `MediaDevices.getDisplayMedia()`
- Using the Captured Surface Control API

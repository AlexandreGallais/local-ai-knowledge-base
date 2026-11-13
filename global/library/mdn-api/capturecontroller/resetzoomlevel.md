---
title: "CaptureController: resetZoomLevel() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/capturecontroller/resetzoomlevel/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CaptureController: resetZoomLevel() method

The `CaptureController` interface's **`resetZoomLevel()`** method resets the captured display surface's zoom to its initial level, which is `100`.

The `resetZoomLevel()` method must be invoked via transient activation. In addition, the user is asked for permission to share tabs when screen capture is first attempted; if the user denies permission the zoom level cannot be changed even with transient activation.

## Syntax

```js
resetZoomLevel()
```

### Parameters

None.

### Return value

A `Promise` that fulfills with `undefined`.

### Exceptions

- `InvalidStateError` `DOMException`
    An attempt is made to invoke `resetZoomLevel()` without transient activation.
- `NotAllowedError` `DOMException`
    Thrown when:
    - The page's `captured-surface-control` Permissions Policy does not permit the page to use the Captured Surface Control API.
    - Permission to capture the display surface is explicitly denied by the user.

## Examples

### Basic `resetZoomLevel()` usage

The following snippet adds an event listener to a button so that when it is clicked, the `resetZoom()` function is called. This in turn calls the `resetZoomLevel()` method, resetting the captured surface's zoom level to `100`.

```js
// Create controller and start capture
const controller = new CaptureController();
videoElem.srcObject = await navigator.mediaDevices.getDisplayMedia({
  controller,
});

// ...

resetBtn.addEventListener("click", resetZoom);

async function resetZoom() {
  await controller.resetZoomLevel();
}
```

See Using the Captured Surface Control API for a full working example.

## See also

- Screen Capture API
- `MediaDevices.getDisplayMedia()`
- Using the Captured Surface Control API

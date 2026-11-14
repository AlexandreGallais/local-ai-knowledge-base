---
title: "CaptureController: increaseZoomLevel() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/capturecontroller/increasezoomlevel/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CaptureController: increaseZoomLevel() method

The `CaptureController` interface's **`increaseZoomLevel()`** method increases the captured display surface's zoom level by one increment.

The `increaseZoomLevel()` method must be invoked via transient activation. In addition, the user is asked for permission to share tabs when screen capture is first attempted; if the user denies permission the zoom level cannot be changed even with transient activation.

## Syntax

```js
increaseZoomLevel()
```

### Parameters

None.

### Return value

A `Promise` that fulfills with `undefined`.

### Exceptions

- `InvalidStateError` `DOMException`
    Thrown when:
    - The captured display surface is already at its maximum supported zoom level.
    - An attempt is made to invoke `increaseZoomLevel()` without transient activation.
- `NotAllowedError` `DOMException`
    Thrown when:
    - The page's `captured-surface-control` Permissions Policy does not permit the page to use the Captured Surface Control API.
    - Permission to capture the display surface is explicitly denied by the user.

## Examples

### Basic `increaseZoomLevel()` usage

The following snippet adds an event listener to a button so that when it is clicked, the `increaseZoom()` function is called. This in turn calls the `increaseZoomLevel()` method, zooming the captured surface in.

```js
// Create controller and start capture
const controller = new CaptureController();
videoElem.srcObject = await navigator.mediaDevices.getDisplayMedia({
  controller,
});

// ...

incBtn.addEventListener("click", increaseZoom);

async function increaseZoom() {
  try {
    await controller.increaseZoomLevel();
  } catch (e) {
    console.log(e);
  }
}
```

It is generally a best practice to call `increaseZoomLevel()` from within a `try...catch` block because the zoom level could be changed asynchronously by an entity other than the application, which might lead to an error being thrown. For example, the user might directly interact with the captured surface to zoom in or out.

See Using the Captured Surface Control API for a full working example.

## See also

- Screen Capture API
- `MediaDevices.getDisplayMedia()`
- Using the Captured Surface Control API

---
title: "CaptureController: decreaseZoomLevel() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/capturecontroller/decreasezoomlevel/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CaptureController: decreaseZoomLevel() method

The `CaptureController` interface's **`decreaseZoomLevel()`** method decreases the captured display surface's zoom level by one increment.

The `decreaseZoomLevel()` method must be invoked via transient activation. In addition, the user is asked for permission to share tabs when screen capture is first attempted; if the user denies permission the zoom level cannot be changed even with transient activation.

## Syntax

```js
decreaseZoomLevel()
```

### Parameters

None.

### Return value

A `Promise` that fulfills with `undefined`.

### Exceptions

- `InvalidStateError` `DOMException`
    Thrown when:
    - The captured display surface is already at its minimum supported zoom level.
    - An attempt is made to invoke `decreaseZoomLevel()` without transient activation.
- `NotAllowedError` `DOMException`
    Thrown when:
    - The page's `captured-surface-control` Permissions Policy does not permit the page to use the Captured Surface Control API.
    - Permission to capture the display surface is explicitly denied by the user.

## Examples

### Basic `decreaseZoomLevel()` usage

The following snippet adds an event listener to a button so that when it is clicked, the `decreaseZoom()` function is called. This in turn calls the `decreaseZoomLevel()` method, zooming the captured surface out.

```js
// Create controller and start capture
const controller = new CaptureController();
videoElem.srcObject = await navigator.mediaDevices.getDisplayMedia({
  controller,
});

// ...

decBtn.addEventListener("click", decreaseZoom);

async function decreaseZoom() {
  try {
    await controller.decreaseZoomLevel();
  } catch (e) {
    console.log(e);
  }
}
```

It is generally a best practice to call `decreaseZoomLevel()` from within a `try...catch` block because the zoom level could be changed asynchronously by an entity other than the application, which might lead to an error being thrown. For example, the user might directly interact with the captured surface to zoom in or out.

See Using the Captured Surface Control API for a full working example.

## See also

- Screen Capture API
- `MediaDevices.getDisplayMedia()`
- Using the Captured Surface Control API

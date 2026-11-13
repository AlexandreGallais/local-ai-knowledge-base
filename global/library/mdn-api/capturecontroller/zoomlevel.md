---
title: "CaptureController: zoomLevel property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/capturecontroller/zoomlevel/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CaptureController: zoomLevel property

The **`zoomLevel`** read-only property of the `CaptureController` interface returns the captured display surface's current zoom level.

## Value

A number representing the current zoom level of the captured display surface.

## Examples

### Basic `zoomLevel` usage

In our live demo, shown in Using the Captured Surface Control API, we use the `zoomLevel` property inside an event handler function for the controller's `zoomlevelchange` event. When the event fires, the updated `zoomLevel` is written to an `<output>` element.

```js
// Create controller and start capture
const controller = new CaptureController();
videoElem.srcObject = await navigator.mediaDevices.getDisplayMedia({
  controller,
});

// ...

controller.addEventListener(
  "zoomlevelchange",
  () => (outputElem.textContent = `${controller.zoomLevel}%`),
);
```

See Using the Captured Surface Control API for a full working example.

## See also

- Screen Capture API
- `MediaDevices.getDisplayMedia()`
- Using the Captured Surface Control API

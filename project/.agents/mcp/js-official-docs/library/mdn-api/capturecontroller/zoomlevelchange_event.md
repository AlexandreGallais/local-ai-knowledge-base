---
title: "CaptureController: zoomlevelchange event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/capturecontroller/zoomlevelchange_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CaptureController: zoomlevelchange event

The **`zoomlevelchange`** event of the `CaptureController` interface is fired when the captured display surface's zoom level changes.

Specifically, this occurs when:

- The `increaseZoomLevel()`, `decreaseZoomLevel()`, or `resetZoomLevel()` methods are called on a controller that is actively controlling a captured display surface.
- The user changes the zoom level in the captured surface.
- The user changes the captured display surface to another one that has a different zoom level.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("zoomlevelchange", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
onzoomlevelchange = (event) => { }
```

## Event type

A generic `Event`.

## Examples

### Basic `zoomlevelchange` usage

When a captured display surface's zoom level changes, a `zoomlevelchange` event fires on the controller, which can be used to run an event handler such as the following. This writes the updated zoom level to an output element of some kind.

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

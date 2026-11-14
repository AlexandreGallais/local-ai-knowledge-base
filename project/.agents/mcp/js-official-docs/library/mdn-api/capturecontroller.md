---
title: "CaptureController"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/capturecontroller/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CaptureController

The **`CaptureController`** interface provides methods that can be used to further manipulate a captured display surface (captured via `MediaDevices.getDisplayMedia()`)

A `CaptureController` object is associated with a captured display surface by passing it into a `getDisplayMedia()` call as the value of the options object's `controller` property.

## Constructor

- `CaptureController()` (experimental)
    Creates a new `CaptureController` object instance.

## Instance properties

- `zoomLevel` (read-only) (experimental)
    The captured display surface's current zoom level.

## Instance methods

- `decreaseZoomLevel()` (experimental)
    Decreases the captured display surface's zoom level by one increment.
- `forwardWheel()` (experimental)
    Starts forwarding `wheel` events fired on the referenced element to the viewport of an associated captured display surface.
- `getSupportedZoomLevels()` (experimental)
    Returns the different zoom levels supported by the captured display surface.
- `increaseZoomLevel()` (experimental)
    Increases the captured display surface's zoom level by one increment.
- `resetZoomLevel()` (experimental)
    Resets the captured display surface's zoom to its initial level, which is `100`.
- `setFocusBehavior()` (experimental)
    Controls whether the captured tab or window will be focused or whether the focus will remain with the tab containing the capturing app.

## Events

- `zoomlevelchange` (experimental)
    Fires when the captured display surface's zoom level changes.

## Examples

```js
// Create a new CaptureController instance
const controller = new CaptureController();

// Prompt the user to share a tab, window, or screen.
const stream = await navigator.mediaDevices.getDisplayMedia({ controller });

// Query the displaySurface value of the captured video track
const [track] = stream.getVideoTracks();
const displaySurface = track.getSettings().displaySurface;

if (displaySurface === "browser") {
  // Focus the captured tab.
  controller.setFocusBehavior("focus-captured-surface");
} else if (displaySurface === "window") {
  // Do not move focus to the captured window.
  // Keep the capturing page focused.
  controller.setFocusBehavior("no-focus-change");
}
```

## See also

- Screen Capture API
- `MediaDevices.getDisplayMedia()`
- Using the Element Capture and Region Capture APIs
- Using the Captured Surface Control API
- Better screen sharing with Conditional Focus

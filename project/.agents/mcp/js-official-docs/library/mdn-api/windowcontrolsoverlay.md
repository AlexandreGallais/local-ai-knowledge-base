---
title: "WindowControlsOverlay"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/windowcontrolsoverlay/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WindowControlsOverlay

The **`WindowControlsOverlay`** interface of the Window Controls Overlay API exposes information about the geometry
of the title bar area in desktop Progressive Web Apps, and an event to know whenever it changes. This interface is accessible from `Navigator.windowControlsOverlay`.

## Instance properties

- `WindowControlsOverlay.visible` (read-only) (experimental)
    A Boolean that indicates whether the window controls overlay is visible or not.

## Instance methods

- `WindowControlsOverlay.getTitlebarAreaRect()` (experimental)
    Returns the size and position of the title bar.

## Events

Listen to these events using `EventTarget.addEventListener()` or by assigning an event listener to the relevant `oneventname` property of this interface.

- `geometrychange` (experimental)
    Fired when the geometry of the title bar area changes.

## Examples

```js
if ("windowControlsOverlay" in navigator) {
  navigator.windowControlsOverlay.addEventListener(
    "geometrychange",
    (event) => {
      if (event.visible) {
        const rect = event.titlebarAreaRect;
        // Do something with the coordinates of the title bar area.
      }
    },
  );
}
```

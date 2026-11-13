---
title: "WindowControlsOverlayGeometryChangeEvent"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/windowcontrolsoverlaygeometrychangeevent/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WindowControlsOverlayGeometryChangeEvent

The **`WindowControlsOverlayGeometryChangeEvent`** interface of the Window Controls Overlay API is passed to `geometrychange` when the size or visibility of a desktop Progress Web App's title bar region changes.

## Constructor

- `WindowControlsOverlayGeometryChangeEvent()` (experimental)
    Creates a `WindowControlsOverlayGeometryChangeEvent` event with the given parameters.

## Instance properties

_Also inherits properties from its parent `Event`_.

- `WindowControlsOverlayGeometryChangeEvent.titlebarAreaRect` (read-only) (experimental)
    A `DOMRect` representing the position and size of the title bar region.
- `WindowControlsOverlayGeometryChangeEvent.visible` (read-only) (experimental)
    A Boolean that indicates whether the window controls overlay is visible or not.

## Examples

The following example shows how to use a `WindowControlsOverlayGeometryChangeEvent` instance by adding an
event handler on the `Navigator.windowControlsOverlay` property, to listen to geometry changes of a PWA's title bar region.

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

## See also

- The Window Controls Overlay API.

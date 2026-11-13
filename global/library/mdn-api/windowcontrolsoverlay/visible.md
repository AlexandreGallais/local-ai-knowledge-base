---
title: "WindowControlsOverlay: visible property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/windowcontrolsoverlay/visible/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WindowControlsOverlay: visible property

The **`visible`** read-only property of the `WindowControlsOverlay` interface returns a Boolean that indicates whether the window controls overlay is visible or not.

The window controls overlay is not be visible if:

- The Web App Manifest's `display_override` member is not set to `window-controls-overlay`.
- Or, if the user has opted-out of the feature.

## Value

A boolean.

## Examples

```js
if (navigator.windowControlsOverlay.visible) {
  // Execute code if the controls overlay is visible.
} else {
  // Do something else when it isn't visible.
}
```

## See also

- The `WindowControlsOverlay` interface it belongs to.

---
title: "Navigator: windowControlsOverlay property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/navigator/windowcontrolsoverlay/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Navigator: windowControlsOverlay property

The **`windowControlsOverlay`** read-only property of the `Navigator`
interface returns the `WindowControlsOverlay` interface, which exposes
information about the title bar geometry in desktop Progressive Web Apps that use the Window Controls Overlay API.

Progressive Web Apps installed on desktop Operating Systems can opt-in to the
Window Controls Overlay feature by using the `window-controls-overlay` value in the
`display_override` web app manifest member.

Doing so hides the default window title bar and gives the app access to the full area
of the app window.

## Value

The `WindowControlsOverlay` interface.

## Examples

```js
if ("windowControlsOverlay" in navigator) {
  const rect = navigator.windowControlsOverlay.getTitlebarAreaRect();
  // Do something with the title bar area rectangle.
} else {
  // The Window Controls Overlay feature is not available.
}
```

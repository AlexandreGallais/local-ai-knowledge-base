---
title: "Screen: height property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/screen/height/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Screen: height property

The **`Screen.height`** read-only property returns the height
of the screen in CSS pixels.

## Value

A number.

## Examples

```js
if (window.screen.availHeight !== window.screen.height) {
  // Something is occupying some screen real estate!
}
```

## Notes

Note that not all of the height given by this property may be available to the window
itself. Widgets such as taskbars or other special application windows that integrate
with the OS (e.g., the Spinner player minimized to act like an additional toolbar on
windows) may reduce the amount of space available to browser windows and other
applications, there is a difference in `window.screen.height` and
`window.screen.availHeight`.

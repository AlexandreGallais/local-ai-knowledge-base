---
title: "Screen: colorDepth property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/screen/colordepth/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Screen: colorDepth property

The **`Screen.colorDepth`** read-only property returns the
color depth of the screen. Per the CSSOM, some implementations return `24`
for compatibility reasons. See the browser compatibility section for those that don't.

## Value

A number.

## Examples

```js
// Check the color depth of the screen
if (window.screen.colorDepth < 8) {
  // Use low-color version of page
} else {
  // Use regular, colorful page
}
```

## See also

- `Screen.pixelDepth`

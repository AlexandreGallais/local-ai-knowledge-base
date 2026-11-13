---
title: "Screen: pixelDepth property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/screen/pixeldepth/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Screen: pixelDepth property

The **`pixelDepth`** read-only property of the `Screen` interface returns the bit depth of the screen. Per the CSSOM, some implementations return `24` for compatibility reasons. See the browser compatibility section for those that don't.

## Value

A number.

## Examples

```js
// if there is not adequate bit depth
// choose a simpler color
document.style.color = window.screen.pixelDepth > 8 ? "#FAEBD7" : "white";
```

## See also

- `Screen.colorDepth`

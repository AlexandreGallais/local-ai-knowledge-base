---
title: "CSS: paintWorklet static property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/css/paintworklet_static/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSS: paintWorklet static property

The static, read-only **`paintWorklet`** property of the `CSS` interface provides access to the
paint worklet, which programmatically generates an image where a CSS
property expects a file.

## Value

The associated `Worklet` object.

## Examples

The following example demonstrates loading a paint worklet from its js
file and does so by feature detection.

```js
if ("paintWorklet" in CSS) {
  CSS.paintWorklet.addModule("checkerboard.js");
}
```

## See also

- CSS Painting API
- Houdini APIs

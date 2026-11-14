---
title: "Window: length property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/window/length/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Window: length property

The **`length`** read-only property of the `Window` interface returns the number of frames (either `<frame>` or `` elements) in the window.

## Value

A number.

## Examples

```js
if (window.length) {
  // this is a document with subframes
}
```

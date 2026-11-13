---
title: "Window: frames property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/window/frames/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Window: frames property

The **`frames`** read-only property of the `Window` interface returns the window itself, which is an array-like object, listing the direct sub-frames of the current window.

## Value

A list of frame objects. It is similar to an
array in that it has a `length` property and its items can be accessed
using the `[i]` notation.

- `frames === window` evaluates to true.
- Each item in the `window.frames` pseudo-array represents the `Window`
  object corresponding to the given `<frame>`'s or
  ``'s content, not the `frame` or `iframe` DOM element (i.e.,
  `window.frames[0]` is the same thing as
  `document.getElementsByTagName("iframe")[0].contentWindow`).
- For more details about the returned value, refer to this thread on mozilla.dev.platform.

## Examples

```js
const frames = window.frames; // or const frames = window.parent.frames;
for (let i = 0; i < frames.length; i++) {
  // do something with each subframe as frames[i]
  frames[i].document.body.style.background = "red";
}
```

---
title: "Window: frameElement property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/window/frameelement/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Window: frameElement property

The **`frameElement`** read-only property of the `Window` interface returns the element (such as `` or `<object>`) in which the window is embedded.

> **Note:**
> Despite this property's name, it works for documents embedded
> within any embedding point, including `<object>`,
> ``, or ``.

## Value

The element which the window is embedded into. If the window isn't embedded into
another document, or if the document into which it's embedded has a different
origin, the value is `null` instead.

## Examples

```js
const frameEl = window.frameElement;
// If we're embedded, change the containing element's URL to 'https://mozilla.org/'
if (frameEl) {
  frameEl.src = "https://mozilla.org/";
}
```

## See also

- `window.frames` returns an array-like object, listing the direct
  sub-frames of the current window.
- `window.parent` returns the parent window, which is the window
  containing the `frameElement` of the child window.

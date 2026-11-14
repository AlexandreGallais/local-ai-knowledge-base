---
title: "Window: parent property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/window/parent/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Window: parent property

The **`parent`** read-only property of the `Window` interface is a reference to the parent of the current window or subframe.

If a window does not have a parent, its `parent` property is a reference to
itself.

When a window is loaded in an ``, `<object>`, or
`<frame>`, its parent is the window with the element embedding the
window.

## Value

A `Window` or `` object.

## Examples

```js
if (window.parent !== window.top) {
  // We're deeper than one down
}
```

## See also

- `window.frameElement` returns the specific element (such as
  ``) the `window` is embedded into.
- `window.top` returns a reference to the top-level window.

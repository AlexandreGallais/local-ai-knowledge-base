---
title: "Window: top property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/window/top/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Window: top property

The **`top`** read-only property of the `Window` interface returns a reference to the topmost window in the window hierarchy.

## Value

The reference to the topmost window.

## Notes

Where the `window.parent` property returns the immediate parent of the
current window, `window.top` returns the topmost window in the hierarchy of
window objects.

This property is especially useful when you are dealing with a window that is in a
subframe of a parent or parents, and you want to get to the top-level frameset.

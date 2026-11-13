---
title: "BarProp: visible property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/barprop/visible/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# BarProp: visible property

The **`visible`** read-only property of the `BarProp` interface returns `true` if the user interface element it represents is visible.

## Value

A `Boolean`, which is true if the top-level window is opened by `window.open` with the `popup` feature enabled.

> **Note:**
> Historically this represented whether the interface element used is visible
> or not. But for privacy reasons, this no longer represents the actual visibility of each
> interface element.

## Examples

The following example prints `true` to the console if the window is not a popup.

```js
console.log(window.locationbar.visible);
```

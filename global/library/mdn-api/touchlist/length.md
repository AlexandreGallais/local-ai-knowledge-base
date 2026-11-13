---
title: "TouchList: length property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/touchlist/length/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# TouchList: length property

The **`length`** read-only property indicates the number of
items (touch points) in a given `TouchList`.

## Value

The number of touch points in `touchList`.

## Examples

This code example illustrates the use of the `TouchList` interface's
`item` method and the
`length` property.

```js
const target = document.getElementById("target");

target.addEventListener("touchstart", (ev) => {
  // If this touchstart event started on element target,
  // set touch to the first item in the targetTouches list;
  // otherwise set touch to the first item in the touches list
  const touch =
    ev.targetTouches.length >= 1
      ? ev.targetTouches.item(0)
      : ev.touches.item(0);
});
```

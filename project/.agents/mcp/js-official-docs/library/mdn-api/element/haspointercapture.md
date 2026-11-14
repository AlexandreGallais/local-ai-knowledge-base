---
title: "Element: hasPointerCapture() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/element/haspointercapture/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Element: hasPointerCapture() method

The **`hasPointerCapture()`** method of the
`Element` interface checks whether the element on which it is invoked has
pointer capture for the pointer identified by the given pointer ID.

## Syntax

```js
hasPointerCapture(pointerId)
```

### Parameters

- `pointerId`
    The `pointerId` of a
    `PointerEvent` object.

### Return value

A boolean value — `true` if the element does have pointer capture for the pointer identified by the given pointer ID, `false` if it doesn't.

## Examples

```html
<div id="target">Touch this element with a pointer.</div>
```

```js
const el = document.getElementById("target");
el.addEventListener("pointerdown", (ev) => {
  // Element 'target' will receive/capture further events
  el.setPointerCapture(ev.pointerId);

  // …

  // Check whether element still has pointer capture
  const pointerCap = el.hasPointerCapture(ev.pointerId);
  if (pointerCap) {
    // We've still got pointer capture
  } else {
    // oops, we've lost pointer capture!
  }
});
```

## See also

- `Element.setPointerCapture()`
- `Element.releasePointerCapture()`
- `Pointer Events`

---
title: "Element: releasePointerCapture() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/element/releasepointercapture/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Element: releasePointerCapture() method

The **`releasePointerCapture()`** method of the
`Element` interface releases (stops) _pointer capture_ that was
previously set for a specific (`PointerEvent`) _pointer_.

## Syntax

```js
releasePointerCapture(pointerId)
```

### Parameters

- `pointerId`
    The `pointerId` of a
    `PointerEvent` object.

### Return value

None (`undefined`).

### Exceptions

- `NotFoundError` `DOMException`
    Thrown if `pointerId` does not match any active pointer.

## Examples

This example sets pointer capture on a `` when you press down on
it. This lets you slide the element horizontally, even when your pointer moves outside of
its boundaries.

### HTML

```html
<div id="slider">SLIDE ME</div>
```

### CSS

```css
div {
  width: 140px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ffbbee;
}
```

### JavaScript

```js
const slider = document.getElementById("slider");

function beginSliding(e) {
  slider.onpointermove = slide;
  slider.setPointerCapture(e.pointerId);
}

function stopSliding(e) {
  slider.onpointermove = null;
  slider.releasePointerCapture(e.pointerId);
}

function slide(e) {
  slider.style.transform = `translate(${e.clientX - 70}px)`;
}

slider.onpointerdown = beginSliding;
slider.onpointerup = stopSliding;
```

## See also

- `Element.hasPointerCapture()`
- `Element.setPointerCapture()`
- Pointer events

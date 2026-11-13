---
title: "Element: pointerenter event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/element/pointerenter_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Element: pointerenter event

The `pointerenter` event fires when a pointing device is moved into the hit test boundaries of an element or one of its descendants, including as a result of a `pointerdown` event from a device that does not support hover (see `pointerdown`). Otherwise, `pointerenter` works the same as `mouseenter`, and are dispatched at the same time. They are also dispatched at the same time as `mouseover` and `pointerover` events, if appropriate.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("pointerenter", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
onpointerenter = (event) => { }
```

## Event type

A `PointerEvent`. Inherits from `Event`.

## Examples

Using `addEventListener()`:

```js
const para = document.querySelector("p");

para.addEventListener("pointerenter", (event) => {
  console.log("Pointer entered element");
});
```

Using the `onpointerenter` event handler property (but note that this replaces other event listeners added using `onpointerenter`, if any):

```js
const para = document.querySelector("p");

para.onpointerenter = (event) => {
  console.log("Pointer entered element");
};
```

## See also

- Related events
  - `gotpointercapture`
  - `lostpointercapture`
  - `pointerover`
  - `pointerdown`
  - `pointermove`
  - `pointerup`
  - `pointercancel`
  - `pointerout`
  - `pointerleave`
  - `pointerrawupdate`
  - `mouseenter`

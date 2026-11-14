---
title: "Element: pointerover event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/element/pointerover_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Element: pointerover event

The `pointerover` event is fired when a pointing device is moved into an element's hit test boundaries.

`pointerover` events have the same problems as `mouseover`. If the target element has child elements, `pointerout` and `pointerover` events fire as the pointer moves over the boundaries of these elements too, not just the target element itself. Usually, `pointerenter` and `pointerleave` events' behavior is more sensible, because they are not affected by moving into child elements.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("pointerover", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
onpointerover = (event) => { }
```

## Event type

A `PointerEvent`. Inherits from `Event`.

## Examples

Using `addEventListener()`:

```js
const para = document.querySelector("p");

para.addEventListener("pointerover", (event) => {
  console.log("Pointer moved in");
});
```

Using the `onpointerover` event handler property (but note that this replaces other event listeners added using `onpointerover`, if any):

```js
const para = document.querySelector("p");

para.onpointerover = (event) => {
  console.log("Pointer moved in");
};
```

## See also

- Related events
  - `gotpointercapture`
  - `lostpointercapture`
  - `pointerenter`
  - `pointerdown`
  - `pointermove`
  - `pointerup`
  - `pointercancel`
  - `pointerout`
  - `pointerleave`
  - `pointerrawupdate`
  - `mouseover`

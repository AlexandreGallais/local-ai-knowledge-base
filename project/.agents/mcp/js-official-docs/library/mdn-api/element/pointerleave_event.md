---
title: "Element: pointerleave event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/element/pointerleave_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Element: pointerleave event

The `pointerleave` event is fired when a pointing device is moved out of the hit test boundaries of an element. For pen devices, this event is fired when the stylus leaves the hover range detectable by the digitizer. Otherwise, `pointerleave` works the same as `mouseleave`, and are dispatched at the same time. They are also dispatched at the same time as `mouseout` and `pointerout` events, if appropriate.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("pointerleave", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
onpointerleave = (event) => { }
```

## Event type

A `PointerEvent`. Inherits from `Event`.

## Examples

Using `addEventListener()`:

```js
const para = document.querySelector("p");

para.addEventListener("pointerleave", (event) => {
  console.log("Pointer left element");
});
```

Using the `onpointerleave` event handler property (but note that this replaces other event listeners added using `onpointerleave`, if any):

```js
const para = document.querySelector("p");

para.onpointerleave = (event) => {
  console.log("Pointer left element");
};
```

## See also

- Related events
  - `gotpointercapture`
  - `lostpointercapture`
  - `pointerover`
  - `pointerenter`
  - `pointerdown`
  - `pointermove`
  - `pointerup`
  - `pointercancel`
  - `pointerout`
  - `pointerrawupdate`
  - `mouseleave`

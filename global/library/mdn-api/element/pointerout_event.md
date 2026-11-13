---
title: "Element: pointerout event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/element/pointerout_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Element: pointerout event

The `pointerout` event is fired for several reasons including: pointing device is moved out of the _hit test_ boundaries of an element; firing the `pointerup` event for a device that does not support hover (see `pointerup`); after firing the `pointercancel` event (see `pointercancel`); when a pen stylus leaves the hover range detectable by the digitizer.

`pointerout` events have the same problems as `mouseout`. If the target element has child elements, `pointerout` and `pointerover` events fire as the pointer moves over the boundaries of these elements too, not just the target element itself. Usually, `pointerenter` and `pointerleave` events' behavior is more sensible, because they are not affected by moving into child elements.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("pointerout", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
onpointerout = (event) => { }
```

## Event type

A `PointerEvent`. Inherits from `Event`.

## Examples

Using `addEventListener()`:

```js
const para = document.querySelector("p");

para.addEventListener("pointerout", (event) => {
  console.log("Pointer moved out");
});
```

Using the `onpointerout` event handler property (but note that this replaces other event listeners added using `onpointerout`, if any):

```js
const para = document.querySelector("p");

para.onpointerout = (event) => {
  console.log("Pointer moved out");
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
  - `pointerleave`
  - `pointerrawupdate`
  - `mouseout`

---
title: "Element: pointerup event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/element/pointerup_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Element: pointerup event

The `pointerup` event is fired when a pointer is no longer active. Remember that it is possible to get a `pointercancel` event instead.

This behavior is different from `mouseup` events. When using a physical mouse, `mouseup` events fire whenever any button on a mouse is released. `pointerup` events fire only upon the last button release; previous button releases, while other buttons are held down, don't fire `pointerup` events.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("pointerup", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
onpointerup = (event) => { }
```

## Event type

A `PointerEvent`. Inherits from `Event`.

## Examples

Using `addEventListener()`:

```js
const para = document.querySelector("p");

para.addEventListener("pointerup", (event) => {
  console.log("Pointer up");
});
```

Using the `onpointerup` event handler property (but note that this replaces other event listeners added using `onpointerup`, if any):

```js
const para = document.querySelector("p");

para.onpointerup = (event) => {
  console.log("Pointer up");
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
  - `pointercancel`
  - `pointerout`
  - `pointerleave`
  - `pointerrawupdate`
  - `mouseup`

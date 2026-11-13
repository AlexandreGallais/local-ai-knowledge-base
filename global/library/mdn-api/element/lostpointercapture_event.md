---
title: "Element: lostpointercapture event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/element/lostpointercapture_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Element: lostpointercapture event

The **`lostpointercapture`** event is fired when a captured pointer is released.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("lostpointercapture", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
onlostpointercapture = (event) => { }
```

## Event type

A `PointerEvent`. Inherits from `Event`.

## Examples

This example listens for the `lostpointercapture` event for an element, and captures the pointer for the element on `pointerdown`. When the user subsequently releases the pointer, the `lostpointercapture` event will be fired.

```js
const para = document.querySelector("p");

para.addEventListener("lostpointercapture", () => {
  console.log("I've been released!");
});

para.addEventListener("pointerdown", (event) => {
  para.setPointerCapture(event.pointerId);
});
```

The same example, but using the `onlostpointercapture` event handler property (but note that this replaces other event listeners added using `onlostpointercapture`, if any):

```js
const para = document.querySelector("p");

para.onlostpointercapture = () => {
  console.log("I've been released!");
};

para.addEventListener("pointerdown", (event) => {
  para.setPointerCapture(event.pointerId);
});
```

## See also

- Related events
  - `gotpointercapture`
  - `pointerover`
  - `pointerenter`
  - `pointerdown`
  - `pointermove`
  - `pointerup`
  - `pointercancel`
  - `pointerout`
  - `pointerleave`
  - `pointerrawupdate`

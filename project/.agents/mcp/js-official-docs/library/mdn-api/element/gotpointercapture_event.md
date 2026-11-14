---
title: "Element: gotpointercapture event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/element/gotpointercapture_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Element: gotpointercapture event

The **`gotpointercapture`** event is fired when an element captures a pointer using `setPointerCapture()`.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("gotpointercapture", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
ongotpointercapture = (event) => { }
```

## Event type

A `PointerEvent`. Inherits from `Event`.

## Examples

This example gets a `` element and listens for the `gotpointercapture` event. It then calls `setPointerCapture()` on the element on a `pointerdown` event, which will trigger `gotpointercapture`.

```js
const para = document.querySelector("p");

para.addEventListener("gotpointercapture", () => {
  console.log("I've been captured!");
});

para.addEventListener("pointerdown", (event) => {
  para.setPointerCapture(event.pointerId);
});
```

The same example, using the `ongotpointercapture` event handler property (but note that this replaces other event listeners added using `ongotpointercapture`, if any):

```js
const para = document.querySelector("p");

para.ongotpointercapture = () => {
  console.log("I've been captured!");
};

para.addEventListener("pointerdown", (event) => {
  para.setPointerCapture(event.pointerId);
});
```

## See also

- Related events
  - `lostpointercapture`
  - `pointerover`
  - `pointerenter`
  - `pointerdown`
  - `pointermove`
  - `pointerup`
  - `pointercancel`
  - `pointerout`
  - `pointerleave`
  - `pointerrawupdate`

---
title: "Element: pointermove event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/element/pointermove_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Element: pointermove event

The `pointermove` event is fired when a pointer changes coordinates, and the pointer has not been canceled by a browser touch-action. The event is also fired when a pointer changes any of its other properties, provided the change doesn't produce some other pointer event. This includes any change to pressure, tangential pressure, tilt, twist, contact geometry (width and height), or chorded buttons.

The `pointermove` event may have coalesced events if there is already another `pointermove` event with the same pointer ID that hasn't been dispatched in the event loop.
If events are coalesced, the `target` of the dispatched event is the same as the last coalesced one.
For information on coalesced events, see the `PointerEvent.getCoalescedEvents()` documentation.

This event is very similar to the `mousemove` event, but with more features. These events happen whether or not any pointer buttons are pressed. They can fire at a very high rate, depends on how fast the user moves the pointer, how fast the machine is, what other tasks and processes are happening, etc.

The difference between `pointerrawupdate` and `pointermove` is in their firing frequency.
A browser may delay `pointermove` events to improve performance, while `pointerrawupdate` events are dispatched as soon and as frequently as the browser can produce them.
For most use cases, you should prefer `pointermove` to avoid performance issues.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("pointermove", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
onpointermove = (event) => { }
```

## Event type

A `PointerEvent`. Inherits from `Event`.

## Usage notes

The event, which is of type `PointerEvent`, provides all the information you need to know about the user's interaction with the pointing device, including the position, movement distance, button states, and much more.

## Examples

To add a handler for `pointermove` events using `addEventListener()`:

```js
const para = document.querySelector("p");

para.addEventListener("pointermove", (event) => {
  console.log("Pointer moved");
});
```

You can also use the `onpointermove` event handler property (but note that this replaces other event listeners added using `onpointermove`, if any):

```js
const para = document.querySelector("p");

para.onpointermove = (event) => {
  console.log("Pointer moved");
};
```

## See also

- Related events
  - `gotpointercapture`
  - `lostpointercapture`
  - `pointerover`
  - `pointerenter`
  - `pointerdown`
  - `pointerup`
  - `pointercancel`
  - `pointerout`
  - `pointerleave`
  - `pointerrawupdate`
  - `mousemove`

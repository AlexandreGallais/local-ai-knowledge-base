---
title: "Element: pointerrawupdate event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/element/pointerrawupdate_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Element: pointerrawupdate event

The **`pointerrawupdate`** event is fired when a pointer changes any properties that don't fire `pointerdown` or `pointerup` events.
See `pointermove` for a list of these properties.

The `pointerrawupdate` event may have coalesced events if there is already another `pointerrawupdate` event with the same pointer ID that hasn't been dispatched in the event loop.
If events are coalesced, the `target` of the dispatched event is the same as the last coalesced one.
For information on coalesced events, see the `PointerEvent.getCoalescedEvents()` documentation.

The difference between `pointerrawupdate` and `pointermove` is in their firing frequency.
A browser may delay `pointermove` events to improve performance, while `pointerrawupdate` events are dispatched as soon and as frequently as the browser can produce them.
Both event types coalesce, but `pointerrawupdate` coalesces less, so its listeners run more often.
Any single event carries the same property values either way, so `pointerrawupdate` is not more precise in space or time than the `pointermove` event covering the same movement.

`pointerrawupdate` is therefore intended for applications that need lower-latency input handling than `pointermove` offers, such as drawing or dragging that would otherwise visibly lag behind the pointer.
Because the events arrive more often, an application that keeps up with them can also feel smoother.
However, because listening to `pointerrawupdate` events can affect performance, you should add these listeners only if your JavaScript needs high-frequency events and can handle them as quickly as they are dispatched.
An application that cannot keep up will feel less responsive rather than more, so heavy optimization inside the event listener is needed.
For most use cases, other pointer event types should suffice.

This event bubbles and is composed, but is not cancelable and has no default action.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("pointerrawupdate", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
onpointerrawupdate = (event) => { }
```

## Event type

A `PointerEvent`. Inherits from `Event`.

## Example

```js
canvas.addEventListener("pointerrawupdate", (event) => {
  const events = event.getCoalescedEvents();
  if (events.length > 1) {
    console.log("Coalesced events:", events.length);
    for (const coalescedEvent of events) {
      // Do something with the coalesced events.
    }
  } else {
    // Do something with the event.
    console.log("Raw event", event);
  }
});
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
  - `pointerleave`

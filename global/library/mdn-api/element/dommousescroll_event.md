---
title: "Element: DOMMouseScroll event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/element/dommousescroll_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Element: DOMMouseScroll event

The DOM `DOMMouseScroll` event is fired asynchronously when mouse wheel or similar device is operated and the accumulated scroll amount is over 1 line or 1 page since last event. It's represented by the `MouseScrollEvent` interface. This event was only implemented by Firefox. You should instead use the standard `wheel` event.

If you want to prevent the default action of mouse wheel events, it's not enough to handle only this event on Gecko because If scroll amount by a native mouse wheel event is less than 1 line (or less than 1 page when the system setting is by page scroll), other mouse wheel events may be fired without this event.

On Gecko 17 (Firefox 17) or later, you need to call `preventDefault()` of `wheel` events which must be fired for every native event.

Use the standardized `wheel` event if available.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("DOMMouseScroll", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
onDOMMouseScroll = (event) => { }
```

## Event type

A `WheelEvent`. Inherits from `MouseEvent`, `UIEvent` and `Event`.

## See also

- `MouseScrollEvent`
- Gecko's legacy pixel scroll event: `MozMousePixelScroll`
- Non-Gecko browsers' legacy mouse wheel event: `mousewheel`
- Standardized wheel event: `wheel`

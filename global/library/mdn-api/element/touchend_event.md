---
title: "Element: touchend event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/element/touchend_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Element: touchend event

The `touchend` event fires when one or more touch points are removed from the touch surface. Remember that it is possible to get a `touchcancel` event instead.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("touchend", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
ontouchend = (event) => { }
```

## Event type

A `TouchEvent`. Inherits from `Event`.

## Examples

Code samples for those events are available on the dedicated page: Touch events.

## See also

- Touch events

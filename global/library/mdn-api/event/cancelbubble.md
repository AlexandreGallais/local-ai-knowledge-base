---
title: "Event: cancelBubble property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/event/cancelbubble/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Event: cancelBubble property

The **`cancelBubble`** property of the `Event`
interface is deprecated. Use `Event.stopPropagation()` instead.
Setting its value to `true` before returning from an event handler prevents propagation
of the event. In later implementations, setting this to `false` does nothing.
See Browser compatibility for details.

## Value

A boolean value. The value `true` means that the event must not be propagated further.

## Example

```js
elem.onclick = (event) => {
  // Do cool things here
  event.cancelBubble = true;
};
```

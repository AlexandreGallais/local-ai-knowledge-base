---
title: "PointerEvent: isPrimary property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/pointerevent/isprimary/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PointerEvent: isPrimary property

The **`isPrimary`** read-only property of the
`PointerEvent` interface indicates whether or not the pointer device that
created the event is the _primary_ pointer. It returns `true` if the
pointer that caused the event to be fired is the primary one and returns
`false` otherwise.

In a multi-pointer scenario (such as a touch screen that supports more than one touch
point), this property is used to identify a _master pointer_ among the set of
active pointers for each pointer type. Only a primary pointer will produce
_compatibility mouse events_. Authors who desire only single-pointer interaction
can achieve that by ignoring non-primary pointers.

A pointer is considered primary if the pointer represents a mouse device. A pointer
representing pen input is considered the primary pen input if its
`pointerdown` event was dispatched when no other active pointers representing
pen input existed. A pointer representing touch input is considered the primary touch
input if its `pointerdown` event was dispatched when no other active pointers
representing touch input existed.

When two or more pointer device types are being used concurrently, multiple pointers
(one for each `pointerType`) are considered
primary. For example, a touch contact and a mouse cursor moved simultaneously will
produce pointers that are both considered primary. If there are multiple primary
pointers, these pointers will all produce _compatibility mouse events_ (see
Pointer events for more information about pointer, mouse and touch
interaction).

## Value

A boolean, `true` if the pointer for this event is the primary pointer and returns `false` otherwise.

## Examples

This example illustrates using the value of `isPrimary` to call the
appropriate processing function.

```js
target.addEventListener("pointerdown", (event) => {
  if (event.isPrimary) {
    process_primary_pointer(event);
  } else {
    process_secondary_pointer(event);
  }
});
```

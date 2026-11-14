---
title: "BufferedChangeEvent: BufferedChangeEvent() constructor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/bufferedchangeevent/bufferedchangeevent/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# BufferedChangeEvent: BufferedChangeEvent() constructor

The **`BufferedChangeEvent()`** constructor of the `BufferedChangeEvent` interface creates a new `BufferedChangeEvent` object instance.

## Syntax

```js
new BufferedChangeEvent(type, options)
```

### Parameters

- `type`
    A string representing the type of event. In the case of `BufferedChangeEvent` this is always `bufferedchange`.
- `options` (optional)
    An object that, _in addition to the properties defined in `Event()`_, has the following properties:

    > **Note:**
    > Although the spec marks `options` as optional, Safari (currently the only implementation) throws a `TypeError` if the argument is omitted entirely. Passing an empty object (`{}`) works correctly.
    - `addedRanges` (optional)
        A `TimeRanges` object representing the time ranges added to the buffer.
    - `removedRanges` (optional)
        A `TimeRanges` object representing the time ranges removed from the buffer.

### Return value

A new `BufferedChangeEvent` object instance.

## Examples

### Inspecting a bufferedchange event

The `BufferedChangeEvent()` constructor isn't generally called manually. When a `ManagedSourceBuffer`'s `bufferedchange` event fires (meaning its buffered ranges change), the browser will construct a `BufferedChangeEvent` object to use as the event object.

The event's properties describe what changed:

```js
sourceBuffer.addEventListener("bufferedchange", (event) => {
  console.log(event instanceof BufferedChangeEvent); // true
  console.log(event.type); // "bufferedchange"
  console.log(event.addedRanges); // TimeRanges — ranges added to the buffer
  console.log(event.removedRanges); // TimeRanges — ranges removed from the buffer
});
```

## See also

- `ManagedSourceBuffer`
- `bufferedchange` event

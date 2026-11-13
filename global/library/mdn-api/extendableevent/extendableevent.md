---
title: "ExtendableEvent: ExtendableEvent() constructor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/extendableevent/extendableevent/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ExtendableEvent: ExtendableEvent() constructor

The **`ExtendableEvent()`** constructor creates a new `ExtendableEvent` object.

## Syntax

```js
new ExtendableEvent(type)
new ExtendableEvent(type, options)
```

### Parameters

- `type`
    A string with the name of the event. It is case-sensitive.
- `options` (optional)
    An object that, _in addition of the properties defined in `Event()`_, can contain any custom settings
    that you want to apply to the event object.
    Currently no possible options are mandatory,
    but this has been defined for forward compatibility across the different derived events.

### Return value

A new `ExtendableEvent` object.

## See also

- Using Service Workers
- Service workers basic code example
- Using web workers

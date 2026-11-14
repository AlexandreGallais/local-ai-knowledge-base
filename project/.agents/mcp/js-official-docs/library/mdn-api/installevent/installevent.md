---
title: "InstallEvent: InstallEvent() constructor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/installevent/installevent/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# InstallEvent: InstallEvent() constructor

The **`InstallEvent()`** constructor creates a new `InstallEvent` object.

## Syntax

```js
new InstallEvent(type, options)
```

### Parameters

- `type`
    A string with the name of the event.
    It is case-sensitive and browsers always set it to `install`.
- `options` (optional)
    An object that, _in addition of the properties defined in `Event()`_, can contain any custom settings that you want to apply to the event object. Currently no possible options are mandatory, but this has been defined for forward compatibility.

### Return value

A new `InstallEvent` object.

## See also

- `Promise`
- Fetch API

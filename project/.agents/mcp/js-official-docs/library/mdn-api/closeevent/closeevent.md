---
title: "CloseEvent: CloseEvent() constructor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/closeevent/closeevent/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CloseEvent: CloseEvent() constructor

The **`CloseEvent()`** constructor creates a new `CloseEvent` object.

## Syntax

```js
new CloseEvent(type)
new CloseEvent(type, options)
```

### Parameters

- `type`
    A string with the name of the event.
    It is case-sensitive and browsers always set it to `close`.
- `options` (optional)
    An object that, _in addition of the properties defined in `Event()`_, has the following properties:
    - `wasClean` (optional)
        A boolean value indicating if the connection has been closed cleanly or not. It defaults to `false`.
    - `code` (optional)
        An integer representing the _connection close code_ sent by the server. It defaults to `0`.
    - `reason` (optional)
        A string containing a human-readable reason describing why the server closed the connection. It defaults to `''`

### Return value

A new `CloseEvent` object.

## See also

- `CloseEvent`, the interface of the objects it constructs.

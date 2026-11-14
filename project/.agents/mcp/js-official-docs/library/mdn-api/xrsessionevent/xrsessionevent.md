---
title: "XRSessionEvent: XRSessionEvent() constructor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/xrsessionevent/xrsessionevent/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# XRSessionEvent: XRSessionEvent() constructor

The WebXR Device API's
**`XRSessionEvent()`** constructor creates and returns a new
`XRSessionEvent` object. These objects represent events announcing
state changes in an `XRSession` representing an augmented or virtual
reality session.

## Syntax

```js
new XRSessionEvent(type, options)
```

### Parameters

- `type`
    A string with the name of the event.
    It is case-sensitive and browsers set it to `end` or `visibilitychange`.
- `options`
    An object that, _in addition of the properties defined in `Event()`_, can have the following properties:
    - `session`
        The `XRSession` to which the event is to be delivered.

### Return value

A new `XRSessionEvent` object representing an object of the
specified type and configured as described by the `options` parameter.

## Examples

See `XRSessionEvent` for example code.

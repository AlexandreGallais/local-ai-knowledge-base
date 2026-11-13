---
title: "XRInputSourceEvent: XRInputSourceEvent() constructor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/xrinputsourceevent/xrinputsourceevent/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# XRInputSourceEvent: XRInputSourceEvent() constructor

The **`XRInputSourceEvent()`**
constructor creates and returns a new `XRInputSourceEvent` object
describing an event (state change) which has occurred on a WebXR user input device
represented by an `XRInputSource`.

## Syntax

```js
new XRInputSourceEvent(type, options)
```

### Parameters

- `type`
    A string with the name of the event.
    It is case-sensitive and browsers set it to `select`, `selectend`, `selectstart`, `squeeze`, `squeezeend`, `squeezestart`.
- `options`
    An object that, _in addition of the properties defined in `Event()`_, can have the following properties:
    - `frame`
        An `XRFrame` object representing the event frame during which the event took place.
        This event is _not_ associated with the animation process, and has no viewer information contained within it.
    - `inputSource`
        An `XRInputSource` object representing the input device from which the event is being sent.

### Return value

A new `XRInputSourceEvent` object representing the event described by the
given `type` and `eventInitDict`.

## Examples

This example creates a new `select` event and
sends it to the `XRSession`.

```js
let event = new XRInputSourceEvent("select", {
  frame: eventFrame,
  inputSource: source,
});
if (event) {
  xrSession.dispatchEvent(event);
}
```

---
title: "RTCErrorEvent: RTCErrorEvent() constructor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtcerrorevent/rtcerrorevent/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCErrorEvent: RTCErrorEvent() constructor

The **`RTCErrorEvent()`** constructor creates a new `RTCErrorEvent` object.

Note that you will not normally create an object of this type yourself.

## Syntax

```js
new RTCErrorEvent(type, options)
```

### Parameters

- `type`
    A string with the name of the event.
    This is usually `"error"`.
- `options`
    An object that, _in addition to the properties defined in `Event()`_, can have the following properties:
    - `error`
        A `RTCError` describing the cause and the location of the error.

### Return value

A new `RTCErrorEvent` object.

## Examples

### Basic usage

This example shows how you might create an `RTCErrorEvent` instance.

```js
// Construct an RTCError (used to initialize the event)
const rtcError = new RTCError(
  {
    errorDetail: "sdp-syntax-error",
    sdpLineNumber: 42,
  },
  "SDP syntax error on line 42",
);

// Construct the RTCErrorEvent, passing the RTCError
const event = new RTCErrorEvent("error", {
  error: rtcError, // required
  bubbles: true, // Optional (inherited from Event)
  cancelable: false, // Optional (inherited from Event)
});
```

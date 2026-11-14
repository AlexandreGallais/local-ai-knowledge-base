---
title: "RTCErrorEvent"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtcerrorevent/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCErrorEvent

The **`RTCErrorEvent`** interface of the WebRTC API represents an error event sent to a WebRTC object.
It inherits from the standard `Event` interface, adding RTC-specific information describing the error.

The `error` events fired at `RTCDataChannel` and `RTCDtlsTransport` are instances of this object.

> **Note:**
> WebRTC defines other error event interfaces, such as `RTCPeerConnectionIceErrorEvent`, which are used for errors that have other special information sharing requirements.

## Constructor

- `RTCErrorEvent()`
    Creates and returns a new `RTCErrorEvent` object.

## Instance properties

_Also inherits properties from its parent interface, `Event`._

- `error` (read-only)
    An `RTCError` object specifying RTC-specific information about the error.
    This includes information such as the error type and cause, and the location that triggered the error.

## Instance methods

_Only inherits methods from its parent interface, `Event`._

## See also

- `RTCPeerConnectionIceErrorEvent`

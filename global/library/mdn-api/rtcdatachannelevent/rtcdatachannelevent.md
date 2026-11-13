---
title: "RTCDataChannelEvent: RTCDataChannelEvent() constructor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtcdatachannelevent/rtcdatachannelevent/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCDataChannelEvent: RTCDataChannelEvent() constructor

The **`RTCDataChannelEvent()`** constructor
creates a new `RTCDataChannelEvent` object.

> **Note:**
> You will rarely if ever construct an `RTCDataChannelEvent` by hand; these
> events are normally created and sent by the WebRTC layer itself.

## Syntax

```js
new RTCDataChannelEvent(type, options)
```

### Parameters

- `type`
    A string with the name of the event.
    It is case-sensitive and browsers always set it to `datachannel`.
- `options`
    An object that, _in addition of the properties defined in `Event()`_, can have the following properties:
    - `channel`
        A `RTCDataChannel`, representing the data channel being associated with the event.

### Return value

A new `RTCDataChannelEvent` object configured as specified.

## Example

In this example, a new `datachannel` event is created. `dc` is a
data channel which already exists.

```js
const event = new RTCDataChannelEvent("datachannel", { channel: dc });
```

## See also

- WebRTC
- `RTCDataChannel`
- `RTCPeerConnection`
- A simple RTCDataChannel sample

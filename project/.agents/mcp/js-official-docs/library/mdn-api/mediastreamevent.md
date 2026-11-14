---
title: "MediaStreamEvent"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/mediastreamevent/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# MediaStreamEvent

The **`MediaStreamEvent`** interface represents events that occurs in relation to a `MediaStream`. Two events of this type can be thrown: `addstream` and `removestream`.

## Constructors

- `MediaStreamEvent()` (deprecated) (non-standard)
    Returns a new `MediaStreamEvent`. It takes two parameters, the first being a string representing the type of the event; the second a dictionary containing the `MediaStream` it refers to.

## Instance properties

_A `MediaStreamEvent` being an `Event`, this event also implements these properties_.

- `MediaStreamEvent.stream` (read-only) (deprecated) (non-standard)
    Contains the `MediaStream` containing the stream associated with the event.

## Instance methods

A `MediaStreamEvent` being an `Event`, this event also implements these properties. There is no specific `MediaStreamEvent` method.

## Examples

```js
pc.onaddstream = (ev) => {
  alert(`A stream (id: '${ev.stream.id}') has been added to this connection.`);
};
```

## See also

- WebRTC
- Its usual target: `RTCPeerConnection`.

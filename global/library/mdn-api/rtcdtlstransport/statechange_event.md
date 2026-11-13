---
title: "RTCDtlsTransport: statechange event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtcdtlstransport/statechange_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCDtlsTransport: statechange event

A **`statechange`** event occurs when the `RTCDtlsTransport` changes state. The `state` property can be used to determine the current state of the underlying Datagram Transport Layer Security (DTLS) transport.

This event is not cancelable and does not bubble.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("statechange", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
onstatechange = (event) => { }
```

## Event type

A generic `Event`.

## Examples

Given an `RTCPeerConnection`, `pc`, the following code creates an event handler that calls a function named `handleFailure()` if the DTLS transport enters a failure state.

```js
const dtlsTransport = pc.getSenders()[0].transport;

dtlsTransport.addEventListener("statechange", (ev) => {
  if (dtlsTransport.state === "failed") {
    handleFailure(pc);
  }
});
```

The same code, using the `onstatechange` event handler property, looks like this (but note that this replaces other event listeners added using `onstatechange`, if any):

```js
const dtlsTransport = pc.getSenders()[0].transport;

dtlsTransport.onstatechange = (ev) => {
  if (dtlsTransport.state === "failed") {
    handleFailure(pc);
  }
};
```

## See also

- WebRTC API
- `RTCDtlsTransport.state`
- `error`

---
title: "RTCDtlsTransport: error event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtcdtlstransport/error_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCDtlsTransport: error event

An `RTCDtlsTransport` receives an `error` event when a transport-level error occurs on the `RTCPeerConnection`.

This event is not cancelable and does not bubble.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("error", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
onerror = (event) => { }
```

## Event type

An `RTCErrorEvent`. Inherits from `Event`.

## Description

Transport-level errors will have one of the following values for the specified error's `RTCError` property `errorDetail`:

- `dtls-failure`
    The negotiation of the DTLS connection failed, or the connection was terminated with a fatal error. The error's `message` contains details about the nature of the error. If a fatal error is _received_, the error object's `receivedAlert` property is set to the value of the DTLS alert received. If, on the other hand, a fatal error was _sent_, the `sentAlert` is set to the alert's value.
- `fingerprint-failure`
    The remote certificate for the `RTCDtlsTransport` didn't match any of the fingerprints listed in the SDP. If the remote peer can't match the local certificate against the provided fingerprints, this error doesn't occur, though this situation may result instead in a `dtls-failure` error.

## Examples

### Basic usage

Given an `RTCPeerConnection`, `pc`, the following code handles a DTLS transport error:

```js
const dtlsTransport = pc.getSenders()[0].transport;

dtlsTransport.addEventListener("error", (ev) => {
  const err = ev.error;
  // …
});
```

The same code, using the `onerror` event handler property, looks like this (but note that this replaces other event listeners added using `onerror`, if any):

```js
dtlsTransport.onerror = (ev) => {
  const err = ev.error;
  // …
};
```

> **Note:**
> Since `RTCError` is not one of the legacy errors, the value of `code` is always 0.

## See also

- WebRTC API

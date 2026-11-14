---
title: "RTCError: RTCError() constructor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtcerror/rtcerror/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCError: RTCError() constructor

The **`RTCError()`** constructor creates and returns a new `RTCError` object instance.

## Syntax

```js
new RTCError(options)
new RTCError(options, message)
```

### Parameters

- `options`
    An object providing the details of the specific error in an `RTCErrorEvent`.
    The object has the following properties:
    - `errorDetail`
        A string specifying the WebRTC-specific error code identifying the type of error that occurred.
        This will be one of:
        - `data-channel-failure`
            The connection's `RTCDataChannel` has failed.
        - `dtls-failure`
            The negotiation of the DTLS connection failed, or the connection was terminated with a fatal error.
            The error's `message` contains details about the nature of the error.
            - If a fatal error is _received_, set `receivedAlert` to the value of the received DTLS alert.
            - If a fatal error was _sent_, set `sentAlert` to the alert's value.
        - `fingerprint-failure`
            The remote certificate for the `RTCDtlsTransport` didn't match any of the fingerprints listed in the SDP message.
            If the remote peer can't match the local certificate against the provided fingerprints, this error doesn't occur, though this situation may result instead in a `dtls-failure` error.
        - `hardware-encoder-error`
            The hardware encoder doesn't support the given configuration parameters.
        - `hardware-encoder-not-available`
            The hardware encoder resources required to accomplish the requested operation aren't available.
        - `sctp-failure`
            The SCTP negotiation has failed, or the connection has terminated with a fatal error.
            The SCTP cause code should be set in `sctpCauseCode`.
            SCTP error cause codes 1-13 are defined in the SCTP specification: 3.3.10.
        - `sdp-syntax-error`
            The SDP syntax is invalid.
            The SDP message line number at which the error was detected should be set in `sdpLineNumber`.

    - `receivedAlert` (optional)
        A positive integer value indicating a fatal DTLS error that was received from the network.
        Only set if the `errorDetail` string is `dtls-failure`.

    - `sctpCauseCode` (optional)
        An integer specifying the SCTP cause code that indicates the cause of the failed SCTP negotiation.
        This should only be set if `errorDetail` is `sctp-failure`.

    - `sdpLineNumber` (optional)
        An integer identifying the SDP message line number at which a syntax error occurred.
        Only set if `errorDetail` is `sdp-syntax-error`.
    - `sentAlert` (optional)
        A positive integer indicating a fatal DTLS error that was sent out by this device.
        Only set if `errorDetail` is `dtls-failure`.

- `message` (optional)
    A string for the error message.
    Defaults to the empty string (`""`).

### Return value

A newly-created `RTCError` object instance.

## Usage notes

This constructor does not do complete validation of the specified `candidateInfo` object or string.

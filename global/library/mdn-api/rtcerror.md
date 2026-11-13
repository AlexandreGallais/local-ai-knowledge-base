---
title: "RTCError"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtcerror/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCError

The **`RTCError`** interface of the WebRTC API describes an error which has occurred while handling RTC operations.
It's based upon the standard `DOMException` interface that describes general DOM errors.

## Constructor

- `RTCError()`
    Creates and returns a new `RTCError` object instance.

## Instance properties

_Also inherits properties from its parent interface, `DOMException`._

- `errorDetail` (read-only)
    A string specifying the WebRTC-specific error code identifying the type of error that occurred.
- `receivedAlert` (read-only)
    A positive integer value indicating the fatal DTLS error received from the network.
    Only valid if the `errorDetail` string is `dtls-failure`.
    If `null`, no DTLS error was received.
- `sctpCauseCode` (read-only)
    An integer specifying the SCTP cause code indicating the cause of the failed SCTP negotiation.
    Set if `errorDetail` is `sctp-failure`.
    `null` if the error isn't an SCTP error.
- `sdpLineNumber` (read-only)
    An integer identifying the line number of the SDP on which the syntax error occurred.
    Set if `errorDetail` is `sdp-syntax-error`.
    `null` if the error isn't an SDP syntax error.
- `sentAlert` (read-only)
    A positive integer indicating the fatal DTLS error that was sent out by this device.
    Set if `errorDetail` is `dtls-failure`.
    If `null`, no DTLS error was transmitted.

> **Note:**
> All `RTCError` objects have their `name` set to `OperationError`.

## Examples

### Basic usage

In this example, a handler is established for an `RTCDataChannel`'s `error` event.

```js
dataChannel.addEventListener("error", (event) => {
  let error = event.error; // event.error is an RTCError

  if (error.errorDetail === "sdp-syntax-error") {
    let errLine = error.sdpLineNumber;
    let errMessage = error.message;

    let alertMessage = `A syntax error occurred interpreting line ${errLine} of the SDP: ${errMessage}`;
    showMyAlertMessage("Data Channel Error", alertMessage);
  } else {
    terminateMyConnection();
  }
});
```

If the error is an SDP syntax error—as indicated by the `errorDetail` property being set to `sdp-syntax-error`— a message string is constructed to present the error message and line number within the SDP message where the error occurred.
This message is then displayed using a function called `showMyAlertMessage()`, which stands in for whatever output mechanism this code might use.

Any other error is treated as terminal, causing a `terminateMyConnection()` function to be called.

The above example uses `addEventListener()` to add the handler for `error` events.
You can also use the `RTCDataChannel` object's `onerror` event handler property, like this:

```js
dataChannel.onerror = (event) => {
  let error = event.error;

  /* and so forth */
};
```

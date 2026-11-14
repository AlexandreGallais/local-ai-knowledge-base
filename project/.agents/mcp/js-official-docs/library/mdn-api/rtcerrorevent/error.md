---
title: "RTCErrorEvent: error property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtcerrorevent/error/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCErrorEvent: error property

The **`error`** read-only property of the `RTCErrorEvent` interface contains an `RTCError` object that describes the WebRTC-specific details of the error.

## Value

An `RTCError` object.

## Examples

### Basic usage

In this example, a handler is established for an `RTCDataChannel`'s `error` event.

```js
dataChannel.addEventListener("error", (event) => {
  let error = event.error;

  if (error.errorDetail === "sdp-syntax-error") {
    const errLine = error.sdpLineNumber;
    const errMessage = error.message;

    const alertMessage = `A syntax error occurred interpreting line ${errLine} of the SDP: ${errMessage}`;
    showMyAlertMessage("Data Channel Error", alertMessage);
  } else {
    terminateMyConnection();
  }
});
```

If the error is an SDP syntax error—indicated by its `errorDetail` property being `sdp-syntax-error`— a message string is constructed to present the error message and the SDP message line number where the error occurred.
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

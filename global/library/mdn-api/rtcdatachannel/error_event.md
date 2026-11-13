---
title: "RTCDataChannel: error event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtcdatachannel/error_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCDataChannel: error event

A WebRTC `error` event is sent to an `RTCDataChannel` object's `onerror` event handler when an error occurs on the data channel.

The `RTCErrorEvent` object provides details about the error that occurred; see that article for details.

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

## Examples

```js
// Strings for each of the SCTP cause codes found in RFC
// 4960, section 3.3.10:
// https://datatracker.ietf.org/doc/html/rfc4960#section-3.3.10

const sctpCauseCodes = [
  "No SCTP error",
  "Invalid stream identifier",
  "Missing mandatory parameter",
  "Stale cookie error",
  "Sender is out of resource (i.e., memory)",
  "Unable to resolve address",
  "Unrecognized SCTP chunk type received",
  "Invalid mandatory parameter",
  "Unrecognized parameters",
  "No user data (SCTP DATA chunk has no data)",
  "Cookie received while shutting down",
  "Restart of an association with new addresses",
  "User-initiated abort",
  "Protocol violation",
];

dc.addEventListener("error", (ev) => {
  const err = ev.error;

  console.error("WebRTC error: ", err.message);

  // Handle specific error detail types

  switch (err.errorDetail) {
    case "sdp-syntax-error":
      console.error("    SDP syntax error in line ", err.sdpLineNumber);
      break;
    case "idp-load-failure":
      console.error(
        "    Identity provider load failure: HTTP error ",
        err.httpRequestStatusCode,
      );
      break;
    case "sctp-failure":
      if (err.sctpCauseCode < sctpCauseCodes.length) {
        console.error("    SCTP failure: ", err.sctpCauseCode);
      } else {
        console.error("    Unknown SCTP error");
      }
      break;
    case "dtls-failure":
      if (err.receivedAlert) {
        console.error("    Received DTLS failure alert: ", err.receivedAlert);
      }
      if (err.sentAlert) {
        console.error("    Sent DTLS failure alert: ", err.sentAlert);
      }
      break;
  }

  // Add source file name and line information

  console.error(
    "    Error in file ",
    err.filename,
    " at line ",
    err.lineNumber,
    ", column ",
    err.columnNumber,
  );
});
```

The received event provides details in an `RTCError` object called `error`; `RTCError` is an extension of the `DOMException` interface. The error's `name` is `RTCError` and the `message` is an error string specified by the WebRTC layer.

Error information is output to the console using `console.error()`. The `message` string is always output, as is information about the source file's name, line number, and column number at which the error occurred.

In addition, however, depending on the value of `errorDetail`, additional information may be output. Each error type has a different set of information output. For example, an SDP syntax error displays the line number of the error within the SDP, and an SCTP error displays a message corresponding to the SCTP cause code. Other error types similarly output appropriate information.

You can also set up an event handler for `error` events using the `RTCDataChannel` interface's `onerror` event handler property (but note that this replaces other event listeners added using `onerror`, if any):

```js
dc.onerror = (ev) => {
  const err = ev.error;

  // …
};
```

> **Note:**
> Since `RTCError` is not one of the legacy errors, the value of `RTCError.code` is always 0.

## See also

- WebRTC API
- A simple RTCDataChannel example
- Related events: `open`, `message`, and `close`

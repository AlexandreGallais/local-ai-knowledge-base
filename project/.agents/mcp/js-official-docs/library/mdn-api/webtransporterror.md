---
title: "WebTransportError"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webtransporterror/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebTransportError

The **`WebTransportError`** interface of the `WebTransport API` represents an error related to the API, which can arise from server errors, network connection problems, or client-initiated abort operations (for example, arising from a `WritableStream.abort()` call).

## Constructor

- `WebTransportError()`
    Creates a new `WebTransportError` object instance.

## Instance properties

_Inherits properties from its parent, `DOMException`._

- `source` (read-only)
    Returns an enumerated value indicating the source of the error—can be either `stream` or `session`.
- `streamErrorCode` (read-only)
    Returns a number in the range 0-255 indicating the application protocol error code for this error, or `null` if one is not available.

## Examples

```js
const url = "not-a-url";

async function initTransport(url) {
  try {
    // Initialize transport connection
    const transport = new WebTransport(url);

    // The connection can be used once ready fulfills
    await transport.ready;

    // …
  } catch (error) {
    const msg = `Transport initialization failed.
                 Reason: ${error.message}.
                 Source: ${error.source}.
                 Error code: ${error.streamErrorCode}.`;
    console.log(msg);
  }
}
```

## See also

- Using WebTransport
- `WebSockets API`
- `Streams API`
- WebTransport over HTTP/3

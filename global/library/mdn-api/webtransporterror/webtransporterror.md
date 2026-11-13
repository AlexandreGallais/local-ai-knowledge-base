---
title: "WebTransportError: WebTransportError() constructor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webtransporterror/webtransporterror/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebTransportError: WebTransportError() constructor

The **`WebTransportError()`** constructor creates a new `WebTransportError` object instance.

## Syntax

```js
new WebTransportError(init)
```

### Parameters

- `init` (optional)
    An object containing the following properties:
    - `message`
        A string describing the error that has occurred.
    - `streamErrorCode`
        A number in the range 0-255 indicating the application protocol error code for this error.

## Examples

A developer would not use this constructor manually. A new `WebTransportError` object is constructed when an error related to WebTransport occurs, for example a server error or network connection problem.

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

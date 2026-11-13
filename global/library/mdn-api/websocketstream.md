---
title: "WebSocketStream"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/websocketstream/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebSocketStream

The **`WebSocketStream`** interface of the `WebSockets API` is a promise-based API for connecting to a WebSocket server. It uses streams to send and receive data on the connection, and can therefore take advantage of stream backpressure automatically, regulating the speed of reading or writing to avoid bottlenecks in the application.

## Constructor

- `WebSocketStream()` (experimental) (non-standard)
    Creates a new `WebSocketStream` object instance.

## Instance properties

- `url` (read-only) (experimental) (non-standard)
    Returns the URL of the WebSocket server that the `WebSocketStream` instance was created with.
- `closed` (read-only) (experimental) (non-standard)
    Returns a `Promise` that fulfills with an object once the socket connection is closed. The object contains the closing code and reason as sent by the server.
- `opened` (read-only) (experimental) (non-standard)
    Returns a `Promise` that fulfills with an object once the socket connection is successfully opened. Among other features, this object contains a `ReadableStream` and a `WritableStream` instance for receiving and sending data on the connection.

## Instance methods

- `close()` (experimental) (non-standard)
    Closes the WebSocket connection.

## Examples

```js
const output = document.querySelector("#output");

function writeToScreen(message) {
  const pElem = document.createElement("p");
  pElem.textContent = message;
  output.appendChild(pElem);
}

if (!("WebSocketStream" in self)) {
  writeToScreen("Your browser does not support WebSocketStream");
} else {
  const wsURL = "ws://127.0.0.1/";
  const wss = new WebSocketStream(wsURL);

  console.log(wss.url);

  async function start() {
    const { readable, writable, extensions, protocol } = await wss.opened;
    writeToScreen("CONNECTED");
    closeBtn.disabled = false;
    const reader = readable.getReader();
    const writer = writable.getWriter();

    writer.write("ping");
    writeToScreen("SENT: ping");

    while (true) {
      const { value, done } = await reader.read();
      writeToScreen(`RECEIVED: ${value}`);
      if (done) {
        break;
      }

      setTimeout(() => {
        writer.write("ping");
        writeToScreen("SENT: ping");
      }, 5000);
    }
  }

  start();
}
```

See Using WebSocketStream to write a client for a complete example with full explanation.

## Specifications

Not currently a part of any specification. See https://github.com/whatwg/websockets/pull/48 for standardization progress.

## See also

- WebSocketStream: integrating streams with the WebSocket API, developer.chrome.com (2020)

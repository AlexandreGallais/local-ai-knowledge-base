---
title: "WebSocket: WebSocket() constructor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/websocket/websocket/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebSocket: WebSocket() constructor

The **`WebSocket()`** constructor returns a new `WebSocket` object and immediately attempts to establish a connection to the specified WebSocket URL.

## Syntax

```js
new WebSocket(url)
new WebSocket(url, protocols)
```

### Parameters

- `url`
    The URL of the target WebSocket server to connect to.
    The URL must use one of the following schemes: `ws`, `wss`, `http`, or `https`, and cannot include a URL fragment.
    If a relative URL is provided, it is relative to the base URL of the calling script.

- `protocols` (optional)
    A single string or an array of strings representing the sub-protocol(s) that the client would like to use, in order of preference.
    If it is omitted, an empty array is used by default, i.e., `[]`.

    A single server can implement multiple WebSocket sub-protocols, and handle different types of interactions depending on the specified value.
    Note however that only one sub-protocol can be selected per connection.

    The allowed values are those that can be specified in the `Sec-WebSocket-Protocol` HTTP header.
    These are values selected from the IANA WebSocket Subprotocol Name Registry, such as `soap`, `wamp`, `ship` and so on, or may be a custom name jointly understood by the client and the server.

    > **Note:**
    > The connection is not established until the sub-protocol is negotiated with the server.
    > The selected protocol can then be read from `WebSocket.protocol`: it will be the empty string if a connection cannot be established.

### Exceptions

- `SyntaxError` `DOMException`
    Thrown if:
    - parsing of `url` fails
    - `url` has a scheme other than `ws`, `wss`, `http`, or `https`
    - `url` has a fragment
    - any of the values in `protocols` occur more than once, or otherwise fail to match the requirements for elements that comprise the value of `Sec-WebSocket-Protocol` fields as defined by the WebSocket Protocol specification

## Examples

The examples below show how you might connect to a `WebSocket`.

The code below shows how we can connect to a socket using a URL with the `wss` scheme:

```js
const wssWebSocket = new WebSocket("wss://websocket.example.org");
console.log(wssWebSocket.url); // 'wss://websocket.example.org'

// Do something with socket

wssWebSocket.close();
```

The code for connecting to an HTTPS URL is nearly the same.
Under the hood the browser resolves this to a "WSS" connection, so the `WebSocket.url` will have the scheme "wss:".

```js
const httpsWebSocket = new WebSocket("https://websocket.example.org");
console.log(httpsWebSocket.url); // 'wss://websocket.example.org'

// Do something with socket

httpsWebSocket.close();
```

We can also resolve relative URLs.
The absolute URL will depend on the base URL of the context in which it is called.

```js
relativeWebSocket = new WebSocket("/local/url");

// Do something with socket

relativeWebSocket.close();
```

The previous examples show how to _construct_ a `WebSocket`, but the connection is established asynchronously. Calling `send()` before the `open` event fires throws an `InvalidStateError` exception, because `readyState` is still `CONNECTING`. If the connection cannot be established (for example, the server is unreachable or the handshake fails), an `error` event fires and is followed by a `close` event whose `wasClean` property is `false` — so every connection attempt ultimately ends with either an `open` event or a `close` event. The example below shows how to wait for the connection before sending, and how to handle the `error` and `close` events:

```js
// Create WebSocket connection.
const socket = new WebSocket("wss://websocket.example.org");

// Connection opened
socket.addEventListener("open", (event) => {
  socket.send("Hello Server!");
});

// Listen for messages
socket.addEventListener("message", (event) => {
  console.log("Message from server:", event.data);
});

// Handle errors
socket.addEventListener("error", (event) => {
  console.error("WebSocket error:", event);
});

// Handle disconnection
socket.addEventListener("close", (event) => {
  if (event.wasClean) {
    console.log(`Closed cleanly, code=${event.code}, reason=${event.reason}`);
  } else {
    console.log("Connection died");
  }
});
```

## See also

- RFC 6455 (the WebSocket Protocol specification)

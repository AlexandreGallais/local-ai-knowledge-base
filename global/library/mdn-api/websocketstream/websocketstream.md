---
title: "WebSocketStream: WebSocketStream() constructor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/websocketstream/websocketstream/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebSocketStream: WebSocketStream() constructor

The **`WebSocketStream()`** constructor creates a new
`WebSocketStream` object instance.

## Syntax

```js
new WebSocketStream(url)
new WebSocketStream(url, options)
```

### Parameters

- `url`
    A string representing the URL of the WebSocket server you want to connect to with this `WebSocketStream` instance. Allowed URL schemes are `"ws"`, `"wss"`, `"http"`, and `"https"`.
- `options` (optional)
    An object that can contain the following properties:
    - `protocols` (optional)
        A single string or an array of strings representing the sub-protocol(s) that the client would like to use, for example `"amqp"` or `"mqtt"`. Subprotocols may be selected from the IANA WebSocket Subprotocol Name Registry or may be custom names jointly understood by the client and the server. A single server can implement multiple WebSocket sub-protocols, and handle different types of interactions depending on the specified value. If it is omitted, an empty array is used by default. If `protocols` is included, the connection will only be established if the server reports that it has selected one of these sub-protocols.
    - `signal` (optional)
        An `AbortSignal`, which can be used to abort the connection before the handshake has completed (that is, before the `opened` promise resolves). This is primarily intended to help implement connection timeouts. As such, it does nothing after the connection is established.

### Exceptions

- `SyntaxError` `DOMException`
    Thrown if the URL scheme is not one of `"ws"`, `"wss"`, `"http"`, or `"https"`.

## Examples

### Creating a `WebSocketStream`

The most basic <example-value> takes the URL of a WebSocket server as an argument:

```js
const wss = new WebSocketStream("wss://example.com/wss");
```

### Creating a `WebSocketStream` with a connection timeout

The following example uses the `signal` option to implement a timeout if the connection is not established within 5 seconds:

```js
const queueWSS = new WebSocketStream("wss://example.com/queue", {
  signal: AbortSignal.timeout(5000),
});
```

Note that if you're connecting to localhost, it's likely to succeed or fail before the connection attempt times out.

Once the connection is established, `signal` has no effect: to close a connection that's already established, call the `WebSocketStream.close()` method. Closing the underlying `WritableStream` or `WritableStreamDefaultWriter` also closes the socket.

See Using WebSocketStream to write a client for a complete example with full explanation.

## Specifications

Not currently a part of any specification. See https://github.com/whatwg/websockets/pull/48 for standardization progress.

WebSocketStream API design.

## See also

- WebSocketStream: integrating streams with the WebSocket API, developer.chrome.com (2020)

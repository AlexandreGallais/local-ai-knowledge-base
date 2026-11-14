---
title: "WebTransport"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webtransport/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebTransport

The **`WebTransport`** interface of the `WebTransport API` provides functionality to enable a user agent to connect to an HTTP/3 server, initiate reliable and unreliable transport in either or both directions, and close the connection once it is no longer needed.

## Constructor

- `WebTransport()`
    Creates a new `WebTransport` object instance.

## Static properties

- `supportsReliableOnly` (read-only)
    Returns a boolean value that indicates whether the browser supports WebTransport sessions over exclusively reliable transports.

## Instance properties

- `anticipatedConcurrentIncomingBidirectionalStreams` (experimental)
    Represents the number of incoming bidirectional streams that the application expects the server to have open at the same time.
- `anticipatedConcurrentIncomingUnidirectionalStreams` (experimental)
    Represents the number of incoming unidirectional streams that the application expects the server to have open at the same time.
- `closed` (read-only)
    Returns a `Promise` that resolves when the transport is closed.
- `congestionControl` (read-only)
    Returns a string that indicates the application preference for either high throughput or low-latency when sending data.
- `datagrams` (read-only)
    Returns a `WebTransportDatagramDuplexStream` instance that can be used to send and receive datagrams.
- `draining` (read-only)
    Returns a `Promise` that resolves when the transport session starts draining.
- `incomingBidirectionalStreams` (read-only)
    Represents one or more bidirectional streams opened by the server. Returns a `ReadableStream` of `WebTransportBidirectionalStream` objects. Each one can be used to read data from the server and write data back to it.
- `incomingUnidirectionalStreams` (read-only)
    Represents one or more unidirectional streams opened by the server. Returns a `ReadableStream` of `WebTransportReceiveStream` objects. Each one can be used to read data from the server.
- `protocol` (read-only)
    Returns a string representing the application-specific protocol selected by the server, or `""` if none has been selected.
    Client preferences for the protocol are passed to the constructor in the `protocols` constructor option.
- `ready` (read-only)
    Returns a `Promise` that resolves when the transport is ready to use.
- `reliability` (read-only)
    Returns a string that indicates whether the connection supports reliable transports only, or whether it also supports unreliable transports (such as UDP).
- `responseHeaders` (read-only) (experimental)
    Returns a `Headers` object containing the HTTP headers from the server's response to the request that set up the session, or `null` if the session has not yet been established.

## Instance methods

- `close()`
    Closes an ongoing WebTransport session.
- `createBidirectionalStream()`
    Asynchronously opens a bidirectional stream (`WebTransportBidirectionalStream`) that can be used to read from and write to the server.
- `createSendGroup()`
    Returns a `WebTransportSendGroup` that can be used to group together streams and datagrams so that their relative sending priority can be controlled as a set.
- `createUnidirectionalStream()`
    Asynchronously opens a unidirectional stream (`WritableStream`) that can be used to write to the server.
- `exportKeyingMaterial()` (experimental)
    Returns a `Promise` that fulfills with keying material derived from the TLS session underlying the connection.
- `getStats()`
    Returns a `Promise` that fulfills with an object containing statistics for the transport's underlying connection.

## Examples

The example code below shows how you'd connect to an HTTP/3 server by passing its URL to the `WebTransport()` constructor.
Note that the scheme needs to be HTTPS, and the port number needs to be explicitly specified.
Once the `WebTransport.ready` promise fulfills, you can start using the connection.

```js
async function initTransport(url) {
  // Initialize transport connection
  const transport = new WebTransport(url);

  // The connection can be used once ready fulfills
  await transport.ready;
  return transport;
}
```

You can respond to the connection closing by waiting for the `WebTransport.closed` promise to fulfill.
Errors returned by `WebTransport` operations are of type `WebTransportError`, and contain additional data on top of the standard `DOMException` set.

The `closeTransport()` method below shows a possible implementation.
Within a `try...catch` block it uses `await` to wait for the `closed` promise to fulfill or reject, and then reports whether or not the connection closed intentionally or due to error.

```js
async function closeTransport(transport) {
  // Respond to connection closing
  try {
    await transport.closed;
    console.log(`The HTTP/3 connection to ${url} closed gracefully.`);
  } catch (error) {
    console.error(`The HTTP/3 connection to ${url} closed due to ${error}.`);
  }
}
```

We might call the asynchronous functions above in their own asynchronous function, as shown below.

```js
// Use the transport
async function useTransport(url) {
  const transport = await initTransport(url);

  // Use the transport object to send and receive data
  // …

  // When done, close the transport
  await closeTransport(transport);
}

const url = "https://example.com:4999/wt";
useTransport(url);
```

For other example code, see the individual property and method pages.

## See also

- Using WebTransport
- `WebSockets API`
- `Streams API`
- WebTransport over HTTP/3

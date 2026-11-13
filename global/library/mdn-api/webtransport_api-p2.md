---
title: "WebTransport API (part 2 of 3)"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webtransport_api/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebTransport API (part 2 of 3)

## Concepts and usage

HTTP/3 was standardized in 2022, after several years of development.
It is based on the QUIC protocol (itself based on UDP and standardized in 2021), and fixes several issues around the classic TCP protocol, on which HTTP and WebSockets are based.

These include:

- **Head-of-line blocking**
    HTTP/2 allows multiplexing, so a single connection can stream multiple resources simultaneously. However, if a single resource fails, all other resources on that connection are held up until any missing packets are retransmitted. With QUIC, only the failing resource is affected.
- **Faster performance**
    QUIC is more performant than TCP in many ways. QUIC can handle security features by itself, rather than handing responsibility off to other protocols like TLS — meaning fewer round trips. And streams provide better transport efficiency than the older packet mechanism. That can make a significant difference, especially on high-latency networks.
- **Better network transitions**
    QUIC uses a unique connection ID to handle the source and destination of each request — to ensure that packets are delivered correctly. This ID can persist between different networks, meaning that, for example, a download can continue without getting interrupted if you switch from Wi-Fi to a mobile network. HTTP/2, on the other hand, uses IP addresses as identifiers, so network transitions can be problematic.
- **Unreliable transport**
    HTTP/3 supports unreliable data transmission via datagrams.

The WebTransport API provides low-level access to two-way communication via HTTP/3, taking advantage of the above benefits, and supporting both reliable and unreliable data transmission.

### Initial connection

To open a connection to an HTTP/3 server, you pass its URL to the `WebTransport()` constructor. Note that the scheme needs to be HTTPS, and the port number needs to be explicitly specified. Once the `WebTransport.ready` promise fulfills, you can start using the connection.

```js
const url = "https://example.com:4999/wt";

async function initTransport(url) {
  // Initialize transport connection
  const transport = new WebTransport(url);

  // The connection can be used once ready fulfills
  await transport.ready;

  // …
}
```

### Server implementation

A WebTransport connection requires a supporting server.
To establish a session, the client sends an extended `CONNECT` request with a `:protocol` pseudo-header identifying WebTransport.
For browser clients, the request also includes an `Origin` header, which the server must verify before accepting the session.
(This is automatically handled by the `WebTransport()` constructor.)
The server accepts the session by sending a successful (2xx) response.
The client and server can then exchange data using multiple bidirectional streams, unidirectional streams, and datagrams associated with that session.

The client can add custom headers to the request using the `headers` option of the `WebTransport()` constructor.
For example, it might pass an authentication token for the server to check before it accepts the session.
The client can read the headers that the server includes in its response, other than `WT-Protocol`, from the `WebTransport.responseHeaders` property once the session is established.

The WebTransport over HTTP/3 specification describes the protocol and server requirements in more detail.

You should use a WebTransport library to handle the server-side protocol details. For example:

- **Go**: `webtransport-go`
- **Python**: `aioquic`; see also Google Chrome's WebTransport server example
- **Rust**: `wtransport`
- **Node.js**: `@fails-components/webtransport`
- **Deno**: built-in WebTransport support (unstable)

For all our client examples, we'll provide minimal server examples using the Node.js `@fails-components/webtransport` package. Code written with other libraries or languages may look substantially different.

> **Note:**
> Server-side JavaScript examples will be marked with `// -- server.js --`. JavaScript examples without this comment are client-side code.

Here's an example server for the initial connection example:

```js
// -- server.js --
import { randomBytes } from "node:crypto";
import { readFileSync } from "node:fs";
import { Http3Server } from "@fails-components/webtransport";

const allowedOrigin = "https://example.com";
const server = new Http3Server({
  host: "0.0.0.0",
  port: 4999,
  secret: randomBytes(32).toString("<example-value>"),
  cert: readFileSync("certificate.pem", "utf8"),
  privKey: readFileSync("private-key.pem", "utf8"),
});

async function acceptRequest({ header }) {
  const path = header[":path"];
  if (path !== "/wt") {
    return { status: 404, path };
  }
  if (header.origin !== allowedOrigin) {
    return { status: 403, path };
  }
  return { status: 200, path };
}

server.setRequestCallback(acceptRequest);
const sessions = server.sessionStream("/wt");
server.startServer();
await server.ready;

async function handleSession(session) {
  // Add one of the server-side examples below here.
}

for await (const session of sessions) {
  session.closed.catch(console.error);
  session.ready.then(() => handleSession(session)).catch(console.error);
}
```

If you want to run the code, you need to replace all instances of `example.com` in both the client and server code with their actual respective endpoints. You also need to supply `certificate.pem` and `private-key.pem`, which contain a browser-trusted TLS certificate and its private key.

Unless stated otherwise, each server-side example below replaces the body of `handleSession()`. The `session` object represents one accepted client session.

### Closing the connection

You can respond to the connection closing by waiting for the `WebTransport.closed` promise to fulfill. Errors returned by WebTransport operations are of type `WebTransportError`, and contain additional data on top of the standard `DOMException` set.

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

In `@fails-components/webtransport`, call `session.close()` to close the session:

```js
// -- server.js --
session.close({ closeCode: 0, reason: "Work complete" });
await session.closed;
```

The server may also indicate that it wants to drain the connection prior to closing, perhaps due to management of the underlying transport.
For example, in `@fails-components/webtransport`, this is done with `session.notifySessionDraining()`.
When this happens, the client should start closing streams, and create a new session if it needs to continue its work.
You can detect this using the `WebTransport.draining` promise, which fulfills once the server signals that the session is entering the draining state:

```js
async function watchForDraining(transport) {
  // Fulfills when the server signals that the session is draining
  await transport.draining;

  console.log("The session is draining: avoid opening new streams.");
}
```

### Negotiating an application protocol

A WebTransport server can support multiple applications, each using its own "custom" communication protocol.
To support this, the client can offer a list of candidate protocol names in preference order via the `protocols` option of the `WebTransport()` constructor.
The server can then choose to select one of these during connection establishment.

Once the `WebTransport.ready` promise fulfills, the negotiated protocol (if any) is available via the `WebTransport.protocol` property.
This is the empty string if `protocols` was not used, or if the server did not select any of the offered protocols.
A server that supports none of the offered protocols may instead reject the connection outright, causing `ready` to reject.

```js
const url = "https://example.com:4999/wt";

async function initTransport(url) {
  const transport = new WebTransport(url, {
    protocols: ["chat", "file-transfer"],
  });

  try {
    await transport.ready;
    console.log(transport.protocol); // e.g. "chat", or "" if none was selected
    return transport;
  } catch (error) {
    console.error(`Connection failed: ${error}`);
  }
}
```

When the `@fails-components/webtransport` library parses the headers, it special cases `header["wt-available-protocols"]` and converts the value into an array. For example, you can replace `server.setRequestCallback(acceptRequest)` with the following to reject malformed values and select the first protocol supported by the server:

```js
// -- server.js --
const supportedProtocols = new Set(["chat", "file-transfer"]);

server.setRequestCallback(async (request) => {
  const response = await acceptRequest(request);
  if (response.status !== 200) {
    return response;
  }

  const offeredProtocols = request.header["wt-available-protocols"] ?? [];
  if (!Array.isArray(offeredProtocols)) {
    return { ...response, status: 400 };
  }
  const selectedProtocol = offeredProtocols.find((protocol) =>
    supportedProtocols.has(protocol),
  );
  return { ...response, selectedProtocol };
});
```

### Unreliable transmission via datagrams

"Unreliable" means that transmission of data is not guaranteed, nor is arrival in a specific order. This is fine in some situations and provides very fast delivery. For example, you might want to transmit regular game state updates where each message supersedes the last one that arrives, and order is not important.

Unreliable data transmission is handled via the `WebTransport.datagrams` property — this returns a `WebTransportDatagramDuplexStream` object containing everything you need to send datagrams to the server, and receive them back.

The `WebTransportDatagramDuplexStream.writable` property returns a `WritableStream` object that you can write data to using a writer, for transmission to the server:

```js
const writer = transport.datagrams.writable.getWriter();
const data1 = new Uint8Array([65, 66, 67]);
const data2 = new Uint8Array([68, 69, 70]);
writer.write(data1);
writer.write(data2);
```

In `@fails-components/webtransport`, read these datagrams from `session.datagrams.readable`:

```js
// -- server.js --
for await (const data of session.datagrams.readable) {
  console.log(data); // A Uint8Array sent by the client.
}
```

The `WebTransportDatagramDuplexStream.readable` property returns a `ReadableStream` object that you can use to receive data from the server:

```js
async function readData() {
  const reader = transport.datagrams.readable.getReader();
  while (true) {
    const { value, done } = await reader.read();
    if (done) {
      break;
    }
    // value is a Uint8Array.
    console.log(value);
  }
}
```

In `@fails-components/webtransport`, to send datagrams for this client code to read, obtain a writer:

```js
// -- server.js --
const writer = session.datagrams.createWritable().getWriter();
try {
  await writer.write(new Uint8Array([65, 66, 67]));
  await writer.write(new Uint8Array([68, 69, 70]));
} finally {
  writer.releaseLock();
}
```

On the client, you can also read datagrams into a buffer that you supply, by constructing the transport with the `datagramsReadableType` option set to `bytes` and reading the stream using a `ReadableStreamBYOBReader`.
See the Reading datagrams with a BYOB reader example on the `WebTransport()` constructor page.

### Reliable transmission via streams

"Reliable" means that transmission and order of data are guaranteed. That provides slower delivery (albeit faster than with WebSockets), and is needed in situations where reliability and ordering are important (such as chat applications, for example).

When using reliable transmission via streams you can also set the relative priority of different streams over the same transport.

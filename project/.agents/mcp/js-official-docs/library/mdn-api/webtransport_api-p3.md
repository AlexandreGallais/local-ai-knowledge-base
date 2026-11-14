---
title: "WebTransport API (part 3 of 3)"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webtransport_api/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebTransport API (part 3 of 3)

### Unidirectional transmission

To open a unidirectional stream from a user agent, you use the `WebTransport.createUnidirectionalStream()` method to get a reference to a `WritableStream`. From this you can get a writer to allow data to be written to the stream and sent to the server.

```js
async function writeData() {
  const stream = await transport.createUnidirectionalStream();
  const writer = stream.getWriter();
  const data1 = new Uint8Array([65, 66, 67]);
  const data2 = new Uint8Array([68, 69, 70]);
  writer.write(data1);
  writer.write(data2);

  try {
    await writer.close();
    console.log("All data has been sent.");
  } catch (error) {
    console.error(`An error occurred: ${error}`);
  }
}
```

Note also the use of the `WritableStreamDefaultWriter.close()` method to close the stream once all data has been sent.

In `@fails-components/webtransport`, each item in `session.incomingUnidirectionalStreams` is a readable stream carrying data from the client. Start a separate reader for each stream so that a stream waiting for data does not prevent the server from accepting another:

```js
// -- server.js --
async function receiveStream(stream) {
  for await (const data of stream) {
    console.log(data); // A Uint8Array sent by the client.
  }
}

for await (const stream of session.incomingUnidirectionalStreams) {
  receiveStream(stream).catch(console.error);
}
```

If the server opens a unidirectional stream to transmit data to the client, this can be accessed on the client via the `WebTransport.incomingUnidirectionalStreams` property, which returns a `ReadableStream` of `WebTransportReceiveStream` objects. These can be used to read `Uint8Array` instances sent by the server.

In this case, the first thing to do is set up a function to read a `WebTransportReceiveStream`. These objects inherit from the `ReadableStream` class, so can be used in just the same way:

```js
async function readData(receiveStream) {
  const reader = receiveStream.getReader();
  while (true) {
    const { done, value } = await reader.read();
    if (done) {
      break;
    }
    // value is a Uint8Array
    console.log(value);
  }
}
```

Next, call `WebTransport.incomingUnidirectionalStreams` and get a reference to the reader available on the `ReadableStream` it returns, and then use the reader to read the data from the server. Each chunk is a `WebTransportReceiveStream`, and we use the `readData()` set up earlier to read them:

```js
async function receiveUnidirectional() {
  const uds = transport.incomingUnidirectionalStreams;
  const reader = uds.getReader();
  while (true) {
    const { done, value } = await reader.read();
    if (done) {
      break;
    }
    // value is an instance of WebTransportReceiveStream
    await readData(value);
  }
}
```

In `@fails-components/webtransport`, to supply a stream for the client's `receiveUnidirectional()` and `readData()` functions, create a unidirectional stream and write to it:

```js
// -- server.js --
const stream = await session.createUnidirectionalStream();
const writer = stream.getWriter();
await writer.write(new Uint8Array([65, 66, 67]));
await writer.write(new Uint8Array([68, 69, 70]));
await writer.close();
```

#### Bidirectional transmission

To open a bidirectional stream from a user agent, you use the `WebTransport.createBidirectionalStream()` method to get a reference to a `WebTransportBidirectionalStream`.
This contains `readable` and `writable` properties returning references to `WebTransportReceiveStream` and `WebTransportSendStream` instances that can be used to read from and write to the server.

> **Note:**
> `WebTransportBidirectionalStream` is similar to `WebTransportDatagramDuplexStream`, except that in that interface the `readable` and `writable` properties are `ReadableStream` and `WritableStream` respectively.

```js
async function setUpBidirectional() {
  const stream = await transport.createBidirectionalStream();
  // stream is a WebTransportBidirectionalStream
  // stream.readable is a WebTransportReceiveStream
  const readable = stream.readable;
  // stream.writable is a WebTransportSendStream
  const writable = stream.writable;

  // …
  return stream;
}
```

Reading from the `WebTransportReceiveStream` can then be done as follows:

```js
async function readData(readable) {
  const reader = readable.getReader();
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

And writing to the `WebTransportSendStream` can be done like this:

```js
async function writeData(writable) {
  const writer = writable.getWriter();
  const data1 = new Uint8Array([65, 66, 67]);
  const data2 = new Uint8Array([68, 69, 70]);
  await writer.write(data1);
  await writer.write(data2);
  await writer.close();
}
```

Run the client functions concurrently so that reading can proceed while writing:

```js
const stream = await setUpBidirectional();
await Promise.all([readData(stream.readable), writeData(stream.writable)]);
```

In `@fails-components/webtransport`, accept the client-created streams from `session.incomingBidirectionalStreams`. Each has a `readable` side for data from the client and a `writable` side for data to the client:

```js
// -- server.js --
for await (const stream of session.incomingBidirectionalStreams) {
  // Echo received bytes back to the client. Each stream is handled separately.
  stream.readable.pipeTo(stream.writable).catch(console.error);
}
```

This handler pairs with both functions: `pipeTo()` reads the bytes sent by `writeData()` and writes them back for `readData()`.

If the server opens a bidirectional stream to transmit data to and receive it from the client, this can be accessed via the `WebTransport.incomingBidirectionalStreams` property, which returns a `ReadableStream` of `WebTransportBidirectionalStream` objects. Each one can be used to read and write `Uint8Array` instances as shown above. However, as with the unidirectional example, you need an initial function to read the bidirectional stream in the first place:

```js
async function receiveBidirectional() {
  const bds = transport.incomingBidirectionalStreams;
  const reader = bds.getReader();
  while (true) {
    const { done, value } = await reader.read();
    if (done) {
      break;
    }
    // value is an instance of WebTransportBidirectionalStream
    await readData(value.readable);
    await writeData(value.writable);
  }
}
```

To pair with `receiveBidirectional()`, the server creates a stream, sends data, and closes its sending side before reading the client's reply. Closing the sending side allows the client's `readData()` call to finish so that it can call `writeData()`:

```js
// -- server.js --
const stream = await session.createBidirectionalStream();
const writer = stream.writable.getWriter();
await writer.write(new Uint8Array([65, 66, 67]));
await writer.close();

for await (const data of stream.readable) {
  console.log(data); // The client's reply.
}
```

## Interfaces

- `WebTransport`
    Provides functionality to enable a user agent to connect to an HTTP/3 server, initiate reliable and unreliable transport in either or both directions, and close the connection once it is no longer needed.
- `WebTransportBidirectionalStream`
    Represents a bidirectional stream created by a server or a client that can be used for reliable transport. Provides access to a `ReadableStream` for reading incoming data, and a `WritableStream` for writing outgoing data.
- `WebTransportDatagramDuplexStream`
    Represents a duplex stream that can be used for unreliable transport of datagrams between client and server. Provides access to a `ReadableStream` for reading incoming datagrams, a `WritableStream` for writing outgoing datagrams, and various settings and statistics related to the stream.
- `WebTransportError`
    Represents an error related to the WebTransport API, which can arise from server errors, network connection problems, or client-initiated abort operations (for example, arising from a `WritableStream.abort()` call).
- `WebTransportReceiveStream`
    Provides streaming features for an incoming WebTransport unidirectional or bidirectional `WebTransport` stream.
- `WebTransportSendStream`
    Provides streaming features for an outgoing WebTransport unidirectional or bidirectional `WebTransport` stream.

## Examples

For complete examples, see:

- WebTransport over HTTP/3 client

## See also

- Using WebTransport
- `WebSockets API`
- `Streams API`
- WebTransport over HTTP/3

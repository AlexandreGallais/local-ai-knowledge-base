---
title: "WebTransport: WebTransport() constructor (part 2 of 2)"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webtransport/webtransport/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebTransport: WebTransport() constructor (part 2 of 2)

## Examples

### Connecting with default options

This example shows how you might construct a `WebTransport` using just a URL, wait for it to connect, and then monitor the transport and report when it closes.

First, we define an `async` method that takes a URL and uses it to construct the `WebTransport` object.
No constructor options are specified, so the connection uses default options: dedicated connection, support for unreliable transports isn't required, default congestion control, and normal Web PKI authentication with the server.
Note that the scheme must be HTTPS, and the port number must be explicitly specified.

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

The `closeTransport()` method below shows how.
Within a `try...catch` block, it uses `await` to wait for the `closed` promise to fulfill or reject, and then reports whether or not the connection closed intentionally or due to an error.

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

### Connecting with server certificate hashes

The example below shows the code to construct a `WebTransport` that specifies the `serverCertificateHashes` option.
In this case, the array contains two hashes, both encoded using the SHA-256 algorithm.
Note that the `allowPooling` option must be `false` (the default).

The `value` of each hash can be an `ArrayBuffer`, a `TypedArray` (for example, a `Uint8Array`), or a `DataView`. The example below represents each SHA-256 hash value as a `Uint8Array`; for example, the hexadecimal string `5a1559...` corresponds to the byte values `0x5a`, `0x15`, `0x59`, and so on.

```js
const transport = new WebTransport(url, {
  serverCertificateHashes: [
    {
      // 5a155927eba7996228455e4721e6fe5f739ae15db6915d765e5db302b4f8a274
      algorithm: "sha-256",
      value: new Uint8Array([
        0x5a, 0x15, 0x59, 0x27, 0xeb, 0xa7, 0x99, 0x62, 0x28, 0x45, 0x5e, 0x47,
        0x21, 0xe6, 0xfe, 0x5f, 0x73, 0x9a, 0xe1, 0x5d, 0xb6, 0x91, 0x5d, 0x76,
        0x5e, 0x5d, 0xb3, 0x02, 0xb4, 0xf8, 0xa2, 0x74,
      ]),
    },
    {
      // 7d7094e7a8d3097feff3b5ee84fa5cab58e4de78f38bcfdee5ea8b51f4bfa8fd
      algorithm: "sha-256",
      value: new Uint8Array([
        0x7d, 0x70, 0x94, 0xe7, 0xa8, 0xd3, 0x09, 0x7f, 0xef, 0xf3, 0xb5, 0xee,
        0x84, 0xfa, 0x5c, 0xab, 0x58, 0xe4, 0xde, 0x78, 0xf3, 0x8b, 0xcf, 0xde,
        0xe5, 0xea, 0x8b, 0x51, 0xf4, 0xbf, 0xa8, 0xfd,
      ]),
    },
  ],
});
```

### Reading datagrams with a BYOB reader

This example shows how to read incoming datagrams into a buffer that you supply, using a `ReadableStreamBYOBReader`.

First, we construct the `WebTransport` with the `datagramsReadableType` option set to `bytes`, so that the transport's `datagrams.readable` property returns a readable byte stream.
We then get a BYOB ("bring your own buffer") reader by passing `mode: "byob"` to `getReader()`.

We allocate a 64 KiB buffer, which is large enough to hold any datagram (see the `datagramsReadableType` option).
Each call to `read()` fills a view of this buffer with one datagram.
The returned `value` is a new `Uint8Array` over the same memory, sized to fit the datagram.
Passing a view to `read()` transfers its buffer, so the original can no longer be used.
Instead, we take the buffer from `value` and reuse it for the next read.

```js
const transport = new WebTransport(url, { datagramsReadableType: "bytes" });
await transport.ready;

const reader = transport.datagrams.readable.getReader({ mode: "byob" });
let buffer = new ArrayBuffer(65536);

while (true) {
  const { value, done } = await reader.read(new Uint8Array(buffer));
  if (done) {
    break;
  }
  // value is a Uint8Array containing one datagram
  console.log(`Received a datagram of ${value.byteLength} bytes`);
  buffer = value.buffer;
}
```

### Setting custom request headers

This example shows the three ways that you can use the `headers` option to add custom headers to the request that sets up the session.

First we pass an object literal, where each property name is a header name and its value is the header value:

```js
const transport = new WebTransport(url, {
  headers: {
    Authorization: "Bearer <example-value>",
    "X-Client-Version": "2.4.1",
  },
});
```

You can also pass an array of two-item `[name, value]` arrays:

```js
const transport = new WebTransport(url, {
  headers: [
    ["Authorization", "Bearer <example-value>"],
    ["X-Client-Version", "2.4.1"],
  ],
});
```

You can also pass a `Headers` object:

```js
const headers = new Headers();
headers.append("Authorization", "Bearer <example-value>");
headers.append("X-Client-Version", "2.4.1");

const transport = new WebTransport(url, { headers });
```

## See also

- Using WebTransport
- `WebSockets API`
- `Streams API`
- WebTransport over HTTP/3

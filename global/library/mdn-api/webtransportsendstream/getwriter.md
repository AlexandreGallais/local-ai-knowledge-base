---
title: "WebTransportSendStream: getWriter() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webtransportsendstream/getwriter/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebTransportSendStream: getWriter() method

The **`getWriter()`** method of the `WebTransportSendStream` interface returns a new `WebTransportWriter` object and locks the stream to that instance. While the stream is locked, no other writer can be acquired until this one is released.

`WebTransportWriter` is a subclass of `WritableStreamDefaultWriter` that additionally provides the `atomicWrite()` and `commit()` methods.

## Syntax

```js
getWriter()
```

### Parameters

None.

### Return value

A `WebTransportWriter` object instance.

### Exceptions

- `TypeError`
    The stream is already locked to another writer.

## Examples

The following example shows how to open a unidirectional stream over a `WebTransport` connection and use `getWriter()` to write chunks of data to it.

```js
const transport = new WebTransport("https://example.com/webtransport");
await transport.ready;

const stream = await transport.createUnidirectionalStream();
const writer = stream.getWriter();

const encoder = new TextEncoder();
await writer.write(encoder.encode("Hello"));
await writer.write(encoder.encode(", world!"));
await writer.close();
```

## See also

- `WritableStream.getWriter()`
- `WritableStreamDefaultWriter`
- Using WebTransport

---
title: "WebTransportSendStream: getStats() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webtransportsendstream/getstats/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebTransportSendStream: getStats() method

The **`getStats()`** method of the `WebTransportSendStream` interface asynchronously returns an object containing statistics for the current stream.

The statistics include the total number of bytes written to the stream, the number that have been sent (ignoring packet overhead), and the number of bytes that have been set at least once, and the number that have been acknowledged (up until the first sequentially-ordered non-acknowledged byte).
It therefore provides a measure of how quickly the application is sending bytes to the server on this particular stream.

## Syntax

```js
getStats()
```

### Parameters

None.

### Return value

A `Promise` that resolves to an object containing statistics about the current stream.
The returned object has the following properties:

- `bytesAcknowledged`
    A positive integer indicating the number of bytes written to this stream that have been sent and acknowledged as received by the server, using QUIC's ACK mechanism.
    Only sequential bytes up to, but not including, the first non-acknowledged byte, are counted.
    This number can only increase and is always less than or equal to `bytesSent`.
    When the connection is over HTTP/2, the value will match `bytesSent`.
- `bytesSent`
    A positive integer indicating the number of bytes written to this stream that have been sent at least once (but not necessarily acknowledged).
    This number can only increase, and is always less than or equal to `bytesWritten`.
    Note that this count does not include bytes sent as network overhead (such as packet headers).
- `bytesWritten`
    A positive integer indicating the number of bytes successfully written to this stream.
    This number can only increase.

## Examples

The code snippet below uses `await` to wait on the `Promise` returned by `getStats()`.
When the promise fulfills, the result for the number of bytes that have been sent but not acknowledged is logged to the console.

```js
const stats = await stream.getStats();
const bytesNotReceived = stats.bytesSent - stats.bytesAcknowledged;
console.log(`Bytes sent but not acknowledged: ${bytesNotReceived}`);
```

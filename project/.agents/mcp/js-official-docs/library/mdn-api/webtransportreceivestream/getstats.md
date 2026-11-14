---
title: "WebTransportReceiveStream: getStats() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webtransportreceivestream/getstats/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebTransportReceiveStream: getStats() method

The **`getStats()`** method of the `WebTransportReceiveStream` interface asynchronously returns an object containing statistics for the current stream.

The statistics include the total number of ordered bytes that have arrived on this stream (ignoring network overhead, up until the first missing byte) and the total number that have been read by the application.
It therefore provides a measure of how quickly the application is consuming bytes from the server on this particular stream.

## Syntax

```js
getStats()
```

### Parameters

None.

### Return value

A `Promise` that resolves to an object containing statistics about the current stream.
The returned object has the following properties:

- `timestamp`
    A `DOMHighResTimeStamp` indicating the timestamp at which the statistics were gathered, relative to Jan 1, 1970, UTC.
- `bytesReceived`
    A positive integer indicating the number of bytes received by this stream, up to the first missing byte.
    The number does not include any network overhead, and can only increase.
- `bytesRead`
    A positive integer indicating the number of bytes the application has read from this `WebTransportReceiveStream` stream.
    This number can only increase, and is always less than or equal to `bytesReceived`.

## Examples

The code snippet below uses `await` to wait on the `Promise` returned by `getStats()`.
When the promise fulfills, the number of bytes that have not yet been read is logged to the console.

```js
const stats = await stream.getStats();
const unConsumedBytes = stats.bytesReceived - stats.bytesRead;
console.log(`Bytes in reader queue: ${unConsumedBytes}`);
```

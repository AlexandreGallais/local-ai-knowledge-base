---
title: "WebTransportSendGroup: getStats() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webtransportsendgroup/getstats/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebTransportSendGroup: getStats() method

The **`getStats()`** method of the `WebTransportSendGroup` interface returns a `Promise` that resolves to an object containing statistics aggregated across all of the `WebTransportSendStream` objects currently associated with this group.
That is, every stream whose `sendGroup` is set to this `WebTransportSendGroup`.

## Syntax

```js
getStats()
```

### Parameters

None.

### Return value

A `Promise` that resolves to an object containing aggregated statistics for the group's streams.
The returned object has the following properties:

- `bytesAcknowledged`
    A non-negative integer indicating the number of bytes written to the group's streams that have been sent and acknowledged as received by the server, using QUIC's ACK mechanism.
    Only sequential bytes up to, but not including, the first unacknowledged byte of each stream, are counted.
    This number can only increase and is always less than or equal to `bytesSent`.
- `bytesSent`
    A non-negative integer indicating the number of bytes written to the group's streams that have been sent at least once (but not necessarily acknowledged).
    This number can only increase, and is always less than or equal to `bytesWritten`.
    Note that this count does not include bytes sent as network overhead (such as packet headers).
- `bytesWritten`
    A non-negative integer indicating the number of bytes successfully written to the group's streams.
    This number can only increase.

## Examples

### Basic usage

The code snippet below uses `await` to wait on the `Promise` returned by `getStats()`, then logs the number of bytes that have been sent across the group's streams but not yet acknowledged:

```js
const stats = await sendGroup.getStats();
const bytesNotAcknowledged = stats.bytesSent - stats.bytesAcknowledged;
console.log(`Bytes sent but not yet acknowledged: ${bytesNotAcknowledged}`);
```

## See also

- Using WebTransport
- `Streams API`

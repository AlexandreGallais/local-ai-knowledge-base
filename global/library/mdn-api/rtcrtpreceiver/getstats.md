---
title: "RTCRtpReceiver: getStats() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtcrtpreceiver/getstats/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCRtpReceiver: getStats() method

The `RTCRtpReceiver` method **`getStats()`** asynchronously requests an `RTCStatsReport` object which provides statistics about incoming traffic on the owning `RTCPeerConnection`, returning a `Promise` whose fulfillment handler will be called once the results are available.

## Syntax

```js
getStats()
```

### Parameters

None.

### Return value

A JavaScript `Promise` which is fulfilled once the statistics are available.
The promise's fulfillment handler receives as a parameter a `RTCStatsReport` object containing the collected statistics.

The returned statistics include those from all streams which are coming in through the `RTCRtpReceiver`, as well as any of their dependencies.

These might include, for example, statistics with types: `inbound-rtp`, `candidate-pair`, `local-candidate`, `remote-candidate`.

## Examples

This simple example obtains the statistics for an `RTCRtpReceiver` and updates an element's `innerText` to display the number of packets lost.

```js
receiver.getStats().then((stats) => {
  document.getElementById("lost-packets").innerText = stats.packetsLost;
});
```

## See also

- WebRTC API
- `RTCStatsReport`
- `RTCRtpSender.getStats()`
- `RTCPeerConnection.getStats()`

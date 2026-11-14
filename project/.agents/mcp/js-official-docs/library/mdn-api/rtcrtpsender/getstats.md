---
title: "RTCRtpSender: getStats() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtcrtpsender/getstats/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCRtpSender: getStats() method

The `RTCRtpSender` method **`getStats()`** asynchronously requests an `RTCStatsReport` object which provides statistics about outgoing traffic on the `RTCPeerConnection` which owns the sender, returning a `Promise` which is fulfilled when the results are available.

## Syntax

```js
getStats()
```

### Parameters

None.

### Return value

A JavaScript `Promise` which is fulfilled once the statistics are available.
The promise's fulfillment handler receives as a parameter a `RTCStatsReport` object containing the collected statistics.

The returned `RTCStatsReport` accumulates the statistics for all of the streams being sent using the `RTCRtpSender`, as well as the statistics for any dependencies those streams have.

These might include, for example, statistics with types: `outbound-rtp`, `candidate-pair`, `local-candidate`, `remote-candidate`.

## Examples

This simple example obtains the statistics for an `RTCRtpSender` and updates an element's `innerText` to display the current round trip time for requests on the sender.

```js
sender.getStats().then((stats) => {
  document.getElementById("currentRTT").innerText = stats.roundTripTime;
});
```

## See also

- WebRTC API
- `RTCStatsReport`
- `RTCRtpReceiver.getStats()`
- `RTCPeerConnection.getStats()`

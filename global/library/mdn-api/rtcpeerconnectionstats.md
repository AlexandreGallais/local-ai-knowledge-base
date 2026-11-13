---
title: "RTCPeerConnectionStats"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtcpeerconnectionstats/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCPeerConnectionStats

The **`RTCPeerConnectionStats`** dictionary of the WebRTC API provides information about the high-level peer connection (`RTCPeerConnection`).

In particular, it provides the number of unique data channels that have been opened, and the number of opened channels that have been closed.
This allows the current number of open channels to be calculated.

These statistics can be obtained by iterating the `RTCStatsReport` returned by `RTCPeerConnection.getStats()` until you find a report with the `type` of `peer-connection`.

## Instance properties

- `dataChannelsOpened`
    A positive integer value indicating the number of unique `RTCDataChannel` objects that have entered the `open` state during their lifetime.
- `dataChannelsClosed`
    A positive integer value indicating the number of unique `RTCDataChannel` objects that have left the `open` state during their lifetime (channels that transition to `closing` or `closed` without ever being `open` are not counted in this number).
    A channel will leave the `open` state if either end of the connection or the underlying transport is closed.

### Common instance properties

The following properties are common to all WebRTC statistics objects.

- `id`
    A string that uniquely identifies the object that is being monitored to produce this set of statistics.
- `timestamp`
    A `DOMHighResTimeStamp` object indicating the time at which the sample was taken for this statistics object.
- `type`
    A string with the value `"peer-connection"`, indicating the type of statistics that the object contains.

## Examples

This example shows a function to return the total number of open connections, or `null` if no statistics are provided.
This might be called in a loop, similar to the approach used in `RTCPeerConnection.getStats()` example

The function waits for the result of a call to `RTCPeerConnection.getStats()` and then iterates the returned `RTCStatsReport` to get just the stats of type `"peer-connection"`.
It then returns the total number of open channels, or `null`, using the data in the report.

```js
async function numberOpenConnections(peerConnection) {
  const stats = await peerConnection.getStats();
  let peerConnectionStats = null;

  for (const report of stats.values()) {
    if (report.type === "peer-connection") {
      peerConnectionStats = report;
      break;
    }
  }

  if (
    peerConnectionStats === null ||
    typeof peerConnectionStats.dataChannelsOpened === "undefined" ||
    typeof peerConnectionStats.dataChannelsClosed === "undefined"
  ) {
    return null;
  }

  return (
    peerConnectionStats.dataChannelsOpened -
    peerConnectionStats.dataChannelsClosed
  );
}
```

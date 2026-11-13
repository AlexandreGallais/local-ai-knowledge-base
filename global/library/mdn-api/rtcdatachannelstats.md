---
title: "RTCDataChannelStats"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtcdatachannelstats/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCDataChannelStats

The **`RTCDataChannelStats`** dictionary of the WebRTC API provides statistics related to one `RTCDataChannel` object on the connection.

The report can be obtained by iterating the `RTCStatsReport` returned by `RTCPeerConnection.getStats()` until you find an entry with the `type` of `data-channel`.

The data channels statistics may be correlated to a particular channel by comparing the `dataChannelIdentifier` property to a matching `RTCDataChannel.id`.

## Instance properties

- `bytesSent` (optional)
    A positive integer value indicating the total number of payload bytes sent on the associated `RTCDataChannel`.
- `bytesReceived` (optional)
    A positive integer value indicating the total number of payload bytes received on the associated `RTCDataChannel`.
- `dataChannelIdentifier` (optional)
    A positive integer value containing the `id` of the associated `RTCDataChannel`.
- `label` (optional)
    A string containing the `label` of the associated `RTCDataChannel`.
- `messagesReceived` (optional)
    A positive integer value indicating the total number of `message` events fired for received messages on the associated `RTCDataChannel`.
- `messagesSent` (optional)
    A positive integer value indicating the total number of `message` events fired for sent messages on the channel.
- `protocol` (optional)
    A string containing the `protocol` of the associated `RTCDataChannel`.
- `state`
    The `readyState` of the associated `RTCDataChannel`.

### Common instance properties

The following properties are common to all WebRTC statistics objects (See `RTCStatsReport` for more information).

- `id`
    A string that uniquely identifies the object that is being monitored to produce this set of statistics.
- `timestamp`
    A `DOMHighResTimeStamp` object indicating the time at which the sample was taken for this statistics object.
- `type`
    A string with the value `"data-channel"`, indicating the type of statistics that the object contains.

## Examples

Given a variable `myPeerConnection`, which is an instance of `RTCPeerConnection`, the code below uses `await` to wait for the statistics report, and then iterates it using `RTCStatsReport.forEach()`.
It then filters the dictionaries for just those reports that have the type of `data-channel` and logs the result.

```js
const stats = await myPeerConnection.getStats();

stats.forEach((report) => {
  if (report.type === "data-channel") {
    // Log the channel information
    console.log(report);
  }
});
```

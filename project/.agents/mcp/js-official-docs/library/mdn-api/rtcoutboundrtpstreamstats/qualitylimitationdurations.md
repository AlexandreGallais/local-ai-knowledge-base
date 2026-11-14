---
title: "RTCOutboundRtpStreamStats: qualityLimitationDurations property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtcoutboundrtpstreamstats/qualitylimitationdurations/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCOutboundRtpStreamStats: qualityLimitationDurations property

The **`qualityLimitationDurations`** property of the `RTCOutboundRtpStreamStats` dictionary is a map of the reasons that a media stream's quality has been reduced by a codec during encoding, and the time during which the quality was reduced for each reason.

This quality reduction may include changes such as reduced frame rate or resolution, or an increase in compression factor.
The information can be used to diagnose throughput issues and optimize performance.

> **Note:**
> This property only exists for video media.

## Value

A `Map` of quality limitation reasons to a number which represents the time in seconds that the stream has been quality limited for that reason.

The allowed quality limitation reason values are the strings:

- `none`
    The quality is not limited.
- `cpu`
    The quality is primarily limited due to CPU load.
- `bandwidth`
    The quality is primarily limited due to congestion cues during bandwidth estimation, such as inter-arrival time and round-trip time.
- `other`
    The quality is primarily limited for a reason other than the above.

## Examples

### Get total time the stream has been quality limited

The sum of all entries except `qualityLimitationDurations["none"]` gives the total time that the stream has been limited.

```js
// Get the outbound RTP stream stats
pc.getStats().then((stats) => {
  stats.forEach((report) => {
    if (report.type === "outbound-rtp") {
      const qualityLimitations = report.qualityLimitationDurations;
      if (qualityLimitations) {
        let totalTimeLimited = 0;

        console.log("Quality Limitations:");
        qualityLimitations.forEach((duration, reason) => {
          console.log(`- ${reason}: ${duration} seconds`);
          if (reason !== "none") {
            totalTimeLimited += duration;
          }
        });
        console.log(`Total time limited: ${totalTimeLimited}`);
      }
    }
  });
});
```

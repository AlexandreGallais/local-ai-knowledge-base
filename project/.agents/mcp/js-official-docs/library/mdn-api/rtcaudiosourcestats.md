---
title: "RTCAudioSourceStats"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtcaudiosourcestats/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCAudioSourceStats

The **`RTCAudioSourceStats`** dictionary of the WebRTC API provides statistics information about an audio track (`MediaStreamTrack`) that is attached to one or more senders (`RTCRtpSender`).

These statistics can be obtained by iterating the `RTCStatsReport` returned by `RTCRtpSender.getStats()` or `RTCPeerConnection.getStats()` until you find a report with the `type` of `media-source` and a `kind` of `audio`.

> **Note:**
> For audio information about remotely sourced tracks (that are being received), see `RTCInboundRtpStreamStats`.

## Instance properties

- `audioLevel` (experimental)(optional)
    A number that represents the audio level of the media source.
- `totalAudioEnergy` (experimental)(optional)
    A number that represents the total audio energy of the media source over the lifetime of the stats object.
- `totalSamplesDuration` (experimental)(optional)
    A number that represents the total duration of all samples produced by the media source over the lifetime of the stats object.

### Common media-source properties

The following properties are present in both `RTCAudioSourceStats` and `RTCVideoSourceStats`:

- `trackIdentifier`
    A string that contains the `id` value of the `MediaStreamTrack` associated with the audio source.
- `kind`
    A string indicating whether this object represents stats for a video source or a media source. For an `RTCAudioSourceStats` this will always be `audio`.

### Common instance properties

The following properties are common to all statistics objects.

- `id`
    A string that uniquely identifies the object that is being monitored to produce this set of statistics.
- `timestamp`
    A `DOMHighResTimeStamp` object indicating the time at which the sample was taken for this statistics object.
- `type`
    A string with the value `"media-source"`, indicating that the object is an instance of either `RTCAudioSourceStats` or `RTCVideoSourceStats`.

## Description

The interface provides statistics about an audio media source attached to one or more senders.
The information includes the current audio level, averaged over a short (implementation dependent) duration.

The statistics also include the accumulated total energy and total sample duration, at a particular timestamp.
The totals can be used to determine the average audio level over the lifetime of the stats object.
You can calculate a root mean square (RMS) value in the same units as `audioLevel` using the following formula:

<math display="block">
  <semantics><msqrt><mfrac><mi>totalAudioEnergy</mi><mi>totalSamplesDuration</mi></mfrac></msqrt><annotation encoding="TeX">\sqrt{\frac{totalAudioEnergy}{totalSamplesDuration}}</annotation></semantics>
</math>

You can also use the accumulated totals to calculate the average audio level over an arbitrary time period.

The total audio energy of the stats object is accumulated by adding the energy of every sample over the lifetime of the stats object, while the total duration is accumulated by adding the duration of each sample.
The energy of each sample is determined using the following formula, where `sample_level` is the level of the sample, `max_level` is the highest-intensity encodable value, and `duration` is the duration of the sample in seconds:

<math display="block">
  <semantics><mrow><mi>duration</mi><mo>×</mo><msup><mrow><mo>(</mo><mfrac><mi>sample_level</mi><mi>max_level</mi></mfrac><mo>)</mo></mrow><mn>2</mn></msup></mrow><annotation encoding="TeX">duration \times⁢ \left(\left(\right. \frac{sample{\_}level}{max{\_}level} \left.\right)\right)^{2}</annotation></semantics>
</math>

The average audio level between any two different `getStats()` calls, over any duration, can be calculated using the following equation:

<math display="block">
  <semantics><msqrt><mfrac><mrow><msub><mi>totalAudioEnergy</mi><mn>2</mn></msub><mo>-</mo><msub><mi>totalAudioEnergy</mi><mn>1</mn></msub></mrow><mrow><msub><mi>totalSamplesDuration</mi><mn>2</mn></msub><mo>-</mo><msub><mi>totalSamplesDuration</mi><mn>1</mn></msub></mrow></mfrac></msqrt><annotation encoding="TeX">\sqrt{\frac{\left(totalAudioEnergy\right)_{2} - \left(totalAudioEnergy\right)_{1}}{\left(totalSamplesDuration\right)_{2} - \left(totalSamplesDuration\right)_{1}}}</annotation></semantics>
</math>

## Examples

This example shows how you might iterate the stats object returned from `RTCRtpSender.getStats()` to get the audio source stats, and then extract the `audioLevel`.

```js
// where sender is an RTCRtpSender
const stats = await sender.getStats();
let audioSourceStats = null;

for (const report of stats.values()) {
  if (report.type === "media-source" && report.kind === "audio") {
    audioSourceStats = report;
    break;
  }
}

const audioLevel = audioSourceStats?.audioLevel;
```

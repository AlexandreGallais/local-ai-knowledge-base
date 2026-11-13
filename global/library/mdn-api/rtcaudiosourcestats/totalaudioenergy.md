---
title: "RTCAudioSourceStats: totalAudioEnergy property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtcaudiosourcestats/totalaudioenergy/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCAudioSourceStats: totalAudioEnergy property

The **`totalAudioEnergy`** property of the `RTCAudioSourceStats` dictionary represents the total audio energy of the media source over the lifetime of this stats object.

The total energy across a particular duration can be determined by subtracting the value of this property returned by two different `getStats()` calls.

> **Note:**
> For audio energy of remotely sourced tracks, see `RTCInboundRtpStreamStats.totalAudioEnergy`.

## Value

A number produced by summing the energy of every sample over the lifetime of this stats object.

The energy of each sample is calculated by dividing the sample's value by the highest-intensity encodable value, squaring the result, and then multiplying by the duration of the sample in seconds.
This is shown as an equation below:

<math display="block">
  <semantics><mrow><mi>duration</mi><mo>×</mo><msup><mrow><mo>(</mo><mfrac><mi>sample_level</mi><mi>max_level</mi></mfrac><mo>)</mo></mrow><mn>2</mn></msup></mrow><annotation encoding="TeX">duration \times⁢ \left(\left(\right. \frac{sample{\_}level}{max{\_}level} \left.\right)\right)^{2}</annotation></semantics>
</math>

Note that if multiple audio channels are used, the audio energy of a sample refers to the highest energy of any channel.

---
title: "RTCIceCandidatePairStats: writable property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtcicecandidatepairstats/writable/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCIceCandidatePairStats: writable property

The **`writable`** property of the `RTCIceCandidatePairStats` dictionary indicates whether or not the connection described by the candidate pair is writable.

## Value

`true` if the connection described by this candidate pair has received acknowledgement of receipt (ACK) for at least one ICE request _and_ that STUN consent hasn't expired.

> **Note:**
> This property is deprecated.
> You can instead determine whether or not an incoming ICE request is available to read by checking to see if `responsesReceived` is greater than 0, and that the time specified by `consentExpiredTimestamp` has not passed:
>
> ```js
> if (
>   icpStats.responsesReceived > 0 &&
>   icpStats.consentExpiredTimestamp < performance.now()
> ) {
>   /* at least one ICE response has been received */
> }
> ```

## Specifications

This property was removed from the specification in early 2017.

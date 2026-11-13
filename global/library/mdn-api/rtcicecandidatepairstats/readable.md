---
title: "RTCIceCandidatePairStats: readable property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtcicecandidatepairstats/readable/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCIceCandidatePairStats: readable property

The **`readable`** property of the `RTCIceCandidatePairStats` dictionary reports whether or not the connection described by the candidate pair has received at least one valid incoming ICE request.

## Value

A Boolean value which is `true` if the connection described by this candidate pair has received at least one valid ICE request, and is therefore ready to be read from.

> **Note:**
> Instead of using this value you should determine whether or not the connection is readable by checking to see if `requestsReceived` is greater than 0:
>
> ```js
> if (icpStats.requestsReceived > 0) {
>   /* at least one ICE request has been received */
> }
> ```

## Specifications

This property was removed from the specification in early 2017.

---
title: "RTCIceCandidateStats: priority property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtcicecandidatestats/priority/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCIceCandidateStats: priority property

The **`priority`** property of the `RTCIceCandidateStats` dictionary is a positive integer value indicating the priority (or desirability) of the described candidate.

## Value

A positive integer indicating the priority of the `RTCIceCandidate` described by the `RTCIceCandidateStats` object.
The value may be anywhere from 1 to 2,147,483,647.

## Description

During ICE negotiation while setting up a WebRTC peer connection, the priority values reported to the remote peer by a user agent are used to determine which candidates are considered "more desirable".
The higher the value, the more desirable the candidate is.

### Determining priority

The ICE specification describes how user agents and other software using WebRTC should calculate the priority.
The priority of a candidate is calculated using the following variables as inputs:

- The preferability of the candidate type (local, server reflexive, peer reflexive, or relayed)
- The preferability of the candidate's specific IP address (for multihomed agents)
- The candidate's component ID (1 for RTP, 2 for RTCP)

The candidate's priority is computed using the formula (_ptype_ is the priority of the candidate's type and _plocal_ is the priority of the IP address):

<math display="block">
  <semantics><mrow><mi mathvariant="italic">priority</mi><mo>=</mo><msup><mn>2</mn><mn>24</mn></msup><mo>×</mo><msub><mi>p</mi><mrow><mi>type</mi></mrow></msub><mo>+</mo><msup><mn>2</mn><mn>8</mn></msup><mo>×</mo><msub><mi>p</mi><mrow><mi>local</mi></mrow></msub><mo>+</mo><mo stretchy="false">(</mo><mn>256</mn><mo>-</mo><mi mathvariant="italic">componentID</mi><mo stretchy="false">)</mo></mrow><annotation encoding="TeX">\mathit{priority} = 2^{24} \times p_{type} + 2^{8} \times p_{local} + \left(\right. 256 - \mathit{componentID} \left.\right)</annotation></semantics>
</math>

This is equivalent to mapping the priorities of the candidate type, the local IP, and the component ID into various bit ranges within the 32-bit `priority` value.

## See also

- 4.1.2.1: Recommended Formula section in the ICE specification

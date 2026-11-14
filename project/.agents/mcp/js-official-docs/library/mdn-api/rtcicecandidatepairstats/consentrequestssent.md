---
title: "RTCIceCandidatePairStats: consentRequestsSent property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtcicecandidatepairstats/consentrequestssent/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCIceCandidatePairStats: consentRequestsSent property

The **`consentRequestsSent`** property of the `RTCIceCandidatePairStats` dictionary indicates the total number of consent requests sent on this candidate pair.

If either or both of the peers in the pair access the internet via Network Address Translation (NAT), the other peer will need to regularly send a Session Traversal Utilities for NAT (STUN) request to the NAT firewall to ask for consent to allow traffic to flow.
This property counts the number of requests.
7675 has more information about NAT and consent.

## Value

An integer value indicating the total number consent requests sent to the peers in the candidate pair.

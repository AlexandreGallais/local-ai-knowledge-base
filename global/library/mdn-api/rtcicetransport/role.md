---
title: "RTCIceTransport: role property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtcicetransport/role/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCIceTransport: role property

The **`role`** read-only property of the `RTCIceTransport` interface indicates which ICE role the transport is fulfilling: that of the controlling agent, or the agent that is being controlled.

You can learn more about ICE roles in Choosing a candidate pair.

## Value

A string specifying whether the `RTCIceTransport` represents the controlling agent or the controlled agent.

The value must be one of the following:

- `"controlled"`
    The transport is the controlled agent.
- `"controlling"`
    The `RTCIceTransport` object is serving as the controlling agent.
- `"unknown"`
    The role has not yet been determined.

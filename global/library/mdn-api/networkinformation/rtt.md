---
title: "NetworkInformation: rtt property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/networkinformation/rtt/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# NetworkInformation: rtt property

The **`rtt`** read-only property of the `NetworkInformation` interface returns the estimated effective round-trip time of the current connection, rounded to the nearest multiple of 25 milliseconds.
This value is based on recently observed application-layer RTT measurements across recently active connections.
It excludes connections made to a private address space.
If no recent measurement data is available, the value is based on the properties of the underlying connection technology.

## Value

A number.

## See also

- `RTT`

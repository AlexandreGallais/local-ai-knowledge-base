---
title: "NetworkInformation: downlink property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/networkinformation/downlink/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# NetworkInformation: downlink property

The **`downlink`** read-only property of the
`NetworkInformation` interface returns the effective bandwidth estimate in
megabits per second, rounded to the nearest multiple of 25 kilobits per seconds. This
value is based on recently observed application layer throughput across recently active
connections, excluding connections made to a private address space. In the absence of
recent bandwidth measurement data, the attribute value is determined by the properties
of the underlying connection technology.

## Value

A number.

## See also

- `Downlink`

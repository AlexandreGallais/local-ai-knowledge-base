---
title: "RTCSctpTransport: state property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtcsctptransport/state/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCSctpTransport: state property

The **`state`** read-only property of the `RTCSctpTransport` interface provides information which describes a Stream Control Transmission Protocol (SCTP) transport state.

## Value

A string whose value is one of the following:

- `connecting`
    The initial state when the connection is being established.
- `connected`
    The connection is open for data transmission.
- `closed`
    The connection is closed and can no longer be used.

## See also

- `RTCSctpTransport`

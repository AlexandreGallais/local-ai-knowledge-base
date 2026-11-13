---
title: "RTCError: sctpCauseCode property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtcerror/sctpcausecode/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCError: sctpCauseCode property

The **`sctpCauseCode`** read-only property of the `RTCError` interface provides the SCTP cause code explaining why the SCTP negotiation failed, if the `RTCError` represents an SCTP error.

## Value

A positive integer specifying the SCTP cause code explaining why the error occurred.
This property must only be set if `errorDetail` is `sctp-failure`, and is otherwise `null`.

The standard SCTP error cause codes, numbered 1-13, are defined in the SCTP specification: 3.3.10.

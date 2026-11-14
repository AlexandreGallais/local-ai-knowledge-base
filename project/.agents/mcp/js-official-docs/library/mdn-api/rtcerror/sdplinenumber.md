---
title: "RTCError: sdpLineNumber property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtcerror/sdplinenumber/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCError: sdpLineNumber property

The **`sdpLineNumber`** read-only property of the `RTCError` interface specifies the SDP message line number where a syntax error occurred.

## Value

An integer value indicating the SDP message line number where the syntax error described by the `RTCError` object occurred.
The lines are numbered starting with line 1.

This property is `null` unless the value of `errorDetail` is `sdp-syntax-error`.

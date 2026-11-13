---
title: "BlobEvent: timecode property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/blobevent/timecode/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# BlobEvent: timecode property

The **`timecode`** read-only property of the `BlobEvent` interface indicates the difference between the timestamp of the first chunk of data, and the timestamp of the first chunk in the first `BlobEvent` produced by this recorder.

Note that the `timecode` in the first produced `BlobEvent` does not need to be zero.

## Value

A `DOMHighResTimeStamp`.

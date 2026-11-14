---
title: "MediaKeySession: closed property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/mediakeysession/closed/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# MediaKeySession: closed property

The **`closed`** read-only property of the `MediaKeySession` interface returns a `Promise` signaling when a `MediaKeySession` closes.
This promise can only be fulfilled and is never rejected.
Closing a session means that licenses and keys associated with it are no longer valid for decrypting media data.

## Value

A `Promise`.

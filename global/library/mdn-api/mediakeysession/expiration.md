---
title: "MediaKeySession: expiration property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/mediakeysession/expiration/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# MediaKeySession: expiration property

The **`expiration`** read-only property of the `MediaKeySession` interface returns the time after which the keys in the current session can no longer be used to decrypt media data, or NaN if no such time exists.

This value is determined by the CDM and measured in milliseconds since January 1, 1970, UTC.
This value may change during a session lifetime, such as when an action triggers the start of a window.

## Value

A number or NaN.

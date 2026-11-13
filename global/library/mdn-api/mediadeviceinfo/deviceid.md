---
title: "MediaDeviceInfo: deviceId property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/mediadeviceinfo/deviceid/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# MediaDeviceInfo: deviceId property

The **`deviceId`** read-only property
of the `MediaDeviceInfo` interface returns a string
that is an identifier for the represented device and is persisted across
sessions.

It is un-guessable by other applications, and unique to the origin of
the calling application. It is reset when the user clears cookies. For private browsing,
a different identifier is used that is not persisted across sessions.

## Value

A string.

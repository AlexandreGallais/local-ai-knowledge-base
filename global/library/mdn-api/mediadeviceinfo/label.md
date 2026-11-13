---
title: "MediaDeviceInfo: label property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/mediadeviceinfo/label/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# MediaDeviceInfo: label property

The **`label`** read-only
property of the `MediaDeviceInfo` interface returns a
string describing this device (for example
"External USB Webcam").

Only available during active `MediaStream`
use, or when persistent permissions have been granted.

## Value

A string which describes the media device. For security reasons, the
`label` is always an empty string (`""`) if the user has not
obtained permission to use at least one media device, either by starting a stream from
the microphone or camera, or by persistent permissions being granted.

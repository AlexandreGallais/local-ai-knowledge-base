---
title: "MediaStreamTrack: label property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/mediastreamtrack/label/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# MediaStreamTrack: label property

The **`label`** read-only property of the `MediaStreamTrack` interface returns a string containing a user agent-assigned label that identifies the track source, as in `"internal microphone"`.

The string may be left empty and is empty as long as no source has been connected.
When the track is disassociated from its source, the label is not changed.

## See also

- WebRTC

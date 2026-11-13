---
title: "MediaStreamTrack: readyState property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/mediastreamtrack/readystate/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# MediaStreamTrack: readyState property

The **`readyState`** read-only property of the `MediaStreamTrack` interface returns an enumerated value giving the status of the track.

## Value

It takes one of the following values:

- `"live"` which indicates that an input is connected and does its
  best-effort in providing real-time data. In that case, the output of data can be
  switched on or off using the `MediaStreamTrack.enabled` property.
- `"ended"` which indicates that the input is not giving any more data and
  will never provide new data.

## See also

- Media Capture and Streams API
- WebRTC
- The `ended` event

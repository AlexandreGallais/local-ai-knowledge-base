---
title: "MediaCapabilities"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/mediacapabilities/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# MediaCapabilities

The **`MediaCapabilities`** interface of the Media Capabilities API provides information about the decoding abilities of the device, system and browser. The API can be used to query the browser about the decoding abilities of the device based on codecs, profile, resolution, and bitrates. The information can be used to serve optimal media streams to the user and determine if playback should be smooth and power efficient.

The information is accessed through the **`mediaCapabilities`** property of the `Navigator` and `WorkerNavigator` interface.

## Instance methods

- `MediaCapabilities.encodingInfo()`
    When passed a valid media configuration, it returns a promise with information as to whether the media type is supported, and whether encoding such media would be smooth and power efficient.
- `MediaCapabilities.decodingInfo()`
    When passed a valid media configuration, it returns a promise with information as to whether the media type is supported, and whether decoding such media would be smooth and power efficient.

## See also

- HTMLMediaElement's method canPlayType()
- MediaSource's method isTypeSupported()
- `Navigator` interface

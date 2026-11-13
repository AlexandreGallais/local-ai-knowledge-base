---
title: "HTMLMediaElement: canPlayType() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlmediaelement/canplaytype/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLMediaElement: canPlayType() method

The `HTMLMediaElement` method **`canPlayType()`** reports how likely it is that the current browser will be able to play media of a given MIME type.

## Syntax

```js
canPlayType(type)
```

### Parameters

- `type`
    A string specifying the MIME type of the media and (optionally) a `codecs` parameter containing a comma-separated list of the supported codecs.

### Return value

A string indicating how likely it is that the media can be played.
The string will be one of the following values:

- `""` (empty string)
    The media cannot be played on the current device.
- `probably`
    The media is probably playable on this device.
- `maybe`
    There is not enough information to determine whether the media can play (until playback is actually attempted).

## Examples

```js
let obj = document.createElement("video");
console.log(obj.canPlayType("video/mp4")); // "maybe"
```

## See also

- `HTMLMediaElement`: Interface used to define the `HTMLMediaElement.canPlayType()` method
- `MediaCapabilities`
- Handling media support issues in web content
- Media type and format guide
- Codecs in common media types

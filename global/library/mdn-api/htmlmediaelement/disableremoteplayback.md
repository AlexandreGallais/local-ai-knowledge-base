---
title: "HTMLMediaElement: disableRemotePlayback property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlmediaelement/disableremoteplayback/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLMediaElement: disableRemotePlayback property

The **`disableRemotePlayback`** property of the `HTMLMediaElement` interface determines whether the media element is allowed to have a remote playback UI.

## Value

A boolean value indicating whether the media element may have a remote playback
UI. (`false` means "not disabled", which means "enabled")

## Example

```js
const obj = document.createElement("audio");
obj.disableRemotePlayback = true;
```

## See also

- The `disableremoteplayback` attribute of the `<audio>` element
- The `disableremoteplayback` attribute of the `` element

---
title: "HTMLMediaElement: defaultMuted property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlmediaelement/defaultmuted/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLMediaElement: defaultMuted property

The **`HTMLMediaElement.defaultMuted`** property reflects the `muted` HTML attribute, which indicates whether the media element's audio output should be muted by default. This property has no dynamic effect. To mute and unmute the audio output, use the `muted` property.

## Value

A boolean value. A value of `true` means that the audio output will be muted by default.

## Examples

```js
const videoEle = document.createElement("video");
videoEle.defaultMuted = true;
console.log(videoEle.outerHTML); // <video muted=""></video>
```

## See also

- `HTMLMediaElement`: Interface used to define the `HTMLMediaElement.defaultMuted` property
- `HTMLMediaElement.muted`
- `HTMLMediaElement.volume`

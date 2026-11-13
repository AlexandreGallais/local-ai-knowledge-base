---
title: "HTMLMediaElement: defaultPlaybackRate property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlmediaelement/defaultplaybackrate/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLMediaElement: defaultPlaybackRate property

The **`HTMLMediaElement.defaultPlaybackRate`** property indicates the default playback rate for the media.

## Value

A double. `1.0` is "normal speed," values lower than `1.0` make the media play slower than normal, higher values make it play faster.

### Exceptions

- `NotSupportedError` `DOMException`
    Thrown if the specified value is not supported.

## Examples

```js
const obj = document.createElement("video");
console.log(obj.defaultPlaybackRate); // 1
```

## See also

- `HTMLMediaElement`: Interface used to define the `HTMLMediaElement.defaultPlaybackRate` property

---
title: "HTMLMediaElement: duration property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlmediaelement/duration/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLMediaElement: duration property

The _read-only_ `HTMLMediaElement`
property **`duration`** indicates the length of the element's
media in seconds.

## Value

A double-precision floating-point value indicating the duration of the media in
seconds. If no media data is available, the value `NaN` is returned. If the
element's media doesn't have a known duration—such as for live media streams—the value
of `duration` is `Infinity`.

## Examples

```js
const obj = document.createElement("video");
console.log(obj.duration); // NaN
```

## See also

- Web media technologies
- `HTMLMediaElement.currentTime`: The current playback position of the
  media
- The `<audio>` and `` elements

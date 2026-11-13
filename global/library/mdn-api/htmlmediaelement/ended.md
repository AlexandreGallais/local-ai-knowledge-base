---
title: "HTMLMediaElement: ended property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlmediaelement/ended/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLMediaElement: ended property

The **`ended`** read-only property of the `HTMLMediaElement` interface indicates whether the media element has ended playback.

## Value

A boolean value which is `true` if the media contained in the
element has finished playing.

If the source of the media is a `MediaStream`, this value is
`true` if the value of the stream's `active` property is `false`.

## Examples

```js
const obj = document.createElement("video");
console.log(obj.ended); // false
```

## See also

- `HTMLMediaElement`: Interface used to define the `HTMLMediaElement.ended` property
- `MediaStream`
- `MediaStream.active`

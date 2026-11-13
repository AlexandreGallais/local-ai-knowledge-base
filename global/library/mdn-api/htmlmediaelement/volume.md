---
title: "HTMLMediaElement: volume property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlmediaelement/volume/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLMediaElement: volume property

The **`HTMLMediaElement.volume`** property sets the volume at
which the media will be played.

## Value

A number between 0 and 1, where 0 is effectively muted, and 1 is the loudest possible value.

## Examples

```js
const obj = document.createElement("audio");
console.log(obj.volume); // 1
obj.volume = 0.75;
```

## See also

- `HTMLMediaElement`: Interface used to define the `HTMLMediaElement.volume` property
- `HTMLMediaElement.muted`

---
title: "HTMLMediaElement: seeking property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlmediaelement/seeking/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLMediaElement: seeking property

The **`seeking`** read-only property of the `HTMLMediaElement` interface is a Boolean indicating whether the resource, the `<audio>` or ``, is in the process of seeking to a new position.

## Value

A boolean value.

## Examples

```js
const el = document.querySelector("video");
console.log(el.seeking); // true or false
```

## See also

- `seeking` event
- `seeked` event
- `HTMLVideoElement`
- `HTMLAudioElement`

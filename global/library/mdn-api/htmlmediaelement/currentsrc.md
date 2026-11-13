---
title: "HTMLMediaElement: currentSrc property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlmediaelement/currentsrc/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLMediaElement: currentSrc property

The **`currentSrc`** read-only property of the `HTMLMediaElement` interface contains the absolute URL of the chosen media resource. This could happen, for example, if the web server selects a media file based on the resolution of the user's display. The value is an empty string if the `networkState` property is `EMPTY`.

## Value

A string containing the absolute URL of the chosen media
source; this may be an empty string if `networkState` is `EMPTY`;
otherwise, it will be one of the resources listed by the
`HTMLSourceElement` contained within the media element, or the value of `src`
if no `` element is provided.

## Examples

```js
const obj = document.createElement("video");
console.log(obj.currentSrc); // ""
```

## See also

- `HTMLMediaElement`: Interface used to define the `HTMLMediaElement.currentSrc` property

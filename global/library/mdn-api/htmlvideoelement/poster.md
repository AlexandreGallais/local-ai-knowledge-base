---
title: "HTMLVideoElement: poster property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlvideoelement/poster/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLVideoElement: poster property

The **`poster`** property of the `HTMLVideoElement` interface is a string that reflects the URL for an image to be shown while no video data is available. If the property does not represent a valid URL, no poster frame will be shown.

It reflects the `poster` attribute of the `` element.

## Value

A string.

## Examples

```html
<video
  id="media"
  src="https://example.com/video.mp4"
  poster="https://example.com/poster.jpg"></video>
```

```js
const el = document.getElementById("media");
console.log(el.poster); // Output: "https://example.com/poster.jpg"
```

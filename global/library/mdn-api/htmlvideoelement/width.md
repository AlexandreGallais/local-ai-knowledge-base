---
title: "HTMLVideoElement: width property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlvideoelement/width/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLVideoElement: width property

The **`width`** property of the `HTMLVideoElement` interface returns an integer that reflects the `width` attribute of the `` element, specifying the displayed width of the resource in CSS pixels.

## Value

A positive integer or 0.

## Examples

```html
<video id="media" width="800" height="600"></video>
```

```js
const el = document.getElementById("media");
console.log(el.width); // Output: 800
```

## See also

- `HTMLCanvasElement.width`
- `HTMLEmbedElement.width`
- `HTMLIFrameElement.width`
- `HTMLImageElement.width`
- `HTMLObjectElement.width`
- `HTMLSourceElement.width`

---
title: "HTMLSourceElement: width property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlsourceelement/width/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLSourceElement: width property

The **`width`** property of the `HTMLSourceElement` interface is a non-negative number indicating the width of the image resource in CSS pixels.

The property has an effect only if the parent of the current `` element is a `` element.

It reflects the `width` attribute of the `` element.

## Value

A non-negative number indicating the width of the image resource in CSS pixels.

## Examples

```html
<picture id="img">
  <source
    srcset="landscape.png"
    media="(width >= 1000px)"
    width="1000"
    height="400" />
  <source
    srcset="square.png"
    media="(width >= 800px)"
    width="800"
    height="800" />
  <source
    srcset="portrait.png"
    media="(width >= 600px)"
    width="600"
    height="800" />
  <img
    src="fallback.png"
    alt="Image used when the browser does not support the sources"
    width="500"
    height="400" />
</picture>
```

```js
const img = document.getElementById("img");
const sources = img.querySelectorAll("source");
console.log(Array.from(sources).map((el) => el.width)); // Output: [1000, 800, 600]
```

## See also

- `HTMLCanvasElement.width`
- `HTMLEmbedElement.width`
- `HTMLIFrameElement.width`
- `HTMLImageElement.width`
- `HTMLObjectElement.width`
- `HTMLVideoElement.width`

---
title: "HTMLImageElement: srcset property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlimageelement/srcset/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLImageElement: srcset property

The **`srcset`** property of the `HTMLImageElement` interface identifies one or more _image candidate strings_, separated using commas (`,`), each specifying image resources to use under given circumstances. Each image candidate string contains an image URL and an optional width or pixel density descriptor that indicates the conditions under which that candidate should be used instead of the image specified by the `src` property. It reflects the `` element's `srcset` content attribute.

The `srcset` property, along with the `sizes` property, are a crucial component in designing responsive websites, as they can be used together to make pages that use appropriate images for the rendering situation.

## Value

A string. For more information about the syntax of the `srcset` attribute, see the HTML `` reference.

## Examples

### Setting the srcset attribute

```js
const img = new Image();
img.srcset =
  "/en-US/docs/Web/HTML/Reference/Elements/img/clock-demo-400px.png 2x, /en-US/docs/Web/HTML/Reference/Elements/img/clock-demo-200px.png";
img.alt = "An example picture";
```

## See also

- HTML images
- Responsive images
- Image file type and format guide
- `HTMLImageElement.currentSrc`
- `HTMLImageElement.sizes`
- `HTMLImageElement.src`

---
title: "HTMLIFrameElement: width property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmliframeelement/width/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLIFrameElement: width property

The **`width`** property of the `HTMLIFrameElement` interface returns a string that reflects the `width` attribute of the `` element, indicating the width of the frame in CSS pixels.

## Value

A string indicating the width of the frame in CSS pixels.

## Examples

```html
<iframe id="el" width="800" height="600"></iframe>
```

```js
const el = document.getElementById("el");
console.log(el.width); // Output: '800'
```

## See also

- `HTMLCanvasElement.width`
- `HTMLEmbedElement.width`
- `HTMLImageElement.width`
- `HTMLObjectElement.width`
- `HTMLSourceElement.width`
- `HTMLVideoElement.width`

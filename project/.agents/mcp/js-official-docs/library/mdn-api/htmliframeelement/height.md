---
title: "HTMLIFrameElement: height property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmliframeelement/height/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLIFrameElement: height property

The **`height`** property of the `HTMLIFrameElement` interface returns a string that reflects the `height` attribute of the `` element, indicating the height of the frame in CSS pixels.

## Value

A string indicating the height of the frame in CSS pixels.

## Examples

```html
<iframe id="el" width="800" height="600"></iframe>
```

```js
const el = document.getElementById("el");
console.log(el.height); // Output: '600'
```

## See also

- `HTMLCanvasElement.height`
- `HTMLEmbedElement.height`
- `HTMLImageElement.height`
- `HTMLObjectElement.height`
- `HTMLSourceElement.height`
- `HTMLVideoElement.height`

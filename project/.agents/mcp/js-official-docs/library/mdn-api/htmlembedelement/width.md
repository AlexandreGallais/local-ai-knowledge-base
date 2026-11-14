---
title: "HTMLEmbedElement: width property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlembedelement/width/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLEmbedElement: width property

The **`width`** property of the `HTMLEmbedElement` interface returns a string that reflects the `width` attribute of the `` element, indicating the displayed width of the resource in CSS pixels.

## Value

A string indicating the displayed width of the resource in CSS pixels.

## Examples

```html
<embed id="el" width="800" height="600" src="https://example.com" />
```

```js
const el = document.getElementById("el");
console.log(el.width); // Output: '800'
```

## See also

- `HTMLCanvasElement.width`
- `HTMLIFrameElement.width`
- `HTMLImageElement.width`
- `HTMLObjectElement.width`
- `HTMLSourceElement.width`
- `HTMLVideoElement.width`

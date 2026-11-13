---
title: "HTMLEmbedElement: height property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlembedelement/height/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLEmbedElement: height property

The **`height`** property of the `HTMLEmbedElement` interface returns a string that reflects the `height` attribute of the `` element, indicating the displayed height of the resource in CSS pixels.

## Value

A string indicating the displayed height of the resource in CSS pixels.

## Examples

```html
<embed id="el" width="800" height="600" src="https://example.com" />
```

```js
const el = document.getElementById("el");
console.log(el.height); // Output: '600'
```

## See also

- `HTMLCanvasElement.height`
- `HTMLIFrameElement.height`
- `HTMLImageElement.height`
- `HTMLObjectElement.height`
- `HTMLSourceElement.height`
- `HTMLVideoElement.height`

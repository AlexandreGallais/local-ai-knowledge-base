---
title: "HTMLImageElement: src property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlimageelement/src/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLImageElement: src property

The **`src`** property of the `HTMLImageElement` interface specifies the image to display in the `` element. It reflects the `` element's `src` content attribute.

Setting `src` property triggers scheduling of a task to fetch the specified resource; the element does not need to be inserted into the active document first.
Unless loading is set to `lazy`, the image will be fetched almost immediately (if lazy loading is specified the request is deferred until the element is near the viewport: which can't happen until the element is inserted).

## Value

A string. For more information about the syntax of the `src` attribute, see the HTML `` reference.

## Examples

### Setting the src attribute

```js
const img = new Image();
img.src = "example.png";
img.alt = "An example picture";
```

## See also

- `HTMLImageElement.currentSrc`
- `HTMLImageElement.srcset`
- `HTMLImageElement.sizes`

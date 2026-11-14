---
title: "HTMLAreaElement: shape property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlareaelement/shape/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLAreaElement: shape property

The **`shape`** property of the `HTMLAreaElement` interface specifies the shape of an image map area. It reflects the `<area>` element's `shape` attribute.

## Value

A string; `rect`, `circle`, or `poly`.

## Examples

```js
const areaElement = document.getElementById("imageMapArea");
console.log(areaElement.shape);
```

## See also

- `HTMLAreaElement.coords`
- `HTMLAreaElement.alt`
- `HTMLMapElement`
- `<area>`
- `<map>`
- ``

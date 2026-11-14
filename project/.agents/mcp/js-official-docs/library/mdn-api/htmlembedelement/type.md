---
title: "HTMLEmbedElement: type property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlembedelement/type/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLEmbedElement: type property

The **`type`** property of the `HTMLEmbedElement` interface returns a string that reflects the `type` attribute of the `` element, indicating the MIME type of the resource. It reflects the `` element's `type` attribute

## Value

A string; the MIME type of the resource.

## Examples

```js
const el = document.getElementById("el");
console.log(el.type); // Output: "video/webp"
```

## See also

- `HTMLObjectElement.type`
- `HTMLSourceElement.type`
- Media types found on the web
- Important MIME types for web developers

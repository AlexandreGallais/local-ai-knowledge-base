---
title: "HTMLObjectElement: getSVGDocument() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlobjectelement/getsvgdocument/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLObjectElement: getSVGDocument() method

The **`getSVGDocument()`** method of the `HTMLObjectElement` interface returns the `Document` object of the embedded SVG.

## Syntax

```js
getSVGDocument()
```

### Parameters

None.

### Return value

A `Document`.

## Examples

```js
const svg = document.getElementById("el").getSVGDocument();
```

## See also

- `HTMLIFrameElement.getSVGDocument`
- `HTMLEmbedElement.getSVGDocument`

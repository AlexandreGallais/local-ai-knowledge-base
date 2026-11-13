---
title: "DocumentType: publicId property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/documenttype/publicid/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# DocumentType: publicId property

The read-only **`publicId`** property of the `DocumentType` returns a formal identifier of the document.

For synthetic `DocumentType`, this property reflects the value given in parameter to `DOMImplementation.createDocumentType()`.

## Value

A string.

## Examples

```js
const docType = document.implementation.createDocumentType(
  "svg",
  "-//W3C//DTD SVG 1.1//EN",
  "http://www.w3.org/2000/svg",
);

console.log(docType.publicId); // Displays "-//W3C//DTD SVG 1.1//EN"
```

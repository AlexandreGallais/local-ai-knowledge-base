---
title: "Document: doctype property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/document/doctype/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Document: doctype property

The **`doctype`** read-only property of the `Document` interface is a `DocumentType` object representing the Document Type Declaration (DTD) associated with the current document.

## Value

A `DocumentType` object.

## Examples

```js
const doctypeObj = document.doctype;

console.log(`doctypeObj.name: ${doctypeObj.name}`);
console.log(`doctypeObj.internalSubset: ${doctypeObj.internalSubset}`);
console.log(`doctypeObj.publicId: ${doctypeObj.publicId}`);
console.log(`doctypeObj.systemId: ${doctypeObj.systemId}`);
```

## Notes

The property returns `null` if there is no DTD associated with the current
document.

DOM level 2 doesn't support editing the document type declaration.

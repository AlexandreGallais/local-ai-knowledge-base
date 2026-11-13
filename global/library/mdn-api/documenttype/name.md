---
title: "DocumentType: name property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/documenttype/name/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# DocumentType: name property

The read-only **`name`** property of the `DocumentType` returns the type of the document.

For synthetic `DocumentType`, this property reflects the value given in parameter to `DOMImplementation.createDocumentType()`.

For HTML documents, browsers always set it up to `html`, whatever the actual `doctype` in the source code is.

## Value

A string.

## Examples

```js
const docType = document.implementation.createDocumentType("html", "", "");

console.log(docType.name); // Displays `html`
```

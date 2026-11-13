---
title: "DOMImplementation: createDocumentType() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/domimplementation/createdocumenttype/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# DOMImplementation: createDocumentType() method

The **`DOMImplementation.createDocumentType()`** method returns
a `DocumentType` object which can either be used with
`DOMImplementation.createDocument` upon document creation or can be put
into the document via methods like `Node.insertBefore()` or
`Node.replaceChild()`.

## Syntax

```js
createDocumentType(name, publicId, systemId)
```

### Parameters

- `name`
    A string containing the name of the doctype, like `html`. Corresponds to the `DocumentType.name` property.
- `publicId`
    A string containing the `PUBLIC` identifier. Corresponds to the `DocumentType.publicId` property.
- `systemId`
    A string containing the `SYSTEM` identifiers. Corresponds to the `DocumentType.systemId` property.

### Return value

A `DocumentType`.

## Examples

```js
const dt = document.implementation.createDocumentType(
  "svg",
  "-//W3C//DTD SVG 1.1//EN",
  "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd",
);
const d = document.implementation.createDocument(
  "http://www.w3.org/2000/svg",
  "svg:svg",
  dt,
);
console.log(d.doctype.publicId); // -//W3C//DTD SVG 1.1//EN
```

## See also

- The `DOMImplementation` interface it belongs to.

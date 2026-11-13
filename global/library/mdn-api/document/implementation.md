---
title: "Document: implementation property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/document/implementation/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Document: implementation property

The **`implementation`** read-only property of the `Document` interface returns a `DOMImplementation` object associated with the current document.

## Value

A `DOMImplementation` object.

## Examples

```js
const modName = "HTML";
const modVer = "2.0";
const conformTest = document.implementation.hasFeature(modName, modVer);

console.log(`DOM ${modName} ${modVer} supported?: ${conformTest}`);

// Log: "DOM HTML 2.0 supported?: true" (hasFeature always returns true)
```

> **Warning:**
> Do not use this for feature detection. The `hasFeature()` method always returns true.

## Notes

The W3C's DOM Level 1 Recommendation only specified the `hasFeature` method,
which is one way to determine if a DOM module is supported by a browser (see example
above and What does your user agent claim to support?). If available, other `DOMImplementation`
methods provide services for controlling things outside of a single document. For
example, the `DOMImplementation` interface includes a
`createDocumentType` method with which DTDs can be created for one or more
documents managed by the implementation.

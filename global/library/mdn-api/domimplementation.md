---
title: "DOMImplementation"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/domimplementation/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# DOMImplementation

The **`DOMImplementation`** interface represents an object providing methods which are not dependent on any particular document. Such an object is returned by the `Document.implementation` property.

## Property

_This interface has no specific property and doesn't inherit any._

## Instance methods

_No inherited method._

- `DOMImplementation.createDocument()`
    Creates and returns an `XMLDocument`.
- `DOMImplementation.createDocumentType()`
    Creates and returns a `DocumentType`.
- `DOMImplementation.createHTMLDocument()`
    Creates and returns an HTML `Document`.
- `DOMImplementation.hasFeature()` (deprecated)
    Returns a boolean value indicating if a given feature is supported or not. This function is unreliable and kept for compatibility purpose alone: except for SVG-related queries, it always returns `true`. Old browsers are very inconsistent in their behavior.

## See also

- The DOM interfaces index.

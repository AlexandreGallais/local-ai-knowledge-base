---
title: "Document: rootElement property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/document/rootelement/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Document: rootElement property

The **`rootElement`** read-only property of the `Document` interface returns the `Element` that is the root element of the `document` if it is an `` element, otherwise `null`. It is deprecated in favor of `Document.documentElement`, which returns the root element for all documents.

## Value

For SVG elements, the `Element` that is the root element of the `document`; otherwise `null`.

If the document is a non-empty SVG document, then the `rootElement` will be
an `SVGSVGElement`, identical to the `documentElement`.

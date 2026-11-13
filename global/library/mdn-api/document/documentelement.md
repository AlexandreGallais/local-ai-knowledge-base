---
title: "Document: documentElement property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/document/documentelement/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Document: documentElement property

The **`documentElement`** read-only property of the `Document` interface returns the
`Element` that is the root element of the `document` (for
example, the `<html>` element for HTML documents).

## Value

An `Element` object.

## Examples

```js
const rootElement = document.documentElement;
const firstTier = rootElement.childNodes;
// firstTier is a NodeList of the direct children of the root element
// such as <head> and <body>

for (const child of firstTier) {
  // do something with each direct child of the root element
}
```

## Notes

For any non-empty HTML document, `documentElement` will always be an
`<html>` element. For any non-empty XML document,
`documentElement` will always be whatever element is the root element of the
document.

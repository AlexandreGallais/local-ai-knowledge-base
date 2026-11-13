---
title: "Document: firstElementChild property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/document/firstelementchild/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Document: firstElementChild property

The **`Document.firstElementChild`** read-only property
returns the document's first child `Element`, or `null` if there
are no child elements.

For HTML documents, this is usually the only child, the root `<html>` element.

See `Element.firstElementChild` for the first child element of specific elements within a document.

## Value

An `Element` object, or `null`.

## Examples

```js
document.firstElementChild;
// returns the root <html> element, the only child of the document
```

## See also

- `Element.firstElementChild`

---
title: "Document: lastElementChild property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/document/lastelementchild/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Document: lastElementChild property

The **`Document.lastElementChild`** read-only property
returns the document's last child `Element`, or `null` if there
are no child elements.

For HTML documents, this is usually the only child, the root `<html>` element.

See `Element.lastElementChild` for the last child element of specific elements within a document.

## Value

The root `<html>` element.

## Examples

```js
document.lastElementChild;
// returns the root <html> element, the only child of the document
```

## See also

- `Element.lastElementChild`

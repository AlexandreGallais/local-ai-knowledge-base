---
title: "Document: childElementCount property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/document/childelementcount/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Document: childElementCount property

The **`Document.childElementCount`** read-only property
returns the number of child elements of the document.

To get the number of children of a specific element, see `Element.childElementCount`.

## Value

A number.

## Examples

```js
document.children;
// HTMLCollection, usually containing an <html> element, the document's only child

document.childElementCount;
// 1
```

## See also

- `Element.childElementCount`
- `DocumentFragment.childElementCount`

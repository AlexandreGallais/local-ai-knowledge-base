---
title: "Document: all property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/document/all/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Document: all property

The `Document` interface's read-only **`all`** property returns an `HTMLAllCollection` rooted at the document node.

Rather than using `document.all` to return an `HTMLAllCollection` of all the document's elements in document order, you can use `Document.querySelectorAll` to return a `NodeList` of all the document's elements in document order:

```js
const allElements = document.querySelectorAll("*");
```

## Value

An `HTMLAllCollection` which contains every element in the document.

---
title: "Document: createRange() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/document/createrange/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Document: createRange() method

The **`Document.createRange()`** method returns a new
`Range` object whose start and end are offset 0 of the `Document`
object on which it was called.

## Syntax

```js
createRange()
```

### Parameters

None.

### Return value

The created `Range` object.

## Examples

```js
const range = document.createRange();

range.setStart(startNode, startOffset);
range.setEnd(endNode, endOffset);
```

## Notes

Once a `Range` is created, you need to set its boundary points before you
can make use of most of its methods.

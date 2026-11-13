---
title: "AbstractRange: endContainer property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/abstractrange/endcontainer/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# AbstractRange: endContainer property

The read-only **`endContainer`** property of the `AbstractRange` interface returns the `Node` in which the end of the range is located.

To change the end position, use the `Range.setEnd()` method or a similar one.

## Value

The `Node` which contains the last character of the range.

## Example

```js
const range = document.createRange();
range.setStart(startNode, startOffset);
range.setEnd(endNode, endOffset);

const endRangeNode = range.endContainer;
```

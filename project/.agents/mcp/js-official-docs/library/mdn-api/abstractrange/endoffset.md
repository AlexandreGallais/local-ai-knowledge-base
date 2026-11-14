---
title: "AbstractRange: endOffset property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/abstractrange/endoffset/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# AbstractRange: endOffset property

The **`endOffset`** read-only property of the `AbstractRange` interface returns the offset into the end node of the range's end position.

To change the end position, use the `Range.setEnd()` method or a similar one.

## Value

An integer value indicating the number of characters into the `Node` indicated by `endContainer` at which the final character of the range is located.

If the `endContainer` is a `Node` of type `Text`, `Comment`, or `CDATASection`, then the offset is the number of characters from the start of the `endContainer` to the boundary point of the range. For other `Node` types, the `endOffset` is the number of child nodes between the start of the `endContainer` and the boundary point of the range.

## Example

```js
const range = document.createRange();
range.setStart(startNode, startOffset);
range.setEnd(endNode, endOffset);

const endRangeOffset = range.endOffset;
```

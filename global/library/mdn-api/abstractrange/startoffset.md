---
title: "AbstractRange: startOffset property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/abstractrange/startoffset/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# AbstractRange: startOffset property

The read-only **`startOffset`** property of the `AbstractRange` interface returns the offset into the start node of the range's start position.

To change the start position, use the `Range.setStart()` method or a similar one.

## Value

An integer value indicating the number of characters into the `Node` indicated by `startContainer` at which the first character of the range is located.

If the `startContainer` is a `Node` of type `Text`, `Comment`, or `CDATASection`, then the offset is the number of characters from the start of the `startContainer` to the boundary point of the range. For other `Node` types, the `startOffset` is the number of child nodes between the start of the `startContainer` and the boundary point of the range.

## Example

```js
const range = document.createRange();
range.setStart(startNode, startOffset);
range.setEnd(endNode, endOffset);

const startRangeOffset = range.startOffset;
```

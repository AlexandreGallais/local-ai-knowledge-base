---
title: "AbstractRange: startContainer property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/abstractrange/startcontainer/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# AbstractRange: startContainer property

The read-only **`startContainer`** property of the `AbstractRange` interface returns the `Node` in which the start of the range is located.

To change the start position, use the `Range.setStart()` method or a similar one.

## Value

The `Node` inside which the start position of the range is found.

## Example

```js
const range = document.createRange();
range.setStart(startNode, startOffset);
range.setEnd(endNode, endOffset);

const startRangeNode = range.startContainer;
```

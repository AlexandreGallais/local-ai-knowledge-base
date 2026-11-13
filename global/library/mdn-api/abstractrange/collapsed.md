---
title: "AbstractRange: collapsed property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/abstractrange/collapsed/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# AbstractRange: collapsed property

The read-only **`collapsed`** property of the `AbstractRange` interface returns `true` if the range's start position and end position are the same.

A collapsed range is empty (containing no content), and specifies a single point in a DOM tree. To collapse a range, see the `Range.collapse()` method.

## Value

A boolean value which is `true` if the range is _collapsed_. A collapsed range is one in which the start and end positions are the same, resulting in a zero-character-long range.

## Example

```js
const range = document.createRange();
range.setStart(startNode, startOffset);
range.setEnd(endNode, endOffset);

const isCollapsed = range.collapsed;
```

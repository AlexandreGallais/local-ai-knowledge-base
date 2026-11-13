---
title: "Range: isPointInRange() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/range/ispointinrange/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Range: isPointInRange() method

The **`isPointInRange()`** method of the `Range` interface determines whether a specified point is within the `Range`. The point is specified by a reference node and an offset within that node. It is equivalent to calling `Range.comparePoint()` and checking if the result is `0`.

## Syntax

```js
isPointInRange(referenceNode, offset)
```

### Parameters

- `referenceNode`
    The `Node` that the `offset` is relative to.
- `offset`
    An integer greater than or equal to zero describing the position inside `referenceNode` of the point to be checked. If `referenceNode` is a `Node` of type `Text`, `Comment`, or `CDATASection`, then `offset` is the number of characters from the start of `referenceNode`. For other `Node` types, `offset` is the number of child nodes from the start of the `referenceNode`.

### Return value

A boolean.

## Examples

```js
const text = new Text("0123456789");

const thisRange = new Range();
thisRange.setStart(text, 1);
thisRange.setEnd(text, 6);

thisRange.isPointInRange(text, 3); // true
thisRange.isPointInRange(text, 0); // false
thisRange.isPointInRange(text, 6); // true
thisRange.isPointInRange(text, 7); // false
```

## See also

- The DOM interfaces index

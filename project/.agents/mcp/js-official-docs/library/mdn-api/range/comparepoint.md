---
title: "Range: comparePoint() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/range/comparepoint/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Range: comparePoint() method

The **`comparePoint()`** method of the `Range` interface determines whether a specified point is before, within, or after the `Range`. The point is specified by a reference node and an offset within that node.

## Syntax

```js
comparePoint(referenceNode, offset)
```

### Parameters

- `referenceNode`
    The `Node` that the `offset` is relative to.
- `offset`
    An integer greater than or equal to zero describing the position inside `referenceNode` of the point to be checked. If `referenceNode` is a `Node` of type `Text`, `Comment`, or `CDATASection`, then `offset` is the number of characters from the start of `referenceNode`. For other `Node` types, `offset` is the number of child nodes from the start of the `referenceNode`.

### Return value

A number.

- `-1` if the point specified by the `referenceNode` and `offset` is before the start of this `Range`.
- `0` if the point specified by the `referenceNode` and `offset` is within this `Range` (including the start and end points of the range).
- `1` if the point specified by the `referenceNode` and `offset` is after the end of this `Range`.

## Examples

```js
const text = new Text("0123456789");

const thisRange = new Range();
thisRange.setStart(text, 1);
thisRange.setEnd(text, 6);

thisRange.comparePoint(text, 3); // 0
thisRange.comparePoint(text, 0); // -1
thisRange.comparePoint(text, 6); // 0
thisRange.comparePoint(text, 7); // 1
```

## See also

- The DOM interfaces index

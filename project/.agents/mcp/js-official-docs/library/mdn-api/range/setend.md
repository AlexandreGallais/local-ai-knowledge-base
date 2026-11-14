---
title: "Range: setEnd() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/range/setend/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Range: setEnd() method

The **`Range.setEnd()`** method sets the end position of a `Range` to be located at the given offset into the specified node. Setting
the end point above (higher in the document) than the start point will result in a
collapsed range with the start and end points both set to the specified end position.

## Syntax

```js
setEnd(endNode, endOffset)
```

### Parameters

- `endNode`
    The `Node` inside which the `Range` should end.
- `endOffset`
    An integer greater than or equal to zero representing the offset for the end of the `Range` from the start of `endNode`.

### Return value

None (`undefined`).

### Exceptions

- `InvalidNodeTypeError` `DOMException`
    The node specified by `endNode` is a doctype node; range endpoints cannot be located inside a doctype node.
- `IndexSizeError` `DOMException`
    The value specified by `endOffset` is either greater than or equal to the length of the node or is less than zero.

## Usage notes

If the `endNode` is a `Node` of type `Text`,
`Comment`, or `CDataSection`, then `endOffset` is
the number of characters from the start of `endNode`. For other
`Node` types, `endOffset` is the number of child nodes between
the start of the `endNode`.

## Examples

```js
const range = document.createRange();
const endNode = document.getElementsByTagName("p").item(3);
const endOffset = endNode.childNodes.length;
range.setEnd(endNode, endOffset);
```

> **Note:**
> `setEnd()` is commonly used in conjunction with
> `setStart()` to fully configure a range.

## See also

- The DOM interfaces index

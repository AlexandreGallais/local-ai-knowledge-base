---
title: "Range: insertNode() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/range/insertnode/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Range: insertNode() method

The **`Range.insertNode()`** method inserts a node at the start
of the `Range`.

The new node is inserted at the start boundary point of the `Range`. If the
new node is to be added to a text `Node`, that `Node` is split
at the insertion point, and the insertion occurs between the two text nodes.

If the new node is a document fragment, the children of the document fragment are
inserted instead.

## Syntax

```js
insertNode(newNode)
```

### Parameters

- `newNode`
    The `Node` to insert at the start of the `range`.

### Return value

None (`undefined`).

## Examples

```js
range = document.createRange();
newNode = document.createElement("p");
newNode.appendChild(document.createTextNode("New Node Inserted Here"));
range.selectNode(document.getElementsByTagName("div").item(0));
range.insertNode(newNode);
```

## See also

- The DOM interfaces index

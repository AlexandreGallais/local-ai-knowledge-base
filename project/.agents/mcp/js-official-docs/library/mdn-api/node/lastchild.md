---
title: "Node: lastChild property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/node/lastchild/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Node: lastChild property

The read-only **`lastChild`** property of the `Node` interface
returns the last child of the node, or `null` if there are no child nodes.

> **Note:**
> This property returns any type of node that is the last child of this one.
> It may be a `Text` or a `Comment` node.
> If you want to get the last `Element` that is a child of another element,
> consider using `Element.lastElementChild`.

## Value

A `Node` that is the last child of the node, or `null` if there are no child nodes.

## Example

```js
const tr = document.getElementById("row1");
const cornerTd = tr.lastChild;
```

## See also

- `Node.firstChild`
- `Element.lastElementChild`

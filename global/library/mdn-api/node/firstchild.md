---
title: "Node: firstChild property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/node/firstchild/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Node: firstChild property

The read-only **`firstChild`** property of the `Node` interface
returns the node's first child in the tree,
or `null` if the node has no children.

If the node is a `Document`,
this property returns the first node in the list of its direct children.

> **Note:**
> This property returns any type of node that is the first child of this one.
> It may be a `Text` or a `Comment` node.
> If you want to get the first `Element` that is a child of another element,
> consider using `Element.firstElementChild`.

## Value

A `Node`, or `null` if there are none.

## Example

This example demonstrates the use of `firstChild` and how whitespace nodes
might interfere with using this property.

```html
<p id="para-01">
  <span>First span</span>
</p>
```

```js
const p01 = document.getElementById("para-01");
console.log(p01.firstChild.nodeName);
```

In the above, the console will show '#text'
because a text node is inserted to maintain the whitespace between the end of the
opening `` and `` tags. **Any**
whitespace
will create a `#text` node, from a single space to multiple spaces, returns,
tabs, and so on.

Another `#text` node is inserted between the closing
`` and `` tags.

If this whitespace is removed from the source, the #text nodes are not inserted and the
span element becomes the paragraph's first child.

```html
<p id="para-01"><span>First span</span></p>
```

```js
const p01 = document.getElementById("para-01");
console.log(p01.firstChild.nodeName);
```

Now the console will show 'SPAN'.

To avoid the issue with `node.firstChild` returning `#text` or
`#comment` nodes, `Element.firstElementChild` can be used to
return only the first element node.

## See also

- `Element.firstElementChild`
- `Node.lastChild`

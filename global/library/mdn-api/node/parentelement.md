---
title: "Node: parentElement property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/node/parentelement/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Node: parentElement property

The read-only **`parentElement`** property of `Node` interface
returns the DOM node's parent `Element`, or `null` if the node either has no
parent, or its parent isn't a DOM `Element`. `Node.parentNode` on the other hand returns any kind of parent, regardless of its type.

## Value

An `Element` that is the parent element of the current node,
or `null` if there isn't one.

## Example

### Using parentElement

This example sets the parent of `node` to have a red text color.

```js
if (node.parentElement) {
  node.parentElement.style.color = "red";
}
```

### parentElement being null

`parentElement` can be `null` if the node has no parent (for example, because it isn't attached to a tree) or its parent is not an `Element`. On the other hand, `Node.parentNode` always returns the parent node, which may be a `Document` or other node types.

```html
<!doctype html>
<html lang="en-US">
  <body>
    <script>
      const html = document.querySelector("html");
      console.log(html.parentElement); // null
      console.log(html.parentNode); // document
    </script>
  </body>
</html>
```

## See also

- `Node.parentNode`

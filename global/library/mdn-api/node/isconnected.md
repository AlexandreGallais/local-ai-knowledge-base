---
title: "Node: isConnected property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/node/isconnected/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Node: isConnected property

The read-only **`isConnected`** property of the `Node` interface returns a boolean indicating whether the node is connected (directly or indirectly) to a `Document` object.

## Value

A boolean value that is `true` if the node is connected to its relevant context object, and `false` if not.

> **Note:**
> An `Attr` node always returns `false` for `isConnected`, even when its `ownerElement` is connected.
> This is because, even though an attribute is associated with an element via `ownerElement`, it is not part of the node tree — it has no parent node, and it is its own root node.
> Since `isConnected` is only true when a node's root is a document, an `Attr` node is never considered connected.

## Examples

### Standard DOM

A standard DOM example:

```js
let test = document.createElement("p");
console.log(test.isConnected); // Returns false
document.body.appendChild(test);
console.log(test.isConnected); // Returns true
```

### Shadow DOM

A shadow DOM example:

```js
// Create a shadow root
const shadow = this.attachShadow({ mode: "open" });

// Create some CSS to apply to the shadow DOM
const style = document.createElement("style");
console.log(style.isConnected); // returns false

style.textContent = `
.wrapper {
  position: relative;
}

.info {
  font-size: 0.8rem;
  width: 200px;
  display: inline-block;
  border: 1px solid black;
  padding: 10px;
  background: white;
  border-radius: 10px;
  opacity: 0;
  transition: 0.6s all;
  positions: absolute;
  bottom: 20px;
  left: 10px;
  z-index: 3
}
`;

// Attach the created style element to the shadow DOM

shadow.appendChild(style);
console.log(style.isConnected); // Returns true
```

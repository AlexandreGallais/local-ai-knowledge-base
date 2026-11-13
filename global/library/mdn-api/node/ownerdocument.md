---
title: "Node: ownerDocument property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/node/ownerdocument/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Node: ownerDocument property

The read-only **`ownerDocument`** property of the `Node` interface
returns the top-level document object of the node.

## Value

A `Document` that is the top-level object in which all the
child nodes are created.

If this property is used on a node that is itself a document, the value is `null`.

## Example

```js
// Given a node "p", get the top-level HTML
// child of the document object

const d = p.ownerDocument;
const html = d.documentElement;
```

---
title: "Node: nodeType property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/node/nodetype/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Node: nodeType property

The read-only **`nodeType`** property of a `Node` interface is an integer
that identifies what the node is. It distinguishes different kinds of nodes from each other,
such as `elements`, `text`, and `comments`.

## Value

An integer which specifies the type of the node. Possible values are:

- `Node.ELEMENT_NODE` (`1`)
    An `Element` node like `` or ``.
- `Node.ATTRIBUTE_NODE` (`2`)
    An `Attribute` of an `Element`.
- `Node.TEXT_NODE` (`3`)
    The actual `Text` inside an `Element` or `Attr`.
- `Node.CDATA_SECTION_NODE` (`4`)
    A `CDATASection`, such as `<!CDATA[[ … ]]>`
- `Node.PROCESSING_INSTRUCTION_NODE` (`7`)
    A `ProcessingInstruction` of an XML document, such as `<?xml-stylesheet … ?>`.
- `Node.COMMENT_NODE` (`8`)
    A `Comment` node, such as ``.
- `Node.DOCUMENT_NODE` (`9`)
    A `Document` node.
- `Node.DOCUMENT_TYPE_NODE` (`10`)
    A `DocumentType` node, such as `<!doctype html>`.
- `Node.DOCUMENT_FRAGMENT_NODE` (`11`)
    A `DocumentFragment` node.

The following constants have been deprecated and are not in use anymore: `Node.ENTITY_REFERENCE_NODE` (`5`),
`Node.ENTITY_NODE` (`6`), and `Node.NOTATION_NODE` (`12`).

## Examples

### Different types of nodes

```js
document.nodeType === Node.DOCUMENT_NODE; // true
document.doctype.nodeType === Node.DOCUMENT_TYPE_NODE; // true

document.createDocumentFragment().nodeType === Node.DOCUMENT_FRAGMENT_NODE; // true

const p = document.createElement("p");
p.textContent = "Once upon a time…";

p.nodeType === Node.ELEMENT_NODE; // true
p.firstChild.nodeType === Node.TEXT_NODE; // true
```

### Comments

This example checks if the first node inside the document element is a comment, and
displays a message if not.

```js
const node = document.documentElement.firstChild;
if (node.nodeType !== Node.COMMENT_NODE) {
  console.warn("You should comment your code!");
}
```

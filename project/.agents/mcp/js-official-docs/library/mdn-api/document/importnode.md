---
title: "Document: importNode() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/document/importnode/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Document: importNode() method

The **`importNode()`** method of the `Document` interface creates a copy of a `Node` or `DocumentFragment` from another document, to be inserted into the current document later.

The imported node is not yet included in the document tree. To include it, you need to call an insertion method such as `appendChild()` or `insertBefore()` with a node that _is_ currently in the document tree.

Unlike `document.adoptNode()`, the original node is not removed from its original document. The imported node is a clone of the original.

The `Node.cloneNode()` method also creates a copy of a node. The difference is that `importNode()` clones the node in the context of the calling document, whereas `cloneNode()` uses the document of the node being cloned. The document context determines the `CustomElementRegistry` for constructing any custom elements. For this reason, to clone nodes to be used in another document, use `importNode()` on the target document. The `HTMLTemplateElement.content` is owned by a separate document, so it should also be cloned using `document.importNode()` so that custom element descendants are constructed using the definitions in the current document. See the `Node.cloneNode()` page's examples for more details.

## Syntax

```js
importNode(externalNode)
importNode(externalNode, deep)
```

### Parameters

- `externalNode`
    The external `Node` or `DocumentFragment` to import into
    the current document.
- `deep` (optional)
    A boolean flag, whose default value is `false`,
    which controls whether to include the entire DOM subtree
    of the `externalNode` in the import.
    - If `deep` is set to `true`, then
      `externalNode` and all of its descendants are copied.
    - If `deep` is set to `false`, then only
      `externalNode` is imported — the new node has no children.

### Return value

The copied `importedNode` in the scope of the importing document.

> **Note:**
> `importedNode`'s `Node.parentNode` is `null`, since it has not yet been inserted into the document tree!

## Examples

### Using importNode()

```js
const iframe = document.querySelector("iframe");
const oldNode = iframe.contentWindow.document.getElementById("myNode");
const newNode = document.importNode(oldNode, true);
document.getElementById("container").appendChild(newNode);
```

## Notes

Before they can be inserted into the current document, nodes from external documents should either be:

- cloned using `document.importNode()`; or
- adopted using `document.adoptNode()`.

> **Note:**
> Although Firefox doesn't currently enforce this rule, we encourage you to follow this rule for improved future compatibility.

For more on the `Node.ownerDocument` issues, see the W3C DOM FAQ.

## See also

- `document.adoptNode()`, which behaves very similar to this method
- `Node.appendChild()`
- `Node.insertBefore()`

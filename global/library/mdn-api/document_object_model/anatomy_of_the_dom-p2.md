---
title: "Anatomy of the DOM (part 2 of 2)"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/document_object_model/anatomy_of_the_dom/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Anatomy of the DOM (part 2 of 2)

## Working with the element tree

Because `Element` nodes form the backbone of the document structure, you can specifically traverse the element nodes, skipping other nodes (such as `Text` and `Comment`).

- For all nodes, the `parentElement` property returns the parent node if it is an `Element`, or `null` if the parent is not an `Element` (for example, if the parent is a `Document`). This is in contrast to `parentNode`, which returns the parent node regardless of its type.
- For `Document`, `DocumentFragment`, and `Element`, the `children` property returns an `HTMLCollection` of only the child `Element` nodes. This is in contrast to `childNodes`, which returns all child nodes. The `firstElementChild` and `lastElementChild` properties return the first and last elements of this collection, respectively, or `null` if there are no child elements. The `childElementCount` property returns the number of child elements.
- For `Element` and `CharacterData`, the `previousElementSibling` and `nextElementSibling` properties return the previous and next sibling node that is an `Element`, or `null` if there is no such sibling. This is in contrast to `previousSibling` and `nextSibling`, which may return any type of sibling node.

## Comparing nodes

There are three important methods that compare nodes: `isEqualNode()`, `isSameNode()`, `compareDocumentPosition()`.

The `isSameNode()` method is legacy. Now, it behaves like the strict equality operator (`===`), returning `true` if and only if the two nodes are the same object.

The `isEqualNode()` method compares two nodes structurally. Two nodes are considered equal if they have the same type, the same data, and their child nodes are also equal at each index. In the Data of each node section, we already defined the data relevant for each node type:

- For `Document`, there is no data, so only the child nodes need to be compared.
- For `DocumentType`, the `name`, `publicId`, and `systemId` properties need to be compared.
- For `Element`, the `tagName` (more accurately, the `namespaceURI`, `prefix`, and `localName`; we will introduce these in the XML namespaces guide) and the attributes need to be compared.
- For `Attr`, the `name` (more accurately, the `namespaceURI`, `prefix`, and `localName`; we will introduce these in the XML namespaces guide) and `value` properties need to be compared.
- For all `CharacterData` nodes (`Text`, `CDATASection`, `Comment`, and `ProcessingInstruction`), the `data` property needs to be compared. For `ProcessingInstruction`, the `target` property also needs to be compared.

The `a.compareDocumentPosition(b)` method compares two nodes by tree order. It returns a bitmask indicating their relative positions. The possible cases are:

- Returns `0` if `a` and `b` are the same node.
- If the two nodes are both attributes of the same element node, returns `Node.DOCUMENT_POSITION_PRECEDING | Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC` (34) if `a` precedes `b` in the attribute list, or `Node.DOCUMENT_POSITION_FOLLOWING | Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC` (36) if `a` follows `b`. If either node is an attribute, the owner element is used for further comparisons.
- If the two nodes don't have the same root node, returns either `Node.DOCUMENT_POSITION_DISCONNECTED | Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC | Node.DOCUMENT_POSITION_PRECEDING` (35) or `Node.DOCUMENT_POSITION_DISCONNECTED | Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC | Node.DOCUMENT_POSITION_FOLLOWING` (37). Which one is returned is implementation-specific.
- If `a` is an ancestor of `b` (including when `b` is an attribute of `a`), returns `Node.DOCUMENT_POSITION_CONTAINS | Node.DOCUMENT_POSITION_PRECEDING` (10).
- If `a` is a descendant of `b` (including when `a` is an attribute of `b`), returns `Node.DOCUMENT_POSITION_CONTAINED_BY | Node.DOCUMENT_POSITION_FOLLOWING` (20).
- If `a` precedes `b` in tree order, returns `Node.DOCUMENT_POSITION_PRECEDING` (2).
- If `a` follows `b` in tree order, returns `Node.DOCUMENT_POSITION_FOLLOWING` (4).

Bitmask values are used, so you can use a bitwise AND operation to check for specific relationships. For example, to check if `a` precedes `b`, you can do:

```js
if (a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_PRECEDING) {
  // a precedes b
}
```

Which accounts for the cases of `a` and `b` being attributes of the same element, `a` being an ancestor of `b`, and `a` preceding `b` in tree order.

## Summary

Here are all the features we've introduced so far. There are a lot, but they are all useful in different scenarios.

- All nodes in the DOM implement the `Node` interface.
- To navigate around the DOM tree: `parentNode`, `childNodes`, `firstChild`/`lastChild`, `hasChildNodes()`, `getRootNode()`, `previousSibling`/`nextSibling`.
- To navigate around the element tree: `parentElement`, `children`, `firstElementChild`/`lastElementChild`, `childElementCount`, `previousElementSibling`/`nextElementSibling`.
- The `nodeType` property indicates the type of the node. The `nodeName`, `nodeValue`, and `textContent` properties provide the data held by the node.
- The `Document` node and its two important children: `doctype` and `documentElement`.
- The `DocumentType` node and its three properties: `name`, `publicId`, and `systemId`.
- The `Element` node and its properties: `tagName`, `attributes`.
- The `Attr` node and its properties: `name` and `value`.
- The `CharacterData` interface and its property: `data`.
- The four `CharacterData` subclasses: `Text`, `CDATASection`, `Comment`, and `ProcessingInstruction`. `ProcessingInstruction` also has the `target` property.
- The various ways to work with attributes, including the `id`, `className`, and `classList` properties.
- The three methods to compare nodes: `isEqualNode()`, `isSameNode()`, and `compareDocumentPosition()`.

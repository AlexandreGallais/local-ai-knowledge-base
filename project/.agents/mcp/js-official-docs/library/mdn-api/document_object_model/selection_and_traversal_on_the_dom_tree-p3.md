---
title: "Selection and traversal on the DOM tree (part 3 of 3)"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/document_object_model/selection_and_traversal_on_the_dom_tree/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Selection and traversal on the DOM tree (part 3 of 3)

## Summary

Here are all the features useful for selecting elements in the DOM tree or traversing the nodes:

- To select elements by ID, class, or tag name: `getElementById()` (also available on `DocumentFragment`), `getElementsByClassName()`, and `getElementsByTagName()` (both also available on `Element`).
- To select elements with CSS selectors: `querySelector()` for the first match, or `querySelectorAll()` for all matches. Both also available on `DocumentFragment` and `Element`.
- To test an element or search its ancestors: `matches()` and `closest()`.
- The `NodeList` and `HTMLCollection` interfaces are array-like collections of nodes/elements providing `length`, indexed access, iteration, and `item()`. `NodeList` also provides `forEach()`, `entries()`, `keys()`, and `values()`. `HTMLCollection` provides `namedItem()` and named property access.
- `document.createNodeIterator()` creates a `NodeIterator` that traverses nodes sequentially, using its `nextNode()`/`previousNode()` methods. Its position is exposed through `referenceNode` and `pointerBeforeReferenceNode`.
- `document.createTreeWalker()` creates a `TreeWalker` that traverses nodes in the filtered tree view, using its `parentNode()`, `firstChild()`/`lastChild()`, `previousSibling()`/`nextSibling()`, and `previousNode()`/`nextNode()` methods. Its position is exposed through `currentNode`.
- The `NodeFilter.SHOW_*` bitmasks select node types, and a filter function or `acceptNode()` method returns `FILTER_ACCEPT`, `FILTER_SKIP`, or `FILTER_REJECT`. Only `TreeWalker` uses `FILTER_REJECT` to prune subtrees.

## See also

- Anatomy of the DOM
- CSS Selectors
- `Element.querySelector()`
- `Element.querySelectorAll()`
- `Document.querySelector()`
- `Document.querySelectorAll()`
- `NodeIterator`
- `TreeWalker`
- DOM Standard: Traversal
- Selectors specification

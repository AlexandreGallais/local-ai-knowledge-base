---
title: "Node: appendChild() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/node/appendchild/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Node: appendChild() method

The **`appendChild()`** method of the `Node` interface adds a node to the end of the list of children of a specified parent node.

> **Note:**
> If the given child is a reference to an existing node in the document, `appendChild()` moves it from its current position to the new position.

If the given child is a `DocumentFragment`, the entire contents of the `DocumentFragment` are moved into the child list of the specified parent node.

`appendChild()` returns the newly appended node, or if the child is a `DocumentFragment`, the emptied fragment.

> **Note:**
> Unlike this method, the `Element.append()` method supports multiple arguments and appending strings. You can prefer using it if your node is an element.

## Syntax

```js
appendChild(child)
```

### Parameters

- `child`
    The node to append to the given parent node (commonly an element).

### Return value

A `Node` that is the appended child (`child`), except when `child` is a `DocumentFragment`, in which case the empty `DocumentFragment` is returned.

### Exceptions

- `HierarchyRequestError` `DOMException`
    Thrown when the constraints of the DOM tree are violated, that is if one of the following cases occurs:
    - If the parent of `child` is not a `Document`, `DocumentFragment`, or an `Element`.
    - If the insertion of `child` would lead to a cycle, that is if `child` is an ancestor of the node.
    - If `child` is not a `DocumentFragment`, a `DocumentType`, an `Element`, or a `CharacterData`.
    - If the current node is a `Text`, and its parent is a `Document`.
    - If the current node is a `DocumentType` and its parent is _not_ a `Document`, as a _doctype_ should always be a direct descendant of a _document_.
    - If the parent of the node is a `Document` and `child` is a `DocumentFragment` with more than one `Element` child, or that has a `Text` child.
    - If the insertion of `child` would lead to `Document` with more than one `Element` as child.

## Description

If the given child is a reference to an existing node in the document, `appendChild()` moves it from its current position to the new position — there is no requirement to remove the node from its parent
node before appending it to some other node. This means that a node can't be in two points of the document simultaneously. The `Node.cloneNode()` method can be used to make a copy of the node before appending it under the new parent. Copies made with `cloneNode` are not automatically kept in sync.

`appendChild()` returns the newly appended node, instead of the parent node. This means you can append the new node as soon as it's created without losing reference to it:

```js
const paragraph = document.body.appendChild(document.createElement("p"));
// You can append more elements to the paragraph later
```

On the other hand, you cannot use `appendChild()` in a fluent API fashion (like jQuery).

```js
// This doesn't append three paragraphs:
// the three elements will be nested instead of siblings
document.body
  .appendChild(document.createElement("p"))
  .appendChild(document.createElement("p"))
  .appendChild(document.createElement("p"));
```

## Example

### Append a paragraph to the body

```js
// Create a new paragraph element, and append it to the end of the document body
const p = document.createElement("p");
document.body.appendChild(p);
```

### Creating a nested DOM structure

In this example, we attempt to create a nested DOM structure using as few temporary variables as possible.

```js
const fragment = document.createDocumentFragment();
const li = fragment
  .appendChild(document.createElement("section"))
  .appendChild(document.createElement("ul"))
  .appendChild(document.createElement("li"));
li.textContent = "hello world";

document.body.appendChild(fragment);
```

It generates the following DOM tree:

```html
<section>
  <ul>
    <li>hello world</li>
  </ul>
</section>
```

## See also

- `Node.removeChild()`
- `Node.replaceChild()`
- `Node.insertBefore()`
- `Node.hasChildNodes()`
- `Element.insertAdjacentElement()`
- `Element.append()`

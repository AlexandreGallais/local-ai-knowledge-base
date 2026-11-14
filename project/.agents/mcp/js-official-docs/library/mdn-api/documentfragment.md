---
title: "DocumentFragment"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/documentfragment/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# DocumentFragment

The **`DocumentFragment`** interface represents a minimal document object that has no parent.

It is used as a lightweight version of `Document` that stores a segment of a document structure comprised of nodes just like a standard document. The key <example-value> is due to the fact that the document fragment isn't part of the active document tree structure. Changes made to the fragment don't affect the document.

## Constructor

- `DocumentFragment()`
    Creates and returns a new `DocumentFragment` object.

## Instance properties

_This interface has no specific properties, but inherits those of its parent, `Node`._

- `DocumentFragment.childElementCount` (read-only)
    Returns the amount of child `elements` the `DocumentFragment` has.
- `DocumentFragment.children` (read-only)
    Returns a live `HTMLCollection` containing all objects of type `Element` that are children of the `DocumentFragment` object.
- `DocumentFragment.firstElementChild` (read-only)
    Returns the `Element` that is the first child of the `DocumentFragment` object, or `null` if there is none.
- `DocumentFragment.lastElementChild` (read-only)
    Returns the `Element` that is the last child of the `DocumentFragment` object, or `null` if there is none.

## Instance methods

_This interface inherits the methods of its parent, `Node`._

- `DocumentFragment.append()`
    Inserts a set of `Node` objects or strings after the last child of the document fragment.
- `DocumentFragment.prepend()`
    Inserts a set of `Node` objects or strings before the first child of the document fragment.
- `DocumentFragment.querySelector()`
    Returns the first `Element` node within the `DocumentFragment`, in document order, that matches the specified selectors.
- `DocumentFragment.querySelectorAll()`
    Returns a `NodeList` of all the `Element` nodes within the `DocumentFragment` that match the specified selectors.
- `DocumentFragment.moveBefore()`
    Moves a given `Node` inside the invoking `DocumentFragment` as a direct child, before a given reference node, without removing and then inserting the node.
- `DocumentFragment.replaceChildren()`
    Replaces the existing children of a `DocumentFragment` with a specified new set of children.
- `DocumentFragment.getElementById()`
    Returns the first `Element` node within the `DocumentFragment`, in document order, that matches the specified ID. Functionally equivalent to `Document.getElementById()`.

## Usage notes

A common use for `DocumentFragment` is to create one, assemble a DOM subtree within it, then append or insert the fragment into the DOM using `Node` interface methods such as `appendChild()`, `append()`, or `insertBefore()`. Doing this moves the fragment's nodes into the DOM, leaving behind an empty `DocumentFragment`.

This interface is also of great use with Web components: `<template>` elements contain a `DocumentFragment` in their `HTMLTemplateElement.content` property.

An empty `DocumentFragment` can be created using the `document.createDocumentFragment()` method or the constructor.

## Performance

The performance benefit of `DocumentFragment` is often overstated. In fact, in some engines, using a `DocumentFragment` is slower than appending to the document in a loop as demonstrated in this benchmark. However, the difference between these examples is so marginal that it's better to optimize for readability than performance.

## Example

### HTML

```html
<ul></ul>
```

### JavaScript

```js
const ul = document.querySelector("ul");
const fruits = ["Apple", "Orange", "Banana", "Melon"];

const fragment = new DocumentFragment();

for (const fruit of fruits) {
  const li = document.createElement("li");
  li.textContent = fruit;
  fragment.append(li);
}

ul.append(fragment);
```

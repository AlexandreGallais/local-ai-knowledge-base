---
title: "Selection and traversal on the DOM tree (part 2 of 3)"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/document_object_model/selection_and_traversal_on_the_dom_tree/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Selection and traversal on the DOM tree (part 2 of 3)

## Working with collections

We already introduced two types of collections:

- _live `HTMLCollection`_ as returned by `getElementsByClassName()` and `getElementsByTagName()`
- _static `NodeList`_ as returned by `querySelectorAll()`

A `NodeList` can contain any type of node, while an `HTMLCollection` contains only elements (but the elements don't actually have to be HTML elements). You are perhaps already familiar with the `Node.childNodes` property, which is also a `NodeList`. The `NodeList` returned by `querySelectorAll()` contains only elements because that method selects elements.

Both interfaces are array-like, meaning that they have a `length` property and support indexed access. They also support iteration.

```js
const paragraphs = document.querySelectorAll("p");
console.log(paragraphs.length);
console.log(paragraphs[0]);

for (const para of paragraphs) {
  // ...
}
```

However, they are not real `Array` objects, so they lack methods like `Array.prototype.map()`. If you need these methods, you can convert them to arrays, using spread syntax or `Array.from()`:

```js
const paragraphs = [...document.querySelectorAll("p")];
const paragraphs2 = Array.from(document.querySelectorAll("p"));

const texts = paragraphs.map((p) => p.textContent);
```

The `NodeList` and `HTMLCollection` interfaces, along with many other array-like interfaces on the web, were an attempt to create an unmodifiable list. They don't provide any way to modify them, and modifying the converted arrays does not affect the original list.

`HTMLCollection` is not just a list; it's also a key-value map that allows lookup by the elements' ID or HTML elements' `name`. You can either use `namedItem()` or directly access them as properties (as long as they don't collide with existing property names of the `HTMLCollection`).

```js
const sections = document.getElementsByTagName("section");
const main = sections.namedItem("main");
const main2 = sections["main"];
```

The interfaces provide some additional convenience methods:

- Both interfaces provide an `item()` method, which works like indexed access. The main difference is that it returns `null` when the index is out of range, whereas indexed access returns `undefined`; it also applies different input conversion rules.
- `NodeList` provides `forEach()`, `entries()`, `keys()`, and `values()`. They work in the exact same way as the `Array` methods, so if you just need these methods, you don't have to convert it to an `Array`.

### Live and static collections

The `HTMLCollection` objects returned by `getElementsByTagName()` and `getElementsByClassName()` are _live_. Essentially, the collection doesn't store anything upfront; it just remembers the root element and the query. When you actually try to retrieve its length or an element in it, the collection then performs the actual traversal on the current DOM tree. (This may work differently in a real browser due to optimizations.) Therefore, if you save the collection and then update the DOM tree, the collection now reflects the latest DOM tree.

```js
const container = document.createElement("div");
const paragraph = document.createElement("p");
paragraph.className = "note";
container.append(paragraph);

const liveList = container.getElementsByClassName("note");
console.log(liveList.length); // 1

paragraph.classList.remove("note");
console.log(liveList.length); // 0
```

On the other hand, the `NodeList` object returned by `querySelectorAll()` is _static_, meaning that it's a snapshot of the tree's state at the time of the method call. A static list preserves its membership, not the state of the nodes: it still refers to the original node objects.

```js
const container = document.createElement("div");
const paragraph = document.createElement("p");
paragraph.className = "note";
container.append(paragraph);

const staticList = container.querySelectorAll(".note");
console.log(staticList.length); // 1

paragraph.classList.remove("note");
console.log(staticList.length); // 1
console.log(staticList[0].className); // ""
```

Usually, a static list is what you want. You almost always want to convert the collections to arrays anyway to use the array methods, at which point the collection is no longer live. Also, if you change a live collection while iterating over it, its indices and length can change, creating unintended concurrent modifications:

```js
const notes = document.getElementsByClassName("note");
for (const note of notes) {
  // This simultaneously removes this element from the collection, shifting
  // all later elements, so the next iteration doesn't visit the next element
  note.classList.remove("note");
}
```

To fix this, iterate over a snapshot, such as an array created with `Array.from(notes)` or a static list obtained with `querySelectorAll(".note")`. Alternatively, defer mutations that change the collection's membership or order until after iteration. You can still keep a reference to the live collection to observe later updates.

## Traversing nodes

Selector methods can be used to iterate over elements, like this:

```js
for (const descendant of element.querySelectorAll("*")) {
  // Visit every single descendant element in this subtree
}
```

However, this is quite limited: you cannot visit non-elements like text or comments, and you cannot avoid visiting a particular subtree without writing complicated selectors. The DOM provides two interfaces for general traversal: `NodeIterator` and `TreeWalker`. For example, the following example traverses all nodes, including text and comments:

```js
const nodeIterator = document.createNodeIterator(document);
let node = nodeIterator.nextNode();
while (node) {
  console.log(node.nodeName);
  node = nodeIterator.nextNode();
}
```

To create a `NodeIterator` or `TreeWalker`, call `document.createNodeIterator()` or `document.createTreeWalker()`, respectively. Both methods take the same three arguments:

- `root`: The node at which the traversal is rooted.
- `whatToShow` (optional): Specifies which node types to visit. A node that's not visited can still have descendants that are visited. It defaults to `NodeFilter.SHOW_ALL`.
- `filter` (optional): A function, or an object with an `acceptNode(node)` method, to further restrict the nodes that get visited. The function can decide if a node should be skipped, and if so, whether its descendants should be skipped too (only for `TreeWalker`). It defaults to `null`, meaning no additional filtering.

Both objects expose these settings through their read-only `root`, `whatToShow`, and `filter` properties.

The `NodeFilter` interface provides constants for `whatToShow`.

| Constant                                 | Shown nodes                          |
| ---------------------------------------- | ------------------------------------ |
| `NodeFilter.SHOW_ALL`                    | All                                  |
| `NodeFilter.SHOW_ATTRIBUTE`              | `Attr`                  |
| `NodeFilter.SHOW_CDATA_SECTION`          | `CDATASection`          |
| `NodeFilter.SHOW_COMMENT`                | `Comment`               |
| `NodeFilter.SHOW_DOCUMENT`               | `Document`              |
| `NodeFilter.SHOW_DOCUMENT_FRAGMENT`      | `DocumentFragment`      |
| `NodeFilter.SHOW_DOCUMENT_TYPE`          | `DocumentType`          |
| `NodeFilter.SHOW_ELEMENT`                | `Element`               |
| `NodeFilter.SHOW_PROCESSING_INSTRUCTION` | `ProcessingInstruction` |
| `NodeFilter.SHOW_TEXT`                   | `Text`                  |

> **Note:**
> The `NodeFilter.SHOW_ATTRIBUTE` constant is only effective when the root is an attribute node. Since the parent of any `Attr` node is
> always `null`, `TreeWalker.nextNode()` and `TreeWalker.previousNode()` will never return an `Attr` node. To
> traverse `Attr` nodes, use `Element.attributes` instead.

All these constants are bitmasks, so you can combine constants with the bitwise OR operator (`|`) to include multiple node types, such as `NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT` to include both element and text nodes.

A node that doesn't pass `whatToShow` is never passed to the `filter` function. However, it may still have descendants that are visited.

The `filter` function (or its `acceptNode()` method) is called when traversal evaluates a candidate node whose type matches `whatToShow`. Descendants of a rejected `TreeWalker` subtree may never reach the filter. The filter must return one of these constants:

- `NodeFilter.FILTER_ACCEPT`: causes the node to be actually returned.
- `NodeFilter.FILTER_SKIP`: causes the node to be skipped, but its descendants are still considered.
- `NodeFilter.FILTER_REJECT`: for `TreeWalker`, causes the node and all its descendants to be skipped; for `NodeIterator`, behaves like `FILTER_SKIP`.

For example, the following iterates over all non-whitespace text nodes:

```js
const iterator = document.createNodeIterator(
  document.body,
  NodeFilter.SHOW_TEXT,
  (node) =>
    node.data.trim() ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP,
);
```

### Iterating in tree order with NodeIterator

A `NodeIterator` visits nodes in tree order with `nextNode()` and in reverse tree order with `previousNode()`. Each call returns a node accepted by the filter, or `null` if there is no such node in that direction.

Continuing the preceding example, you can continuously move forward in tree order and log each text node:

```js
let node;
while ((node = iterator.nextNode())) {
  console.log(node.data);
}
```

Abstractly, `NodeIterator` works as if it keeps a list of nodes that passed the filter, sorted in tree order (it doesn't actually store that). The iterator tracks a position immediately between two nodes in that list, exposed as `referenceNode` and `pointerBeforeReferenceNode`. The `nextNode()` method returns the node immediately to the right of that position, while `previousNode()` returns the node immediately to its left. Initially, `referenceNode` is the root and `pointerBeforeReferenceNode` is `true`, so the first call to `nextNode()` returns the root if it passes the filters, while the first call to `previousNode()` returns `null` because there's nothing to the left. After a successful `nextNode()` call, the `referenceNode` is the returned node and `pointerBeforeReferenceNode` is `false`; vice versa for `previousNode()`. Consequently, reversing direction returns the same node again if it still passes the filters.

### Navigating the filtered tree with TreeWalker

`NodeIterator` exposes the filtered nodes as a linear collection, which is convenient for iteration but does not preserve the tree structure. A `TreeWalker` lets you navigate the relationships between nodes in a filtered view of the tree.

Abstractly, `TreeWalker` works as if it keeps a _tree_ of nodes that passed the filter, such that for every node in the filtered view, its direct children are its descendants on the original tree if there's no intervening node that also passes the filter. Remember that `NodeFilter.FILTER_SKIP` skips a node but allows its descendants, while `NodeFilter.FILTER_REJECT` skips a node and all its descendants.

Its `currentNode` property starts at the root, even if the root does not pass the filters. Unlike a `NodeIterator`, calling `nextNode()` starts searching after this current node, so the root itself is never returned on the first call.

The following methods move `currentNode` around the filtered view. If no such node is found, they return `null` and leave `currentNode` unchanged: `parentNode()`, `firstChild()`, `lastChild()`, `previousSibling()`, `nextSibling()`.

Note that the filtered view might not be a single tree if the root does not pass the filter. Use `previousNode()` and `nextNode()` to find the previous/next passing node in tree order, which may belong to a different filtered tree. These methods also return `null` and leave `currentNode` unchanged if no such node is found.

Unlike an iterator's `referenceNode`, `currentNode` is writable. You can save it and assign it back later, or reset the walker to its root with `walker.currentNode = walker.root`. Assignment does not apply the filters or check that the node is within the root's subtree, so keep it within that subtree when you want traversal to remain there.

For example, given this HTML:

```html
<article id="article">
  <p>Read <strong>this</strong> paragraph.</p>
  <aside data-skip><p>Ignore this note.</p></aside>
  <p>Read this paragraph too.</p>
</article>
```

This walker collects non-whitespace text nodes while excluding subtrees marked with `data-skip`:

```js
const article = document.getElementById("article");
const walker = document.createTreeWalker(
  article,
  NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT,
  (node) => {
    if (node.nodeType === Node.ELEMENT_NODE) {
      return node.hasAttribute("data-skip")
        ? NodeFilter.FILTER_REJECT
        : NodeFilter.FILTER_SKIP;
    }
    return node.data.trim() ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
  },
);

const parts = [];
let node;
while ((node = walker.nextNode())) {
  parts.push(node.data);
}
console.log(parts.join(""));
// "Read this paragraph.Read this paragraph too."
```

`SHOW_ELEMENT` is necessary even though we only collect text, because it lets the filter inspect and reject elements with `data-skip`. With only `SHOW_TEXT`, those elements would be skipped before the filter gets called, and their text would still be visited. Because `NodeIterator` has no concept of the tree structure, there's no way to exclude entire subtrees.

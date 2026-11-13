---
title: "Selection and traversal on the DOM tree (part 1 of 3)"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/document_object_model/selection_and_traversal_on_the_dom_tree/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Selection and traversal on the DOM tree

In the Anatomy of the DOM guide, we introduced properties for navigating between parents, children, and siblings, but manually walking the tree is verbose and error-prone. The DOM provides methods for directly obtaining the reference to an element in the tree by a unique identifier, a class name, a tag name, a CSS selector, and more. It also provides utility functions for iterating over tree nodes.

## Tree traversal: at a high level

The Anatomy of the DOM guide introduces the tree structure of the DOM. The tree has a root, and each node has a (possibly empty) list of children. The document root is a `Document` node, while `Element` nodes form the backbone of this tree.

There are many ways to traverse a tree, but the DOM only exposes one order: pre-order depth-first search (DFS), which is called _document order_ or _tree order_. In pseudo-code, pre-order works like this:

```js
function traverseTree(root, visitor) {
  // Visit the root first
  visitor(root);
  for (const child of root.childNodes) {
    // Recursively visit each child in order
    // Each child subtree is completely visited before moving to the next
    traverseTree(child, visitor);
  }
}
```

An element precedes its descendants, and earlier siblings and their descendants precede later siblings. For example, in the tree above, the `Element` nodes listed in tree order are: `HTML`, `HEAD`, `TITLE`, `BODY`, `H1`, `P`.

Selection is just a form of traversal, with the `visitor` being a boolean function that tells us if we are interested in the element.

```js
function selectTree(root, visitor) {
  // visitor successfully matches the root node; return without going further
  if (visitor(root)) return root;
  for (const child of root.childNodes) {
    const result = selectTree(child, visitor);
    // A result is successfully found within the subtree at child
    if (result !== null) return result;
  }
  // No match found anywhere in the subtree at root
  return null;
}

function selectTreeMulti(root, visitor, collection) {
  if (visitor(root)) collection.push(root);
  for (const child of root.childNodes) {
    selectTreeMulti(child, visitor, collection);
  }
  return collection;
}
```

Once you understand these, you already understand a big part of DOM selection and traversal. All that remains is how each specialized DOM method defines its `visitor` function and `collection` object for you.

## Selecting elements by ID, class, or tag name

There are three main ways to identify an element: its `id`, `className`, and `tagName`. The `Document` interface provides three methods to select by these three identifiers:

- `document.getElementById()`
- `document.getElementsByClassName()`
- `document.getElementsByTagName()`

As the names suggest, `getElementById()` returns the reference to a single element (or `null` if no element is found), while `getElementsByClassName()` and `getElementsByTagName()` return collections of elements. The collection is a _live `HTMLCollection`_; we will discuss this further in Working with collections.

Each element's `id` should be unique within the document (but shadow DOM are separate documents and therefore have their own scopes). As long as you uphold that requirement in your code, you will always get the element you intend with `getElementById()`. However, `id` attributes are used very sparingly because they are hard to be kept globally unique. Therefore, in real applications, you will often find `getElementsByClassName()` and `getElementsByTagName()` (or the querying methods we will introduce soon) more practical.

```html
<div id="container"></div>
<div class="profile big"></div>
```

```js
const containerDiv = document.getElementById("container");
// containerDiv is an HTMLDivElement

const profileDivs = document.getElementsByClassName("profile");
// profileDivs is an HTMLCollection containing an HTMLDivElement

const profileDivs2 = document.getElementsByTagName("div");
// profileDivs2 is an HTMLCollection containing both HTMLDivElements
```

Some notes worth calling out:

- The `getElementById()` method matches IDs case-sensitively. The `getElementsByClassName()` method also matches case-sensitively, except in quirks mode, where matching is ASCII case-insensitive.
- In HTML documents, `getElementsByTagName()` lowercases the argument when matching HTML elements. Non-HTML elements (e.g., SVG) are still matched case-sensitively. In XML documents, all tag-name matching is case-sensitive. Note that the `tagName` of an HTML element in an HTML document is returned in uppercase, but internally it's still stored in lowercase.
- The `class` attribute's value is a space-separated list of one or more class names. You can also specify a space-separated list for `getElementsByClassName()`, and the `visitor` tests for a subset-of relationship. That is, an element is matched if all of these class names are present on the element, and extra class names on the element are also allowed.
- The `getElementsByTagName()` method takes the special `"*"` value to get all elements (i.e., apply no filtering).

If you are familiar with CSS selectors, these methods are the DOM equivalents of the ID, class, type, and universal selectors:

```css
/* document.getElementById("container") */
#container {
}

/* document.getElementsByClassName("profile") */
.profile {
}

/* document.getElementsByClassName("profile big") */
.profile.big {
}

/* document.getElementsByTagName("div") */
div {
}

/* document.getElementsByTagName("*") */
* {
}
```

The `getElementById()` method is also available on `DocumentFragment`; the `getElementsByClassName()` and `getElementsByTagName()` methods are also available on `Element`. Calling the method on a node sets the search root to that node. The calling root is never matched.

## Selecting elements with CSS selectors

You can also directly use CSS selectors to select elements. Two methods are available on `Document`:

- `document.querySelector()`
- `document.querySelectorAll()`

Both methods search descendants, excluding the node on which they are called. The `querySelector()` method returns the first matching element; the `querySelectorAll()` method returns all matching elements in a _static `NodeList`_. Again, we'll more formally introduce this collection in Working with collections.

The selector methods accept selectors to determine what element or elements should be returned. This includes selector lists so you can group multiple selectors in a single query.

To select all paragraph (`p`) elements in a document whose classes include `warning` or `note`, you can do the following:

```js
const special = document.querySelectorAll("p.warning, p.note");
```

You can also query by ID. For example:

```js
const el = document.querySelector("#main, #basic, #exclamation");
```

After executing the above code, `el` contains the first element in the document whose ID is one of `main`, `basic`, or `exclamation`. The order of selectors in the list does not give one ID priority over another. An element that matches more than one selector appears only once in the result of `querySelectorAll()`.

Pseudo-classes, such as `:checked` and `:first-child`, can be used in queries. To protect the user's privacy, some pseudo-classes are not supported or behave differently. For example, `:visited` will return no matches and `:link` is treated as `:any-link`. Only elements can be selected, so pseudo-elements, such as `::before`, do not produce matching DOM elements.

The `querySelector` methods are basically supersets of the previously introduced `getElementBy` methods. Anything you can implement with the latter, you can achieve similar results with the former:

```js
document.getElementById("container");
// Is equivalent to:
document.querySelector("#container");

document.getElementsByClassName("profile big");
// Is equivalent to:
document.querySelectorAll(".profile.big");

document.getElementsByTagName("div");
// Is equivalent to:
document.querySelectorAll("div");
```

There are only two things to watch out for:

- The `getElementsByClassName()` and `getElementsByTagName()` methods return live collections, while `querySelectorAll()` returns a static collection (see Live and static collections). Usually, the static collection's behavior is what you want.
- The selector string must be valid CSS selector syntax; otherwise, the method throws a `SyntaxError` `DOMException`. An HTML ID or class name is not necessarily a valid CSS identifier. Use `CSS.escape()` when inserting such a value into an ID or class selector:

  ```js
  const id = "item:42";
  const item = document.querySelector(`#${CSS.escape(id)}`);
  // document.getElementById(id) needs no escaping.
  ```

Both querying methods are also available on `DocumentFragment` and `Element`. Calling `querySelector()` or `querySelectorAll()` on an element limits the returned elements to its descendants, but the selector is applied in the context of the entire document. For example, given this HTML:

```html
<div>
  <section id="main">
    <p class="note">A direct child.</p>
    <div>
      <p class="note">A nested paragraph.</p>
    </div>
  </section>
</div>
```

A selector like `div p` still matches the first note, because this `p` is indeed nested in a `div`, although that `div` is outside of the search root. Use `:scope` to apply the selector only within the search root:

```js
const main = document.getElementById("main");
const allNotes = main.querySelectorAll("div p"); // Both paragraphs
const childNote = main.querySelectorAll(":scope div p"); // Only the second
const childNote2 = main.querySelectorAll(":scope > p"); // Only the first
```

The `Element.matches()` method tests if an element matches the selector string, so `querySelector()` works like the `selectTree` function with `element.matches` passed as the `visitor` function (despite many technical differences).

You can also search _up_ using the `Element.closest()` method. This tests the element itself, then its parent element, and so on toward the root, until it finds an ancestor element that matches the given selector.

Using the same HTML:

```js
const innerNote = document.querySelector("#main div p.note");
console.log(innerNote.closest("section").id); // "main"
```

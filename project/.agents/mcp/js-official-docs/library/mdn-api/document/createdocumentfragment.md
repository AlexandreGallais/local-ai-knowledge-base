---
title: "Document: createDocumentFragment() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/document/createdocumentfragment/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Document: createDocumentFragment() method

Creates a new empty `DocumentFragment` into which
DOM nodes can be added to build an offscreen DOM tree.

## Syntax

```js
createDocumentFragment()
```

### Parameters

None.

### Return value

A newly created, empty, `DocumentFragment` object, which is ready to have
nodes inserted into it.

## Usage notes

`DocumentFragment`s are DOM `Node` objects which are never part
of the main DOM tree. The usual use case is to create the document fragment, append
elements to the document fragment and then append the document fragment to the DOM tree.
In the DOM tree, the document fragment is replaced by all its children.

Since the document fragment is _in memory_ and not part of the main DOM tree,
using document fragments could result in better performance
in some older engines.

You can also use the `DocumentFragment` constructor to create a new
fragment:

```js
const fragment = new DocumentFragment();
```

## Examples

This example creates a list of major web browsers in a `DocumentFragment`,
then adds the new DOM subtree to the document to be displayed.

### HTML

```html
<ul id="ul"></ul>
```

### JavaScript

```js
const element = document.getElementById("ul"); // assuming ul exists
const fragment = document.createDocumentFragment();
const browsers = ["Firefox", "Chrome", "Opera", "Safari"];

browsers.forEach((browser) => {
  const li = document.createElement("li");
  li.textContent = browser;
  fragment.appendChild(li);
});

element.appendChild(fragment);
```

## See also

- `document.implementation.createDocument()`
- `documentFragment`

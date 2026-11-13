---
title: "Document: getElementsByTagName() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/document/getelementsbytagname/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Document: getElementsByTagName() method

The **`getElementsByTagName`** method of
`Document` interface returns an
`HTMLCollection` of elements with the given tag name.

The complete
document is searched, including the root node. The returned `HTMLCollection`
is live, meaning that it updates itself automatically to stay in sync with the DOM tree
without having to call `document.getElementsByTagName()` again.

## Syntax

```js
getElementsByTagName(name)
```

### Parameters

- `name`
    A string representing the name of the elements. The special
    string `*` represents all elements.

### Return value

A live `HTMLCollection` of found elements in the order they appear in the tree.

## Examples

In the following example, `getElementsByTagName()` starts from a particular
parent element and searches top-down recursively through the DOM from that parent
element, building a collection of all descendant elements which match the tag
`name` parameter. This demonstrates both
`document.getElementsByTagName()` and the functionally identical
`Element.getElementsByTagName()`, which starts the search at a specific
element within the DOM tree.

Clicking the buttons uses `getElementsByTagName()` to count the descendant
paragraph elements of a particular parent (either the document itself or one of two
nested `` elements).

```html
<p>Some outer text</p>
<p>Some outer text</p>

<div id="div1">
  <p>Some div1 text</p>
  <p>Some div1 text</p>
  <p>Some div1 text</p>

  <div id="div2">
    <p>Some div2 text</p>
    <p>Some div2 text</p>
  </div>
</div>

<p>Some outer text</p>
<p>Some outer text</p>

<button id="btn1">Show all p elements in document</button>
<br />
<button id="btn2">Show all p elements in div1 element</button>
<br />
<button id="btn3">Show all p elements in div2 element</button>
```

```css
body {
  border: solid green 3px;
}

#div1 {
  border: solid blue 3px;
}

#div2 {
  border: solid red 3px;
}
```

```js
function getAllParaElems() {
  const allParas = document.getElementsByTagName("p");
  const num = allParas.length;
  alert(`There are ${num} paragraph in this document`);
}

function div1ParaElems() {
  const div1 = document.getElementById("div1");
  const div1Paras = div1.getElementsByTagName("p");
  const num = div1Paras.length;
  alert(`There are ${num} paragraph in #div1`);
}

function div2ParaElems() {
  const div2 = document.getElementById("div2");
  const div2Paras = div2.getElementsByTagName("p");
  const num = div2Paras.length;
  alert(`There are ${num} paragraph in #div2`);
}

document.getElementById("btn1").addEventListener("click", getAllParaElems);
document.getElementById("btn2").addEventListener("click", div1ParaElems);
document.getElementById("btn3").addEventListener("click", div2ParaElems);
```

## Notes

When called on an HTML document, `getElementsByTagName()` lower-cases its
argument before proceeding. This is undesirable when trying to match camel case SVG
elements in a subtree in an HTML document.
`document.getElementsByTagNameNS()` is useful in that case. See also
Firefox bug 499656.

`document.getElementsByTagName()` is similar to
`Element.getElementsByTagName()`, except that its search encompasses the
whole document.

## See also

- `Element.getElementsByTagName()`
- `document.getElementById()` to return a reference to an element by its
  `id`
- `document.getElementsByName()` to return a reference to an element by
  its `name`
- `document.querySelector()` for powerful selectors via queries like
  `'div.myclass'`

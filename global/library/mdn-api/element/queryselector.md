---
title: "Element: querySelector() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/element/queryselector/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Element: querySelector() method

The **`querySelector()`** method of the `Element`
interface returns the first element that is a descendant of the element on which it is
invoked that matches the specified group of selectors.

## Syntax

```js
querySelector(selectors)
```

### Parameters

- `selectors`
    A string containing one or more selectors to match. This string
    must be a valid CSS selector string; if it isn't, a `SyntaxError` exception
    is thrown.

    Note that the HTML specification does not require attribute values to be valid CSS identifiers. If a `class` or `id` attribute value is not a valid CSS identifier, then you must escape it before using it in a selector, either by calling `CSS.escape()` on the value, or using one of the techniques described in Escaping characters. See Escaping attribute values for an example.

### Return value

The first descendant element of `baseElement` which matches the specified
group of `selectors`. The entire hierarchy of elements is considered when
matching, including those outside the set of elements including `baseElement`
and its descendants; in other words, `selectors` is first applied to the
whole document, not the `baseElement`, to generate an initial list of
potential elements. The resulting elements are then examined to see if they are
descendants of `baseElement`. The first match of those remaining elements is
returned by the `querySelector()` method.

If no matches are found, the returned value is `null`.

### Exceptions

- `SyntaxError` `DOMException`
    Thrown if the specified `selectors` are invalid.

## Examples

Let's consider a few examples.

### Find a specific element with specific values of an attribute

In this first example, the first `<style>` element which either has no
type or has type "text/css" in the HTML document body is returned:

```js
const el = document.body.querySelector(
  "style[type='text/css'], style:not([type])",
);
```

### Get direct descendants using the :scope pseudo-class

This example uses the `:scope` pseudo-class to retrieve direct children of the `parentElement` element.

#### HTML

```html
<div>
  <h6>Page Title</h6>
  <div id="parent">
    <span>Love is Kind.</span>
    <span>
      <span>Love is Patient.</span>
    </span>
    <span>
      <span>Love is Selfless.</span>
    </span>
  </div>
</div>
```

#### CSS

```css
span {
  display: block;
  margin-bottom: 5px;
}
.red span {
  background-color: red;
  padding: 5px;
}
```

#### JavaScript

```js
const parentElement = document.querySelector("#parent");
let allChildren = parentElement.querySelectorAll(":scope > span");
allChildren.forEach((item) => item.classList.add("red"));
```

#### Result

### The entire hierarchy counts

This example demonstrates that the hierarchy of the entire document is considered when
applying `selectors`, so that levels outside the specified
`baseElement` are still considered when locating matches.

#### HTML

```html
<div>
  <h5>Original content</h5>
  <p>
    inside paragraph
    <span>inside span</span>
    inside paragraph
  </p>
</div>
<div>
  <h5>Output</h5>
  <div id="output"></div>
</div>
```

#### JavaScript

```js
const baseElement = document.querySelector("p");
document.getElementById("output").textContent =
  baseElement.querySelector("div span").textContent;
```

#### Result

The result looks like this:

Notice how the `"div span"` selector still successfully matches the
`` element, even though the `baseElement`'s child nodes
do not include the `` element (it is still part of the specified
selector).

### Escaping attribute values

This example shows that if an HTML document contains an `id` which is not a valid CSS identifier, then we must escape the attribute value before using it in `querySelector()`.

#### HTML

In the following code, a `` element has an `id` of `"this?element"`, which is not a valid CSS identifier, because the `"?"` character is not allowed in CSS identifiers.

We also have three buttons, and a `<pre>` element for logging errors.

```html
<div id="container">
  <div id="this?element"></div>
</div>

<button id="no-escape">No escape</button>
<button id="css-escape">CSS.escape()</button>
<button id="manual-escape">Manual escape</button>

<pre id="log"></pre>
```

#### CSS

```css
div {
  background-color: blue;
  margin: 1rem 0;
  height: 100px;
  width: 200px;
}
```

#### JavaScript

All three buttons, when clicked, try to select the ``, and then set its background color to a random value.

- The first button uses the `"this?element"` value directly.
- The second button escapes the value using `CSS.escape()`.
- The third button explicitly escapes the `"?"` character using a backslash. Note that we must also escape the backslash itself, using another backslash, like: `"\\?"`.

```js
const container = document.querySelector("#container");
const log = document.querySelector("#log");

function random(number) {
  return Math.floor(Math.random() * number);
}

function setBackgroundColor(id) {
  log.textContent = "";

  try {
    const element = container.querySelector(`#${id}`);
    const randomColor = `rgb(${random(255)} ${random(255)} ${random(255)})`;
    element.style.backgroundColor = randomColor;
  } catch (e) {
    log.textContent = e;
  }
}

document.querySelector("#no-escape").addEventListener("click", () => {
  setBackgroundColor("this?element");
});

document.querySelector("#css-escape").addEventListener("click", () => {
  setBackgroundColor(CSS.escape("this?element"));
});

document.querySelector("#manual-escape").addEventListener("click", () => {
  setBackgroundColor("this\\?element");
});
```

#### Result

Clicking the first button gives an error, while the second and third buttons work properly.

### More examples

See `Document.querySelector()` for additional examples of the proper
format for the `selectors`.

## See also

- Selection and traversal on the DOM tree
- Attribute selectors in the CSS
  Guide
- Attribute selectors in the MDN Learning Area
- `Element.querySelectorAll()`
- `Document.querySelector()` and
  `Document.querySelectorAll()`
- `DocumentFragment.querySelector()` and
  `DocumentFragment.querySelectorAll()`
- Other methods that take selectors: `element.closest()` and
  `element.matches()`.

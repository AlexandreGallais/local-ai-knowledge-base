---
title: "CSSPseudoElement: pseudo() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/csspseudoelement/pseudo/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSSPseudoElement: pseudo() method

The **`pseudo()`** method of the `CSSPseudoElement` interface returns a `CSSPseudoElement` instance representing a specific nested pseudo-element.

## Syntax

```js
pseudo(type)
```

### Parameters

- `type`
    A string representing the type of pseudo-element to return a representation of. Valid values are:
    - `::after`
    - `::before`
    - `::marker`

### Return value

A `CSSPseudoElement` object instance, or `null` if `type` is not equal to a valid pseudo-element type.

## Description

The `CSSPseudoElement.pseudo()` method is used to target a pseudo-element that is attached to another pseudo-element, rather than directly to a standard DOM element. For example, if a `::before` pseudo-element generates a list marker — selectable via `::before::marker` — this method can retrieve the `::marker` nested inside that `::before`. You call the method on the parent pseudo-element and pass the type of the nested child pseudo-element as an argument.

Provided its `type` parameter contains a valid pseudo-element type, `pseudo()` will always return a `CSSPseudoElement` instance, even if that pseudo-element hasn't been generated on the calling pseudo-element.

## Examples

### Basic usage

In this example, we demonstrate basic usage of the `pseudo()` method.

#### HTML

We include a `` element containing text, and an `<output>` element to log output from JavaScript.

```html
<p>New York's hottest club is...</p>
<output></output>
```

#### CSS

We give the `` element's `::after` pseudo-element some `content` and set its `display` to `list-item` so it will generate a `::marker`. We also apply some basic styles.

```css
body {
  width: 80%;
  margin: 0 auto;
}
```

```css
p {
  background-color: violet;
  padding: 20px;
}

p::after {
  content: "Crease";
  background-color: cadetblue;
  padding: 20px;
  display: list-item;
}

p::after::marker {
  content: "🔹";
}
```

#### JavaScript

In our script, we grab references to our `` and `<output>` elements, and retrieve `CSSPseudoElement` objects via the `pseudo()` method representing the `` element's `::after` pseudo-element, and the `::after` pseudo-element's `::marker` pseudo-element. We then log some details of the child pseudo-element to our `<output>` element. We also include some rudimentary error handling via a `try...catch` structure, to print an error message in non-supporting browsers.

```js
const pElem = document.querySelector("p");
const output = document.querySelector("output");

try {
  const pseudoElem = pElem.pseudo("::after");
  const pseudoPseudoElem = pseudoElem.pseudo("::marker");
  output.textContent = `${pseudoPseudoElem.type} pseudo-element. Parent: ${pseudoPseudoElem.parent.type}. Ultimate originating element: <${pseudoPseudoElem.element.tagName.toLowerCase()}>`;
} catch (e) {
  output.textContent = `Your browser doesn't support CSSPseudoElement and/or the pseudo() method: ${e}`;
}
```

#### Result

## See also

- `CSSPseudoElement.element`
- `CSSPseudoElement.parent`
- `Element.pseudo()`

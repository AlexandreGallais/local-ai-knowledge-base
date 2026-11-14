---
title: "CSSPseudoElement: parent property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/csspseudoelement/parent/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSSPseudoElement: parent property

The **`parent`** read-only property of the `CSSPseudoElement` interface returns a reference to the immediate originating element of the pseudo-element, which can be an `Element`, or a `CSSPseudoElement` in the case of a nested pseudo-element.

This differs from the `CSSPseudoElement.element` property, which always returns an `Element`: A reference to the ultimate originating element of the pseudo-element.

## Value

An `Element` or a `CSSPseudoElement` representing the pseudo-element's immediate parent.

## Examples

### Basic usage

In this example, we demonstrate the difference between the `parent` and `element` properties.

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
- `CSSPseudoElement.pseudo()`
- `Element.pseudo()`

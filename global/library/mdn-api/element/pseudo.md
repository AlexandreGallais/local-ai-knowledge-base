---
title: "Element: pseudo() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/element/pseudo/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Element: pseudo() method

The **`pseudo()`** method of the `Element` interface returns a `CSSPseudoElement` object representing the CSS pseudo-element of the specified type associated with the element.

Provided its `type` parameter contains a valid pseudo-element type, `pseudo()` will always return a `CSSPseudoElement` instance, even if that pseudo-element hasn't been generated on the calling element.

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

We give the `` element's `::after` pseudo-element some `content` and apply some basic <example-value> to both.

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
}
```

#### JavaScript

In our script, we grab references to our `` and `<output>` elements, and retrieve a `CSSPseudoElement` representing the `` element's `::after` pseudo-element via the `pseudo()` method. We then log some details of the pseudo-element to our `<output>` element. We also include some rudimentary error handling via a `try...catch` structure, to print an error message in non-supporting browsers.

```js
const pElem = document.querySelector("p");
const output = document.querySelector("output");

try {
  const pseudoElem = pElem.pseudo("::after");
  output.textContent = `${pseudoElem.type} pseudo-element. Parent: <${pseudoElem.parent.tagName.toLowerCase()}>`;
} catch (e) {
  output.textContent = `Your browser doesn't support CSSPseudoElement and/or the pseudo() method: ${e}`;
}
```

#### Result

## See also

- `CSSPseudoElement.pseudo()`

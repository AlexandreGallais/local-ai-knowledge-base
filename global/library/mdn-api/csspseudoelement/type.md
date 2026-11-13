---
title: "CSSPseudoElement: type property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/csspseudoelement/type/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSSPseudoElement: type property

The **`type`** read-only property of the `CSSPseudoElement` interface returns the type of the pseudo-element as a string, represented in the form of a CSS selector.

## Value

A string representing the type of pseudo-element represented by the `CSSPseudoElement`. Possible values are:

- `::after`
- `::before`
- `::marker`

## Examples

### Basic usage

The example below demonstrates the relationship between
`CSSPseudoElement.type` and `Element.pseudo()`:

```js
const myElement = document.querySelector("q");
const mySelector = "::after";
const cssPseudoElement = myElement.pseudo(mySelector);
const typeOfPseudoElement = cssPseudoElement.type;

console.log(mySelector === typeOfPseudoElement); // Outputs true
```

## See also

- `Element.pseudo()`
- `CSSPseudoElement.pseudo()`
- List of pseudo-elements

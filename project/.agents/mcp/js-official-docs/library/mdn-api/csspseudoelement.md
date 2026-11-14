---
title: "CSSPseudoElement"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/csspseudoelement/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSSPseudoElement

The **`CSSPseudoElement`** interface represents a pseudo-element.

Instances of this interface may be obtained by calling `Element.pseudo()` or `CSSPseudoElement.pseudo()`.

## Instance properties

- `CSSPseudoElement.element` (experimental) (read-only)
    Returns the ultimate originating `Element` of the pseudo-element.
- `CSSPseudoElement.parent` (experimental) (read-only)
    Returns the immediate originating element of the pseudo-element.
- `CSSPseudoElement.type` (experimental) (read-only)
    Returns the pseudo-element selector as a string.

## Instance methods

- `CSSPseudoElement.pseudo()` (experimental)
    Returns a `CSSPseudoElement` instance representing a specific nested pseudo-element

## Description

The **`CSSPseudoElement`** interface represents a pseudo-element. You can retrieve a representation of a pseudo-element attached to a DOM element using the `Element.pseudo()` method, or a representation of a nested pseudo-element (for example, the `::marker` in `::before::marker`) using the `CSSPseudoElement.pseudo()` method.

The `CSSPseudoElement.type` property returns a string representing the type of the pseudo-element. Supported types are:

- `::after`
- `::before`
- `::marker`

The `CSSPseudoElement.element` and `CSSPseudoElement.parent` properties sound similar, but they have a difference in functionality:

- The `element` property always returns an `Element`: A reference to the ultimate originating element of the pseudo-element or nested pseudo-element.
- The `parent` property returns a reference to the pseudo-element's _immediate_ originating element: This can be either an `Element`, or a `CSSPseudoElement` in the case of a nested pseudo-element.

## Examples

### Basic <example-value> using Element.pseudo

Using pseudo-elements, most modern browsers will automatically add quotation marks around text inside a `<q>` element. (A style rule may be needed to add quotation marks in older browsers.) The example below demonstrates the basic <example-value> of the `CSSPseudoElement` object representing the opening quotation mark.

```js
const element = document.querySelector("q");
const cssPseudoElement = element.pseudo("::before");
console.log(cssPseudoElement.element); // Outputs [object HTMLQuoteElement]
console.log(cssPseudoElement.type); // Outputs '::before'
```

## See also

- `Element.pseudo()`
- `Web Animations API`
- `Element.animate()`
- CSS pseudo-elements module

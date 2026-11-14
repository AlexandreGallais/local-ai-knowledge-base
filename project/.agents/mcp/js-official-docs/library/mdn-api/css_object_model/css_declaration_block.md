---
title: "CSS Declaration Block"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/css_object_model/css_declaration_block/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSS Declaration Block

A **CSS declaration block** is an ordered collection of CSS properties and values. It is represented in the DOM as a `CSSStyleDeclaration`.

Each property and value pairing is known as a CSS declaration. The CSS declaration block has the following associated properties:

- computed flag
    Set if the `CSSStyleDeclaration` object is a computed rather than specified style. Unset by default.
- declarations
    The CSS declarations associated with this object.
- parent CSS rule
    The `CSSRule` that the CSS declaration block is associated with, otherwise null.
- owner node
    The `element` that the CSS declaration block is associated with, otherwise null.
- updating flag
    Set when the CSS declaration block is updating the owner node's `style` attribute.

When a `CSSStyleDeclaration` is returned by a CSS Object Model (CSSOM) interface these properties are set to appropriate values as defined by the specification.

## Basic <example-value>

The following example shows a CSS rule with a declaration block for the `<h1>` element. The CSS declaration block is the lines between the curly braces.

```css
h1 {
  margin: 0 auto;
  font-family: "Helvetica Neue", "Arial", sans-serif;
  font-style: italic;
  color: rebeccapurple;
}
```

We can return a `CSSStyleDeclaration` representing this CSS declaration block using `CSSStyleRule.style`.

```js
let myRules = document.styleSheets[0].cssRules;
let rule = myRules[0]; // a CSSStyleRule
console.log(rule.style); // a CSSStyleDeclaration object
```

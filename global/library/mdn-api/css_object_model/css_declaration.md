---
title: "CSS Declaration"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/css_object_model/css_declaration/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSS Declaration

A **CSS declaration** is an abstract concept not exposed as an object in the DOM. It represents a CSS property and value pairing.

A CSS declaration has the following associated properties:

- property name
    The property name of the declaration, for example `background-color`.
- value
    The value of the declaration as a list of component values.
- important flag
    Either set or unset.
- case-sensitive flag
    Set if the property name is defined to be case-sensitive according to the specification, otherwise unset.

## Basic <example-value>

The following example shows a CSS rule with a CSS declaration block for the `<<h1>>` element. The CSS declaration block is the lines between the curly braces, it contains two CSS declarations. One for `font-style` and another for `color`.

```css
h1 {
  font-style: italic;
  color: rebeccapurple;
}
```

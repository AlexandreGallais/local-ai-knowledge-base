---
title: "CSSNestedDeclarations"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/cssnesteddeclarations/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSSNestedDeclarations

The **`CSSNestedDeclarations`** interface of the CSS Rule API is used to group nested `CSSRule`s.

The interface allows the CSS Object Model (CSSOM) to mirror the structure of CSS documents with nested CSS rules, and ensure that rules are parsed and evaluated in the order that they are declared.

> **Note:**
> Implementations that do not support this interface may parse nested rules in the wrong order.
> See Browser compatibility for more information.

## Instance properties

_Inherits properties from its ancestor `CSSRule`._

- `CSSNestedDeclarations.style` (read-only)
    Returns the values of the nested rules.

## Instance methods

_No specific methods; inherits methods from its ancestor `CSSRule`._

## Examples

### CSS

The CSS below includes a selector `.foo` that contains two declarations and a media query.

```css
.foo {
  background-color: silver;
  @media screen {
    color: tomato;
  }
  color: black;
}
```

This is represented by a number of JavaScript objects in the CSS Object Model:

- A `CSSStyleRule` object that represents the `background-color: silver` rule.
  This can be returned via `document.styleSheets[0].cssRules[0]`.
- A `CSSMediaRule` object that represents the `@media screen` rule, and which can be returned via `document.styleSheets[0].cssRules[0].cssRules[0]`.
  - The `CSSMediaRule` object contains a `CSSNestedDeclaration` object which represents the `color: tomato` rule nested by the `@media screen` rule.
    This can be returned via `document.styleSheets[0].cssRules[0].cssRules[0].cssRules[0]`.
- The final rule is a `CSSNestedDeclaration` object that represents the `color: black` rule in the stylesheet, and which can be returned via `document.styleSheets[0].cssRules[0].cssRules[1]`.

> **Note:**
> All top-level styles after the first `CSSNestedDeclaration` must also be represented as `CSSNestedDeclaration` objects in order to follow the CSS nested declarations rule

### CSSOM (CSS Object Model)

```plain
↳ CSSStyleRule
  .style
    - background-color: silver
  ↳ CSSMediaRule
    ↳ CSSNestedDeclarations
      .style (CSSStyleDeclaration, 1) =
      - color: tomato
  ↳ CSSNestedDeclarations
    .style (CSSStyleDeclaration, 1) =
      - color: black
```

## See Also

- `CSSNestedDeclarations.style`
- The Nested Declarations Rule

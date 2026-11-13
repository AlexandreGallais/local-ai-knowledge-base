---
title: "CSS custom functions and mixins"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/guides/custom_functions_and_mixins/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSS custom functions and mixins

The **CSS custom functions and mixins** module allows developers to create reusable blocks of CSS code that can accept arguments, contain complex logic (defined using features such as CSS `if()` functions and `@media` at-rules), and return values based on that logic.

CSS custom functions are defined in `@function` at-rules and called using `<dashed-function>` syntax, which looks very similar to CSS custom property syntax except that it includes parentheses at the end containing arguments (for example, `--my-function(30px, 3)`). CSS custom functions can be called within any property value, and will return a value based on the arguments passed into the function and the logic inside it.

CSS mixins are defined in `@mixin` at-rules and applied using `@apply` at-rules nested inside rulesets. CSS mixins define a set of properties that can be reused inside multiple rulesets and customized with arguments and logic.

CSS custom functions and mixins can be assigned optional data types for their arguments and return values, to restrict the values passed into them and returned from them.

> **Note:**
> Currently, only CSS custom functions have browser support. CSS mixins are not currently supported in any browser.

## Reference

### At-rules and descriptors

- `@function`
  - `result`

The CSS custom functions and mixins module also introduces the `@mixin`, `@apply`, `@contents`, and `@env` at-rules. Currently, no browsers support these features.

### Data types and values

- `dashed-function`

### Functions

- `type`

### Interfaces

- `CSSFunctionRule`
- `CSSFunctionDeclarations`
- `CSSFunctionDescriptors`

## Guides

- Using CSS custom functions
    This guide teaches you how to use CSS custom functions and presents some typical use cases.

## Related concepts

CSS values and units

- `abs()`
- `acos()`
- `asin()`
- `atan()`
- `atan2()`
- `calc()`
- `clamp()`
- `cos()`
- `exp()`
- `log()`
- `max()`
- `min()`
- `mod()`
- `pow()`
- `rem()`
- `round()`
- `sign()`
- `sin()`
- `sqrt()`
- `tan()`

## See also

- `if()`
- `@media`

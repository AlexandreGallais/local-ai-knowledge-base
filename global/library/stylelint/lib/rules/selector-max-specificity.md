---
title: "selector-max-specificity"
tool: "stylelint"
version: "18.0"
source: "https://github.com/stylelint/stylelint/blob/7c49e1828311b9d413826cb47703ef1c6ccae4ef/lib/rules/selector-max-specificity/README.md"
commit: "7c49e1828311b9d413826cb47703ef1c6ccae4ef"
license: "MIT"
---

# selector-max-specificity

Limit the specificity of selectors.

```css
    .foo, #bar.baz span, #hoo { color: pink; }
/** ↑     ↑              ↑
 * Each of these selectors */
```

Use this rule to enforce a convention. For example, limit specificity to `"0,2,0"`, so that styles stay easy to override.

Visit the Specificity Calculator for visual representation of selector specificity.

This rule ignores selectors with variable interpolation (`#{$var}`, `@{var}`, `$(var)`).

This rule adheres to the CSS Nesting specification when calculating specificity. The specificity of the nesting selector (`&`) is equal to the largest specificity among the complex selectors in the parent's selector list (identical to the behavior of `:is()`).

Each selector in a selector list is evaluated separately.

> **Warning:**
> This rule is only appropriate for CSS. You should not turn it on for CSS-like languages, such as SCSS or Less.

This rule supports 3 message arguments: the selector, the configured maximum specificity, and the selector's resolved form.

## Options

### `string`

Specify a maximum specificity allowed.

The format is `"id,class,type"`, as laid out in the W3C selector spec.

Given:

```json
{
  "selector-max-specificity": "0,2,0"
}
```

The following patterns are considered problems:

```css
#foo {}
```

```css
.foo .baz .bar {}
```

```css
.foo .baz {
  & .bar {}
}
```

The following patterns are _not_ considered problems:

```css
div {}
```

```css
.foo div {}
```

```css
.foo div {
  & div a {}
}
```

```css
.foo {
  & .baz {}
}
```

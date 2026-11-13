---
title: "selector-max-specificity"
tool: "stylelint"
version: "17.16"
source: "https://github.com/stylelint/stylelint/blob/bc06c7cdb1413de3d8dc939b33af138ab7e59df1/lib/rules/selector-max-specificity/README.md"
commit: "bc06c7cdb1413de3d8dc939b33af138ab7e59df1"
license: "MIT"
---

# selector-max-specificity

Limit the specificity of selectors.

```css
    .foo, #bar.baz span, #hoo { color: pink; }
/** ↑     ↑              ↑
 * Each of these selectors */
```

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

## Optional secondary options

### `ignoreSelectors`

```json
{ "ignoreSelectors": ["array", "of", "selectors", "/regex/"] }
```

Given:

```json
{
  "selector-max-specificity": [
    "0,2,0",
    {
      "ignoreSelectors": [":host", ":host-context", "/^my-/"]
    }
  ]
}
```

The following patterns are _not_ considered problems:

```css
:host(.foo) .bar {}
```

```css
:host-context(.foo.bar) {}
```

```css
:host-context(.foo, :host(.bar).baz) {}
```

```css
my-element.foo.bar {}
```

The following patterns are considered problems:

```css
:host(.foo) .bar.baz {}
```

```css
:host-context(.foo.bar.baz) {}
```

```css
:host-context(.foo, :host(.bar), .foo.bar.baz) {}
```

```css
my-element.foo.bar.baz {}
```

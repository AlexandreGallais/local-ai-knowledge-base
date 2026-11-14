---
title: "selector-no-unmatchable"
tool: "stylelint"
version: "18.0"
source: "https://github.com/stylelint/stylelint/blob/7c49e1828311b9d413826cb47703ef1c6ccae4ef/lib/rules/selector-no-unmatchable/README.md"
commit: "7c49e1828311b9d413826cb47703ef1c6ccae4ef"
license: "MIT"
---

# selector-no-unmatchable

Disallow unmatchable selectors.

```css
label:enabled {}
/**  ↑
 * Selectors like this */
```

Use this rule to avoid selectors that are valid but can never match anything. Browsers never apply their declarations.

This rule reports selectors that:

- pair a pseudo-class with elements it never matches, e.g. `label:enabled`
- pair pseudo-classes that never match the same element, e.g. `:any-link:checked`
- combine a pseudo-element with tree-structural pseudo-classes, e.g. `::before:first-child`
- contain pseudo-elements within `:is()` or `:where()`, which cannot represent them, e.g. `:is(::before)`
- contain the nesting selector (`&`) where it cannot represent its pseudo-element ancestor rules
- select around the shadow host in ways its tree does not allow, e.g. `a :host` and `::slotted(:host)`

This rule resolves nested selectors according to the CSS Nesting specification.

> **Warning:**
> This rule is only appropriate for CSS. You should not turn it on for CSS-like languages, such as SCSS or Less.

This rule supports up to 3 message arguments: the selector, its resolved form when nesting is involved, and the reason it is unmatchable.

## Options

### `true`

```json
{
  "selector-no-unmatchable": true
}
```

The following patterns are considered problems:

```css
label:checked {}
```

```css
::before:first-child {}
```

```css
:is(::before) {}
```

```css
a::before {
  .foo:hover & {}
}
```

```css
a :host {}
```

The following patterns are _not_ considered problems:

```css
input:checked {}
```

```css
a::before {}
```

```css
.foo:hover a::before {}
```

```css
:host a {}
```

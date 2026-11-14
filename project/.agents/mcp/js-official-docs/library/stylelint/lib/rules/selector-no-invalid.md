---
title: "selector-no-invalid"
tool: "stylelint"
version: "18.0"
source: "https://github.com/stylelint/stylelint/blob/7c49e1828311b9d413826cb47703ef1c6ccae4ef/lib/rules/selector-no-invalid/README.md"
commit: "7c49e1828311b9d413826cb47703ef1c6ccae4ef"
license: "MIT"
---

# selector-no-invalid

Disallow invalid selectors.

```css
a ) b {}
/* ↑
 * Selectors like this */
```

Use this rule to avoid rules that browsers ignore. One invalid selector invalidates the whole selector list.

This rule considers selectors defined within the CSS specifications, up to and including Editor's Drafts, to be valid.

> **Warning:**
> This rule is only appropriate for CSS. You should not turn it on for CSS-like languages, such as SCSS or Less.

This rule supports 2 message arguments: the selector and the reason it is invalid.

## Options

### `true`

```json
{
  "selector-no-invalid": true
}
```

The following patterns are considered problems:

```css
a ) b {}
```

```css
:nth-child(2n+) {}
```

```css
[0foo] {}
```

```css
:dir(foo) {}
```

```css
:not(::before) {}
```

```css
::slotted(a .foo) {}
```

```css
a::after .foo {}
```

```css
::after::before {}
```

The following patterns are _not_ considered problems:

```css
a b {}
```

```css
:nth-child(2n+1) {}
```

```css
[foo] {}
```

```css
:dir(ltr) {}
```

```css
:host(.foo) {}
```

```css
::before::marker {}
```

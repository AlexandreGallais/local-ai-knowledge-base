---
title: "selector-anb-no-unmatchable"
tool: "stylelint"
version: "18.0"
source: "https://github.com/stylelint/stylelint/blob/7c49e1828311b9d413826cb47703ef1c6ccae4ef/lib/rules/selector-anb-no-unmatchable/README.md"
commit: "7c49e1828311b9d413826cb47703ef1c6ccae4ef"
license: "MIT"
---

# selector-anb-no-unmatchable

Disallow unmatchable An+B selectors.

```css
a:nth-child(0n+0) {}
/*↑             ↑
 * This unmatchable An+B selector */
```

Use this rule to avoid selectors that never match. An `An+B` argument that always evaluates to `0`, e.g. `:nth-child(0n)`, matches nothing, as `An+B` is one-indexed.

This rule supports 1 message argument: the unmatchable selector.

## Options

### `true`

```json
{
  "selector-anb-no-unmatchable": true
}
```

The following patterns are considered problems:

```css
a:nth-child(0) {}
```

```css
a:nth-last-child(0n) {}
```

```css
a:nth-of-type(0n+0) {}
```

```css
a:nth-last-of-type(0 of a) {}
```

The following patterns are _not_ considered problems:

```css
a:nth-child(1) {}
```

```css
a:nth-last-child(1n) {}
```

```css
a:nth-of-type(1n+0) {}
```

```css
a:nth-last-of-type(1 of a) {}
```

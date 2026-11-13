---
title: "selector-anb-no-unmatchable"
tool: "stylelint"
version: "17.16"
source: "https://github.com/stylelint/stylelint/blob/bc06c7cdb1413de3d8dc939b33af138ab7e59df1/lib/rules/selector-anb-no-unmatchable/README.md"
commit: "bc06c7cdb1413de3d8dc939b33af138ab7e59df1"
license: "MIT"
---

# selector-anb-no-unmatchable

Disallow unmatchable An+B selectors.

```css
a:nth-child(0n+0) {}
/*↑             ↑
 * This unmatchable An+B selector */
```

An+B selectors are one-indexed. Selectors that always evaluate to `0` will not match any elements.

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

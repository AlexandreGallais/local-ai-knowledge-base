---
title: "media-feature-range-notation"
tool: "stylelint"
version: "17.16"
source: "https://github.com/stylelint/stylelint/blob/bc06c7cdb1413de3d8dc939b33af138ab7e59df1/lib/rules/media-feature-range-notation/README.md"
commit: "bc06c7cdb1413de3d8dc939b33af138ab7e59df1"
license: "MIT"
---

# media-feature-range-notation

Specify context or prefix notation for media feature ranges.

```css
@media (width >= 600px) and (min-width: 600px) {}
/**    ↑                    ↑
 *     These media feature notations */
```

Media features of the range type can be written using prefixes or the more modern context notation.

Because `min-` and `max-` both equate to range comparisons that include the value, they may be limiting in certain situations.

The `fix` option can automatically fix some of the problems reported by this rule.

This rule supports 1 message argument: the configured notation.

## Options

### `"context"`

Media feature ranges _must always_ use context notation.

```json
{
  "media-feature-range-notation": "context"
}
```

The following patterns are considered problems:

```css
@media (min-width: 1px) {}
```

```css
@media (min-width: 1px) and (max-width: 2px) {}
```

The following patterns are _not_ considered problems:

```css
@media (width >= 1px) {}
```

```css
@media (1px <= width <= 2px) {}
```

### `"prefix"`

Media feature ranges _must always_ use prefix notation.

```json
{
  "media-feature-range-notation": "prefix"
}
```

The following patterns are considered problems:

```css
@media (width >= 1px) {}
```

```css
@media (1px <= width <= 2px) {}
```

The following patterns are _not_ considered problems:

```css
@media (min-width: 1px) {}
```

```css
@media (min-width: 1px) and (max-width: 2px) {}
```

## Optional secondary options

### `except`

```json
{ "except": ["array", "of", "options"] }
```

#### `"exact-value"`

Reverse the primary option for media features with exact values.

Given:

```json
{
  "media-feature-range-notation": ["context", { "except": ["exact-value"] }]
}
```

The following pattern is considered a problem:

```css
@media (min-width: 1px) {}
```

The following pattern is _not_ considered a problem:

```css
@media (width: 1px) {}
```

---
title: "media-feature-range-operator-space-before"
tool: "stylelint-stylistic"
version: "5.3"
source: "https://github.com/stylelint-stylistic/stylelint-stylistic/blob/d61d92538fce80f9e25ad9fee7b8018bf7f33e92/lib/rules/media-feature-range-operator-space-before/README.md"
commit: "d61d92538fce80f9e25ad9fee7b8018bf7f33e92"
license: "MIT"
---

# media-feature-range-operator-space-before

Require a single space or disallow whitespace before the range operator in media features.

```css
@media (width >= 600px) {}
/**           ↑
 * The space before this operator */
```

The `fix` option can automatically fix all of the problems reported by this rule.

## Options

`string`: `"always"|"never"`

### `"always"`

There _must always_ be a single space before the range operator.

The following patterns are considered problems:

```css
@media (width>=600px) {}
```

```css
@media (width>= 600px) {}
```

The following patterns are _not_ considered problems:

```css
@media (width >=600px) {}
```

```css
@media (width >= 600px) {}
```

### `"never"`

There _must never_ be whitespace before the range operator.

The following patterns are considered problems:

```css
@media (width >=600px) {}
```

```css
@media (width >= 600px) {}
```

The following patterns are _not_ considered problems:

```css
@media (width>=600px) {}
```

```css
@media (width>= 600px) {}
```

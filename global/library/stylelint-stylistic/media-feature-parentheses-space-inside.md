---
title: "media-feature-parentheses-space-inside"
tool: "stylelint-stylistic"
version: "5.3"
source: "https://github.com/stylelint-stylistic/stylelint-stylistic/blob/d61d92538fce80f9e25ad9fee7b8018bf7f33e92/lib/rules/media-feature-parentheses-space-inside/README.md"
commit: "d61d92538fce80f9e25ad9fee7b8018bf7f33e92"
license: "MIT"
---

# media-feature-parentheses-space-inside

Require a single space or disallow whitespace on the inside of the parentheses within media features.

```css
@media ( max-width: 300px ) {}
/**    ↑                  ↑
 * The space inside these two parentheses */
```

The `fix` option can automatically fix all of the problems reported by this rule.

## Options

`string`: `"always"|"never"`

### `"always"`

There _must always_ be a single space inside the parentheses.

The following patterns are considered problems:

```css
@media (max-width: 300px) {}
```

```css
@media (max-width: 300px ) {}
```

The following patterns are _not_ considered problems:

```css
@media ( max-width: 300px ) {}
```

### `"never"`

There _must never_ be whitespace on the inside the parentheses.

The following patterns are considered problems:

```css
@media ( max-width: 300px ) {}
```

```css
@media ( max-width: 300px) {}
```

The following patterns are _not_ considered problems:

```css
@media (max-width: 300px) {}
```

---
title: "media-feature-slash-space-before"
tool: "stylelint-stylistic"
version: "6.0"
source: "https://github.com/stylelint-stylistic/stylelint-stylistic/blob/3cd01e1c32e87a7d92b99c3a35e869bc36c019bb/lib/rules/media-feature-slash-space-before/README.md"
commit: "3cd01e1c32e87a7d92b99c3a35e869bc36c019bb"
license: "MIT"
---

# media-feature-slash-space-before

Require a single space or disallow whitespace before the solidus of a ratio in media features.

```css
@media (aspect-ratio: 16 /9) {}
/**                      ↑
 * The space before this solidus */
```

The `fix` option can automatically fix most of the problems reported by this rule.

The solidus this rule reads is the one between the two numbers of a `<ratio>`, in the colon form of a feature (`(aspect-ratio: 16 / 9)`) and in the range form (`(16 / 9 <= aspect-ratio)`) alike. A solidus inside the arguments of a math function is the division operator and is not read, and neither is one inside a `url()` address, a string or a comment. The solidus of a declaration's value is read by `value-slash-space-before`.

Where the fix would move code into a `//` comment, it leaves the whitespace alone and the warning stands.

## Options

`string`: `"always"|"never"`

### `"always"`

There _must always_ be a single space before the solidus.

The following patterns are considered problems:

```css
@media (aspect-ratio: 16/9) {}
```

```css
@media (aspect-ratio: 16/ 9) {}
```

The following patterns are _not_ considered problems:

```css
@media (aspect-ratio: 16 /9) {}
```

```css
@media (aspect-ratio: 16 / 9) {}
```

### `"never"`

There _must never_ be whitespace before the solidus.

The following patterns are considered problems:

```css
@media (aspect-ratio: 16 /9) {}
```

```css
@media (aspect-ratio: 16 / 9) {}
```

The following patterns are _not_ considered problems:

```css
@media (aspect-ratio: 16/9) {}
```

```css
@media (aspect-ratio: 16/ 9) {}
```

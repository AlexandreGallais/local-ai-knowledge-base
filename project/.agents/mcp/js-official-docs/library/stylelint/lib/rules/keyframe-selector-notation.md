---
title: "keyframe-selector-notation"
tool: "stylelint"
version: "18.0"
source: "https://github.com/stylelint/stylelint/blob/7c49e1828311b9d413826cb47703ef1c6ccae4ef/lib/rules/keyframe-selector-notation/README.md"
commit: "7c49e1828311b9d413826cb47703ef1c6ccae4ef"
license: "MIT"
---

# keyframe-selector-notation

Specify keyword or percentage notation for keyframe selectors.

```css
@keyframes foo { from {} to {} }
/**              ↑       ↑
 *               These notations */
```

Use this rule to enforce a convention. In `@keyframes`, `from` and `to` are equivalent to `0%` and `100%`.

Choose:

- `"keyword"` for clarity
- `"percentage"` for consistency with intermediate steps, e.g. `50%`
- `"percentage-unless-within-keyword-only-block"` for both, with `from` and `to` only in two-step animations

The `fix` option can automatically fix all of the problems reported by this rule.

This rule supports 2 message arguments: the selector and its expected notation.

## Options

### `"keyword"`

Keyframe selectors _must always_ use the keyword notation.

```json
{
  "keyframe-selector-notation": "keyword"
}
```

The following pattern is considered a problem:

```css
@keyframes foo { 0% {} 100% {} }
```

The following pattern is _not_ considered a problem:

```css
@keyframes foo { from {} to {} }
```

### `"percentage"`

Keyframe selectors _must always_ use the percentage notation.

```json
{
  "keyframe-selector-notation": "percentage"
}
```

The following pattern is considered a problem:

```css
@keyframes foo { from {} to {} }
```

The following pattern is _not_ considered a problem:

```css
@keyframes foo { 0% {} 100% {} }
```

### `"percentage-unless-within-keyword-only-block"`

Keyframe selectors _must_ use the percentage notation unless within a keyword-only block.

```json
{
  "keyframe-selector-notation": "percentage-unless-within-keyword-only-block"
}
```

The following pattern is considered a problem:

```css
@keyframes foo { from {} 100% {} }
```

The following patterns are _not_ considered problems:

```css
@keyframes foo { 0% {} 100% {} }
```

```css
@keyframes foo { from {} to {} }
```

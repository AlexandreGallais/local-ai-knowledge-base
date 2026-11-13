---
title: "keyframe-selector-notation"
tool: "stylelint"
version: "17.16"
source: "https://github.com/stylelint/stylelint/blob/bc06c7cdb1413de3d8dc939b33af138ab7e59df1/lib/rules/keyframe-selector-notation/README.md"
commit: "bc06c7cdb1413de3d8dc939b33af138ab7e59df1"
license: "MIT"
---

# keyframe-selector-notation

Specify keyword or percentage notation for keyframe selectors.

```css
@keyframes foo { from {} to {} }
/**              ↑       ↑
 *               These notations */
```

The keyword `from` is equivalent to the value `0%`. The keyword `to` is equivalent to the value `100%`.

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

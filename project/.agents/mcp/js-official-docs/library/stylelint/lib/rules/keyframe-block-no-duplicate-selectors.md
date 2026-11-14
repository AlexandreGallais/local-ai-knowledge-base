---
title: "keyframe-block-no-duplicate-selectors"
tool: "stylelint"
version: "18.0"
source: "https://github.com/stylelint/stylelint/blob/7c49e1828311b9d413826cb47703ef1c6ccae4ef/lib/rules/keyframe-block-no-duplicate-selectors/README.md"
commit: "7c49e1828311b9d413826cb47703ef1c6ccae4ef"
license: "MIT"
---

# keyframe-block-no-duplicate-selectors

Disallow duplicate selectors within keyframe blocks.

```css
@keyframes foo { 0% {} 0% {} }
/**                    ↑
 *                     This duplicate selector */
```

Use this rule to avoid keyframe declarations that a later block overrides. Declarations in blocks at the same offset cascade together.

This rule is case-insensitive.

This rule supports 1 message argument: the duplicate selector.

## Options

### `true`

```json
{
  "keyframe-block-no-duplicate-selectors": true
}
```

The following patterns are considered problems:

```css
@keyframes foo { 0% {} 0% {} }
```

```css
@keyframes foo { from {} from {} }
```

```css
@keyframes foo { from {} FROM {} }
```

The following patterns are _not_ considered problems:

```css
@keyframes foo { 0% {} 100% {} }
```

```css
@keyframes foo { from {} to {} }
```

---
title: "keyframe-block-no-duplicate-selectors"
tool: "stylelint"
version: "17.16"
source: "https://github.com/stylelint/stylelint/blob/bc06c7cdb1413de3d8dc939b33af138ab7e59df1/lib/rules/keyframe-block-no-duplicate-selectors/README.md"
commit: "bc06c7cdb1413de3d8dc939b33af138ab7e59df1"
license: "MIT"
---

# keyframe-block-no-duplicate-selectors

Disallow duplicate selectors within keyframe blocks.

```css
@keyframes foo { 0% {} 0% {} }
/**                    ↑
 *                     This duplicate selector */
```

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

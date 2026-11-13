---
title: "no-unknown-animations"
tool: "stylelint"
version: "18.0"
source: "https://github.com/stylelint/stylelint/blob/7c49e1828311b9d413826cb47703ef1c6ccae4ef/lib/rules/no-unknown-animations/README.md"
commit: "7c49e1828311b9d413826cb47703ef1c6ccae4ef"
license: "MIT"
---

# no-unknown-animations

Disallow unknown animations.

```css
a { animation-name: fancy-slide; }
/**                    ↑
 *   This animation name */

a { animation: fancy-slide 2s linear; }
/**                    ↑
 *           And this one */
```

Use this rule to avoid animation names that match no `@keyframes` rule. Browsers don't run the animation.

This rule considers the identifiers of `@keyframes` rules defined within the same source or within the files specified in the `referenceFiles` configuration property to be known.

This rule supports 1 message argument: the unknown animation name.

## Options

### `true`

```json
{
  "no-unknown-animations": true
}
```

The following patterns are considered problems:

```css
a { animation-name: fancy-slide; }
```

```css
a { animation: fancy-slide 2s linear; }
```

```css
a { animation-name: fancccy-slide; }
@keyframes fancy-slide {}
```

```css
a { animation: linear 100ms fancccy-slide; }
@keyframes fancy-slide {}
```

```css
a { animation-name: jump; }
@keyframes fancy-slide {}
```

The following patterns are _not_ considered problems:

```css
a { animation-name: fancy-slide; }
@keyframes fancy-slide {}
```

```css
@keyframes fancy-slide {}
a { animation-name: fancy-slide; }
```

```css
@keyframes fancy-slide {}
a { animation: fancy-slide 2s linear; }
```

```css
a { animation: 100ms steps(12, end) fancy-slide; }
@keyframes fancy-slide {}
```

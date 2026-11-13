---
title: "media-feature-name-case"
tool: "stylelint-stylistic"
version: "5.3"
source: "https://github.com/stylelint-stylistic/stylelint-stylistic/blob/d61d92538fce80f9e25ad9fee7b8018bf7f33e92/lib/rules/media-feature-name-case/README.md"
commit: "d61d92538fce80f9e25ad9fee7b8018bf7f33e92"
license: "MIT"
---

# media-feature-name-case

Specify lowercase or uppercase for media feature names.

```css
@media (min-width: 700px) {}
/**     ↑
 * This media feature name */
```

The `fix` option can automatically fix all of the problems reported by this rule.

The `message` secondary option can accept the arguments of this rule.

## Options

`string`: `"lower"|"upper"`

### `"lower"`

The following patterns are considered problems:

```css
@media (MIN-WIDTH: 700px) {}
```

```css
@media not all and (MONOCHROME) {}
```

```css
@media (min-width: 700px) and (ORIENTATION: landscape) {}
```

```css
@media (WIDTH > 10em) {}
```

The following patterns are _not_ considered problems:

```css
@media (min-width: 700px) {}
```

```css
@media not all and (monochrome) {}
```

```css
@media (min-width: 700px) and (orientation: landscape) {}
```

```css
@media (width > 10em) {}
```

### `"upper"`

The following patterns are considered problems:

```css
@media (min-width: 700px) {}
```

```css
@media not all and (monochrome) {}
```

```css
@media (MIN-WIDTH: 700px) and (orientation: landscape) {}
```

```css
@media (10em < width <= 50em) {}
```

The following patterns are _not_ considered problems:

```css
@media (MIN-WIDTH: 700px) {}
```

```css
@media not all and (MONOCHROME) {}
```

```css
@media (MIN-WIDTH: 700px) and (ORIENTATION: landscape) {}
```

```css
@media (10em < WIDTH <= 50em) {}
```

---
title: "no-unknown-custom-media"
tool: "stylelint"
version: "18.0"
source: "https://github.com/stylelint/stylelint/blob/7c49e1828311b9d413826cb47703ef1c6ccae4ef/lib/rules/no-unknown-custom-media/README.md"
commit: "7c49e1828311b9d413826cb47703ef1c6ccae4ef"
license: "MIT"
---

# no-unknown-custom-media

Disallow unknown custom media queries.

```css
@custom-media --sm (min-width: 40rem);
/**             ↑
*   This custom media query name */

@media (--sm) {}
/**      ↑
*   And this one */
```

Use this rule to avoid custom media queries that match no `@custom-media` rule. Browsers can't evaluate them, so their `@media` blocks never apply.

This rule considers custom media queries defined within the same source or within the files specified in the `referenceFiles` configuration property to be known.

This rule supports 1 message argument: the unknown custom media name.

## Options

### `true`

```json
{
  "no-unknown-custom-media": true
}
```

The following patterns are considered problems:

```css
@media (--sm) {}

@media (--sm), (max-height: 40rem) {}
```

The following patterns are _not_ considered problems:

```css
@custom-media --sm (min-width: 40rem);

@media (--sm), (max-height: 40rem) {}
```

> **Note:**
> The `@custom-media` name can be used before its declaration

```css
@media (--lg) {}

@custom-media --lg (min-width: 60rem);
```

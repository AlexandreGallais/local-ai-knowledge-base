---
title: "no-unknown-custom-media"
tool: "stylelint"
version: "17.16"
source: "https://github.com/stylelint/stylelint/blob/bc06c7cdb1413de3d8dc939b33af138ab7e59df1/lib/rules/no-unknown-custom-media/README.md"
commit: "bc06c7cdb1413de3d8dc939b33af138ab7e59df1"
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

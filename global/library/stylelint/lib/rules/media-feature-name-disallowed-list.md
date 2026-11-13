---
title: "media-feature-name-disallowed-list"
tool: "stylelint"
version: "17.16"
source: "https://github.com/stylelint/stylelint/blob/bc06c7cdb1413de3d8dc939b33af138ab7e59df1/lib/rules/media-feature-name-disallowed-list/README.md"
commit: "bc06c7cdb1413de3d8dc939b33af138ab7e59df1"
license: "MIT"
---

# media-feature-name-disallowed-list

Specify a list of disallowed media feature names.

```css
@media (min-width: 700px) {}
/**     ↑
 * This media feature name */
```

This rule supports 1 message argument: the disallowed media feature name.

## Options

### `Array<string>`

```json
["array", "of", "media-features", "/regex/"]
```

Given:

```json
{
  "media-feature-name-disallowed-list": ["max-width", "/^my-/"]
}
```

The following patterns are considered problems:

```css
@media (max-width: 50em) {}
```

```css
@media (my-width: 50em) {}
```

```css
@media (max-width < 50em) {}
```

```css
@media (10em < my-height < 50em) {}
```

The following patterns are _not_ considered problems:

```css
@media (min-width: 50em) {}
```

```css
@media print and (min-resolution: 300dpi) {}
```

```css
@media (min-width >= 50em) {}
```

```css
@media (10em < width < 50em) {}
```

---
title: "media-feature-name-disallowed-list"
tool: "stylelint"
version: "18.0"
source: "https://github.com/stylelint/stylelint/blob/7c49e1828311b9d413826cb47703ef1c6ccae4ef/lib/rules/media-feature-name-disallowed-list/README.md"
commit: "7c49e1828311b9d413826cb47703ef1c6ccae4ef"
license: "MIT"
---

# media-feature-name-disallowed-list

Specify a list of disallowed media feature names.

```css
@media (min-width: 700px) {}
/**     ↑
 * This media feature name */
```

Use this rule to enforce a convention. For example, disallow:

- `max-width`, so that queries stay mobile-first
- `/device-/`, as those features measure the device rather than the viewport

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

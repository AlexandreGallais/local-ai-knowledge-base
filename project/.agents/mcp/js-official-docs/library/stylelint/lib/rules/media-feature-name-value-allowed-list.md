---
title: "media-feature-name-value-allowed-list"
tool: "stylelint"
version: "18.0"
source: "https://github.com/stylelint/stylelint/blob/7c49e1828311b9d413826cb47703ef1c6ccae4ef/lib/rules/media-feature-name-value-allowed-list/README.md"
commit: "7c49e1828311b9d413826cb47703ef1c6ccae4ef"
license: "MIT"
---

# media-feature-name-value-allowed-list

Specify a list of allowed media feature name and value pairs.

```css
@media screen and (min-width: 768px) {}
/**                ↑          ↑
 *    These features and values */
```

Use this rule to enforce a subset of values for a media feature as a convention. For example, allow only `48em` and `64em` for `min-width`, so that every query uses one of your breakpoints.

This rule supports 2 message arguments: the media feature name and the disallowed value.

## Options

### `Object<string, Array<string>>`

```json
{ "media-feature-name": ["array", "of", "values", "/regex/"] }
```

You can specify a regex for a media feature name, such as `{ "/width$/": [] }`.

If a media feature name is found in the object, only its allowed-listed values are
allowed. If the media feature name is not included in the object, anything goes.

Given:

```json
{
  "media-feature-name-value-allowed-list": {
    "min-width": ["768px", "1024px"],
    "/resolution/": ["/dpcm$/"]
  }
}
```

The following patterns are considered problems:

```css
@media screen and (min-width: 1000px) {}
```

```css
@media screen and (min-resolution: 2dpi) {}
```

```css
@media screen and (min-width > 1000px) {}
```

The following patterns are _not_ considered problems:

```css
@media screen and (min-width: 768px) {}
```

```css
@media screen and (min-width: 1024px) {}
```

```css
@media screen and (orientation: portrait) {}
```

```css
@media screen and (min-resolution: 2dpcm) {}
```

```css
@media screen and (resolution: 10dpcm) {}
```

```css
@media screen and (768px < min-width) {}
```

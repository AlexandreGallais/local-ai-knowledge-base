---
title: "media-feature-name-value-allowed-list"
tool: "stylelint"
version: "17.16"
source: "https://github.com/stylelint/stylelint/blob/bc06c7cdb1413de3d8dc939b33af138ab7e59df1/lib/rules/media-feature-name-value-allowed-list/README.md"
commit: "bc06c7cdb1413de3d8dc939b33af138ab7e59df1"
license: "MIT"
---

# media-feature-name-value-allowed-list

Specify a list of allowed media feature name and value pairs.

```css
@media screen and (min-width: 768px) {}
/**                ↑          ↑
 *    These features and values */
```

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

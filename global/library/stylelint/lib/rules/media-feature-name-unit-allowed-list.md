---
title: "media-feature-name-unit-allowed-list"
tool: "stylelint"
version: "17.16"
source: "https://github.com/stylelint/stylelint/blob/bc06c7cdb1413de3d8dc939b33af138ab7e59df1/lib/rules/media-feature-name-unit-allowed-list/README.md"
commit: "bc06c7cdb1413de3d8dc939b33af138ab7e59df1"
license: "MIT"
---

# media-feature-name-unit-allowed-list

Specify a list of allowed name and unit pairs within media features.

```css
@media (width: 50em) {}
/**     ↑         ↑
 * This media feature name and these units */
```

This rule supports 2 message arguments: the disallowed unit and the media feature name.

## Options

### `Array<string>`

```json
{ "media-feature-name": ["array", "of", "units"] }
```

You can specify a regex for a media feature name, such as `{ "/height$/": [] }`.

Given:

```json
{
  "media-feature-name-unit-allowed-list": {
    "width": "em",
    "/height/": ["em", "rem"]
  }
}
```

The following patterns are considered problems:

```css
@media (width: 50rem) {}
```

```css
@media (height: 1000px) {}
```

```css
@media (min-height: 1000px) {}
```

```css
@media (height <= 1000px) {}
```

The following patterns are _not_ considered problems:

```css
@media (width: 50em) {}
```

```css
@media (width <= 50em) {}
```

```css
@media (height: 50em) {}
```

```css
@media (min-height: 50rem) {}
```

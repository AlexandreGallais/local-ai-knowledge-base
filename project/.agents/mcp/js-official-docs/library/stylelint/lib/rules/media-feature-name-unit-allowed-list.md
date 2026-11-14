---
title: "media-feature-name-unit-allowed-list"
tool: "stylelint"
version: "18.0"
source: "https://github.com/stylelint/stylelint/blob/7c49e1828311b9d413826cb47703ef1c6ccae4ef/lib/rules/media-feature-name-unit-allowed-list/README.md"
commit: "7c49e1828311b9d413826cb47703ef1c6ccae4ef"
license: "MIT"
---

# media-feature-name-unit-allowed-list

Specify a list of allowed name and unit pairs within media features.

```css
@media (width: 50em) {}
/**     ↑         ↑
 * This media feature name and these units */
```

Use this rule to enforce a subset of units for a media feature as a convention. For example, allow only `em` for `width`, so that breakpoints scale with your users' settings, as relative units in media queries are based on the initial font size.

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

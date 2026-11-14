---
title: "declaration-block-no-redundant-longhand-properties"
tool: "stylelint"
version: "18.0"
source: "https://github.com/stylelint/stylelint/blob/7c49e1828311b9d413826cb47703ef1c6ccae4ef/lib/rules/declaration-block-no-redundant-longhand-properties/README.md"
commit: "7c49e1828311b9d413826cb47703ef1c6ccae4ef"
license: "MIT"
---

# declaration-block-no-redundant-longhand-properties

Disallow redundant longhand properties within declaration-block.

```css
  a {
    padding-top: 1px;
    padding-right: 2px;
    padding-bottom: 3px;
    padding-left: 4px; }
/** ↑
 *  These longhand properties */
```

Use this rule to enforce a convention. For example, require the shorthand when every longhand is set:

```css
a {
  padding: 1px 2px 3px 4px;
}
```

This rule will only complain if you've used the longhand equivalent of _all_ the properties that the shorthand will set and if their values are not CSS-wide keywords like `initial`, `inherit` etc.

This rule complains when the following shorthand properties can be used:

- `animation`
- `background`
- `border`
- `border-block`
- `border-block-end`
- `border-block-start`
- `border-bottom`
- `border-color`
- `border-image`
- `border-inline`
- `border-inline-end`
- `border-inline-start`
- `border-left`
- `border-radius`
- `border-right`
- `border-style`
- `border-top`
- `border-width`
- `column-rule`
- `columns`
- `contain-intrinsic-size`
- `flex`
- `flex-flow`
- `font`
- `font-synthesis`
- `font-variant`
- `gap`
- `grid`
- `grid-area`
- `grid-column`
- `grid-gap`
- `grid-row`
- `grid-template`
- `inset`
- `inset-block`
- `inset-inline`
- `list-style`
- `margin`
- `margin-block`
- `margin-inline`
- `mask`
- `outline`
- `overflow`
- `overscroll-behavior`
- `padding`
- `padding-block`
- `padding-inline`
- `place-content`
- `place-items`
- `place-self`
- `scroll-margin`
- `scroll-margin-block`
- `scroll-margin-inline`
- `scroll-padding`
- `scroll-padding-block`
- `scroll-padding-inline`
- `text-decoration`
- `text-emphasis`
- `transition`

> **Warning:**
> Please note that properties are considered to be redundant if they may be written shorthand according to the specification, **regardless of the behavior of any individual browser**. For example, due to Internet Explorer's implementation of Flexbox, it may not be possible to use the shorthand property `flex`, but the longhand form is still considered a problem.

Flexbox-related properties can be ignored using `ignoreShorthands: ["/flex/"]` (see below).

The `fix` option can automatically fix most of the problems reported by this rule.

This rule supports up to 2 message arguments: the shorthand property, or the redundant longhand property and its shorthand.

## Options

### `true`

```json
{
  "declaration-block-no-redundant-longhand-properties": true
}
```

The following patterns are considered problems:

```css
a {
  margin-top: 1px;
  margin-right: 2px;
  margin-bottom: 3px;
  margin-left: 4px;
}
```

```css
a {
  font-style: italic;
  font-variant: normal;
  font-weight: bold;
  font-stretch: normal;
  font-size: 14px;
  line-height: 1.2;
  font-family: serif;
}
```

```css
a {
  -webkit-transition-property: top;
  -webkit-transition-duration: 2s;
  -webkit-transition-timing-function: ease;
  -webkit-transition-delay: 0.5s;
}
```

```css
a {
  margin: 1px;
  margin-left: 1px;
}
```

The following patterns are _not_ considered problems:

```css
a {
  margin: 1px 2px 3px 4px;
}
```

```css
a {
  font: italic normal bold normal 14px/1.2 serif;
}
```

```css
a {
  -webkit-transition: top 2s ease 0.5s;
}
```

```css
a {
  margin-top: 1px;
  margin-right: 2px;
}
```

```css
a {
  margin-top: 1px;
  margin-right: 2px;
  margin-bottom: 3px;
}
```

```css
a {
  margin: 1px;
  margin-left: 2px;
}
```

## Optional secondary options

### `ignoreLonghands`

```json
{ "ignoreLonghands": ["array", "of", "properties"] }
```

Ignore the specified longhand properties.

Given:

```json
{
  "declaration-block-no-redundant-longhand-properties": [
    true,
    {
      "ignoreLonghands": [
        "text-decoration-thickness",
        "background-size",
        "background-origin",
        "background-clip"
      ]
    }
  ]
}
```

The following patterns are considered problems:

```css
a {
  text-decoration-line: underline;
  text-decoration-style: solid;
  text-decoration-color: purple;
}
```

```css
a {
  background-repeat: repeat;
  background-attachment: scroll;
  background-position: 0% 0%;
  background-color: transparent;
  background-image: none;
  background-size: contain;
  background-origin: border-box;
  background-clip: text;
}
```

The following patterns are _not_ considered problems:

```css
a {
  text-decoration: underline solid purple;
  text-decoration-thickness: 1px;
}
```

```css
a {
  background: none 0% 0% repeat scroll transparent;
  background-size: contain;
  background-origin: border-box;
  background-clip: text;
}
```

### `ignoreShorthands`

```json
{ "ignoreShorthands": ["array", "of", "shorthands", "/regex/"] }
```

Ignore the specified shorthand properties.

Given:

```json
{
  "declaration-block-no-redundant-longhand-properties": [
    true,
    { "ignoreShorthands": ["padding", "/border/"] }
  ]
}
```

The following patterns are _not_ considered problems:

```css
a {
  padding-top: 20px;
  padding-right: 10px;
  padding-bottom: 30px;
  padding-left: 10px;
}
```

```css
a {
  border-top-width: 1px;
  border-bottom-width: 1px;
  border-left-width: 1px;
  border-right-width: 1px;
}
```

```css
a {
  border-top-color: green;
  border-top-style: double;
  border-top-width: 7px;
}
```

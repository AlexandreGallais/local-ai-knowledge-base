---
title: "declaration-property-unit-disallowed-list"
tool: "stylelint"
version: "18.0"
source: "https://github.com/stylelint/stylelint/blob/7c49e1828311b9d413826cb47703ef1c6ccae4ef/lib/rules/declaration-property-unit-disallowed-list/README.md"
commit: "7c49e1828311b9d413826cb47703ef1c6ccae4ef"
license: "MIT"
---

# declaration-property-unit-disallowed-list

Specify a list of disallowed property and unit pairs within declarations.

```css
a { width: 100px; }
/** ↑         ↑
 * These properties and these units */
```

Use this rule to enforce a convention. For example, disallow:

- `px` for `font-size`, so that text scales with your users' settings
- `s` for `/^(transition|animation)/`, so that every duration is in `ms`

This rule supports 2 message arguments: the property name and the disallowed unit.

## Options

### `Object<string, Array<string>>`

```json
{ "property-name": ["array", "of", "units"] }
```

You can specify a regex for a property name, such as `{ "/^animation/": [] }`.

Given:

```json
{
  "declaration-property-unit-disallowed-list": {
    "font-size": ["em", "px"],
    "/^(-webkit-)?animation/": ["s"]
  }
}
```

The following patterns are considered problems:

```css
a { font-size: 1em; }
```

```css
a { animation: animation-name 5s ease; }
```

```css
a { -webkit-animation: animation-name 5s ease; }
```

```css
a { animation-duration: 5s; }
```

The following patterns are _not_ considered problems:

```css
a { font-size: 1.2rem; }
```

```css
a { height: 100px; }
```

```css
a { animation: animation-name 500ms ease; }
```

```css
a { -webkit-animation: animation-name 500ms ease; }
```

```css
a { animation-duration: 500ms; }
```

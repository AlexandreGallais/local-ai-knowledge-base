---
title: "declaration-property-unit-disallowed-list"
tool: "stylelint"
version: "17.16"
source: "https://github.com/stylelint/stylelint/blob/bc06c7cdb1413de3d8dc939b33af138ab7e59df1/lib/rules/declaration-property-unit-disallowed-list/README.md"
commit: "bc06c7cdb1413de3d8dc939b33af138ab7e59df1"
license: "MIT"
---

# declaration-property-unit-disallowed-list

Specify a list of disallowed property and unit pairs within declarations.

```css
a { width: 100px; }
/** ↑         ↑
 * These properties and these units */
```

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

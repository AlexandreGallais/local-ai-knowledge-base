---
title: "declaration-property-max-values"
tool: "stylelint"
version: "17.16"
source: "https://github.com/stylelint/stylelint/blob/bc06c7cdb1413de3d8dc939b33af138ab7e59df1/lib/rules/declaration-property-max-values/README.md"
commit: "bc06c7cdb1413de3d8dc939b33af138ab7e59df1"
license: "MIT"
---

# declaration-property-max-values

Limit the number of values for a list of properties within declarations.

This rule supports 2 message arguments: the property name and the configured maximum.

## Options

### `Object<string, number>`

```json
{ "property-name": 0 }
```

Specify pairs of a property and a max value. In practice, you should specify any positive integers as max values.

You can specify a regex for a property name, such as `{ "/^margin/": 0 }`.

Given:

```json
{
  "declaration-property-max-values": {
    "border": 2,
    "/^margin/": 1,
    "/(-webkit-)?transform$/": 1
  }
}
```

The following patterns are considered problems:

```css
a { border: 1px solid blue; }
```

```css
a { margin: 1px 2px; }
```

```css
a { margin-inline: 1px 2px; }
```

```css
a { -webkit-transform: scale(1) rotate(30deg); }
```

The following patterns are _not_ considered problems:

```css
a { border: 1px solid; }
```

```css
a { margin: 1px; }
```

```css
a { margin-inline: 1px; }
```

```css
a { -webkit-transform: scale(1); }
```

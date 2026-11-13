---
title: "declaration-property-value-allowed-list"
tool: "stylelint"
version: "18.0"
source: "https://github.com/stylelint/stylelint/blob/7c49e1828311b9d413826cb47703ef1c6ccae4ef/lib/rules/declaration-property-value-allowed-list/README.md"
commit: "7c49e1828311b9d413826cb47703ef1c6ccae4ef"
license: "MIT"
---

# declaration-property-value-allowed-list

Specify a list of allowed property and value pairs within declarations.

```css
a { text-transform: uppercase; }
/** ↑               ↑
 * These properties and these values */
```

Use this rule to enforce a subset of values for a property as a convention. For example, allow only:

- `/^(1|10|100|1000)$/` for `z-index`, so that stacking order follows a scale
- `400` and `700` for `font-weight`, so that only the weights you load are used

This rule supports 2 message arguments: the property name and the disallowed value.

## Options

### `Object<string, Array<string>>`

```json
{ "property-name": ["array", "of", "values", "/regex/"] }
```

You can specify a regex for a property name, such as `{ "/^animation/": [] }`.

If a property name is found in the object, only the listed property values are allowed. This rule complains about all non-matching values. (If the property name is not included in the object, anything goes.)

The same goes for values. Keep in mind that a regular expression value is matched against the entire value of the declaration, not specific parts of it. For example, a value like `"10px solid rgba( 255 , 0 , 0 , 0.5 )"` will _not_ match `"/^solid/"` (notice beginning of the line boundary) but _will_ match `"/\\s+solid\\s+/"` or `"/\\bsolid\\b/"`.

Be careful with regex matching not to accidentally consider quoted string values and `url()` arguments. For example, `"/red/"` will match value such as `"1px dotted red"` as well as `"\"red\""` and `"white url(/mysite.com/red.png)"`.

Given:

```json
{
  "declaration-property-value-allowed-list": {
    "/^(-webkit-)?transform$/": ["/scale/"],
    "whitespace": ["nowrap"],
    "/color/": ["/^green/"]
  }
}
```

The following patterns are considered problems:

```css
a { whitespace: pre; }
```

```css
a { transform: translate(1, 1); }
```

```css
a { -webkit-transform: translate(1, 1); }
```

```css
a { color: pink; }
```

```css
a { background-color: pink; }
```

The following patterns are _not_ considered problems:

```css
a { whitespace: nowrap; }
```

```css
a { transform: scale(1, 1); }
```

```css
a { -webkit-transform: scale(1, 1); }
```

```css
a { color: green; }
```

```css
a { background-color: green; }
```

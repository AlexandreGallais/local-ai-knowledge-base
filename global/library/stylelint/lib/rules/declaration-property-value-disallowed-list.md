---
title: "declaration-property-value-disallowed-list"
tool: "stylelint"
version: "17.16"
source: "https://github.com/stylelint/stylelint/blob/bc06c7cdb1413de3d8dc939b33af138ab7e59df1/lib/rules/declaration-property-value-disallowed-list/README.md"
commit: "bc06c7cdb1413de3d8dc939b33af138ab7e59df1"
license: "MIT"
---

# declaration-property-value-disallowed-list

Specify a list of disallowed property and value pairs within declarations.

```css
a { text-transform: uppercase; }
/** ↑               ↑
 * These properties and these values */
```

This rule supports 2 message arguments: the property name and the disallowed value.

## Options

### `Object<string, Array<string>>`

```json
{ "property-name": ["array", "of", "values", "/regex/"] }
```

You can specify a regex for a property name, such as `{ "/^animation/": [] }`.

The same goes for values. Keep in mind that a regular expression value is matched against the entire value of the declaration, not specific parts of it. For example, a value like `"10px solid rgba( 255 , 0 , 0 , 0.5 )"` will _not_ match `"/^solid/"` (notice beginning of the line boundary) but _will_ match `"/\\s+solid\\s+/"` or `"/\\bsolid\\b/"`.

Be careful with regex matching not to accidentally consider quoted string values and `url()` arguments. For example, `"/red/"` will match value such as `"1px dotted red"` as well as `"\"foo\""` and `"white url(/mysite.com/red.png)"`.

Given:

```json
{
  "declaration-property-value-disallowed-list": {
    "/^(-webkit-)?transform$/": ["/scale3d/", "/rotate3d/", "/translate3d/"],
    "position": ["fixed"],
    "color": ["/^green/"],
    "/^(-webkit-)?animation/": ["/ease/"]
  }
}
```

The following patterns are considered problems:

```css
a { position: fixed; }
```

```css
a { transform: scale3d(1, 2, 3); }
```

```css
a { -webkit-transform: scale3d(1, 2, 3); }
```

```css
a { color: green; }
```

```css
a { animation: foo 2s ease-in-out; }
```

```css
a { animation-timing-function: ease-in-out; }
```

```css
a { -webkit-animation-timing-function: ease-in-out; }
```

The following patterns are _not_ considered problems:

```css
a { position: relative; }
```

```css
a { transform: scale(2); }
```

```css
a { -webkit-transform: scale(2); }
```

```css
a { color: lightgreen; }
```

```css
a { animation: foo 2s linear; }
```

```css
a { animation-timing-function: linear; }
```

```css
a { -webkit-animation-timing-function: linear; }
```

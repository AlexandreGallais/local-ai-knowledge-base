---
title: "property-case"
tool: "stylelint-stylistic"
version: "6.0"
source: "https://github.com/stylelint-stylistic/stylelint-stylistic/blob/3cd01e1c32e87a7d92b99c3a35e869bc36c019bb/lib/rules/property-case/README.md"
commit: "3cd01e1c32e87a7d92b99c3a35e869bc36c019bb"
license: "MIT"
---

# property-case

Specify lowercase or uppercase for properties.

```css
    a { width: 1px; }
/**     ↑
 * This property */
```

The `fix` option can automatically fix all of the problems reported by this rule.

The `message` secondary option can accept the arguments of this rule.

## Options

`string`: `"lower"|"upper"`

### `"lower"`

The following patterns are considered problems:

```css
a {
  Width: 1px
}
```

```css
a {
  WIDTH: 1px
}
```

```css
a {
  widtH: 1px
}
```

```css
a {
  border-Radius: 5px;
}
```

```css
a {
  -WEBKIT-animation-duration: 3s;
}
```

```css
@media screen and (orientation: landscape) {
  WiDtH: 500px;
}
```

The following patterns are _not_ considered problems:

```css
a {
  width: 1px
}
```

```css
a {
  border-radius: 5px;
}
```

```css
a {
  -webkit-animation-duration: 3s;
}
```

```css
@media screen and (orientation: landscape) {
  width: 500px;
}
```

### `"upper"`

The following patterns are considered problems:

```css
a {
  Width: 1px
}
```

```css
a {
  width: 1px
}
```

```css
a {
  widtH: 1px
}
```

```css
a {
  border-Radius: 5px;
}
```

```css
a {
  -WEBKIT-animation-duration: 3s;
}
```

```css
@media screen and (orientation: landscape) {
  WiDtH: 500px;
}
```

The following patterns are _not_ considered problems:

```css
a {
  WIDTH: 1px
}
```

```css
a {
  BORDER-RADIUS: 5px;
}
```

```css
a {
  -WEBKIT-ANIMATION-DURATION: 3s;
}
```

```css
@media screen and (orientation: landscape) {
  WIDTH: 500px;
}
```

## Optional secondary options

### `ignoreSelectors: ["/regex/", /regex/, "string"]`

Given:

```json
[
  "lower",
  {
    "ignoreSelectors": [":export"]
  }
]
```

The following patterns are _not_ considered problems:

```css
:export {
  camelCase: value;
}
```

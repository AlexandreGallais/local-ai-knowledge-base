---
title: "color-named"
tool: "stylelint"
version: "17.16"
source: "https://github.com/stylelint/stylelint/blob/bc06c7cdb1413de3d8dc939b33af138ab7e59df1/lib/rules/color-named/README.md"
commit: "bc06c7cdb1413de3d8dc939b33af138ab7e59df1"
license: "MIT"
---

# color-named

Require (where possible) or disallow named colors.

```css
a { color: black }
/**        ↑
 * This named color */
```

This rule ignores `$sass` and `@less` variable syntaxes.

This rule supports up to 2 message arguments: the disallowed named color, or a color and its named equivalent.

## Options

### `"always-where-possible"`

Colors _must always_, where possible, be named.

```json
{
  "color-named": "always-where-possible"
}
```

This will complain if a hex (3, 4, 6 and 8 digit), `rgb()`, `rgba()`, `hsl()`, `hsla()`, `hwb()` or `gray()` color can be represented as a named color.

The following patterns are considered problems:

```css
a { color: #000; }
```

```css
a { color: #f000; }
```

```css
a { color: #ff000000; }
```

```css
a { color: rgb(0, 0, 0); }
```

```css
a { color: rgb(0%, 0%, 0%); }
```

```css
a { color: rgba(0, 0, 0, 0); }
```

```css
a { color: hsl(0, 0%, 0%); }
```

```css
a { color: hwb(0, 0%, 100%); }
```

```css
a { color: gray(0); }
```

The following patterns are _not_ considered problems:

```css
a { color: black; }
```

```css
a { color: rgb(10, 0, 0); }
```

```css
a { color: rgb(0, 0, 0, 0.5); }
```

### `"never"`

Colors _must never_ be named.

```json
{
  "color-named": "never"
}
```

The following patterns are considered problems:

```css
a { color: black; }
```

```css
a { color: white; }
```

The following patterns are _not_ considered problems:

```css
a { color: #000; }
```

```css
a { color: rgb(0, 0, 0); }
```

```css
a { color: var(--white); }
```

## Optional secondary options

### `ignore`

```json
{ "ignore": ["array", "of", "options"] }
```

#### `"inside-function"`

Ignore colors that are inside a function.

Given:

```json
{
  "color-named": ["never", { "ignore": ["inside-function"] }]
}
```

The following patterns are _not_ considered problems:

```css
a {
  color: map-get($color, blue);
}
```

```css
a {
  background-image: url(red);
}
```

### `ignoreFunctions`

```json
{ "ignoreFunctions": ["array", "of", "functions", "/regex/"] }
```

Ignore named colors within the specified functions.

Given:

```json
{
  "color-named": ["never", { "ignoreFunctions": ["var", "/^--/"] }]
}
```

The following patterns are _not_ considered problems:

```css
a { color: var(--foo, red); }
```

```css
a { color: --foo(red); }
```

### `ignoreProperties`

```json
{ "ignoreProperties": ["array", "of", "properties", "/regex/"] }
```

Given:

```json
{
  "color-named": ["never", { "ignoreProperties": ["/^my-/", "composes"] }]
}
```

The following patterns are _not_ considered problems:

```css
a {
  my-property: red;
}
```

```css
a {
  my-other-property: red;
}
```

```css
a {
  composes: red from './index.css';
}
```

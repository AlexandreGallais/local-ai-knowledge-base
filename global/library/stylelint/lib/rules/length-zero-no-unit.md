---
title: "length-zero-no-unit"
tool: "stylelint"
version: "17.16"
source: "https://github.com/stylelint/stylelint/blob/bc06c7cdb1413de3d8dc939b33af138ab7e59df1/lib/rules/length-zero-no-unit/README.md"
commit: "bc06c7cdb1413de3d8dc939b33af138ab7e59df1"
license: "MIT"
---

# length-zero-no-unit

Disallow units for zero lengths.

```css
a { top: 0px; }
/**      ↑↑
 * This zero and this type of length unit */
```

_Lengths_ refer to distance measurements. A length is a _dimension_, which is a _number_ immediately followed by a _unit identifier_. However, for zero lengths the unit identifier is optional. The length units are: `em`, `ex`, `ch`, `vw`, `vh`, `cm`, `mm`, `in`, `pt`, `pc`, `px`, `rem`, `vmin`, and `vmax`.

This rule ignores lengths within math functions (e.g. `calc`).

The `fix` option can automatically fix all of the problems reported by this rule.

This rule doesn't have any message arguments.

## Options

### `true`

```json
{
  "length-zero-no-unit": true
}
```

The following patterns are considered problems:

```css
a { top: 0px }
```

```css
a { top: 0.000em }
```

The following patterns are _not_ considered problems:

```css
a { top: 0 } /* no unit */
```

```css
a { transition-delay: 0s; } /* dimension */
```

```css
a { top: 2in; }
```

```css
a { top: 1.001vh }
```

## Optional secondary options

### `ignore`

```json
{ "ignore": ["array", "of", "options"] }
```

#### `"custom-properties"`

Ignore units for zero lengths in custom properties.

```json
{
  "length-zero-no-unit": [true, { "ignore": ["custom-properties"] }]
}
```

The following pattern is _not_ considered a problem:

```css
a { --x: 0px; }
```

### `ignoreFunctions`

```json
{ "ignoreFunctions": ["array", "of", "functions", "/regex/"] }
```

Ignore units for zero lengths within the specified functions.

Given:

```json
{
  "length-zero-no-unit": [true, { "ignoreFunctions": ["var", "/^--/"] }]
}
```

The following patterns are _not_ considered problems:

```css
a { top: var(--foo, 0px); }
```

```css
a { top: --bar(0px); }
```

### `ignorePreludeOfAtRules`

```json
{
  "ignorePreludeOfAtRules": ["array", "of", "at-rules", "/regex/"]
}
```

Ignore units for zero lengths within the preludes of the specified at-rules.

Given:

```json
{
  "length-zero-no-unit": [
    true,
    { "ignorePreludeOfAtRules": ["media", "/^--bar/"] }
  ]
}
```

The following patterns are _not_ considered problems:

```css
@media (height > 0px) {}
```

```css
@--bar-baz 0px;
```

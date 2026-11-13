---
title: "length-zero-no-unit"
tool: "stylelint"
version: "18.0"
source: "https://github.com/stylelint/stylelint/blob/7c49e1828311b9d413826cb47703ef1c6ccae4ef/lib/rules/length-zero-no-unit/README.md"
commit: "7c49e1828311b9d413826cb47703ef1c6ccae4ef"
license: "MIT"
---

# length-zero-no-unit

Disallow units for zero lengths.

```css
a { top: 0px; }
/**      ↑↑
 * This zero and this type of length unit */
```

Use this rule to enforce a convention, as `0` means the same in every unit.

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

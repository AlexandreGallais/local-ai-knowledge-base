---
title: "value-slash-space-after"
tool: "stylelint-stylistic"
version: "6.0"
source: "https://github.com/stylelint-stylistic/stylelint-stylistic/blob/3cd01e1c32e87a7d92b99c3a35e869bc36c019bb/lib/rules/value-slash-space-after/README.md"
commit: "3cd01e1c32e87a7d92b99c3a35e869bc36c019bb"
license: "MIT"
---

# value-slash-space-after

Require a single space or disallow whitespace after the solidus that separates the parts of a value.

```css
a { grid-area: 1/ 2; }
/**             ↑
 * The space after this solidus */
```

The `fix` option can automatically fix most of the problems reported by this rule.

The solidus this rule reads is the separator CSS spells between the numbers of a ratio (`aspect-ratio: 16 / 9`), the sizes of a font shorthand (`font: 12px / 1.5 serif`), the lines of a grid area (`grid-area: 1 / 3`) and the color and the alpha of a color function (`rgb(0 0 0 / 50%)`). A solidus inside the arguments of a math function is the division operator and is not read, and neither is one inside a `url()` address, a string or a comment. The solidus of a media feature is read by `media-feature-slash-space-after`.

Where the fix would move code into a `//` comment, it leaves the whitespace alone and the warning stands.

## Options

`string`: `"always"|"never"|"always-single-line"|"never-single-line"`

### `"always"`

There _must always_ be a single space after the solidus.

The following patterns are considered problems:

```css
a { grid-area: 1/2; }
```

```css
a { grid-area: 1 /
      2; }
```

The following patterns are _not_ considered problems:

```css
a { grid-area: 1/ 2; }
```

```css
a { grid-area: 1
      / 2; }
```

### `"never"`

There _must never_ be whitespace after the solidus.

The following patterns are considered problems:

```css
a { grid-area: 1/ 2; }
```

```css
a { grid-area: 1 /
      2; }
```

The following patterns are _not_ considered problems:

```css
a { grid-area: 1/2; }
```

```css
a { grid-area: 1
      /2; }
```

### `"always-single-line"`

There _must always_ be a single space after the solidus in single-line declarations.

The following patterns are considered problems:

```css
a { grid-area: 1/2; }
```

The following patterns are _not_ considered problems:

```css
a { grid-area: 1/ 2; }
```

```css
a { grid-area: 1
      / 2; }
```

```css
a { grid-area: 1 /
      2; }
```

### `"never-single-line"`

There _must never_ be whitespace after the solidus in single-line declarations.

The following patterns are considered problems:

```css
a { grid-area: 1/ 2; }
```

The following patterns are _not_ considered problems:

```css
a { grid-area: 1/2; }
```

```css
a { grid-area: 1
      /2; }
```

```css
a { grid-area: 1 /
      2; }
```

## Optional secondary options

### `ignoreFunctions: ["/regex/", /regex/, "non-regex"]`

Ignore the solidi inside the specified functions, including those of any function nested within them.

Function names are matched case-sensitively as written. Use a case-insensitive regex (e.g. `"/^rgb$/i"`) to match other letter cases.

For example, with `"always"`.

Given:

```json
["rgb", "/^hsl/"]
```

The following patterns are _not_ considered problems:

```css
a { color: rgb(0 0 0/50%); }
```

```css
a { color: hsla(0 0% 0%/50%); }
```

```css
a { color: rgb(var(--c, 1/2)/50%); }
```

### `ignoreProperties: ["/regex/", /regex/, "non-regex"]`

Ignore the solidi in the values of the specified properties.

Property names are matched case-sensitively as written. Use a case-insensitive regex (e.g. `"/^grid-area$/i"`) to match other letter cases.

For example, with `"always"`.

Given:

```json
["grid-area", "/^font/"]
```

The following patterns are _not_ considered problems:

```css
a { grid-area: 1/2; }
```

```css
a { font-size: 12px/1.5; }
```

---
title: "value-slash-newline-before"
tool: "stylelint-stylistic"
version: "6.0"
source: "https://github.com/stylelint-stylistic/stylelint-stylistic/blob/3cd01e1c32e87a7d92b99c3a35e869bc36c019bb/lib/rules/value-slash-newline-before/README.md"
commit: "3cd01e1c32e87a7d92b99c3a35e869bc36c019bb"
license: "MIT"
---

# value-slash-newline-before

Require a newline or disallow whitespace before the solidus that separates the parts of a value.

```css
a { grid-template: "a a" 1fr
      / 1fr 1fr; }
/**   ↑
 * The newline before this solidus */
```

The `fix` option can automatically fix most of the problems reported by this rule.

This rule reads the solidus `value-slash-space-before` reads. The two rules divide a declaration between them the way the `value-list-comma-*` rules do: this one under `always-multi-line` or `never-multi-line` speaks of a declaration spanning lines, and the space rule under `always-single-line` or `never-single-line` of one on a single line.

The fix writes the newline over the whitespace in front of the solidus; the indentation of the new line is the `indentation` rule's to write. Where the fix would move code into a `//` comment, it leaves the whitespace alone and the warning stands.

## Options

`string`: `"always"|"always-multi-line"|"never-multi-line"`

### `"always"`

There _must always_ be a newline before the solidus.

The following patterns are considered problems:

```css
a { grid-area: 1 / 2; }
```

```css
a { grid-area: 1 /
      2; }
```

The following patterns are _not_ considered problems:

```css
a { grid-area: 1
      / 2; }
```

### `"always-multi-line"`

There _must always_ be a newline before the solidus in multi-line declarations.

The following patterns are considered problems:

```css
a { grid-area: 1 /
      2; }
```

The following patterns are _not_ considered problems:

```css
a { grid-area: 1 / 2; }
```

```css
a { grid-area: 1
      / 2; }
```

### `"never-multi-line"`

There _must never_ be whitespace before the solidus in multi-line declarations.

The following patterns are considered problems:

```css
a { grid-area: 1
      / 2; }
```

```css
a { grid-area: 1 /
      2; }
```

The following patterns are _not_ considered problems:

```css
a { grid-area: 1 / 2; }
```

```css
a { grid-area: 1/
      2; }
```

## Optional secondary options

### `ignoreFunctions: ["/regex/", /regex/, "non-regex"]`

Ignore the solidi inside the specified functions, including those of any function nested within them.

Function names are matched case-sensitively as written. Use a case-insensitive regex (e.g. `"/^rgb$/i"`) to match other letter cases.

For example, with `"always"`.

Given:

```json
["rgb"]
```

The following patterns are _not_ considered problems:

```css
a { color: rgb(0 0 0 / 50%); }
```

### `ignoreProperties: ["/regex/", /regex/, "non-regex"]`

Ignore the solidi in the values of the specified properties.

Property names are matched case-sensitively as written. Use a case-insensitive regex (e.g. `"/^grid-area$/i"`) to match other letter cases.

For example, with `"always"`.

Given:

```json
["/^grid-/"]
```

The following patterns are _not_ considered problems:

```css
a { grid-area: 1 / 2; }
```

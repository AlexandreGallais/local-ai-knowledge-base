---
title: "no-eol-whitespace"
tool: "stylelint-stylistic"
version: "5.3"
source: "https://github.com/stylelint-stylistic/stylelint-stylistic/blob/d61d92538fce80f9e25ad9fee7b8018bf7f33e92/lib/rules/no-eol-whitespace/README.md"
commit: "d61d92538fce80f9e25ad9fee7b8018bf7f33e92"
license: "MIT"
---

# no-eol-whitespace

Disallow end-of-line whitespace.

```css
a { color: pink; }···
/**               ↑
 *  This whitespace */
```

The `fix` option can automatically fix most of the problems reported by this rule.

## Options

### `true`

The following patterns are considered problems:

```css
a { color: pink; }·
```

```css
a { color: pink; }····
```

Comment strings are also checked -- so the following is a problem:

```css
/* something····
 * something else */
```

The following patterns are _not_ considered problems:

```css
a { color: pink; }
```

```css
/* something
 * something else */
```

## Optional secondary options

### `ignore: ["empty-lines"]`

#### `"empty-lines"`

Allow end-of-line whitespace for lines that are only whitespace, "empty" lines.

The following patterns are _not_ considered problems:

```css
a {
  color: pink;
··
  background: orange;
}
```

```css
····
```

```css
a { color: pink; }
····
```

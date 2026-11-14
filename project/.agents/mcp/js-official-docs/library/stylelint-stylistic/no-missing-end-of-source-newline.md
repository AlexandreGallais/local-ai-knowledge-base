---
title: "no-missing-end-of-source-newline"
tool: "stylelint-stylistic"
version: "6.0"
source: "https://github.com/stylelint-stylistic/stylelint-stylistic/blob/3cd01e1c32e87a7d92b99c3a35e869bc36c019bb/lib/rules/no-missing-end-of-source-newline/README.md"
commit: "3cd01e1c32e87a7d92b99c3a35e869bc36c019bb"
license: "MIT"
---

# no-missing-end-of-source-newline

Disallow missing end-of-source newlines.

```css
    a { color: pink; }
    \n
/** ↑
 * This newline */
```

Completely empty files are not considered problems.

A line feed ends a line, alone or behind a carriage return; a bare carriage return and a form feed are whitespace, as they are to PostCSS. The fix writes the break the `linebreaks` rule asks for, or else the one the file spells its lines with, and a line feed in a file written on a single line.

The break is written behind whatever the file ends on, so a free semicolon, whitespace and empty lines at the end stay where the author put them. The one thing that comes off is a run of spaces and tabs standing alone behind the last line break, which would otherwise become an empty line.

The `fix` option can automatically fix all of the problems reported by this rule.

## Options

### `true`

The following patterns are considered problems:

```css
a { color: pink; }
```

The following patterns are _not_ considered problems:

```css
a { color: pink; }
\n
```

---
title: "unicode-bom"
tool: "stylelint-stylistic"
version: "6.0"
source: "https://github.com/stylelint-stylistic/stylelint-stylistic/blob/3cd01e1c32e87a7d92b99c3a35e869bc36c019bb/lib/rules/unicode-bom/README.md"
commit: "3cd01e1c32e87a7d92b99c3a35e869bc36c019bb"
license: "MIT"
---

# unicode-bom

Require or disallow the Unicode Byte Order Mark.

The `fix` option can automatically fix all of the problems reported by this rule.

Under `"always"` a CSS file whose first node is a `@charset`, in any spelling, gets a warning about the option rather than a mark: the mark outranks the encoding declaration behind it, so set `"never"` or leave the rule unset for such files, and let Stylelint's `at-charset-rule-no-invalid` rule judge the declaration's spelling. An SCSS or Less file gets the mark as any file does, since neither compiler carries it into the output.

## Options

`string`: `"always"|"never"`

### `"always"`

The following patterns are considered problems:

```css
a {}
```

```css
@charset "utf-8";
a {}
```

The following pattern is _not_ considered a problem:

```css
U+FEFF
a {}
```

### `"never"`

The following pattern is considered a problem:

```css
U+FEFF
a {}
```

The following pattern is _not_ considered a problem:

```css
a {}
```

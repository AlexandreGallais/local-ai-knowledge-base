---
title: "at-rule-semicolon-space-before"
tool: "stylelint-stylistic"
version: "6.0"
source: "https://github.com/stylelint-stylistic/stylelint-stylistic/blob/3cd01e1c32e87a7d92b99c3a35e869bc36c019bb/lib/rules/at-rule-semicolon-space-before/README.md"
commit: "3cd01e1c32e87a7d92b99c3a35e869bc36c019bb"
license: "MIT"
---

# at-rule-semicolon-space-before

Require a single space or disallow whitespace before the semicolons of at-rules.

```css
@import "components/buttons";
/**                         ↑
 * The space before this semicolon */
```

Nothing is asked of an at-rule the file spells no semicolon behind — one running to the brace that closes its container, or to the end of the file. There is no semicolon there for whitespace to stand in front of, and the whitespace that does stand there is the closing brace's or the file's own.

The rule passes over `@charset`, whose spelling Stylelint's `at-charset-rule-no-invalid` rule judges; a CSS file holding one gets a warning asking for that rule where the configuration leaves it off.

The `fix` option can automatically fix most of the problems reported by this rule. It writes nothing where a `//` comment runs to the end of the at-rule, since the semicolon would land inside the comment. The warning stands.

## Options

`string`: `"always"|"never"`

### `"always"`

There _must always_ be a single space before the semicolons.

The following pattern is considered a problem:

```css
@import "components/buttons";
```

The following pattern is _not_ considered a problem:

```css
@import "components/buttons" ;
```

### `"never"`

There _must never_ be a single space before the semicolons.

The following pattern is considered a problem:

```css
@import "components/buttons" ;
```

The following pattern is _not_ considered a problem:

```css
@import "components/buttons";
```

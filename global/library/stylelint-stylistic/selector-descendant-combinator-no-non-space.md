---
title: "selector-descendant-combinator-no-non-space"
tool: "stylelint-stylistic"
version: "6.0"
source: "https://github.com/stylelint-stylistic/stylelint-stylistic/blob/3cd01e1c32e87a7d92b99c3a35e869bc36c019bb/lib/rules/selector-descendant-combinator-no-non-space/README.md"
commit: "3cd01e1c32e87a7d92b99c3a35e869bc36c019bb"
license: "MIT"
---

# selector-descendant-combinator-no-non-space

Disallow non-space characters for descendant combinators of selectors.

```css
.foo .bar .baz {}
/** ↑    ↑
* These descendant combinators */
```

This rule ensures that only a single space is used and ensures no tabs, newlines, nor multiple spaces are used for descendant combinators of selectors.

The `fix` option can automatically fix most of the problems reported by this rule.

The `message` secondary option can accept the arguments of this rule.

A comment standing inside a descendant combinator is kept where it is, and each stretch of whitespace beside it is measured on its own. A comment following a combinator of another kind takes the whitespace after it out of this rule's reach: `.foo > /*comment*/  .bar {}` holds a child combinator and no descendant one.

An inline comment ends with the line break standing behind it, so the whitespace there can never be the single space this rule asks for, and it is passed over. This rule currently ignores a selector whose comment stands in front of a parenthesized group.

## Options

### `true`

The following patterns are considered problems:

```css
.foo  .bar {}
```

```css
.foo
.bar {}
```

```css
.foo ( ) .bar {}
```

```css
.foo  /*comment*/  .bar {}
```

The following patterns are _not_ considered problems:

```css
.foo .bar {}
```

```css
.foo /*comment*/ .bar {}
```

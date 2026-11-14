---
title: "CSS at-rule functions"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/at-rules/at-rule_functions/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSS at-rule functions

**CSS at-rule functions** are at-rule statements that represent complex rules or can invoke special data processing or calculations.

## Syntax

```plain
@identifier function([argument]? [, argument]!) {
}
```

The syntax begins with the at symbol `@` and an at-rule identifier, such as `import`. This is followed by the **name of the at-rule function**, such as `url`, followed by a pair of opening and closing parentheses. One or more arguments are specified inside the parentheses.

Some at-rule functions can take multiple arguments, which are formatted similar to CSS property values. White space is allowed, but it is optional inside the parentheses. Multiple arguments can be separated using a comma or a space.

## @import functions

The `@import` at-rule is used to import styles from other stylesheets.

- `@import url()`
    Imports a stylesheet file from the specified URL.
- `@import supports()`
    Imports a stylesheet file based on browser support.
- `@import layer()`
    Imports a stylesheet file into the specified cascade layer.

## @supports functions

The `@supports` at-rule checks for a browser's support for the specified CSS feature and then applies the CSS styling.

- `@supports selector()`
    Applies CSS rules after checking browser's support for the specified selector syntax.
- `@supports font-tech()`
    Applies CSS rules after checking browser's support for the specified font technology.
- `@supports font-format()`
    Applies CSS rules after checking browser's support for the specified font format.

## @namespace functions

The `@namespace` at-rule is used to specify XML namespaces to be used in a CSS stylesheet.

- `@namespace url()`
    Defines XML namespace from the specified URL.

## @container functions

The `@container` at-rule is used to specify styles for a containment context.

- `@container style()`
    Defines the containment context style.

## See also

- CSS at-rules
- CSS syntax module

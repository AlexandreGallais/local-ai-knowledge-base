---
title: "string-quotes"
tool: "stylelint-stylistic"
version: "5.3"
source: "https://github.com/stylelint-stylistic/stylelint-stylistic/blob/d61d92538fce80f9e25ad9fee7b8018bf7f33e92/lib/rules/string-quotes/README.md"
commit: "d61d92538fce80f9e25ad9fee7b8018bf7f33e92"
license: "MIT"
---

# string-quotes

Specify single or double quotes around strings.

```css
a[id="foo"] { content: "x"; }
/**  ↑   ↑             ↑ ↑
 * These quotes and these quotes */
```

Quotes within comments are ignored.

```css
/* "This is fine" */
/* 'And this is also fine' */
```

Single quotes in a charset @-rule are ignored as using single quotes in this context is incorrect according the CSS specification.

```css
@charset "utf-8"
/* fine regardless of configuration */
```

The `fix` option can automatically fix most of the problems reported by this rule.

The `message` secondary option can accept the arguments of this rule.

## Options

`string`: `"single"|"double"`

### `"single"`

Strings _must always_ be wrapped with single quotes.

The following patterns are considered problems:

```css
a { content: "x"; }
```

```css
a[id="foo"] {}
```

The following patterns are _not_ considered problems:

```css
a { content: 'x'; }
```

```css
a[id='foo'] {}
```

```css
a { content: "x'y'z"; }
```

### `"double"`

Strings _must always_ be wrapped with double quotes.

The following patterns are considered problems:

```css
a { content: 'x'; }
```

```css
a[id='foo'] {}
```

The following patterns are _not_ considered problems:

```css
a { content: "x"; }
```

```css
a[id="foo"] {}
```

```css
a { content: 'x"y"z'; }
```

## Optional secondary options

### `avoidEscape`: `true|false`, defaults to `true`

Allows strings to use single-quotes or double-quotes so long as the string contains a quote that would have to be escaped otherwise.

For example, with `"single", { "avoidEscape" : false }`.

The following patterns are considered problems:

```css
a { content: "x'y'z"; }
```

```css
a[id="foo'bar'baz"] {}
```

The following patterns are _not_ considered problems:

```css
a { content: 'x'; }
```

```css
a[id='foo'] {}
```

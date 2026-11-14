---
title: "string-quotes"
tool: "stylelint-stylistic"
version: "6.0"
source: "https://github.com/stylelint-stylistic/stylelint-stylistic/blob/3cd01e1c32e87a7d92b99c3a35e869bc36c019bb/lib/rules/string-quotes/README.md"
commit: "3cd01e1c32e87a7d92b99c3a35e869bc36c019bb"
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

The rule passes over `@charset`, whose spelling Stylelint's `at-charset-rule-no-invalid` rule judges; a CSS file holding one gets a warning asking for that rule where the configuration leaves it off.

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

The following patterns are _not_ considered problems:

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

The following patterns are _not_ considered problems:

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

The following patterns are _not_ considered problems:

```css
a { content: 'x'; }
```

```css
a[id='foo'] {}
```

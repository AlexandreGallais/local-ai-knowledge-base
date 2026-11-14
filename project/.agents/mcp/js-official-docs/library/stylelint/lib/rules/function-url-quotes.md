---
title: "function-url-quotes"
tool: "stylelint"
version: "18.0"
source: "https://github.com/stylelint/stylelint/blob/7c49e1828311b9d413826cb47703ef1c6ccae4ef/lib/rules/function-url-quotes/README.md"
commit: "7c49e1828311b9d413826cb47703ef1c6ccae4ef"
license: "MIT"
---

# function-url-quotes

Require or disallow quotes for urls.

```css
a { background: url("x.jpg") }
/**                 ↑     ↑
 *             These quotes */
```

Use this rule to enforce a convention. Quotes around a URL are optional unless it contains parentheses, whitespace or quotes.

Choose:

- `"always"` so that any URL works without escaping, including data URLs
- `"never"` for brevity, as this rule allows the quotes a URL needs

The `fix` option can automatically fix most of the problems reported by this rule.

This rule supports 1 message argument: the URL function name.

## Options

### `"always"`

Urls _must always_ be quoted.

```json
{
  "function-url-quotes": "always"
}
```

The following patterns are considered problems:

```css
@import url(foo.css);
```

```css
@font-face { font-family: 'foo'; src: url(foo.ttf); }
```

The following patterns are _not_ considered problems:

```css
a { background: url('x.jpg'); }
```

```css
@import url("foo.css");
```

```css
@font-face { font-family: "foo"; src: url("foo.ttf"); }
```

### `"never"`

Urls _must never_ be quoted.

```json
{
  "function-url-quotes": "never"
}
```

The following patterns are considered problems:

```css
a { background: url('x.jpg'); }
```

```css
@import url("foo.css");
```

```css
@font-face { font-family: "foo"; src: url('foo.ttf'); }
```

The following patterns are _not_ considered problems:

```css
a { background: url(x.jpg); }
```

```css
@import url(foo.css);
```

```css
@font-face { font-family: 'foo'; src: url(foo.ttf); }
```

## Optional secondary options

### `except`

```json
{ "except": ["array", "of", "options"] }
```

#### `"empty"`

Reverse the primary option for functions that have no arguments.

Given:

```json
{
  "function-url-quotes": ["always", { "except": ["empty"] }]
}
```

The following patterns are _not_ considered problems:

```css
@-moz-document url-prefix() {}
```

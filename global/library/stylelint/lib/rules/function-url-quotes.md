---
title: "function-url-quotes"
tool: "stylelint"
version: "17.16"
source: "https://github.com/stylelint/stylelint/blob/bc06c7cdb1413de3d8dc939b33af138ab7e59df1/lib/rules/function-url-quotes/README.md"
commit: "bc06c7cdb1413de3d8dc939b33af138ab7e59df1"
license: "MIT"
---

# function-url-quotes

Require or disallow quotes for urls.

```css
a { background: url("x.jpg") }
/**                 ↑     ↑
 *             These quotes */
```

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

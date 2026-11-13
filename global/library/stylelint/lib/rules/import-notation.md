---
title: "import-notation"
tool: "stylelint"
version: "17.16"
source: "https://github.com/stylelint/stylelint/blob/bc06c7cdb1413de3d8dc939b33af138ab7e59df1/lib/rules/import-notation/README.md"
commit: "bc06c7cdb1413de3d8dc939b33af138ab7e59df1"
license: "MIT"
---

# import-notation

Specify string or URL notation for `@import` rules.

```css
@import url("x.jpg");
/**     ↑
 *      This notation */
```

The `fix` option can automatically fix all of the problems reported by this rule.

This rule supports 2 message arguments: the import value and its expected notation.

## Options

### `"string"`

`@import` rules _must always_ use string notation.

```json
{
  "import-notation": "string"
}
```

The following patterns are considered problems:

```css
@import url(foo.css);
```

```css
@import url('foo.css');
```

```css
@import url("foo.css");
```

The following patterns are _not_ considered problems:

```css
@import 'foo.css';
```

```css
@import "foo.css";
```

### `"url"`

`@import` rules _must always_ use URL notation.

```json
{
  "import-notation": "url"
}
```

The following patterns are considered problems:

```css
@import 'foo.css';
```

```css
@import "foo.css";
```

The following patterns are _not_ considered problems:

```css
@import url(foo.css);
```

```css
@import url('foo.css');
```

```css
@import url("foo.css");
```

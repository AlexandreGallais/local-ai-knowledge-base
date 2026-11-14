---
title: "import-notation"
tool: "stylelint"
version: "18.0"
source: "https://github.com/stylelint/stylelint/blob/7c49e1828311b9d413826cb47703ef1c6ccae4ef/lib/rules/import-notation/README.md"
commit: "7c49e1828311b9d413826cb47703ef1c6ccae4ef"
license: "MIT"
---

# import-notation

Specify string or URL notation for `@import` rules.

```css
@import url("x.jpg");
/**     ↑
 *      This notation */
```

Use this rule to enforce a convention. `@import` accepts a string or a `url()` function, and both load the same file.

Choose:

- `"url"` to match how other files are referenced, e.g. in `background-image`
- `"string"` for brevity

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

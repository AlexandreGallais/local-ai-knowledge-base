---
title: "relative-selector-nesting-notation"
tool: "stylelint"
version: "17.16"
source: "https://github.com/stylelint/stylelint/blob/bc06c7cdb1413de3d8dc939b33af138ab7e59df1/lib/rules/relative-selector-nesting-notation/README.md"
commit: "bc06c7cdb1413de3d8dc939b33af138ab7e59df1"
license: "MIT"
---

# relative-selector-nesting-notation

Specify explicit or implicit nesting notation for relative selectors.

```css
a { & > b {} }
/** ↑
 * This notation */
```

When a relative selector starts with a combinator (like ` `, `>`, `+`, `~`), you can either use an explicit nesting selector (`&`) or rely on implicit nesting behavior. Implicit notation is more concise, but explicit notation can be more readable.

The `fix` option can automatically fix all of the problems reported by this rule.

This rule supports 1 message argument: the configured notation.

## Options

### `"explicit"`

Relative selectors _must always_ use explicit nesting selector notation.

```json
{
  "relative-selector-nesting-notation": "explicit"
}
```

The following patterns are considered problems:

```css
a {
  b {}
}
```

```css
a {
  > b {}
}
```

The following patterns are _not_ considered problems:

```css
a {
  & b {}
}
```

```css
a {
  & > b {}
}
```

### `"implicit"`

Relative selectors _must always_ use implicit nesting selector notation.

```json
{
  "relative-selector-nesting-notation": "implicit"
}
```

The following patterns are considered problems:

```css
a {
  & b {}
}
```

```css
a {
  & > b {}
}
```

The following patterns are _not_ considered problems:

```css
a {
  b {}
}
```

```css
a {
  > b {}
}
```

```css
a {
  &:hover {}
}
```

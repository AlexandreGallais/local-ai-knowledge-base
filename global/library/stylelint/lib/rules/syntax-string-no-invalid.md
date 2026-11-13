---
title: "syntax-string-no-invalid"
tool: "stylelint"
version: "17.16"
source: "https://github.com/stylelint/stylelint/blob/bc06c7cdb1413de3d8dc939b33af138ab7e59df1/lib/rules/syntax-string-no-invalid/README.md"
commit: "bc06c7cdb1413de3d8dc939b33af138ab7e59df1"
license: "MIT"
---

# syntax-string-no-invalid

Disallow invalid syntax strings.

```css
@property --foo {
  syntax: "<color>";
/**       ↑
 * Syntax strings like this */
}
```

Syntax strings are used for the `syntax` descriptor value of the `@property` at-rule. This rule checks their grammar and flags unsupported type names.

You can check §5.1 “Supported Names” of the CSS Properties & Values API for a list of valid syntax component names.

This rule supports 1 message argument: the invalid syntax string.

## Options

### `true`

```json
{
  "syntax-string-no-invalid": true
}
```

The following patterns are considered problems:

```css
@property --foo {
  syntax: "<bar>";
}
```

```css
@property --foo {
  syntax: "<alpha-value>";
}
```

The following patterns are _not_ considered problems:

```css
@property --foo {
  syntax: "<color>";
}
```

```css
@property --foo {
  syntax: "<length> | <color>";
}
```

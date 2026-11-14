---
title: "syntax-string-no-invalid"
tool: "stylelint"
version: "18.0"
source: "https://github.com/stylelint/stylelint/blob/7c49e1828311b9d413826cb47703ef1c6ccae4ef/lib/rules/syntax-string-no-invalid/README.md"
commit: "7c49e1828311b9d413826cb47703ef1c6ccae4ef"
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

Use this rule to avoid custom properties that never register. An invalid syntax string invalidates the whole `@property` rule.

Syntax strings are used for the `syntax` descriptor value of the `@property` at-rule. This rule reports invalid syntax strings and unsupported type names.

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

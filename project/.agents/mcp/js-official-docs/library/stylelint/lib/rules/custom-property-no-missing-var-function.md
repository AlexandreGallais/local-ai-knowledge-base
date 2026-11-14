---
title: "custom-property-no-missing-var-function"
tool: "stylelint"
version: "18.0"
source: "https://github.com/stylelint/stylelint/blob/7c49e1828311b9d413826cb47703ef1c6ccae4ef/lib/rules/custom-property-no-missing-var-function/README.md"
commit: "7c49e1828311b9d413826cb47703ef1c6ccae4ef"
license: "MIT"
---

# custom-property-no-missing-var-function

Disallow missing `var` function for custom properties.

```css
    :root { --foo: red; }
    a { color: --foo; }
/**            ↑
 *             This custom property */
```

Use this rule to avoid declarations that browsers ignore. A custom property without `var()`, e.g. `--foo` alone, is a plain identifier that most properties reject.

This rule ignores properties that accept a `<custom-ident>` or `<dashed-ident>` as their whole value, e.g. `transition-property`.

You can filter the CSSTree Syntax Reference to find out what properties accept them, and use the `languageOptions` configuration property to extend it.

This rule supports 1 message argument: the custom property.

## Options

### `true`

```json
{
  "custom-property-no-missing-var-function": true
}
```

The following patterns are considered problems:

```css
:root { --foo: red; }
a { color: --foo; }
```

```css
@property --foo {}
a { color: --foo; }
```

The following patterns are _not_ considered problems:

```css
:root { --foo: red; }
a { color: var(--foo); }
```

```css
@property --foo {}
a { color: var(--foo); }
```

```css
@property --foo {}
a { transition-property: --foo; }
```

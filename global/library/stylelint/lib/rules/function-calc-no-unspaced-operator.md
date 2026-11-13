---
title: "function-calc-no-unspaced-operator"
tool: "stylelint"
version: "17.16"
source: "https://github.com/stylelint/stylelint/blob/bc06c7cdb1413de3d8dc939b33af138ab7e59df1/lib/rules/function-calc-no-unspaced-operator/README.md"
commit: "bc06c7cdb1413de3d8dc939b33af138ab7e59df1"
license: "MIT"
---

# function-calc-no-unspaced-operator

Disallow invalid unspaced operator within math functions, such as `calc()` or `min()`.

```css
a { top: calc(1px + 2px); }
/**               ↑
 * The space around this operator */
```

This rule checks that there is a single whitespace or a newline plus indentation before the `+` or `-` operator, and a single whitespace or a newline after that operator.

The `fix` option can automatically fix all of the problems reported by this rule.

This rule supports 1 message argument: the operator.

## Options

### `true`

```json
{
  "function-calc-no-unspaced-operator": true
}
```

The following patterns are considered problems:

```css
a { top: calc(1px+2px); }
```

```css
a { top: calc(1px+ 2px); }
```

```css
a { transform: rotate(atan(-2+1)); }
```

The following patterns are _not_ considered problems:

```css
a { top: calc(1px + 2px); }
```

```css
a { top: calc(calc(1em * 2) / 3); }
```

```css
a { top: calc(calc(1em*2)/3); }
```

```css
a {
  top: calc(var(--foo) +
    var(--bar));
}
```

```css
a {
  top: calc(var(--foo)
    + var(--bar));
}
```

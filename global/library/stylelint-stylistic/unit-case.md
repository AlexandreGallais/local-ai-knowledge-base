---
title: "unit-case"
tool: "stylelint-stylistic"
version: "5.3"
source: "https://github.com/stylelint-stylistic/stylelint-stylistic/blob/d61d92538fce80f9e25ad9fee7b8018bf7f33e92/lib/rules/unit-case/README.md"
commit: "d61d92538fce80f9e25ad9fee7b8018bf7f33e92"
license: "MIT"
---

# unit-case

Specify lowercase or uppercase for units.

```css
    a { width: 10px; }
/**              ↑
 *     These units */
```

The `fix` option can automatically fix most of the problems reported by this rule.

The `message` secondary option can accept the arguments of this rule.

## Options

`string`: `"lower"|"upper"`

### `"lower"`

The following patterns are considered problems:

```css
a {
  width: 10PX;
}
```

```css
a {
  width: 10Px;
}
```

```css
a {
  width: 10pX;
}
```

```css
a {
  width: 10PIXEL;
}
```

```css
a {
  width: calc(10PX * 2);
}
```

The following patterns are _not_ considered problems:

```css
a {
  width: 10px;
}
```

```css
a {
  width: calc(10px * 2);
}
```

### `"upper"`

The following patterns are considered problems:

```css
a {
  width: 10px;
}
```

```css
a {
  width: 10Px;
}
```

```css
a {
  width: 10pX;
}
```

```css
a {
  width: 10pixel;
}
```

```css
a {
  width: calc(10px * 2);
}
```

The following patterns are _not_ considered problems:

```css
a {
  width: 10PX;
}
```

```css
a {
  width: calc(10PX * 2);
}
```

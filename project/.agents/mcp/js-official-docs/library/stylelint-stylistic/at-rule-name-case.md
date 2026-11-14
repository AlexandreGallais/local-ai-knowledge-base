---
title: "at-rule-name-case"
tool: "stylelint-stylistic"
version: "6.0"
source: "https://github.com/stylelint-stylistic/stylelint-stylistic/blob/3cd01e1c32e87a7d92b99c3a35e869bc36c019bb/lib/rules/at-rule-name-case/README.md"
commit: "3cd01e1c32e87a7d92b99c3a35e869bc36c019bb"
license: "MIT"
---

# at-rule-name-case

Specify lowercase or uppercase for at-rules names.

```css
   @media (min-width: 10px) {}
/** ↑
 * This at-rule name */
```

The `fix` option can automatically fix some of the problems reported by this rule.

The `message` secondary option can accept the arguments of this rule.

The rule passes over `@charset`, whose spelling Stylelint's `at-charset-rule-no-invalid` rule judges; a CSS file holding one gets a warning asking for that rule where the configuration leaves it off.

## Options

`string`: `"lower"|"upper"`

### `"lower"`

The following patterns are considered problems:

```css
@Layer base;
```

```css
@lAyEr base;
```

```css
@LAYER base;
```

```css
@Media (min-width: 50em) {}
```

```css
@mEdIa (min-width: 50em) {}
```

```css
@MEDIA (min-width: 50em) {}
```

The following patterns are _not_ considered problems:

```css
@layer base;
```

```css
@media (min-width: 50em) {}
```

### `"upper"`

The following patterns are considered problems:

```css
@Layer base;
```

```css
@lAyEr base;
```

```css
@layer base;
```

```css
@Media (min-width: 50em) {}
```

```css
@mEdIa (min-width: 50em) {}
```

```css
@media (min-width: 50em) {}
```

The following patterns are _not_ considered problems:

```css
@LAYER base;
```

```css
@MEDIA (min-width: 50em) {}
```

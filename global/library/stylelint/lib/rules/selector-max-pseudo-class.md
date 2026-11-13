---
title: "selector-max-pseudo-class"
tool: "stylelint"
version: "17.16"
source: "https://github.com/stylelint/stylelint/blob/bc06c7cdb1413de3d8dc939b33af138ab7e59df1/lib/rules/selector-max-pseudo-class/README.md"
commit: "bc06c7cdb1413de3d8dc939b33af138ab7e59df1"
license: "MIT"
---

# selector-max-pseudo-class

Limit the number of pseudo-classes in a selector.

```css
.foo .bar:first-child:hover {}
/*       ↑           ↑
         ↑           ↑
         1           2 -- this selector contains two pseudo-classes */
```

Each selector in a selector list is evaluated separately.

> **Note:**
> In versions prior to `17.0.0`, this rule would evaluate functional pseudo-classes separately, such as `:not()` and `:is()`, and resolve nested selectors (in a nonstandard way) before counting.

This rule supports 2 message arguments: the selector and the configured maximum.

## Options

### `number`

Specify a maximum pseudo-classes allowed.

Given:

```json
{
  "selector-max-pseudo-class": 1
}
```

The following patterns are considered problems:

```css
a:first-child:focus {}
```

```css
.foo .bar:first-child:hover {}
```

The following patterns are _not_ considered problems:

```css
a {}
```

```css
a:first-child {}
```

```css
.foo .bar:first-child {}
```

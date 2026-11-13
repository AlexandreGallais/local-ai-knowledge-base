---
title: "selector-max-class"
tool: "stylelint"
version: "18.0"
source: "https://github.com/stylelint/stylelint/blob/7c49e1828311b9d413826cb47703ef1c6ccae4ef/lib/rules/selector-max-class/README.md"
commit: "7c49e1828311b9d413826cb47703ef1c6ccae4ef"
license: "MIT"
---

# selector-max-class

Limit the number of classes in a selector.

```css
div .foo.bar[data-val] > a.baz {}
/*  ↑   ↑                 ↑
    ↑   ↑                 ↑
    1   2                 3  -- this selector contains three classes */
```

Use this rule to enforce a convention. For example, limit selectors to `2` classes, so that selectors stay readable.

Each selector in a selector list is evaluated separately.

> **Note:**
> In versions prior to `17.0.0`, this rule would evaluate functional pseudo-classes separately, such as `:not()` and `:is()`, and resolve nested selectors (in a nonstandard way) before counting.

This rule supports 2 message arguments: the selector and the configured maximum.

## Options

### `number`

Specify a maximum classes allowed.

Given:

```json
{
  "selector-max-class": 2
}
```

The following patterns are considered problems:

```css
.foo.bar.baz {}
```

The following patterns are _not_ considered problems:

```css
div {}
```

```css
.foo .bar {}
```

---
title: "selector-max-combinators"
tool: "stylelint"
version: "17.16"
source: "https://github.com/stylelint/stylelint/blob/bc06c7cdb1413de3d8dc939b33af138ab7e59df1/lib/rules/selector-max-combinators/README.md"
commit: "bc06c7cdb1413de3d8dc939b33af138ab7e59df1"
license: "MIT"
---

# selector-max-combinators

Limit the number of combinators in a selector.

```css
  a > b + c ~ d e { color: pink; }
/** ↑   ↑   ↑  ↑
 * These are combinators */
```

Each selector in a selector list is evaluated separately.

> **Note:**
> In versions prior to `17.0.0`, this rule would evaluate functional pseudo-classes separately, such as `:not()` and `:is()`, and resolve nested selectors (in a nonstandard way) before counting.

This rule supports 2 message arguments: the selector and the configured maximum.

## Options

### `number`

Specify a maximum combinators selectors allowed.

Given:

```json
{
  "selector-max-combinators": 2
}
```

The following patterns are considered problems:

```css
a b ~ c + d {}
```

```css
a b ~ c + d > e {}
```

The following patterns are _not_ considered problems:

```css
a {}
```

```css
a b {}
```

```css
a b ~ c {}
```

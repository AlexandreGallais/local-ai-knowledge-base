---
title: "selector-max-combinators"
tool: "stylelint"
version: "18.0"
source: "https://github.com/stylelint/stylelint/blob/7c49e1828311b9d413826cb47703ef1c6ccae4ef/lib/rules/selector-max-combinators/README.md"
commit: "7c49e1828311b9d413826cb47703ef1c6ccae4ef"
license: "MIT"
---

# selector-max-combinators

Limit the number of combinators in a selector.

```css
  a > b + c ~ d e { color: pink; }
/** ↑   ↑   ↑  ↑
 * These are combinators */
```

Use this rule to enforce a convention. For example, limit selectors to `1` combinator, so that styles can't reach deep into the markup.

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

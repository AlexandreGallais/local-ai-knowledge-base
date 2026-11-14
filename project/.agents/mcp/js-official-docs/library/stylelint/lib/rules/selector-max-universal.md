---
title: "selector-max-universal"
tool: "stylelint"
version: "18.0"
source: "https://github.com/stylelint/stylelint/blob/7c49e1828311b9d413826cb47703ef1c6ccae4ef/lib/rules/selector-max-universal/README.md"
commit: "7c49e1828311b9d413826cb47703ef1c6ccae4ef"
license: "MIT"
---

# selector-max-universal

Limit the number of universal selectors in a selector.

```css
    * {}
/** ↑
 * This universal selector */
```

Use this rule to enforce a convention. For example, limit component selectors to `0` universal selectors, as a reset is the only common use of `*`.

Each selector in a selector list is evaluated separately.

> **Note:**
> In versions prior to `17.0.0`, this rule would evaluate functional pseudo-classes separately, such as `:not()` and `:is()`, and resolve nested selectors (in a nonstandard way) before counting.

This rule supports 2 message arguments: the selector and the configured maximum.

## Options

### `number`

Specify a maximum universal selectors allowed.

Given:

```json
{
  "selector-max-universal": 2
}
```

The following pattern is considered a problem:

```css
* * * {}
```

The following patterns are _not_ considered problems:

```css
* {}
```

```css
* * {}
```

```css
.foo * {}
```

```css
*.foo * {}
```

## Optional secondary options

### `ignoreAfterCombinators`

```json
{ "ignoreAfterCombinators": ["array", "of", "combinators"] }
```

Ignore universal selectors that come after one of the specified combinators.

Given:

```json
{
  "selector-max-universal": [2, { "ignoreAfterCombinators": [">", "+"] }]
}
```

The following pattern is _not_ considered a problem:

```css
* * > * {}
```

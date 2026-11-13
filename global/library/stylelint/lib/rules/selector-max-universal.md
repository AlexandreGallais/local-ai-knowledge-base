---
title: "selector-max-universal"
tool: "stylelint"
version: "17.16"
source: "https://github.com/stylelint/stylelint/blob/bc06c7cdb1413de3d8dc939b33af138ab7e59df1/lib/rules/selector-max-universal/README.md"
commit: "bc06c7cdb1413de3d8dc939b33af138ab7e59df1"
license: "MIT"
---

# selector-max-universal

Limit the number of universal selectors in a selector.

```css
    * {}
/** ↑
 * This universal selector */
```

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

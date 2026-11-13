---
title: "selector-max-type"
tool: "stylelint"
version: "18.0"
source: "https://github.com/stylelint/stylelint/blob/7c49e1828311b9d413826cb47703ef1c6ccae4ef/lib/rules/selector-max-type/README.md"
commit: "7c49e1828311b9d413826cb47703ef1c6ccae4ef"
license: "MIT"
---

# selector-max-type

Limit the number of type selectors in a selector.

```css
    a {}
/** ↑
 * This type of selector */
```

Use this rule to enforce a convention. For example, limit component selectors to `0` type selectors, so that the markup can change without breaking them.

Each selector in a selector list is evaluated separately.

> **Note:**
> In versions prior to `17.0.0`, this rule would evaluate functional pseudo-classes separately, such as `:not()` and `:is()`, and resolve nested selectors (in a nonstandard way) before counting.

This rule supports 2 message arguments: the selector and the configured maximum.

## Options

### `number`

Specify a maximum type selectors allowed.

Given:

```json
{
  "selector-max-type": 2
}
```

The following pattern is considered a problem:

```css
div a span {}
```

The following patterns are _not_ considered problems:

```css
div {}
```

```css
div a {}
```

```css
.foo div a {}
```

```css
div.foo a {}
```

## Optional secondary options

### `ignore`

```json
{ "ignore": ["array", "of", "options"] }
```

#### `"child"`

Discount child type selectors.

Given:

```json
{
  "selector-max-type": [2, { "ignore": ["child"] }]
}
```

The following patterns are _not_ considered problems:

```css
div span > a {}
```

```css
#bar div span > a {}
```

#### `"compounded"`

Discount compounded type selectors -- i.e. type selectors chained with other selectors.

Given:

```json
{
  "selector-max-type": [2, { "ignore": ["compounded"] }]
}
```

The following patterns are _not_ considered problems:

```css
div span a.foo {}
```

```css
div span a#bar {}
```

#### `"custom-elements"`

Discount custom elements.

Given:

```json
{
  "selector-max-type": [2, { "ignore": ["custom-elements"] }]
}
```

The following pattern is _not_ considered a problem:

```css
div a foo-bar {}
```

#### `"descendant"`

Discount descendant type selectors.

Given:

```json
{
  "selector-max-type": [2, { "ignore": ["descendant"] }]
}
```

The following patterns are _not_ considered problems:

```css
.foo div span a {}
```

```css
#bar div span a {}
```

#### `"next-sibling"`

Discount next-sibling type selectors.

Given:

```json
{
  "selector-max-type": [2, { "ignore": ["next-sibling"] }]
}
```

The following patterns are _not_ considered problems:

```css
div a + span {}
```

```css
#bar + div + span + a + span {}
```

### `ignoreTypes`

```json
{ "ignoreTypes": ["array", "of", "types", "/regex/"] }
```

Given:

```json
{
  "selector-max-type": [2, { "ignoreTypes": ["/^my-/", "custom"] }]
}
```

The following patterns are _not_ considered problems:

```css
div a custom {}
```

```css
div a my-type {}
```

```css
div a my-other-type {}
```

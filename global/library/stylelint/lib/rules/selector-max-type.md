---
title: "selector-max-type"
tool: "stylelint"
version: "17.16"
source: "https://github.com/stylelint/stylelint/blob/bc06c7cdb1413de3d8dc939b33af138ab7e59df1/lib/rules/selector-max-type/README.md"
commit: "bc06c7cdb1413de3d8dc939b33af138ab7e59df1"
license: "MIT"
---

# selector-max-type

Limit the number of type selectors in a selector.

```css
    a {}
/** ↑
 * This type of selector */
```

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

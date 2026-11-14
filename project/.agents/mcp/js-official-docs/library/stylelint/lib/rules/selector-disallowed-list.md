---
title: "selector-disallowed-list"
tool: "stylelint"
version: "18.0"
source: "https://github.com/stylelint/stylelint/blob/7c49e1828311b9d413826cb47703ef1c6ccae4ef/lib/rules/selector-disallowed-list/README.md"
commit: "7c49e1828311b9d413826cb47703ef1c6ccae4ef"
license: "MIT"
---

# selector-disallowed-list

Specify a list of disallowed selectors.

```css
    .foo > .bar {}
/** ↑
 * This is selector */
```

Use this rule to enforce a convention. For example, disallow:

- `/^\.js-/` and `/\[data-testid/` if your tests own those selectors
- a library's classes, e.g. `/^\.foo-/`, to avoid overriding its internals

This rule supports 1 message argument: the disallowed selector.

## Options

### `Array<string>`

```json
["array", "of", "selectors", "/regex/"]
```

Given:

```json
{
  "selector-disallowed-list": ["a > .foo", "/\\[data-.+]/"]
}
```

The following patterns are considered problems:

```css
a > .foo {}
```

```css
a[data-auto="1"] {}
```

```css
.foo, [data-auto="1"] {}
```

The following patterns are _not_ considered problems:

```css
.foo {}
```

```css
a
>
.foo {}
```

```css
.bar > a > .foo {}
```

```css
.data-auto {}
```

```css
a[href] {}
```

## Optional secondary options

### `splitList`

Split selector lists into individual selectors. Defaults to `false`.

Given:

```json
{
  "selector-disallowed-list": [".foo", { "splitList": true }]
}
```

The following pattern is considered a problem:

```css
.bar, .foo {}
```

The following pattern is _not_ considered a problem:

```css
.bar .foo {}
```

### `ignore`

```json
{ "ignore": ["array", "of", "options"] }
```

#### `"inside-block"`

Ignore selectors that are inside a block.

Given:

```json
{
  "selector-disallowed-list": [".foo", { "ignore": ["inside-block"] }]
}
```

The following pattern is _not_ considered a problem:

```css
.bar {
  .foo {}
}
```

#### `"keyframe-selectors"`

Ignore keyframe selectors.

Given:

```json
{
  "selector-disallowed-list": ["/from/", { "ignore": ["keyframe-selectors"] }]
}
```

The following pattern is _not_ considered a problem:

```css
@keyframes fade-in {
  from {}
}
```

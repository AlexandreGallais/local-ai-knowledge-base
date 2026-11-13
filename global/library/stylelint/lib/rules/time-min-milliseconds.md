---
title: "time-min-milliseconds"
tool: "stylelint"
version: "17.16"
source: "https://github.com/stylelint/stylelint/blob/bc06c7cdb1413de3d8dc939b33af138ab7e59df1/lib/rules/time-min-milliseconds/README.md"
commit: "bc06c7cdb1413de3d8dc939b33af138ab7e59df1"
license: "MIT"
---

# time-min-milliseconds

Limit the minimum number of milliseconds for time values.

```css
a { animation: slip-n-slide 150ms linear; }
/**                         ↑
 *                  This time */
```

This rule checks positive numbers in `transition-duration`, `transition-delay`, `animation-duration`, `animation-delay`, and those times as they manifest in the `transition` and `animation` shorthands.

This rule supports 1 message argument: the configured minimum.

## Options

### `number`

Specify a minimum number of milliseconds for time values.

Given:

```json
{
  "time-min-milliseconds": 100
}
```

The following patterns are considered problems:

```css
a { animation: 80ms; }
```

```css
a { transition-duration: 0.08s; }
```

```css
a { transition: background-color 6ms linear; }
```

```css
a { animation-delay: 0.01s; }
```

The following patterns are _not_ considered problems:

```css
a { animation: 8s; }
```

```css
a { transition-duration: 0.8s; }
```

```css
a { transition: background-color 600ms linear; }
```

```css
a { animation-delay: 1s; }
```

## Optional secondary options

### `ignore`

```json
{ "ignore": ["array", "of", "options"] }
```

#### `"delay"`

Ignore time values for an animation or transition delay.

Given:

```json
{
  "time-min-milliseconds": [200, { "ignore": ["delay"] }]
}
```

The following pattern is _not_ considered a problem:

```css
a { animation-delay: 100ms; }
```

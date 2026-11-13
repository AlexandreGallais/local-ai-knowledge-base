---
title: "`log()` CSS function"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/values/log/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `log()` CSS function

The **`log()`** CSS function is an exponential function that returns the logarithm of a number.

Logarithm is the inverse of exponentiation. It is the number that a fixed base has to be raised to in order to yield the number passed as the first parameter.

In CSS, when a single parameter is passed, the natural logarithm `e`, or approximately `2.7182818`, is used, though the base can be set to any value with an optional second parameter.

## Syntax

```css
/* A <number> value */
width: calc(100px * log(7.389)); /* 200px */
width: calc(100px * log(8, 2)); /* 300px */
width: calc(100px * log(625, 5)); /* 400px */
```

### Parameters

The `log(value [, base]?)` function accepts two comma-separated values as its parameters.

- `value`
    A calculation which resolves to a `<number>` greater than or equal to 0. Representing the value to be taken the log of.

- `base`
    Optional. A calculation which resolves to a `<number>` greater than or equal to 0. Representing the base of the logarithm. If not defined, the default logarithmic base `e` is used.

### Return value

The logarithm of `value`, when `base` is defined.

The natural logarithm (base `e`) of `value`, when `base` is not defined.

## Examples

### Using the `log()` function on a logarithmic scale

This example illustrates how the `log()` function can be used to visualize data values by using a logarithmic scale. The width of each bar in this example is relative to its data value on a logarithmic scale with base 10. On each element, its value is assigned to a CSS custom property named `--value`, which is then used by the `.bar` class to calculate its width.

#### HTML

```html
<div class="bar" style="--value: 50">50</div>
<div class="bar" style="--value: 100">100</div>
<div class="bar" style="--value: 500">500</div>
<div class="bar" style="--value: 10000">10,000</div>
<div class="bar" style="--value: 2000000">2,000,000</div>
```

#### CSS

```css
.bar {
  width: calc(log(var(--value), 10) * 2em);
}
```

```css
.bar {
  height: 2em;
  background-color: tomato;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0.25em 0;
}
```

#### Result

## See also

- `pow`
- `sqrt`
- `hypot`
- `exp`

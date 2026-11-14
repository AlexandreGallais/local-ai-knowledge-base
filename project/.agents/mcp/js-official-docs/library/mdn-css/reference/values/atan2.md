---
title: "`atan2()` CSS function"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/values/atan2/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `atan2()` CSS function

The **`atan2()`** CSS function is a trigonometric function that returns the inverse tangent of two values between `-infinity` and `infinity`. The function accepts two arguments and returns an `angle` between `-180deg` and `180deg`, without implying any specific unit such as radians.

## Syntax

```css
/* Two <number> values */
transform: rotate(atan2(3, 2));

/* Two <dimension> values */
transform: rotate(atan2(1rem, -0.5rem));

/* Two <percentage> values */
transform: rotate(atan2(20%, -30%));

/* Other values */
transform: rotate(atan2(pi, 45));
transform: rotate(atan2(e, 30));
```

### Parameters

The `atan2(y, x)` function accepts two comma-separated values as its parameters. Each value can be a `<number>`, a `<dimension>`, or a `<percentage>`. Both values must be of the same type, although if they are `<dimension>` they can be of different units (example: `atan2(100px, 5vw)` is valid).

- `y`
    The y-coordinate of the point. A calculation which resolves to a `<number>`, a `<dimension>`, or a `<percentage>`.
- `x`
    The x-coordinate of the point. A calculation which resolves to a `<number>`, a `<dimension>`, or a `<percentage>`.

### Return value

Given two values `x` and `y`, the function `atan2(y, x)` calculates and returns the `angle` between the positive x-axis and the ray from the origin to the point `(x, y)`.

## Examples

### Rotate elements

The `atan2()` function can be used to `rotate` elements as it returns an `angle`.

#### HTML

```html
<div class="box box-1"></div>
<div class="box box-2"></div>
<div class="box box-3"></div>
<div class="box box-4"></div>
<div class="box box-5"></div>
```

#### CSS

```css
body {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 50px;
}
```

```css
div.box {
  width: 100px;
  height: 100px;
  background: linear-gradient(orange, red);
}
div.box-1 {
  transform: rotate(atan2(3, 2));
}
div.box-2 {
  transform: rotate(atan2(3%, -2%));
}
div.box-3 {
  transform: rotate(atan2(-1, 0.5));
}
div.box-4 {
  transform: rotate(atan2(1, 0.5));
}
div.box-5 {
  transform: rotate(atan2(1rem, -0.5rem));
}
```

#### Result

## See also

- `sin`
- `cos`
- `tan`
- `asin`
- `acos`
- `atan`
- Using CSS typed arithmetic

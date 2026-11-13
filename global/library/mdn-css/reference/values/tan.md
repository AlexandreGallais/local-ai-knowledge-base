---
title: "`tan()` CSS function"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/values/tan/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `tan()` CSS function

The **`tan()`** CSS function is a trigonometric function that returns the tangent of a number, which is a value between `−infinity` and `infinity`. The function contains a single calculation that must resolve to either a `<number>` or an `angle` by interpreting the result of the argument as radians.

## Syntax

```css
/* Single <angle> values */
width: calc(100px * tan(45deg));
width: calc(100px * tan(0.125turn));
width: calc(100px * tan(0.785398163rad));

/* Single <number> values */
width: calc(100px * tan(0.5773502));
width: calc(100px * tan(1.732 - 1));

/* Other values */
width: calc(100px * tan(pi / 3));
width: calc(100px * tan(e));
```

### Parameters

The `tan(angle)` function accepts only one value as its parameter.

- `angle`
    A calculation which resolves to a `<number>` or an `angle`. When specifying unitless numbers they are interpreted as a number of radians, representing an `angle`.

### Return value

The tangent of an `angle` will always return a number between `−∞` and `+∞`.

- If `angle` is `infinity`, `-infinity`, or `NaN`, the result is `NaN`.
- If `angle` is `0⁻`, the result is `0⁻`.
- If `angle` is one of the asymptote values (such as `90deg`, `270deg`, etc.), the result is _explicitly undefined_. Authors _must not_ rely on `tan()` returning any particular value for these inputs.

## Examples

### Drawing parallelograms

The `tan()` function can be used to draw a parallelogram with a given bounding box.

#### HTML

```html
<div class="parallelogram"></div>
```

#### CSS

```css
body {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
```

```css
.parallelogram {
  --w: 400;
  --h: 200;
  --angle: 30deg;
  position: relative;
  width: calc(1px * var(--w));
  height: calc(1px * var(--h));
}
.parallelogram::before {
  content: "";
  position: absolute;
  width: calc(100% - 100% * var(--h) / var(--w) * tan(var(--angle)));
  height: 100%;
  transform-origin: 0 100%;
  transform: skewX(calc(0deg - var(--angle)));
  background-color: red;
}
```

#### Result

## See also

- `sin`
- `cos`
- `asin`
- `acos`
- `atan`
- `atan2`
- Using CSS typed arithmetic

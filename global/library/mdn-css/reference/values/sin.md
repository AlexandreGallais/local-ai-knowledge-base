---
title: "`sin()` CSS function"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/values/sin/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `sin()` CSS function

The **`sin()`** CSS function is a trigonometric function that returns the sine of a number, which is a value between `-1` and `1`. The function contains a single calculation that must resolve to either a `<number>` or an `angle` by interpreting the result of the argument as radians. That is, `sin(45deg)`, `sin(0.125turn)`, and `sin(3.14159 / 4)` all represent the same value, approximately `0.707`.

```css
transform: translateX(calc(cos(0deg) * 140px))
  translateY(calc(sin(0deg) * -140px));
```

```css
transform: translateX(calc(cos(90deg) * 140px))
  translateY(calc(sin(90deg) * -140px));
```

```css
transform: translateX(calc(cos(135deg) * 140px))
  translateY(calc(sin(135deg) * -140px));
```

```css
transform: translateX(calc(cos(180deg) * 140px))
  translateY(calc(sin(180deg) * -140px));
```

```css
transform: translateX(calc(cos(-45deg) * 140px))
  translateY(calc(sin(-45deg) * -140px));
```

```html
<div class="circle">
  <span class="dot" id="example-element"></span>
</div>
```

```css
:root {
  --radius: 140px;
  --dot-size: 10px;
}
.circle {
  display: grid;
  place-content: center;
  margin: 0 auto;
  width: calc(var(--radius) * 2);
  aspect-ratio: 1;
  border-radius: 50%;
  border: 2px solid #666666;
  background-image:
    radial-gradient(black var(--dot-size), transparent var(--dot-size)),
    linear-gradient(135deg, blue, deepskyblue, lightgreen, lavender, honeydew);
}
.dot {
  display: block;
  width: var(--dot-size);
  aspect-ratio: 1;
  border-radius: 50%;
  border: 2px solid #666666;
  background-color: #ff6666;
  transform: translateX(calc(cos(0deg) * var(--radius)))
    translateY(calc(sin(0deg) * var(--radius) * -1));
}
```

## Syntax

```css
/* Single <angle> values */
width: calc(100px * sin(45deg));
width: calc(100px * sin(0.25turn));
width: calc(100px * sin(1.0471967rad));

/* Single <number> values */
width: calc(100px * sin(63.673));
width: calc(100px * sin(2 * 0.125));

/* Other values */
width: calc(100px * sin(pi / 2));
width: calc(100px * sin(e / 4));
```

### Parameters

The `sin(angle)` function accepts only one value as its parameter.

- `angle`
    A calculation which resolves to a `<number>` or an `angle`. When specifying unitless numbers they are interpreted as a number of radians, representing an `angle`

### Return value

The sine of an `angle` will always return a number between `−1` and `1`.

- If `angle` is `infinity`, `-infinity`, or `NaN`, the result is `NaN`.
- If `angle` is `0⁻`, the result is `0⁻`.

## Examples

### Changing box sizes

In this example, `sin(30deg)` will return `0.5`, making the box have a `50px` width and a `50px` height.

```css
div {
  background-color: red;
  width: calc(sin(30deg) * 100px);
  height: calc(sin(30deg) * 100px);
}
```

### Controlling animation duration

Another use case is to control the `animation-duration`, reducing the duration based on the sine value. In this case, the animation duration will be `1s`.

```css
div {
  animation-name: myAnimation;
  animation-duration: calc(sin(0.25turn) * 1s);
}
```

## See also

- `cos`
- `tan`
- `asin`
- `acos`
- `atan`
- `atan2`

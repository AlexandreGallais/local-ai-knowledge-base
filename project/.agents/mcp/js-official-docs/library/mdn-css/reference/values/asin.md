---
title: "`asin()` CSS function"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/values/asin/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `asin()` CSS function

The **`asin()`** CSS function is a trigonometric function that returns the inverse sine of a number between `-1` and `1`. The function contains a single calculation that returns an `angle` between `-90deg` and `90deg`.

## Syntax

```css
/* Single <number> values */
transform: rotate(asin(-0.2));
transform: rotate(asin(2 * 0.125));

/* Other values */
transform: rotate(asin(pi / 5));
transform: rotate(asin(e / 3));
```

### Parameters

The `asin(number)` function accepts only one value as its parameter.

- `number`
    A calculation which resolves to a `<number>` between `-1` and `1`.

### Return value

The inverse sine of a `number` will always return an `angle` between `-90deg` and `90deg`.

- If `number` is less than `-1` or greater than `1`, the result is `NaN`.
- If `number` is `0⁻`, the result is `0⁻`.

## Examples

### Rotate elements

The `asin()` function can be used to `rotate` elements as it returns an `angle`.

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
  transform: rotate(asin(1));
}
div.box-2 {
  transform: rotate(asin(0.5));
}
div.box-3 {
  transform: rotate(asin(0));
}
div.box-4 {
  transform: rotate(asin(-0.5));
}
div.box-5 {
  transform: rotate(asin(-1));
}
```

#### Result

## See also

- `sin`
- `cos`
- `tan`
- `acos`
- `atan`
- `atan2`

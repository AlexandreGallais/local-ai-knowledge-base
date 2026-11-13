---
title: "`acos()` CSS function"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/values/acos/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `acos()` CSS function

The **`acos()`** CSS function is a trigonometric function that returns the inverse cosine of a number between `-1` and `1`. The function contains a single calculation that returns an `angle` between `0deg` and `180deg`.

## Syntax

```css
/* Single <number> values */
transform: rotate(acos(-0.2));
transform: rotate(acos(2 * 0.125));

/* Other values */
transform: rotate(acos(pi / 5));
transform: rotate(acos(e / 3));
```

### Parameters

The `acos(number)` function accepts only one value as its parameter.

- `number`
    A calculation which resolves to a `<number>` between `-1` and `1`.

### Return value

The inverse cosine of a `number` will always return an `angle` between `0deg` and `180deg`.

- If `number` is less than `-1` or greater than `1`, the result is `NaN`.
- If `number` is exactly `1`, the result is `0`.

## Examples

### Rotate elements

The `acos()` function can be used to `rotate` elements as it returns an `angle`.

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
  transform: rotate(acos(1));
}
div.box-2 {
  transform: rotate(acos(0.5));
}
div.box-3 {
  transform: rotate(acos(0));
}
div.box-4 {
  transform: rotate(acos(-0.5));
}
div.box-5 {
  transform: rotate(acos(-1));
}
```

#### Result

## See also

- `sin`
- `cos`
- `tan`
- `asin`
- `atan`
- `atan2`

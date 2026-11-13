---
title: "`atan()` CSS function"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/values/atan/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `atan()` CSS function

The **`atan()`** CSS function is a trigonometric function that returns the inverse tangent of a number between `-∞` and `+∞`. The function contains a single calculation that returns an `angle` between `-90deg` and `90deg`.

## Syntax

```css
/* Single <number> values */
transform: rotate(atan(1));
transform: rotate(atan(4 * 50));

/* Other values */
transform: rotate(atan(pi / 2));
transform: rotate(atan(e * 3));
```

### Parameters

The `atan(number)` function accepts only one value as its parameter.

- `number`
    A calculation which resolves to a `<number>` between `-∞` and `+∞`.

### Return value

The inverse tangent of a `number` will always return an `angle` between `-90deg` and `90deg`.

- If `number` is `0⁻`, the result is `0⁻`.
- If `number` is `+∞` the result is `90deg`.
- If `number` is `-∞` the result is `-90deg`.

That is:

- `atan(-infinity)` representing `-90deg`.
- `atan(-1)` representing `-45deg`
- `atan(0)` representing `0deg`
- `atan(1)` representing `45deg`
- `atan(infinity)` representing `90deg`.

## Examples

### Rotate elements

The `atan()` function can be used to `rotate` elements as it returns an `angle`.

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
  transform: rotate(atan(-99999));
}
div.box-2 {
  transform: rotate(atan(-1));
}
div.box-3 {
  transform: rotate(atan(0));
}
div.box-4 {
  transform: rotate(atan(1));
}
div.box-5 {
  transform: rotate(atan(99999));
}
```

#### Result

## See also

- `sin`
- `cos`
- `tan`
- `asin`
- `acos`
- `atan2`

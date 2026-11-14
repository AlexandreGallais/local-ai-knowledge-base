---
title: "`sign()` CSS function"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/values/sign/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `sign()` CSS function

The **`sign()`** CSS function contains one calculation, and returns `-1` if the numeric value of the argument is negative, `+1` if the numeric value of the argument is positive, `0⁺` if the numeric value of the argument is 0⁺, and `0⁻` if the numeric value of the argument is 0⁻.

> **Note:**
> While `abs` returns the absolute value of the argument, `sign()` returns the sign of the argument.

## Syntax

```css
/* property: sign( expression ) */
top: sign(20vh - 100px);
```

### Parameters

The `sign(x)` function accepts only one value as its parameter.

- `x`
    A calculation which resolves to a number.

### Return value

A number representing the sign of `A`:

- If `x` is positive, returns `1`.
- If `x` is negative, returns `-1`.
- If `x` is positive zero, returns `0`.
- If `x` is negative zero, returns `-0`.
- Otherwise, returns `NaN`.

## Examples

### Background image position

For example, in `background-position` positive percentages resolve to a negative length, and vice versa, if the background image is larger than the background area. Thus `sign(10%)` might return `1` or `-1`, depending on how the percentage is resolved! (Or even `0`, if it's resolved against a zero length.)

```css
div {
  background-position: calc(sign(10%) * 1px);
}
```

### Position direction

Another use case is to control the `position` of the element. Either a positive or a negative value.

```css
div {
  position: absolute;
  top: calc(100px * sign(var(--value)));
}
```

## See also

- `abs`
- Using CSS typed arithmetic

---
title: "`abs()` CSS function"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/values/abs/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `abs()` CSS function

The **`abs()`** CSS function returns the absolute value of the argument, as the same type as the input.

## Syntax

```css
/* abs( <calc-sum> ) */
abs(20% - 100px)
abs(var(--gradientAngle))
```

### Parameters

The `abs()` function accepts one parameter.

- `<calc-sum>`
    An expression or calculation that resolves to a `number`, a `dimension`, a `percentage` or a `calc-keyword`.

### Return value

The absolute value of `<calc-sum>`.

- If `<calc-sum>`'s numeric value is positive or `0⁺`, the function returns `<calc-sum>`.
- Otherwise, it returns `-1 * <calc-sum>`.

## Examples

### Positive variables

The `abs()` function can be used to ensure that a value is always positive. In the following example a CSS custom property `--font-size` is used as the value of `font-size`. Wrapping this custom property in `abs()` will convert a negative value to a positive one.

```css
h1 {
  font-size: abs(var(--font-size));
}
```

### Control gradient angle of direction

You can also control the gradient direction using `abs()` function. In the following example, with an angle of -45deg the gradient would start red and transition to blue. By using `abs()` to make the value positive, the gradient will start blue and transition to red.

```css
div {
  --deg: -45deg;
  background-image: linear-gradient(abs(var(--deg)), blue, red);
}
```

### Backwards compatible fallback

In browsers that lack support for CSS `abs()` function, you can use the CSS `max` function to achieve the same result:

```css
p {
  line-height: max(var(--lh), -1 * var(--lh));
}
```

We use the `max` function to return the largest (most positive) value from a list of two values: `var(--lh)` or `-1 * var(--lh)`. Irrespective of whether `--lh` is positive or negative, the calculated return value will always be positive, that is, an absolute number.

## See also

- `sign`

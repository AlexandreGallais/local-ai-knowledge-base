---
title: "`<shape>` CSS type"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/values/shape/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `<shape>` CSS type

The **`<shape>`** CSS data type defines the specific form (shape) of a region. The region represents the part of an element to which the `clip` property applies.

> **Note:**
> `<shape>` and `rect()` work in conjunction with `clip`, which has been deprecated in favor of `clip-path`. When possible, use `clip-path` and the `basic-shape` data type instead.

## Syntax

The `<shape>` data type is specified using the `rect()` function, which produces a region in the form of a rectangle.

`rect()`

```css
rect(top, right, bottom, left)
```

### Values

- _top_
    Is a `length` representing the offset for the top of the rectangle relative to the top border of the element's box.
- _right_
    Is a `length` representing the offset for the right of the rectangle relative to the left border of the element's box.
- _bottom_
    Is a `length` representing the offset for the bottom of the rectangle relative to the top border of the element's box.
- _left_
    Is a `length` representing the offset for the left of the rectangle relative to the left border of the element's box.

## Interpolation

When animated, values of the `<shape>` data type are interpolated over their `top`, `right`, `bottom`, and `left` components, each treated as a real, floating-point number. The speed of the interpolation is determined by the easing function associated with the animation.

## Example

### Example demonstrating correct use of the rect() function

```css
img.clip04 {
  clip: rect(10px, 20px, 20px, 10px);
}
```

## See also

- Related CSS property: `clip`

---
title: "<linearGradient>"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/svg/reference/element/lineargradient/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# <linearGradient>

The **`<linearGradient>`** SVG element lets authors define linear gradients to apply to other SVG elements.

## Attributes

- `gradientUnits`
    This attribute defines the coordinate system for attributes `x1`, `x2`, `y1`, `y2`
    _Value type_: `userSpaceOnUse` | `objectBoundingBox`; _Default value_: `objectBoundingBox`; _Animatable_: **yes**
- `gradientTransform`
    This attribute provides additional transformation to the gradient coordinate system.
    _Value type_: **\<transform-list>**; _Default value_: _identity transform_; _Animatable_: **yes**
- `href`
    This attribute defines a reference to another `<linearGradient>` element that will be used as a template.
    _Value type_: **\<URL>**; _Default value_: none; _Animatable_: **yes**
- `spreadMethod`
    This attribute indicates how the gradient behaves if it starts or ends inside the bounds of the shape containing the gradient.
    _Value type_: `pad` | `reflect` | `repeat`; _Default value_: `pad`; _Animatable_: **yes**
- `x1`
    This attribute defines the x coordinate of the starting point of the vector gradient along which the linear gradient is drawn.
    _Value type_: **\<length>**; _Default value_: `0%`; _Animatable_: **yes**
- `x2`
    This attribute defines the x coordinate of the ending point of the vector gradient along which the linear gradient is drawn.
    _Value type_: **\<length>**; _Default value_: `100%`; _Animatable_: **yes**
- `xlink:href` (deprecated)
    An \<IRI> reference to another `<linearGradient>` element that will be used as a template.
    _Value type_: **\<IRI>**; _Default value_: none; _Animatable_: **yes**
- `y1`
    This attribute defines the y coordinate of the starting point of the vector gradient along which the linear gradient is drawn.
    _Value type_: **\<length>**; _Default value_: `0%`; _Animatable_: **yes**
- `y2`
    This attribute defines the y coordinate of the ending point of the vector gradient along which the linear gradient is drawn.
    _Value type_: **\<length>**; _Default value_: `0%`; _Animatable_: **yes**

## DOM Interface

This element implements the `SVGLinearGradientElement` interface.

## Example

### Basic <example-value> gradient

```css
html,
body,
svg {
  height: 100%;
}
```

```html
<svg
  viewBox="0 0 10 10"
  xmlns="http://www.w3.org/2000/svg"
  xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="myGradient" gradientTransform="rotate(90)">
      <stop offset="5%" stop-color="gold" />
      <stop offset="95%" stop-color="red" />
    </linearGradient>
  </defs>

  <!-- using my linear gradient -->
  <circle cx="5" cy="5" r="4" fill="url('#myGradient')" />
</svg>
```

### Repeating angled gradient

In this example, the two `<rect>` elements have different aspect ratios, but the angle of the gradient is the same.

```css
html,
body,
svg {
  height: 100%;
}
```

```html
<svg
  viewBox="0 0 500 500"
  xmlns="http://www.w3.org/2000/svg"
  xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient
      id="grad"
      x1="0"
      y1="0"
      x2="20"
      y2="20"
      spreadMethod="repeat"
      gradientUnits="userSpaceOnUse">
      <stop offset="50%" stop-color="red" />
      <stop offset="50%" stop-color="gold" />
    </linearGradient>
  </defs>
  <rect width="100%" height="25%" fill="url(#grad)" />
  <rect width="100%" height="65%" fill="url(#grad)" y="30%" />
</svg>
```

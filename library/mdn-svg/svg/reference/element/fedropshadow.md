---
title: "<feDropShadow>"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/svg/reference/element/fedropshadow/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# <feDropShadow>

The **`<feDropShadow>`** SVG filter primitive creates a drop shadow of the input image. It can only be used inside a `<filter>` element.

> **Note:**
> The drop shadow color and opacity can be changed by using the `flood-color` and `flood-opacity` presentation attributes.

Like other filter primitives, it handles color components in the `linearRGB` color space by default. You can use `color-interpolation-filters` to use `sRGB` instead.

## Attributes

- `dx`: This attribute defines the x offset of the drop shadow.
  _Value type_: **\<number>**; _Default value_: `2`; _Animatable_: **yes**
- `dy`: This attribute defines the y offset of the drop shadow.
  _Value type_: **\<number>**; _Default value_: `2`; _Animatable_: **yes**
- `in`
- `stdDeviation`: This attribute defines the standard deviation for the blur operation in the drop shadow.
  _Value type_: **\<number-optional-number>**; _Default value_: `2`; _Animatable_: **yes**
- Filter primitive attributes: `x`, `y`, `width`, `height`, `result`

## DOM Interface

This element implements the `SVGFEDropShadowElement` interface.

## Example

```css
html,
body,
svg {
  height: 100%;
}
```

```html
<svg viewBox="0 0 30 10" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <filter id="shadow">
      <feDropShadow dx="0.2" dy="0.4" stdDeviation="0.2" />
    </filter>
    <filter id="shadow2">
      <feDropShadow dx="0" dy="0" stdDeviation="0.5" flood-color="cyan" />
    </filter>
    <filter id="shadow3">
      <feDropShadow
        dx="-0.8"
        dy="-0.8"
        stdDeviation="0"
        flood-color="pink"
        flood-opacity="0.5" />
    </filter>
  </defs>

  <circle cx="5" cy="50%" r="4" fill="pink" filter="url(#shadow)" />
  <circle cx="15" cy="50%" r="4" fill="pink" filter="url(#shadow2)" />
  <circle cx="25" cy="50%" r="4" fill="pink" filter="url(#shadow3)" />
</svg>
```

## See also

- SVG Filter primitive attributes including `height`, `in`, `result`, `x`, `y`, and `width`.
- SVG presentation attributes, including `flood-color`, and `flood-opacity`.

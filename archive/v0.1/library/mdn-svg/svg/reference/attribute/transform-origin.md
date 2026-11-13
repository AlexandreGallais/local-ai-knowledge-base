---
title: "transform-origin"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/svg/reference/attribute/transform-origin/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# transform-origin

The **`transform-origin`** SVG attribute sets the origin for an item's transformations.

You can use this attribute with any SVG element.

> **Note:**
> As a presentation attribute, `transform-origin` also has a CSS property counterpart: `transform-origin`. When both are specified, the CSS property takes priority.

## Examples

The following examples demonstrate the rotation of a rectangular box 30° around a number of different `transform-origin`s.
The SVG is declared in each case with the original box drawn with a dashed red outline, followed by the rotated box drawn in lime, and then the `transform-origin` drawn as a red crosshair marker.

### Default transform-origin

By default, `transform-origin` has a value of `0 0`, which places it at the origin of the `viewBox`. Below, we extend the `viewBox` to negative values, so you can see the full crosshair marker, and also note that it may not always be the top-left corner of the `` element.

```html
<svg
  viewBox="-10 -10 300 300"
  xmlns="http://www.w3.org/2000/svg"
  width="310"
  height="310">
  <rect
    x="60"
    y="10"
    width="180"
    height="180"
    fill="none"
    stroke="red"
    stroke-width="3"
    stroke-dasharray="3 3" />
  <rect
    x="60"
    y="10"
    width="180"
    height="180"
    fill="lime"
    opacity="0.5"
    transform="rotate(30)" />
  <g transform="translate(0 0)">
    <circle cx="0" cy="0" r="3" fill="red" opacity="0.5" />
    <path d="M -8 0 h 16 m -8 -8 v 16" fill="none" stroke="red" />
    <circle cx="0" cy="0" r="6" fill="none" stroke="red" />
  </g>
</svg>
```

### Center transform-origin

Below, we set `transform-origin` to `center`, which places the origin at the center of the `viewBox`, but not the center of the element that's being transformed.

```html
<svg
  viewBox="-10 -10 300 300"
  xmlns="http://www.w3.org/2000/svg"
  width="310"
  height="310">
  <rect
    x="60"
    y="10"
    width="180"
    height="180"
    fill="none"
    stroke="red"
    stroke-width="3"
    stroke-dasharray="3 3" />
  <rect
    x="60"
    y="10"
    width="180"
    height="180"
    fill="lime"
    opacity="0.5"
    transform="rotate(30)"
    transform-origin="center" />
  <g transform="translate(150 150)">
    <circle cx="0" cy="0" r="3" fill="red" opacity="0.5" />
    <path d="M -8 0 h 16 m -8 -8 v 16" fill="none" stroke="red" />
    <circle cx="0" cy="0" r="6" fill="none" stroke="red" />
  </g>
</svg>
```

### transform-origin relative to the transformed element

To make `transform-origin` relative to the transformed element, you can use the `transform-box` property. Below, we set `transform-box` to `fill-box`, which makes the `transform-origin` relative to the bounding box of the element being transformed.

```html
<svg
  viewBox="-10 -10 300 300"
  xmlns="http://www.w3.org/2000/svg"
  width="310"
  height="310">
  <rect
    x="60"
    y="10"
    width="180"
    height="180"
    fill="none"
    stroke="red"
    stroke-width="3"
    stroke-dasharray="3 3" />
  <rect
    class="transformed-elem"
    x="60"
    y="10"
    width="180"
    height="180"
    fill="lime"
    opacity="0.5"
    transform="rotate(30)"
    transform-origin="center" />
  <g transform="translate(150 100)">
    <circle cx="0" cy="0" r="3" fill="red" opacity="0.5" />
    <path d="M -8 0 h 16 m -8 -8 v 16" fill="none" stroke="red" />
    <circle cx="0" cy="0" r="6" fill="none" stroke="red" />
  </g>
</svg>
```

```css
.transformed-elem {
  transform-box: fill-box;
}
```

See CSS `transform-origin` for more examples.

## Usage notes

       | Values
       | See `transform-origin`

       | Default value
       | `0 0`

       | Animatable
       | Yes

> **Note:**
> The default value of `transform-origin` is `0 0` for all SVG elements except for root `` elements and `` elements that are a direct child of a `foreignObject`. These elements have `transform-origin: 50% 50%`, as in normal CSS.

Specified lengths, percentages, and keywords (`left`, `center`, `right`, `top`, and `bottom`) are all relative to the reference box. Because the default value for `transform-box` is `view-box`, the transform origin coordinates are relative to the `viewBox` of the SVG element, unless the element itself has an associated CSS layout box.

## See also

- CSS `transform-origin` property

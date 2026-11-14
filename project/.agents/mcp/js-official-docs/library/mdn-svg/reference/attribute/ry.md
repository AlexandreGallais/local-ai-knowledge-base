---
title: "ry"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/svg/reference/attribute/ry/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ry

The **`ry`** attribute defines a radius on the y-axis.

You can use this attribute with the following SVG elements:

- `<ellipse>`
- `<rect>`

## ellipse

For `<ellipse>`, `ry` defines the y-radius of the shape. With a value lower or equal to zero the ellipse won't be drawn at all.

       | Value
       |
        &#x3C;length>
        |
        &#x3C;percentage>
        | `auto`

       | Default value
       | `auto`

       | Animatable
       | Yes

> **Note:**
> The y-radius of the `<ellipse>` can also be defined with the `ry` _geometry property_. If set in CSS, the `ry` property value overrides the `ry` attribute value.

## rect

For `<rect>`, `ry` defines the y-axis radius of the ellipse used to round off the corners of the rectangle.

The way the value of the `ry` attribute is interpreted depend on both the `rx` attribute and the width of the rectangle:

- If a properly specified value is provided for `ry` but not for `rx` (or the opposite), then the browser will consider the missing value equal to the defined one.
- If neither `ry` nor `rx` has a properly specified value, then the browser will draw a rectangle with square corners.
- If `ry` is greater than half of the width of the rectangle, then the browser will consider the value for `ry` as half of the width of the rectangle.

       | Value
       |
        &#x3C;length>
        |
        &#x3C;percentage>
        | `auto`

       | Default value
       | `auto`

       | Animatable
       | Yes

> **Note:**
> The vertical curve of the corners of the `<rect>` can also be defined with the `ry` _geometry property_. If set in CSS, the `ry` property value overrides the `ry` attribute value.

## Example

```css
html,
body,
svg {
  height: 100%;
}
```

```html
<svg viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg">
  <ellipse cx="50" cy="50" ry="0" rx="25" />
  <ellipse cx="150" cy="50" ry="25" rx="25" />
  <ellipse cx="250" cy="50" ry="50" rx="25" />

  <rect x="20" y="120" width="60" height="60" ry="0" rx="15" />
  <rect x="120" y="120" width="60" height="60" ry="15" rx="15" />
  <rect x="220" y="120" width="60" height="60" ry="150" rx="15" />
</svg>
```

## See also

- CSS `ry` property

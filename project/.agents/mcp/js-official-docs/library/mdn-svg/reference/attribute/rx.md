---
title: "rx"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/svg/reference/attribute/rx/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# rx

The **`rx`** attribute defines a radius on the x-axis.

You can use this attribute with the following SVG elements:

- `<ellipse>`
- `<rect>`

## ellipse

For `<ellipse>`, `rx` defines the x-radius of the shape. With a value lower or equal to zero the ellipse won't be drawn at all.

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
> The x-radius of the `<ellipse>` can also be defined with the `rx` _geometry property_. If set in CSS, the `rx` property value overrides the `rx` attribute value.

## rect

For `<rect>`, `rx` defines the x-axis radius of the ellipse used to round off the corners of the rectangle.

The way the value of the `rx` attribute is interpreted depend on both the `ry` attribute and the width of the rectangle:

- If a properly specified value is provided for `rx` but not for `ry` (or the opposite), then the browser will consider the missing value equal to the defined one.
- If neither `rx` nor `ry` has a properly specified value, then the browser will draw a rectangle with square corners.
- If `rx` is greater than half of the width of the rectangle, then the browser will consider the value for `rx` as half of the width of the rectangle.

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
> The horizontal curve of the corners of the `<rect>` can also be defined with the `rx` _geometry property_. If set in CSS, the `rx` property value overrides the `rx` attribute value.

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
  <ellipse cx="50" cy="50" rx="0" ry="25" />
  <ellipse cx="150" cy="50" rx="25" ry="25" />
  <ellipse cx="250" cy="50" rx="50" ry="25" />

  <rect x="20" y="120" width="60" height="60" rx="0" ry="15" />
  <rect x="120" y="120" width="60" height="60" rx="15" ry="15" />
  <rect x="220" y="120" width="60" height="60" rx="150" ry="15" />
</svg>
```

## See also

- CSS `rx` property

---
title: "flood-opacity"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/svg/reference/attribute/flood-opacity/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# flood-opacity

The **`flood-opacity`** attribute indicates the opacity value to use across the current filter primitive subregion.

> **Note:**
> As a presentation attribute, `flood-opacity` also has a CSS property counterpart: `flood-opacity`. When both are specified, the CSS property takes priority.

You can use this attribute with the following SVG elements:

- `<feFlood>` and `<feDropShadow>`

## Example

```css
html,
body,
svg {
  height: 100%;
}
```

```html
<svg viewBox="0 0 420 200" xmlns="http://www.w3.org/2000/svg">
  <filter id="flood1">
    <feFlood
      flood-color="seagreen"
      flood-opacity="1"
      x="0"
      y="0"
      width="200"
      height="200" />
  </filter>
  <filter id="flood2">
    <feFlood
      flood-color="seagreen"
      flood-opacity="0.3"
      x="0"
      y="0"
      width="200"
      height="200" />
  </filter>

  <rect x="0" y="0" width="200" height="200" filter="url(#flood1)" />
  <rect x="220" y="0" width="200" height="200" filter="url(#flood2)" />
</svg>
```

## Usage notes

       | Value
       | `&#x3C;alpha-value>`

       | Initial value
       | `1`

       | Animatable
       | Yes

- `<alpha-value>`
    A number or percentage indicating the opacity value to use across the current filter primitive subregion.
    A number of `0` or a percentage of `0%` represents a fully transparent color, `1` or `100%` represents a fully opaque color.

## See also

- CSS `flood-opacity` property
- `flood-color`

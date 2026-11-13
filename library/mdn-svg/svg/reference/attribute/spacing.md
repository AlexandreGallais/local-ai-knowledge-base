---
title: "spacing"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/svg/reference/attribute/spacing/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# spacing

The **`spacing`** attribute indicates how the user agent should determine the spacing between typographic characters that are to be rendered along a path.

You can use this attribute with the following SVG elements:

- `<textPath>`

## Usage notes

       | Value
       | `auto` | `exact`

       | Default value
       | `exact`

       | Animatable
       | Yes

- `auto`
    This value indicates that the user agent should use text-on-a-path layout algorithms to adjust the spacing between typographic characters in order to achieve visually appealing results.
- `exact`
    This value indicates that the typographic characters should be rendered exactly according to the spacing rules as specified by the layout rules for text-on-a-path.

## See also

- `SVGTextPathElement.spacing`

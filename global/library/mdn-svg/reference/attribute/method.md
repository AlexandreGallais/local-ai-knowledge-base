---
title: "method"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/svg/reference/attribute/method/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# method

The **`method`** attribute indicates the method by which text should be rendered along the path of a `<textPath>` element.

You can use this attribute with the following SVG elements:

- `<textPath>`

## textPath

For `<textPath>`, `method` indicates the method by which text should be rendered along the path.

       | Value
       | `align` | `stretch`

       | Default value
       | `align`

       | Animatable
       | Yes

- align
    This value indicates that the characters should be rendered so that they are not stretched or warped. The characters are rotated, scaled and translated when they are rendered. As a result, for fonts with connected characters (e.g., cursive fonts), the connections may not align properly when text is rendered along the path.
- stretch
    This value indicates that the character outlines will be converted into paths, and then stretched and possibly warped. With this approach, connected characters, such as in cursive fonts, will maintain their connections.

## See also

- `SVGTextPathElement.method`

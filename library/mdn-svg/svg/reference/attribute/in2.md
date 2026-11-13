---
title: "in2"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/svg/reference/attribute/in2/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# in2

The **`in2`** attribute identifies the second input for the given filter primitive. It works exactly like the `in` attribute.

You can use this attribute with the following SVG elements:

- `<feBlend>`
- `<feComposite>`
- `<feDisplacementMap>`

## feBlend

For `<feBlend>`, `in2` defines the second input image to the blending operation.

       | Value
       |
        `SourceGraphic` | `SourceAlpha` |
        `BackgroundImage` | `BackgroundAlpha` |
        `FillPaint` | `StrokePaint` |
        `&#x3C;filter-primitive-reference>`

       | Default value
       |
        `SourceGraphic` for first filter primitive, otherwise result
        of previous filter primitive

       | Animatable
       | Yes

## feComposite

For `<feComposite>`, `in2` defines the second input image to the compositing operation.

       | Value
       |
        `SourceGraphic` | `SourceAlpha` |
        `BackgroundImage` | `BackgroundAlpha` |
        `FillPaint` | `StrokePaint` |
        `&#x3C;filter-primitive-reference>`

       | Default value
       |
        `SourceGraphic` for first filter primitive, otherwise result
        of previous filter primitive

       | Animatable
       | Yes

## feDisplacementMap

For `<feDisplacementMap>`, `in2` defines the second input image, which is used to displace the pixels in the image defined in the `in` attribute.

       | Value
       |
        `SourceGraphic` | `SourceAlpha` |
        `BackgroundImage` | `BackgroundAlpha` |
        `FillPaint` | `StrokePaint` |
        `&#x3C;filter-primitive-reference>`

       | Default value
       |
        `SourceGraphic` for first filter primitive, otherwise result
        of previous filter primitive

       | Animatable
       | Yes

---
title: "type"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/svg/reference/attribute/type/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# type

The `type` attribute is a generic attribute and it has different meaning based on the context in which it's used.

- For the `<animateTransform>` element, it defines the type of transformation, whose values change over time.
- For the `<feColorMatrix>` element, it indicates the type of matrix operation. The keyword `matrix` indicates that a full 5x4 matrix of values will be provided. The other keywords represent convenience shortcuts to allow commonly used color operations to be performed without specifying a complete matrix.
- For the `<feFuncR>`, `<feFuncG>`, `<feFuncB>`, and `<feFuncA>` elements, it Indicates the type of component transfer function.
- For the `<feTurbulence>` element, it indicates whether the filter primitive should perform a noise or turbulence function.
- For the `<style>` and `<script>` elements, it defines the content type of the element.

You can use this attribute with the following SVG elements:

- `<animateTransform>`
- `<feColorMatrix>`
- `<feFuncA>`
- `<feFuncB>`
- `<feFuncG>`
- `<feFuncR>`
- `<feTurbulence>`
- `<script>`
- `<style>`

## Usage notes

### For the <animateTransform> elements

SVG element: `<animateTransform>`

       | Categories
       | None

       | Value
       |
        `translate` | `scale` |
        `rotate` | `skewX` | `skewY`

       | Animatable
       | No

       | Normative document
       |
        Scalable Vector Graphics (SVG) 2

### For the <feColorMatrix> element

SVG element: `<feColorMatrix>`

       | Categories
       | None

       | Value
       |
        `matrix` | `saturate` |
        `hueRotate` | `luminanceToAlpha`

       | Animatable
       | Yes

       | Normative document
       |
        Filter Effects Module Level 1

### For the <feFuncR>, <feFuncG>, <feFuncB>, and <feFuncA> elements

SVG elements: `<feFuncR>`, `<feFuncG>`, `<feFuncB>`, `<feFuncA>`

       | Categories
       | None

       | Value
       |
        `identity` | `table` | `discrete` |
        `linear` | `gamma`

       | Animatable
       | Yes

       | Normative document
       |
        Filter Effects Module Level 1

### For the <feTurbulence> element

SVG element: `<feTurbulence>`

       | Categories
       | None

       | Value
       |
        `fractalNoise` | `turbulence`

       | Animatable
       | Yes

       | Normative document
       |
        Filter Effects Module Level 1

### For the <style> and <script> elements

SVG elements: `<style>`, `<script>`

       | Categories
       | None

       | Value
       | &#x3C;media-type>

       | Animatable
       | No

       | Normative document
       |
        Scalable Vector Graphics (SVG) 2Scalable Vector Graphics (SVG) 2

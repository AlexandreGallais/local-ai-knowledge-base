---
title: "radius"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/svg/reference/attribute/radius/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# radius

The **`radius`** attribute represents the radius (or radii) for the operation on a given `<feMorphology>` filter primitive.

If two numbers are provided, the first number represents the x-radius and the second one the y-radius. If one number is provided, then that value is used for both x and y. The values are in the coordinate system established by the `primitiveUnits` attribute on the `<filter>` element.

A negative or zero value disables the effect of the given filter primitive (i.e., the result is the filter input image).

You can use this attribute with the following SVG elements:

- `<feMorphology>`

## Usage notes

       | Value
       |
        &#x3C;number-optional-number>

       | Default value
       | `0`

       | Animatable
       | Yes

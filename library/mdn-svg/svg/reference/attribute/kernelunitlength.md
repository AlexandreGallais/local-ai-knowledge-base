---
title: "kernelUnitLength"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/svg/reference/attribute/kernelunitlength/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# kernelUnitLength

The **`kernelUnitLength`** attribute has two meanings based on the context it's used in. For lighting filter primitives, it indicates the intended distance for the x and y coordinates, for `<feConvolveMatrix>`, it indicates the intended distance between successive columns and rows in the kernel matrix.

You can use this attribute with the following SVG elements:

- `<feConvolveMatrix>`
- `<feDiffuseLighting>`
- `<feSpecularLighting>`

## feConvolveMatrix

For the `<feConvolveMatrix>`, `kernelUnitLength` indicates the intended distance in current filter units (i.e., units as determined by the value of `primitiveUnits` attribute) between successive columns and rows, respectively, in the `kernelMatrix`. By specifying value(s) for `kernelUnitLength`, the kernel becomes defined in a scalable, abstract coordinate system. If the attribute is not specified, the default value is one pixel in the offscreen bitmap, which is a pixel-based coordinate system, and thus potentially not scalable.

If a negative or zero value is specified the default value will be used instead.

       | Value
       |
        <code
          >&#x3C;number-optional-number></code
        >

       | Default value
       | Pixel in offscreen bitmap

       | Animatable
       | Yes

- `<number-optional-number>`
    The first number is the x value. The second number is the y value. If the x value is not specified, it defaults to the same value as x.

## feDiffuseLighting

For the `<feDiffuseLighting>`, `kernelUnitLength` indicates the intended distance in current filter units (i.e., units as determined by the value of attribute `primitiveUnits`) for the x and y coordinate, respectively, in the surface normal calculation formulas.

The first number is the x value. The second number is the y value. If the y value is not specified, it defaults to the same value as x. By specifying value(s) for `kernelUnitLength`, the kernel becomes defined in a scalable, abstract coordinate system. If the attribute is not specified, the x and y values represent very small deltas relative to a given position, which might be implemented in some cases as one pixel in the intermediate image offscreen bitmap, which is a pixel-based coordinate system, and thus potentially not scalable.

If a negative or zero value is specified the default value will be used instead.

       | Value
       |
        <code
          >&#x3C;number-optional-number></code
        >

       | Default value
       | Pixel in offscreen bitmap

       | Animatable
       | Yes

## feSpecularLighting

For the `<feSpecularLighting>`, `kernelUnitLength` indicates the intended distance in current filter units (i.e., units as determined by the value of attribute `primitiveUnits`) for the x and y coordinate, respectively, in the surface normal calculation formulas.

The first number is the x value. The second number is the y value. If the y value is not specified, it defaults to the same value as x. By specifying value(s) for `kernelUnitLength`, the kernel becomes defined in a scalable, abstract coordinate system. If the attribute is not specified, the x and y values represent very small deltas relative to a given position, which might be implemented in some cases as one pixel in the intermediate image offscreen bitmap, which is a pixel-based coordinate system, and thus potentially not scalable.

If a negative or zero value is specified the default value will be used instead.

       | Value
       |
        <code
          >&#x3C;number-optional-number></code
        >

       | Default value
       | Pixel in offscreen bitmap

       | Animatable
       | Yes

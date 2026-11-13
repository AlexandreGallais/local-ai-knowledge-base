---
title: "SVGTransform"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/svgtransform/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SVGTransform

The **`SVGTransform`** interface reflects one of the component transformations within an `SVGTransformList`; thus, an `SVGTransform` object corresponds to a single component (e.g., `scale(…)` or `matrix(…)`) within a `transform` attribute.

An `SVGTransform` object can be designated as read only, which means that attempts to modify the object will result in an exception being thrown.

## Static properties

- `SVG_TRANSFORM_UNKNOWN` (0)
    The unit type is not one of predefined unit types. It is invalid to attempt to define a new value of this type or to attempt to switch an existing value to this type.
- `SVG_TRANSFORM_MATRIX` (1)
    A `matrix(…)` transformation.
- `SVG_TRANSFORM_TRANSLATE` (2)
    A `translate(…)` transformation.
- `SVG_TRANSFORM_SCALE` (3)
    A `scale(…)` transformation.
- `SVG_TRANSFORM_ROTATE` (4)
    A `rotate(…)` transformation.
- `SVG_TRANSFORM_SKEWX` (5)
    A `skewx(…)` transformation.
- `SVG_TRANSFORM_SKEWY` (6)
    A `skewy(…)` transformation.

## Instance properties

- `type` (read-only)
    The type of the value as specified by one of the `SVG_TRANSFORM_*` constants defined on this interface.
- `angle` (read-only)
    The angle as a floating point value. A convenience attribute for `SVG_TRANSFORM_ROTATE`, `SVG_TRANSFORM_SKEWX` and `SVG_TRANSFORM_SKEWY`. For `SVG_TRANSFORM_MATRIX`, `SVG_TRANSFORM_TRANSLATE` and `SVG_TRANSFORM_SCALE`, `angle` will be zero.
- `matrix` (read-only)
    The matrix as a `DOMMatrix` that represents this transformation. The matrix object is live, meaning that any changes made to the `SVGTransform` object are immediately reflected in the matrix object and vice versa. In case the matrix object is changed directly (i.e., without using the methods on the `SVGTransform` interface itself) then the type of the `SVGTransform` changes to `SVG_TRANSFORM_MATRIX`.

## Instance methods

- `setMatrix()`
    Sets the transform type to `SVG_TRANSFORM_MATRIX`, with parameter matrix defining the new transformation. Note that the values from the parameter `matrix` are copied.
- `setTranslate()`
    Sets the transform type to `SVG_TRANSFORM_TRANSLATE`, with parameters `tx` and `ty` defining the translation amounts.
- `setScale()`
    Sets the transform type to `SVG_TRANSFORM_SCALE`, with parameters `sx` and `sy` defining the scale amounts.
- `setRotate()`
    Sets the transform type to `SVG_TRANSFORM_ROTATE`, with parameter `angle` defining the rotation angle and parameters `cx` and `cy` defining the optional center of rotation.
- `setSkewX()`
    Sets the transform type to `SVG_TRANSFORM_SKEWX`, with parameter `angle` defining the amount of skew.
- `setSkewY()`
    Sets the transform type to `SVG_TRANSFORM_SKEWY`, with parameter `angle` defining the amount of skew.

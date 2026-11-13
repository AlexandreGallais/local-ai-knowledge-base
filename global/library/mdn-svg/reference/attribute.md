---
title: "SVG Attribute reference"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/svg/reference/attribute/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SVG Attribute reference

SVG elements can be modified using attributes that modify how the element is handled or rendered.

Below is a list of all of the attributes available in SVG, along with links to reference documentation to help you learn which elements support them and how they work.

## SVG attributes A to Z

### A

- `accumulate`
- `additive`
- `alignment-baseline`
- `amplitude`
- `attributeName`
- `attributeType`
- `autofocus`
- `azimuth`

### B

- `baseFrequency`
- `baseline-shift`
- `baseProfile`
- `begin`
- `bias`
- `by`

### C

- `calcMode`
- `class`
- `clip`
- `clipPathUnits`
- `clip-path`
- `clip-rule`
- `color`
- `color-interpolation`
- `color-interpolation-filters`
- `crossorigin`
- `cursor`
- `cx`
- `cy`

### D

- `d`
- `data-*`
- `decoding`
- `diffuseConstant`
- `direction`
- `display`
- `divisor`
- `dominant-baseline`
- `dur`
- `dx`
- `dy`

### E

- `edgeMode`
- `elevation`
- `end`
- `exponent`

### F

- `fetchpriority`
- `fill`
- `fill-opacity`
- `fill-rule`
- `filter`
- `filterUnits`
- `flood-color`
- `flood-opacity`
- `font-family`
- `font-size`
- `font-size-adjust`
- `font-stretch`
- `font-style`
- `font-variant`
- `font-weight`
- `font-width`
- `fr`
- `from`
- `fx`
- `fy`

### G

- `glyph-orientation-horizontal`
- `glyph-orientation-vertical`
- `gradientTransform`
- `gradientUnits`

### H

- `height`
- `href`
- `hreflang`

### I

- `id`
- `image-rendering`
- `in`
- `in2`
- `intercept`

### K

- `k1`
- `k2`
- `k3`
- `k4`
- `kernelMatrix`
- `kernelUnitLength`
- `keyPoints`
- `keySplines`
- `keyTimes`

### L

- `lang`
- `lengthAdjust`
- `letter-spacing`
- `lighting-color`
- `limitingConeAngle`

### M

- `marker-end`
- `marker-mid`
- `marker-start`
- `markerHeight`
- `markerUnits`
- `markerWidth`
- `mask`
- `maskContentUnits`
- `maskUnits`
- `max`
- `media`
- `method`
- `min`
- `mode`

### N

- `numOctaves`

### O

- `offset`
- `opacity`
- `operator`
- `order`
- `orient`
- `origin`
- `overflow`

### P

- `paint-order`
- `path`
- `pathLength`
- `patternContentUnits`
- `patternTransform`
- `patternUnits`
- `ping`
- `pointer-events`
- `points`
- `pointsAtX`
- `pointsAtY`
- `pointsAtZ`
- `preserveAlpha`
- `preserveAspectRatio`
- `primitiveUnits`

### R

- `r`
- `radius`
- `referrerpolicy`
- `refX`
- `refY`
- `rel`
- `repeatCount`
- `repeatDur`
- `requiredExtensions`
- `requiredFeatures`
- `restart`
- `result`
- `rotate`
- `rx`
- `ry`

### S

- `scale`
- `seed`
- `shape-rendering`
- `side`
- `slope`
- `spacing`
- `specularConstant`
- `specularExponent`
- `spreadMethod`
- `startOffset`
- `stdDeviation`
- `stitchTiles`
- `stop-color`
- `stop-opacity`
- `stroke`
- `stroke-dasharray`
- `stroke-dashoffset`
- `stroke-linecap`
- `stroke-linejoin`
- `stroke-miterlimit`
- `stroke-opacity`
- `stroke-width`
- `style`
- `surfaceScale`
- `systemLanguage`

### T

- `tabindex`
- `tableValues`
- `target`
- `targetX`
- `targetY`
- `text-anchor`
- `text-decoration`
- `text-overflow`
- `text-rendering`
- `textLength`
- `title`
- `to`
- `transform`
- `transform-origin`
- `type`

### U

- `unicode-bidi`

### V

- `values`
- `vector-effect`
- `version`
- `viewBox`
- `visibility`

### W

- `white-space`
- `width`
- `word-spacing`
- `writing-mode`

### X

- `x`
- `x1`
- `x2`
- `xChannelSelector`
- `xlink:actuate`
- `xlink:arcrole`
- `xlink:href` (deprecated)
- `xlink:role`
- `xlink:show`
- `xlink:title`
- `xlink:type`
- `xml:lang`
- `xml:space`

### Y

- `y`
- `y1`
- `y2`
- `yChannelSelector`

### Z

- `z`
- `zoomAndPan`

## SVG attributes by category

### Core attributes

The core attributes are global attributes.

- `autofocus`
- `id`
- `class`
- `style`
- `lang`
- `tabindex`
- `xml:lang`
- `xml:space`

### Conditional processing attributes

The conditional processing attributes control whether the elements they are set on are processed.

- `requiredExtensions`
- `requiredFeatures`
- `systemLanguage`

### XLink attributes

The XLink attributes can reference resources.

- `xlink:href` (deprecated)
- `xlink:type` (deprecated)
- `xlink:role` (deprecated)
- `xlink:arcrole` (deprecated)
- `xlink:title` (deprecated)
- `xlink:show` (deprecated)
- `xlink:actuate` (deprecated)

### Presentation attributes

SVG presentation attributes are SVG attributes that can also be used as CSS properties on SVG elements.
They set CSS property values on an element with a specificity of `0`, so other author styles in a stylesheet or `style` attribute can override them.
Presentation attribute values are parsed as CSS values, not declarations, so they cannot contain `!important`.

Most presentation attributes inherit when used as CSS properties (for example, `fill` and `stroke`).
Geometry properties are the main exception: their CSS counterparts do not inherit.

- `alignment-baseline`
- `baseline-shift`
- `clip`
- `clip-path`
- `clip-rule`
- `color`
- `color-interpolation`
- `color-interpolation-filters`
- `cursor`
- `cx`
- `cy`
- `d`
- `direction`
- `display`
- `dominant-baseline`
- `fill`
- `fill-opacity`
- `fill-rule`
- `filter`
- `flood-color`
- `flood-opacity`
- `font-family`
- `font-size`
- `font-size-adjust`
- `font-stretch`
- `font-style`
- `font-variant`
- `font-weight`
- `font-width`
- `glyph-orientation-horizontal`
- `glyph-orientation-vertical`
- `height`
- `image-rendering`
- `letter-spacing`
- `lighting-color`
- `marker-end`
- `marker-mid`
- `marker-start`
- `mask`
- `mask-type`
- `opacity`
- `overflow`
- `pathLength`
- `pointer-events`
- `r`
- `rx`
- `ry`
- `shape-rendering`
- `stop-color`
- `stop-opacity`
- `stroke`
- `stroke-dasharray`
- `stroke-dashoffset`
- `stroke-linecap`
- `stroke-linejoin`
- `stroke-miterlimit`
- `stroke-opacity`
- `stroke-width`
- `text-anchor`
- `text-decoration`
- `text-overflow`
- `text-rendering`
- `transform`
- `transform-origin`
- `unicode-bidi`
- `vector-effect`
- `visibility`
- `width`
- `white-space`
- `word-spacing`
- `writing-mode`
- `x`
- `y`

#### Geometry properties

Geometry properties describe the position and dimensions of SVG shapes.
In SVG 2, they are a defined subset of presentation attributes whose CSS counterparts do not inherit.

Each geometry property applies as a presentation attribute only on certain elements.
For example, `r` defines the radius of a `<circle>`, but has no effect on elements such as `<rect>`.

The SVG geometry properties are:

- `cx`
- `cy`
- `d`
- `r`
- `rx`
- `ry`
- `x`
- `y`
- `width`
- `height`

For element-by-element applicability, see each property's attribute page and the list on the `` element page.

### Filters attributes

- Filter primitive attributes (presentation attributes)
    `height`, `result`, `width`, `x`, `y`
- Transfer function attributes
    `type`, `tableValues`, `slope`, `intercept`, `amplitude`, `exponent`, `offset`

### Animation attributes

- Animation target element attributes
    `href`
- Animation attribute target attributes
    `attributeType`, `attributeName`
- Animation timing attributes
    `begin`, `dur`, `end`, `min`, `max`, `restart`, `repeatCount`, `repeatDur`, `fill`
- Animation value attributes
    `calcMode`, `values`, `keyTimes`, `keySplines`, `from`, `to`, `by`
- Animation addition attributes
    `additive`, `accumulate`

### Event attributes

All HTML and SVG elements support event handler attributes defined on the `GlobalEventHandlers` mixin.

While event handler attributes, like `onblur` and `onauxclick`, apply to all elements, they may not have any effect. For example, the `oncuechange` attribute can be applied to any element, but it is only relevant to the `<track>` element.

Event handler attributes are discouraged, considered unsafe, and may be blocked by content security policies (CSP). Use the event name within an `addEventListener()` method instead.

## See also

- SVG element reference
- SVG Tutorial
- SVG interface reference

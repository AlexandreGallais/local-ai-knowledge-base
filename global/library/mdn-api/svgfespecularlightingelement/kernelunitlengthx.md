---
title: "SVGFESpecularLightingElement: kernelUnitLengthX property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/svgfespecularlightingelement/kernelunitlengthx/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SVGFESpecularLightingElement: kernelUnitLengthX property

The **`kernelUnitLengthX`** read-only property of the `SVGFESpecularLightingElement` interface reflects the x value of the `kernelUnitLength` attribute of the given `<feSpecularLighting>` element.

The `kernelUnitLength` attribute indicates the intended distance in current filter units, specified by the `primitiveUnits` attribute, for the x and y coordinates. It contains one or two values, with the y value defaulting to x if not present, and the `kernelUnitLengthX` property gets and sets the first value.

## Value

An `SVGAnimatedNumber` object that corresponds to the X-component of the `kernelUnitLength` attribute of the given element.

## See also

- `SVGFeSpecularLightingElement.kernelUnitLengthY`
- `SVGAnimatedNumber`

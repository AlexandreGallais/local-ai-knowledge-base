---
title: "SVGFESpecularLightingElement: kernelUnitLengthY property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/svgfespecularlightingelement/kernelunitlengthy/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SVGFESpecularLightingElement: kernelUnitLengthY property

The **`kernelUnitLengthY`** read-only property of the `SVGFESpecularLightingElement` interface reflects the y value of the `kernelUnitLength` attribute of the given `<feSpecularLighting>` element.

The `kernelUnitLength` attribute indicates the intended distance in current filter units, specified by the `primitiveUnits` attribute, for the x and y coordinates. It contains one or two values, with the y value defaulting to x if not present, and the `kernelUnitLengthY` property gets and sets the last value.

## Value

An `SVGAnimatedNumber` object that corresponds to the Y-component of the `kernelUnitLength` attribute of the given element.

## See also

- `SVGFeSpecularLightingElement.kernelUnitLengthX`
- `SVGAnimatedNumber`

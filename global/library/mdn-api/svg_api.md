---
title: "SVG API"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/svg_api/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SVG API

SVG provides elements for circles, rectangles, and simple and complex curves. The elements' attribute values specify how these must be drawn. The **SVG API** is the subset of the **DOM** connecting these SVG elements and their attribute values to scripts or programming languages by representing them in memory. The SVG API thus provides methods that allow programmatic access to the SVG elements and their attribute values.

The SVG API is a set of interfaces that have been categorized into the following broad categories:

1. The element interfaces provide access to the properties of SVG elements and methods to manipulate them.
2. The static data type interfaces provide access to element attribute values and methods to manipulate them.
3. For attributes that can be animated, the animated data type interfaces provide read-only access to the current animated value of an attribute.
4. The Synchronized Multimedia Integration Language (SMIL) interfaces
5. Others

## Interfaces

### SVG element interfaces

- `SVGAElement`
- `SVGAnimationElement`
- `SVGAnimateElement`
- `SVGAnimateMotionElement`
- `SVGAnimateTransformElement`
- `SVGCircleElement`
- `SVGClipPathElement`
- `SVGComponentTransferFunctionElement`
- `SVGDefsElement`
- `SVGDescElement`
- `SVGDiscardElement`
- `SVGElement`
- `SVGEllipseElement`
- `SVGFEBlendElement`
- `SVGFEColorMatrixElement`
- `SVGFEComponentTransferElement`
- `SVGFECompositeElement`
- `SVGFEConvolveMatrixElement`
- `SVGFEDiffuseLightingElement`
- `SVGFEDisplacementMapElement`
- `SVGFEDistantLightElement`
- `SVGFEDropShadowElement`
- `SVGFEFloodElement`
- `SVGFEFuncAElement`
- `SVGFEFuncBElement`
- `SVGFEFuncGElement`
- `SVGFEFuncRElement`
- `SVGFEGaussianBlurElement`
- `SVGFEImageElement`
- `SVGFEMergeElement`
- `SVGFEMergeNodeElement`
- `SVGFEMorphologyElement`
- `SVGFEOffsetElement`
- `SVGFEPointLightElement`
- `SVGFESpecularLightingElement`
- `SVGFESpotLightElement`
- `SVGFETileElement`
- `SVGFETurbulenceElement`
- `SVGFilterElement`
- `SVGForeignObjectElement`
- `SVGGElement`
- `SVGGeometryElement`
- `SVGGradientElement`
- `SVGGraphicsElement`
- `SVGImageElement`
- `SVGLinearGradientElement`
- `SVGLineElement`
- `SVGMarkerElement` (experimental)
- `SVGMaskElement`
- `SVGMetadataElement`
- `SVGMPathElement`
- `SVGPathElement`
- `SVGPatternElement`
- `SVGPolylineElement`
- `SVGPolygonElement`
- `SVGRadialGradientElement`
- `SVGRectElement`
- `SVGScriptElement`
- `SVGSetElement`
- `SVGStopElement`
- `SVGStyleElement`
- `SVGSVGElement`
- `SVGSwitchElement`
- `SVGSymbolElement`
- `SVGTextContentElement`
- `SVGTextElement`
- `SVGTextPathElement`
- `SVGTextPositioningElement`
- `SVGTitleElement`
- `SVGTSpanElement`
- `SVGUseElement`
- `SVGViewElement`

### SVG data type interfaces

Here are the DOM APIs for data types used in the definitions of SVG properties and attributes.

#### Static type

- `SVGAngle`
- `SVGLength`
- `SVGLengthList`
- `SVGNumber`
- `SVGNumberList`
- `SVGPreserveAspectRatio`
- `SVGStringList`
- `SVGTransform`
- `SVGTransformList`

#### Animated type

- `SVGAnimatedAngle`
- `SVGAnimatedBoolean`
- `SVGAnimatedEnumeration`
- `SVGAnimatedInteger`
- `SVGAnimatedLength`
- `SVGAnimatedLengthList`
- `SVGAnimatedNumber`
- `SVGAnimatedNumberList`
- `SVGAnimatedPreserveAspectRatio`
- `SVGAnimatedRect`
- `SVGAnimatedString`
- `SVGAnimatedTransformList`

### SMIL-related interfaces

- `TimeEvent`

### Other SVG interfaces

- `ShadowAnimation`
- `SVGUnitTypes`
- `SVGUseElementShadowRoot`

## See also

- Getting Started with SVG

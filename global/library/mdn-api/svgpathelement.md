---
title: "SVGPathElement"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/svgpathelement/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SVGPathElement

The **`SVGPathElement`** interface corresponds to the `` element.

> **Note:**
> In SVG 2 the `getPathSegAtLength()` and `createSVGPathSeg*` methods were removed and the `pathLength` property and the `getTotalLength()` and `getPointAtLength()` methods were moved to `SVGGeometryElement`.

## Instance properties

_This interface inherits properties from its parent, `SVGGeometryElement`._

- `SVGPathElement.pathLength` (read-only)
    This property reflects the `pathLength` attribute.

## Instance methods

_This interface also inherits methods from its parent, `SVGGeometryElement`._

- `SVGPathElement.getPathData()` (experimental)
    Returns the sequence of path segments that corresponds to the path data, optionally normalizing the values and segment types.
- `SVGPathElement.getPointAtLength()`
    Returns the point at a given distance along the path.
- `SVGPathElement.getTotalLength()`
    Returns the user agent's computed value for the total length of the path in user units.
- `SVGPathElement.setPathData()` (experimental)
    Sets the sequence of path segments as the new path data.
- `SVGPathElement.getPathSegmentAtLength()` (experimental)
    Returns the segment at a given distance along the path.

### Deprecated methods

- `SVGPathElement.getPathSegAtLength()` (deprecated) (non-standard)
    Returns an unsigned long representing the index within the `pathSegList` utilizing the user agent's distance-along-a-path algorithm.
- `SVGPathElement.createSVGPathSegClosePath()` (deprecated) (non-standard)
    Returns a stand-alone, parentless `SVGPathSegClosePath` object.
- `SVGPathElement.createSVGPathSegMovetoAbs()` (deprecated) (non-standard)
    Returns a stand-alone, parentless `SVGPathSegMovetoAbs` object.
- `SVGPathElement.createSVGPathSegMovetoRel()` (deprecated) (non-standard)
    Returns a stand-alone, parentless `SVGPathSegMovetoRel` object.
- `SVGPathElement.createSVGPathSegLinetoAbs()` (deprecated) (non-standard)
    Returns a stand-alone, parentless `SVGPathSegLinetoAbs` object.
- `SVGPathElement.createSVGPathSegLinetoRel()` (deprecated) (non-standard)
    Returns a stand-alone, parentless `SVGPathSegLinetoRel` object.
- `SVGPathElement.createSVGPathSegCurvetoCubicAbs()` (deprecated) (non-standard)
    Returns a stand-alone, parentless `SVGPathSegCurvetoCubicAbs` object.
- `SVGPathElement.createSVGPathSegCurvetoCubicRel()` (deprecated) (non-standard)
    Returns a stand-alone, parentless `SVGPathSegCurvetoCubicRel` object.
- `SVGPathElement.createSVGPathSegCurvetoQuadraticAbs()` (deprecated) (non-standard)
    Returns a stand-alone, parentless `SVGPathSegCurvetoQuadraticAbs` object.
- `SVGPathElement.createSVGPathSegCurvetoQuadraticRel()` (deprecated) (non-standard)
    Returns a stand-alone, parentless `SVGPathSegCurvetoQuadraticRel` object.
- `SVGPathElement.createSVGPathSegArcAbs()` (deprecated) (non-standard)
    Returns a stand-alone, parentless `SVGPathSegArcAbs` object.
- `SVGPathElement.createSVGPathSegArcRel()` (deprecated) (non-standard)
    Returns a stand-alone, parentless `SVGPathSegArcRel` object.
- `SVGPathElement.createSVGPathSegLinetoHorizontalAbs()` (deprecated) (non-standard)
    Returns a stand-alone, parentless `SVGPathSegLinetoHorizontalAbs` object.
- `SVGPathElement.createSVGPathSegLinetoHorizontalRel()` (deprecated) (non-standard)
    Returns a stand-alone, parentless `SVGPathSegLinetoHorizontalRel` object.
- `SVGPathElement.createSVGPathSegLinetoVerticalAbs()` (deprecated) (non-standard)
    Returns a stand-alone, parentless `SVGPathSegLinetoVerticalAbs` object.
- `SVGPathElement.createSVGPathSegLinetoVerticalRel()` (deprecated) (non-standard)
    Returns a stand-alone, parentless `SVGPathSegLinetoVerticalRel` object.
- `SVGPathElement.createSVGPathSegCurvetoCubicSmoothAbs()` (deprecated) (non-standard)
    Returns a stand-alone, parentless `SVGPathSegCurvetoCubicSmoothAbs` object.
- `SVGPathElement.createSVGPathSegCurvetoCubicSmoothRel()` (deprecated) (non-standard)
    Returns a stand-alone, parentless `SVGPathSegCurvetoCubicSmoothRel` object.
- `SVGPathElement.createSVGPathSegCurvetoQuadraticSmoothAbs()` (deprecated) (non-standard)
    Returns a stand-alone, parentless `SVGPathSegCurvetoQuadraticSmoothAbs` object.
- `SVGPathElement.createSVGPathSegCurvetoQuadraticSmoothRel()` (deprecated) (non-standard)
    Returns a stand-alone, parentless `SVGPathSegCurvetoQuadraticSmoothRel` object.

## See also

- `` SVG Element

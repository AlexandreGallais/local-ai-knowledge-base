---
title: "SVGPreserveAspectRatio"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/api/svgpreserveaspectratio/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# SVGPreserveAspectRatio

The **`SVGPreserveAspectRatio`** interface corresponds to the `preserveAspectRatio` attribute.

An `SVGPreserveAspectRatio` object can be designated as read only, which means that attempts to modify the object will result in an exception being thrown.

## Static properties

- `SVG_PRESERVEASPECTRATIO_UNKNOWN` (0)
    The enumeration was set to a value that is not one of predefined types. It is invalid to attempt to define a new value of this type or to attempt to switch an existing value to this type.
- `SVG_PRESERVEASPECTRATIO_NONE` (1)
    Corresponds to value `none` for attribute `preserveAspectRatio`.
- `SVG_PRESERVEASPECTRATIO_XMINYMIN` (2)
    Corresponds to value `xMinYMin` for attribute `preserveAspectRatio`.
- `SVG_PRESERVEASPECTRATIO_XMIDYMIN` (3)
    Corresponds to value `xMidYMin` for attribute `preserveAspectRatio`.
- `SVG_PRESERVEASPECTRATIO_XMAXYMIN` (4)
    Corresponds to value `xMaxYMin` for attribute `preserveAspectRatio`.
- `SVG_PRESERVEASPECTRATIO_XMINYMID` (5)
    Corresponds to value `xMinYMid` for attribute `preserveAspectRatio`.
- `SVG_PRESERVEASPECTRATIO_XMIDYMID` (6)
    Corresponds to value `xMidYMid` for attribute `preserveAspectRatio`.
- `SVG_PRESERVEASPECTRATIO_XMAXYMID` (7)
    Corresponds to value `xMaxYMid` for attribute `preserveAspectRatio`.
- `SVG_PRESERVEASPECTRATIO_XMINYMAX` (8)
    Corresponds to value `xMinYMax` for attribute `preserveAspectRatio`.
- `SVG_PRESERVEASPECTRATIO_XMIDYMAX` (9)
    Corresponds to value `xMidYMax` for attribute `preserveAspectRatio`.
- `SVG_PRESERVEASPECTRATIO_XMAXYMAX` (10)
    Corresponds to value `xMaxYMax` for attribute `preserveAspectRatio`.
- `SVG_MEETORSLICE_UNKNOWN` (0)
    The enumeration was set to a value that is not one of predefined types. It is invalid to attempt to define a new value of this type or to attempt to switch an existing value to this type.
- `SVG_MEETORSLICE_MEET` (1)
    Corresponds to value `meet` for attribute `preserveAspectRatio`.
- `SVG_MEETORSLICE_SLICE` (2)
    Corresponds to value `slice` for attribute `preserveAspectRatio`.

## Instance properties

- `align`
    The type of the alignment value as specified by one of the `SVG_PRESERVEASPECTRATIO_*` constants defined on this interface.
- `meetOrSlice`
    The type of the meet-or-slice value as specified by one of the `SVG_MEETORSLICE_*` constants defined on this interface.

## Instance methods

_The `SVGPreserveAspectRatio` interface do not provide any specific methods._

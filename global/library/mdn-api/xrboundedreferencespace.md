---
title: "XRBoundedReferenceSpace"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/xrboundedreferencespace/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# XRBoundedReferenceSpace

The WebXR Device API's **`XRBoundedReferenceSpace`** interface describes a virtual world reference space which has preset boundaries. This extends `XRReferenceSpace`, which describes an essentially unrestricted space around the viewer's position. These bounds are defined using an array of points, each of which defines a vertex in a polygon inside which the user is allowed to move.

This is typically used when the XR system is capable of tracking the user's physical movement within a limited distance of their starting position. The specified bounds may, in fact, describe the shape and size of the room the user is located in, in order to let the WebXR site or application prevent the user from colliding with the walls or other obstacles in the real world. At a minimum, the boundaries indicate the area in which the XR device is capable of tracking the user's movement. See the article Using bounded reference spaces for details on how bounded spaces work and why they're useful.

## Instance properties

_In addition to the properties of `XRReferenceSpace`, `XRBoundedReferenceSpace` includes the following:_

- `boundsGeometry` (read-only) (experimental)
    An array of `DOMPointReadOnly` objects, each of which defines a vertex in the polygon defining the boundaries within which the user will be required to remain. These vertices _must_ be sorted such that they move _clockwise_ around the viewer's position.

## Instance methods

_`XRBoundedReferenceSpace` inherits the methods of its parent interface, `XRReferenceSpace`. It has no further methods._

## See also

- WebXR Device API
- Geometry and reference spaces in WebXR
- Viewpoints and viewers: simulating cameras in WebXR

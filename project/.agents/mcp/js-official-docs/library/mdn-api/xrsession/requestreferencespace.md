---
title: "XRSession: requestReferenceSpace() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/xrsession/requestreferencespace/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# XRSession: requestReferenceSpace() method

The **`requestReferenceSpace()`** method of the
`XRSession` interface returns a `Promise` that resolves with
an instance of either `XRReferenceSpace`
or `XRBoundedReferenceSpace` as appropriate given the type of reference
space requested.

## Syntax

```js
requestReferenceSpace(referenceSpaceType)
```

### Parameters

- `type`
    A string specifying the type of reference space for which an instance is to be returned.
    The string must be one of the values below.

### Return value

A `Promise` that resolves with an `XRReferenceSpace` object.

The types of reference space are listed below, with brief information about their use cases and which interface is used to implement them.

- `bounded-floor`
    An `XRBoundedReferenceSpace` similar to the `local` type, except the user is not expected to move outside a predetermined boundary, given by the `boundsGeometry` in the returned object.
- `local`
    An `XRReferenceSpace` tracking space whose native origin is located near the viewer's position at the time the session was created. The exact position depends on the underlying platform and implementation. The user isn't expected to move much if at all beyond their starting position, and tracking is optimized for this use case. For devices with six degrees of freedom (6DoF) tracking, the `local` reference space tries to keep the origin stable relative to the environment.
- `local-floor`
    An `XRReferenceSpace` similar to the `local` type, except the starting position is placed in a safe location for the viewer to stand, where the value of the y axis is 0 at floor level. If that floor level isn't known, the user agent will estimate the floor level. If the estimated floor level is non-zero, the browser is expected to round it such a way as to avoid fingerprinting (likely to the nearest centimeter).
- `unbounded`
    An `XRReferenceSpace` tracking space which allows the user total freedom of movement, possibly over extremely long distances from their origin point. The viewer isn't tracked at all; tracking is optimized for stability around the user's current position, so the native origin may drift as needed to accommodate that need.
- `viewer`
    An `XRReferenceSpace` tracking space whose native origin tracks the viewer's position and orientation. This is used for environments in which the user can physically move around, and is supported by all instances of `XRSession`, both immersive and inline, though it's most useful for inline sessions. It's particularly useful when determining the distance between the viewer and an input, or when working with offset spaces. Otherwise, typically, one of the other reference space types will be used more often.

### Exceptions

Rather than throwing true exceptions, `requestReferenceSpace()` rejects the
returned promise with a `DOMException` whose name is found in the list
below:

- `NotSupportedError` `DOMException`
    The requested reference space is not supported.

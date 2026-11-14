---
title: "DOMQuad"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/domquad/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# DOMQuad

A `DOMQuad` is a collection of four `DOMPoint`s defining the corners of an arbitrary quadrilateral. Returning `DOMQuad`s lets `getBoxQuads()` return accurate information even when arbitrary 2D or 3D transforms are present. It has a handy `bounds` attribute returning a `DOMRectReadOnly` for those cases where you just want an axis-aligned bounding rectangle.

## Constructor

- `DOMQuad()`
    Creates a new `DOMQuad` object.

## Instance properties

- `DOMQuad.p1` (read-only)
    A `DOMPoint` representing one corner of the `DOMQuad`.
- `DOMQuad.p2` (read-only)
    A `DOMPoint` representing one corner of the `DOMQuad`.
- `DOMQuad.p3` (read-only)
    A `DOMPoint` representing one corner of the `DOMQuad`.
- `DOMQuad.p4` (read-only)
    A `DOMPoint` representing one corner of the `DOMQuad`.

## Static methods

- `DOMQuad.fromQuad()`
    Returns a new `DOMQuad` object based on the provided set of coordinates in the shape of another `DOMQuad` object.
- `DOMQuad.fromRect()`
    Returns a new `DOMQuad` object based on the provided set of coordinates in the shape of a `DOMRect` object.

## Instance methods

- `DOMQuad.getBounds()`
    Returns a `DOMRect` object with the coordinates and dimensions of the `DOMQuad` object.
- `DOMQuad.toJSON()`
    Returns a JSON-serializable plain object representing the `DOMQuad` object. Automatically called by `JSON.stringify()`.

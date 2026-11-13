---
title: "markerUnits"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/svg/reference/attribute/markerunits/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# markerUnits

The **`markerUnits`** attribute defines the coordinate system for the `markerWidth` and `markerHeight` attributes and the contents of the `<marker>`.

You can use this attribute with the following SVG elements:

- `<marker>`

## Usage notes

       | Value
       | `userSpaceOnUse` | `strokeWidth`

       | Default value
       | `strokeWidth`

       | Animatable
       | Yes

- `userSpaceOnUse`
    This value specifies that the `markerWidth` and `markerHeight` attributes and the contents of the `<marker>` element represent values in the current user coordinate system in place for the graphic object referencing the marker (i.e., the user coordinate system for the element referencing the `<marker>` element via a `marker`, `marker-start`, `marker-mid`, or `marker-end` property).
- `strokeWidth`
    This value specifies that the `markerWidth` and `markerHeight` attributes and the contents of the `<marker>` element represent values in a coordinate system which has a single unit equal the size in user units of the current stroke width (see the `stroke-width` attribute) in place for the graphic object referencing the marker.

## See also

- `<marker>`
- `markerWidth`
- `markerHeight`
- `stroke-width`

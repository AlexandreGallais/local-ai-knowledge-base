---
title: "SVGImageElement"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/svgimageelement/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SVGImageElement

The **`SVGImageElement`** interface corresponds to the `<image>` element.

## Instance properties

_This interface also inherits properties from its parent, `SVGGraphicsElement`._

- `SVGImageElement.crossOrigin`
    A string reflecting the `crossorigin` content attribute, which represents the CORS setting of the given `<image>` element.
- `SVGImageElement.decoding`
    Represents a hint given to the browser on how it should decode the image.
- `SVGImageElement.height` (read-only)
    An `SVGAnimatedLength` corresponding to the `height` attribute of the given `<image>` element.
- `SVGImageElement.href` (read-only)
    An `SVGAnimatedString` corresponding to the `href` or `xlink:href` (deprecated) attribute of the given `<image>` element.
- `SVGImageElement.preserveAspectRatio` (read-only)
    An `SVGAnimatedPreserveAspectRatio` corresponding to the `preserveAspectRatio` attribute of the given `<image>` element.
- `SVGImageElement.width` (read-only)
    An `SVGAnimatedLength` corresponding to the `width` attribute of the given `<image>` element.
- `SVGImageElement.x` (read-only)
    An `SVGAnimatedLength` corresponding to the `x` attribute of the given `<image>` element.
- `SVGImageElement.y` (read-only)
    An `SVGAnimatedLength` corresponding to the `y` attribute of the given `<image>` element.

## Instance methods

_This interface also inherits methods from its parent interface, `SVGGraphicsElement`._

- `SVGImageElement.decode()`
    Initiates asynchronous decoding of the image data. Returns a `Promise` which resolves once the image data is ready to be used.

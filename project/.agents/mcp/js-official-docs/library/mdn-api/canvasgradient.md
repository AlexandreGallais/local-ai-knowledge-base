---
title: "CanvasGradient"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/canvasgradient/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CanvasGradient

The **`CanvasGradient`** interface represents an opaque object describing a gradient. It is returned by the methods `CanvasRenderingContext2D.createLinearGradient()`, `CanvasRenderingContext2D.createConicGradient()` or `CanvasRenderingContext2D.createRadialGradient()`.

It can be used as a `fillStyle` or `strokeStyle`.

## Instance properties

_As an opaque object, there is no exposed property._

## Instance methods

- `CanvasGradient.addColorStop()`
    Adds a new stop, defined by an `offset` and a `color`, to the gradient.

## See also

- Creator methods in `CanvasRenderingContext2D`.
- The `<canvas>` element and its associated interface, `HTMLCanvasElement`.

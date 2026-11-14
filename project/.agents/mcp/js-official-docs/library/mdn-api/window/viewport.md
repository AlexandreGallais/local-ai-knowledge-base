---
title: "Window: viewport property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/window/viewport/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Window: viewport property

The `viewport` read-only property of the `Window` interface returns a `Viewport` object instance, which provides information about the current state of the device's viewport.

See the `Viewport` API for all available properties.

## Value

A `Viewport` object instance.

## Examples

### Basic `viewport` usage

```js
const currentViewport = window.viewport;
const segments = window.viewport.segments;
```

## See also

- `Viewport.segments` property
- `Viewport` interface
- `VisualViewport` interface
- Viewport Segments API
- CSSOM view API
- Viewport concepts
- CSS viewport module
- CSSOM view module

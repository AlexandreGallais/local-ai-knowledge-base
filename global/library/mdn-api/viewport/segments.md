---
title: "Viewport: segments property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/viewport/segments/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Viewport: segments property

The **`segments`** read-only property of the `Viewport` interface returns an array of `DOMRect` objects representing the position and dimensions of each viewport segment within the overall display.

## Value

An array of `DOMRect` objects.

## Examples

### Basic `Viewport.segments` usage

This snippet will loop through each segment in the viewport, and log a string to the console detailing the index number, width, and height.

```js
const segments = window.viewport.segments;

segments.forEach((segment) =>
  console.log(
    `Segment ${segments.indexOf(segment)} is ${segment.width}px x ${segment.height}px`,
  ),
);
```

## See also

- Viewport Segments API
- CSSOM view API
- Origin trial for Foldable APIs via developer.chrome.com (2024)

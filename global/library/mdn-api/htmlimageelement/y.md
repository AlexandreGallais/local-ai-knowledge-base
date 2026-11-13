---
title: "HTMLImageElement: y property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlimageelement/y/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLImageElement: y property

The read-only **`y`** property of the `HTMLImageElement` interface indicates the y-coordinate of the `` element's top border edge relative to the root element's origin.

## Value

An integer value indicating the distance in pixels from the top edge of the element's nearest root element to the top edge of the `` element's border box. The nearest root element is the outermost `<html>` element that contains the image. If the image is in an ``, its `y` is relative to that frame.

In the diagram below, the top border edge is the top edge of the blue padding area. So the value returned by `y` would be the distance from that point to the top edge of the content area.

## Examples

For examples, see the `x` property page.

## See also

- `HTMLImageElement.x`

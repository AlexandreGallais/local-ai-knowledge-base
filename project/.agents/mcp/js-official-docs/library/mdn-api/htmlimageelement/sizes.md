---
title: "HTMLImageElement: sizes property (part 1 of 2)"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlimageelement/sizes/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLImageElement: sizes property

The **`sizes`** property of the `HTMLImageElement` interface allows you to specify the layout width of the image for each of a list of media queries, or `auto` for lazy-loaded images to allow the browser to automatically select an image to display based on the layout size of the element.
This allows the browser to choose between different images specified in the element `srcset` to match different media conditions — even images with different orientations or aspect ratios.

The `sizes` property reflects the `` element's `sizes` content attribute.
It can only be present when `srcset` uses width descriptors.

## Value

A string that can be the `auto` keyword (optionally followed by any number of _source sizes_), or one or more _source sizes_.

See the `sizes` attribute in the HTML `` reference for more information.

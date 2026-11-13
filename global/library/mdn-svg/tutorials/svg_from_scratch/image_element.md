---
title: "SVG image element"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/svg/tutorials/svg_from_scratch/image_element/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SVG image element

The SVG `<image>` element allows for raster images to be rendered within an SVG object.

In this basic <example-value>, a .jpg image referenced by an `href` attribute will be rendered inside an SVG object:

```xml
<svg width="5cm" height="4cm"
     xmlns="http://www.w3.org/2000/svg">
  <image href="firefox.jpg" x="0" y="0" height="50px" width="50px"/>
</svg>
```

There are some important things to take note of:

- If you do not set the `x` or `y` attributes, they will be set to `0`.
- If you do not set the `height` or `width` attributes, they will be set to `0`.
- Having a `height` or `width` attribute of `0` will disable rendering of the image.

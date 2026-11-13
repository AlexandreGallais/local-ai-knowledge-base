---
title: "SVG as an image"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/svg/guides/svg_as_an_image/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# SVG as an image

SVG can be used as an image format in HTML, CSS, certain SVG elements, and via the Canvas API.
This page lists the features where you can provide SVG as an image source.

## Features supporting SVG

Browsers support SVG images in:

- HTML `` or `` elements
- CSS `background-image`
- CSS `list-style-image`
- CSS `content`
- SVG `<image>` element
- SVG `<feImage>` element
- Canvas `drawImage` function

## Restrictions

For security purposes, some browsers place restrictions on SVG content when it's being used as an image.
Specifically, the following limitations may apply:

- JavaScript is disabled.
- External resources (e.g., images, stylesheets) cannot be loaded, though they can be used if inlined through `data:` URLs.
- `:visited`-link styles aren't rendered.
- Platform-native widget styling (based on OS theme) is disabled.

Note that the above restrictions are specific to image contexts; they don't apply when SVG content is viewed directly, or when it's embedded as a document via the ``, `<object>`, or `` elements.

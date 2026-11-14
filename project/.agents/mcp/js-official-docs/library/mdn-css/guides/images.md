---
title: "CSS images"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/guides/images/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSS images

The **CSS images** module defines the types of images that can be used (the `image` type, containing URLs, gradients and other types of images), how to resize them and how they, and other replaced content, interact with the different layout models.

## Reference

### Properties

- `image-orientation`
- `image-rendering`
- `object-fit`
- `object-position`
- `object-view-box`

The CSS images module also defines the `image-resolution` property. Currently, no browsers support this feature.

### Functions

- `linear-gradient()`
- `radial-gradient()`
- `repeating-linear-gradient()`
- `repeating-radial-gradient()`
- `conic-gradient()`
- `repeating-conic-gradient()`
- `cross-fade()`
- `element()`
- `image-set()`

The CSS images module also defines the `image()` function. Currently, no browsers support this feature.

### Data types

- `gradient`
- `image`

## Guides

- Using CSS gradients
    Presents a specific type of CSS images, _gradients_, and how to create and use these.

- Implementing image sprites in CSS
    Describes the common technique grouping several images in one single document to save download requests and speed up the availability of a page.

- Styling replaced elements
    Introduces the properties that only apply to _replaced elements_.

- Understanding aspect ratios
    Learn about the `aspect-ratio` property, discuss aspect ratios for replaced and non-replaced elements, and examine some common aspect ratio use cases.

- Using the CSS `object-view-box` property
    Learn the CSS `object-view-box` property, including how to zoom in, zoom out, and pan across images.

## Related concepts

- `<url>`
- `url()`
- `<basic-shape-rect>`

## See also

- CSS filter effects module
- CSS compositing and blending module
- CSS colors module
- CSS values and units module

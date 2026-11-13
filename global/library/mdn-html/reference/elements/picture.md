---
title: "`<picture>` HTML picture element"
tool: "mdn-html"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/html/reference/elements/picture/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `<picture>` HTML picture element

The **``** HTML element contains zero or more `` elements and one `` element to offer alternative versions of an image for different display/device scenarios.

The browser will consider each child `` element and choose the best match among them. If no matches are found—or the browser doesn't support the `` element—the URL of the `` element's `src` attribute is selected. The selected image is then presented in the space occupied by the `` element.

```html
<!--Change the browser window width to see the image change.-->

<picture>
  <source
    srcset="/shared-assets/images/examples/surfer.jpg"
    media="(orientation: portrait)" />
  <img src="/shared-assets/images/examples/painted-hand.jpg" alt="" />
</picture>
```

## Attributes

This element includes only global attributes.

## Usage notes

To decide which URL to load, the user agent examines each ``'s `srcset`, `media`, and `type` attributes to select a compatible image that best matches the current layout and capabilities of the display device.

The `` element serves two purposes:

1. It describes the size and other attributes of the image and its presentation.
2. It provides a fallback in case none of the offered `` elements are able to provide a usable image.

Common use cases for ``:

- **Art direction.** Cropping or modifying images for different `media` conditions (for example, loading a simpler version of an image which has too many details, on smaller displays).
- **Offering alternative image formats**, for cases where certain formats are not supported.

  > **Note:**
  > For example, newer formats like AVIF or WEBP have many advantages, but might not be supported by the browser. A list of supported image formats can be found in: Image file type and format guide.

- **Saving bandwidth and speeding page load times** by loading the most appropriate image for the viewer's display.

If providing higher-density versions of an image for high-DPI (Retina) display, use `srcset` on the `` element instead. This lets browsers opt for lower-density versions in data-saving modes, and you don't have to write explicit `media` conditions.

You can use the `object-position` property to adjust the positioning of the image within the element's frame, and the `object-fit` property to control how the image is resized to fit within the frame.

> **Note:**
> Use these properties on the child `` element, **not** the `` element.

## Examples

These examples demonstrate how different attributes of the `` element change the selection of the image inside ``.

### The media attribute

The `media` attribute specifies a media condition (similar to a media query) that the user agent will evaluate for each `` element.

If the ``'s media condition evaluates to `false`, the browser skips it and evaluates the next element inside ``.

```html
<picture>
  <source srcset="mdn-logo-wide.png" media="(width >= 600px)" />
  <img src="mdn-logo-narrow.png" alt="MDN" />
</picture>
```

You can swap image assets for light and dark themes using the `@media/prefers-color-scheme` media feature:

```html
<picture>
  <source srcset="logo-dark.png" media="(prefers-color-scheme: dark)" />
  <source srcset="logo-light.png" media="(prefers-color-scheme: light)" />
  <img src="logo-light.png" alt="Product logo" />
</picture>
```

### The srcset attribute

The srcset attribute is used to offer a list of possible images based on size or the display's pixel density.

It is composed of a comma-separated list of image descriptors. Each image descriptor is composed of a URL of the image, and _either_:

- a _width descriptor_, followed by a `w` (such as `300w`);
  _OR_
- a _pixel density descriptor_, followed by an `x` (such as `2x`) to serve a high-res image for high-DPI screens.

Make sure to note that:

- width and pixel density descriptors should not be used together
- a missing pixel density descriptor implies 1x
- duplicate descriptor values are not allowed (2x & 2x, 100w & 100w)

The following example illustrates the usage of `srcset` attribute with the `` element to specify a high-density and standard-resolution image:

```html
<picture>
  <source srcset="logo.png, logo-1.5x.png 1.5x" />
  <img src="logo.png" alt="MDN Web Docs logo" height="320" width="320" />
</picture>
```

The `srcset` attribute can also be used on the `` element without needing the `` element. The following example demonstrates how to use the `srcset` attribute to specify standard-resolution and high-density images, respectively:

```html
<img
  srcset="logo.png, logo-2x.png 2x"
  src="logo.png"
  height="320"
  width="320"
  alt="MDN Web Docs logo" />
```

### The sizes attribute

The `sizes` attribute of the `` element allows you to specify a set of media condition-length pairs and indicate the image display size for each condition. This helps the browser select the most appropriate image from the `srcset` attribute, which lists images with their intrinsic widths.

The browser evaluates the media conditions in the sizes attribute before it downloads any images. See the sizes attribute of the `` and `` elements for more information.

For example:

```html
<picture>
  <source
    srcset="small.jpg 480w, medium.jpg 800w, large.jpg 1200w"
    sizes="(max-width: 600px) 400px, 800px"
    type="image/jpeg" />
  <img src="fallback.jpg" alt="Example image" />
</picture>
```

In this example:

- If the viewport is 600px wide or less, the slot size is 400px; otherwise, it is 800px.
- The browser multiplies the slot size by the device pixel ratio to determine the ideal image width, then picks the closest available image from `srcset`.

Without sizes, the browser will use the default size of the image as specified by its dimensions in pixels. This may not be the best fit for all devices, especially if the image is displayed on different screen sizes or in different contexts.

Please note that sizes will have its effect only if width dimension descriptors are provided with srcset instead of pixel ratio values (200w instead of 2x for example).
For more information on using `srcset`, see the Responsive images documentation.

### The type attribute

The `type` attribute specifies a MIME type for the resource URL(s) in the `` element's `srcset` attribute. If the user agent does not support the given type, the `` element is skipped.

```html
<picture>
  <source srcset="photo.avif" type="image/avif" />
  <source srcset="photo.webp" type="image/webp" />
  <img src="photo.jpg" alt="photo" />
</picture>
```

## Technical summary

       |
        Content categories

       |
        Flow content, phrasing content, embedded content

       | Permitted content
       |
        Zero or more `` elements, followed by one
        `` element, optionally intermixed with
        script-supporting elements.

       | Tag omission
       | None, both the starting and ending tag are mandatory.

       | Permitted parents
       | Any element that allows embedded content.

       | Implicit ARIA role
       |
        No corresponding role

       | Permitted ARIA roles
       | No `role` permitted

       | DOM interface
       | `HTMLPictureElement`

## See also

- `` element
- `` element
- Positioning and sizing the picture within its frame: `object-position` and `object-fit`
- Image file type and format guide
- `@media/prefers-color-scheme` media feature

---
title: "`image-set()` CSS function"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/values/image/image-set/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `image-set()` CSS function

The **`image-set()`** CSS functional notation is a method of letting the browser pick the most appropriate CSS image from a given set, primarily for high pixel density screens.

Resolution and bandwidth differ by device and network access. The `image-set()` function delivers the most appropriate image resolution for a user's device, providing a set of image options — each with an associated resolution declaration — from which the browser picks the most appropriate for the device and settings. Resolution can be used as a proxy for filesize — a user agent on a slow mobile connection with a high-resolution screen may prefer to receive lower-resolution images rather than waiting for a higher resolution image to load.

`image-set()` allows the author to provide options rather than determining what each individual user needs.

## Syntax

```css
/* Select image based on resolution */
image-set(
  "image1.jpg" 1x,
  "image2.jpg" 2x
);

image-set(
  url("image1.jpg") 1x,
  url("image2.jpg") 2x
);

/* Select gradient based on resolution */
image-set(
  linear-gradient(blue, white) 1x,
  linear-gradient(blue, green) 2x
);

/* Select image based on supported formats */
image-set(
  url("image1.avif") type("image/avif"),
  url("image2.jpg") type("image/jpeg")
);
```

### Values

- `<image>`
    The `image` can be any image type except for an image set. The `image-set()` function may not be nested inside another `image-set()` function.
- `<string>`
    A URL to an image.
- `<resolution>` (optional)
    `resolution` units include `x` or `dppx`, for dots per pixel unit, `dpi`, for dots per inch, and `dpcm` for dots per centimeter. Every image within an `image-set()` must have a unique resolution.
- `type(<string>)` (optional)
    A valid MIME type string, for example "image/jpeg".

## Accessibility

Browsers do not provide any special information on background images to assistive technology. This is important primarily for screen readers, as a screen reader will not announce its presence and therefore convey nothing to its users. If the image contains information critical to understanding the page's overall purpose, it is better to describe it semantically in the document.

- MDN Understanding WCAG, Guideline 1.1 explanations
- Understanding Success Criterion 1.1.1 | W3C Understanding WCAG 2.0

## Examples

### Using image-set() to provide alternative background-image options

This example shows how to use `image-set()` to provide two alternative `background-image` options, chosen depending on the resolution needed: a normal version and a high-resolution version.

```html
<div class="box"></div>
```

```css
.box {
  width: 400px;
  height: 200px;
  background-repeat: no-repeat;
  background-size: cover;

  background-image: image-set(
    url("https://mdn.github.io/shared-assets/images/examples/balloons-small.jpg")
      1x,
    url("https://mdn.github.io/shared-assets/images/examples/balloons-landscape.jpg")
      2x
  );
}
```

### Using image-set() to provide alternative image formats

In the next example the `type()` function is used to serve the image in AVIF and JPEG formats. If the browser supports avif, it will choose that version. Otherwise it will use the jpeg version.

```html
<div class="box"></div>
```

```css
.box {
  width: 400px;
  height: 200px;
  background-repeat: no-repeat;
  background-size: cover;

  background-image: image-set(
    "https://mdn.github.io/shared-assets/images/examples/balloons-landscape.avif"
      type("image/avif"),
    "https://mdn.github.io/shared-assets/images/examples/balloons-landscape.jpg"
      type("image/jpeg")
  );
}
```

## See also

- `image`
- `image()`
- `element()`
- `<url>`
- `gradient`
- `cross-fade()`

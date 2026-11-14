---
title: "`image-orientation` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/image-orientation/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `image-orientation` CSS property

The **`image-orientation`** CSS property specifies a layout-independent correction to the orientation of an image.

```css
image-orientation: none;
```

```css
image-orientation: from-image;
```

```html
<section id="default-example">
  <img
    class="transition-all"
    id="example-element"
    src="/shared-assets/images/examples/hummingbird.jpg" />
</section>
```

```css
#example-element {
  height: inherit;
}
```

## Syntax

```css
/* keyword values */
image-orientation: none;
image-orientation: from-image; /* Use EXIF data from the image */

/* Global values */
image-orientation: inherit;
image-orientation: initial;
image-orientation: revert;
image-orientation: revert-layer;
image-orientation: unset;
```

### Values

This property is specified as one of the following keyword values:

- `none`
    Does not apply any additional image rotation; the image is oriented as encoded or as other CSS property values dictate.
- `from-image`
    Default initial value. The EXIF information contained in the image is used to rotate the image appropriately.

> **Warning:**
> `image-orientation: none;` **does not** override the orientation of non-secure-origin images as encoded by their EXIF information, due to security concerns. Find out more from the CSS working group draft issue.

## Description

This property is intended _only_ to be used for the purpose of correcting the orientation of images which were shot with the camera rotated. It should _not_ be used for arbitrary rotations. For any purpose other than correcting an image's orientation due to how it was shot or scanned, use a `transform` property with the `rotate` keyword to specify rotation. This includes any user-directed changes to the orientation of the image, or changes required for printing in portrait versus landscape orientation.

If used in conjunction with other CSS properties, such as a `<transform-function>`, any `image-orientation` rotation is applied before any other transformations.

## Examples

### Orienting image from image data

The following image has been rotated through 180 degrees, and the `image-orientation` property is used to correct its orientation based on the EXIF data in the image. By changing the `image-orientation` to `none` you can see the effect of the property.

#### CSS

```css
#image {
  image-orientation: from-image; /* Can be changed in the live sample */
}
```

```css
img {
  margin: 0.5rem 0;
}

label {
  font-family: monospace;
}
```

```html
<img id="image" src="oriole.jpg" alt="Orientation taken from the image" />

<div>
  <input
    type="radio"
    id="from-image"
    name="orientation"
    value="from-image"
    checked />
  <label for="from-image">from-image</label>
</div>

<div>
  <input type="radio" id="none" name="orientation" value="none" />
  <label for="none">none</label>
</div>
```

```js
document.addEventListener("change", (evt) => {
  document.getElementById("image").style.imageOrientation = evt.target.value;
});
```

#### Result

## See also

- Other image-related CSS properties: `object-fit`, `object-position`, `image-rendering`, `image-resolution`.
- `transform` and `rotate`

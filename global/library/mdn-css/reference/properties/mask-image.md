---
title: "`mask-image` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/mask-image/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `mask-image` CSS property

The **`mask-image`** CSS property sets the image that is used as the mask layer for an element, hiding sections of the element on which the masking image is set based on the alpha channel of the mask image and, depending on the `mask-mode` property value, the luminance of the mask image's colors.

## Syntax

```css
/* Keyword value */
mask-image: none;

/* <mask-source> value */
mask-image: url("masks.svg#mask1");

/* <image> values */
mask-image: linear-gradient(black, transparent);
mask-image: image(url("mask.png"), skyblue);

/* Multiple values */
mask-image: url("mask.png"), linear-gradient(black 25%, transparent 35%);

/* Global values */
mask-image: inherit;
mask-image: initial;
mask-image: revert;
mask-image: revert-layer;
mask-image: unset;
```

### Values

- `none`
    This keyword is interpreted as a transparent black image layer.

- `<mask-source>`
    A `<url>` reference to a `<mask>` or to a CSS image.

- `image`
    An image value used as a mask image layer.

## Description

The `mask-image` property provides a mask that hides part of the element to which it is applied. The value is a comma-separated list of mask references. Each mask reference is an `<image>`, a `<mask-source>`, or the keyword `none`.

An `<image>` can be any type of image, including generated images such as CSS gradients.

If only one value is specified in the `mask-image` property value, and that value is `none`, no masking effect will be apparent. If multiple values are specified, a `none` value included in the list may have no direct effect, however, other `mask-*` values in the same list position will apply to a transparent black mask layer and have no visual effect.

Only image sources served over HTTP and HTTPS protocols are accepted as `<image>` values due to the CORS policy. Images served locally, including relative or absolute `file://` protocols, are not accepted, and will render as transparent black. To test URL image sources locally, set up a local server.

A mask will be counted as a transparent black image layer, not revealing anything, in the following cases:

- The mask image is empty (zero width or zero height).
- The mask image fails to download.
- The browser does not support the mask image format.
- The mask image doesn't exist.
- The mask value doesn't point to a mask image.

The default value of the `mask-mode` property is `match-source`, which means the mode is defined by the mode of the mask image itself. The mask image's mode is generally `alpha` except when the mask source is an SVG `<mask>` element, in which case the mode is `luminance` unless the mode is changed to `alpha` via the CSS `mask-type` property or SVG `mask-type` attribute.

The `mask-mode` value is significant, because it determines whether the masking effect depends on the image source's alpha channel values alone or a combination of those and the mask's luminance (the lightness/darkness of the colors that make up the `mask-image`):

- In all cases, the alpha transparency of the mask matters; element areas masked by opaque sections of the `mask-image` will be rendered, while areas masked by transparent image sections are hidden.
- When the `mask-mode` value is set or resolves to `alpha`, only the alpha-channel of the colors matter; the hue, lightness, etc., don't matter.
- If the `mask-mode` property is set or defaults to `luminance`, the masking value is the luminance value of each color multiplied by its alpha value. The `mask-mode` will resolve to `luminance` if explicitly set to that value, or if the property is set to `match-source` and the `mask-image` source is an SVG `<mask>` that does not have its `mask-type` property or `mask-type` attribute explicitly set to `alpha`.

## Examples

### Gradient as a mask image

In this example, we use an `<image>` value as a mask, defining a CSS radial gradient as our mask image to create a round image with a soft edge.

#### HTML

We include an HTML `` element, which will also be used in all other examples.

```html
<img
  src="https://mdn.github.io/shared-assets/images/examples/progress-pride-flag.jpg"
  alt="Pride flag" />
```

#### CSS

We use the CSS `gradient/radial-gradient` function to create a mask that has a black circle with a radius that is half the width of the mask, before transitioning to being transparent over 10%.

```css
img {
  mask-image: radial-gradient(black 50%, transparent 60%);
}
```

#### Results

The part of the original element that is masked by the black circle is fully opaque, fading to transparent as the mask fades to transparent.

### Image resource as a mask image

In this example, the `<mask-source>` used as our mask image is an external SVG.

#### HTML

We include the same image as the previous example. We've also included the image we will be using as the mask; a star whose `fill-opacity` is `0.5`, or 50% opaque.

```html
<img
  src="https://mdn.github.io/shared-assets/images/examples/progress-pride-flag.jpg"
  alt="Pride flag" />

<img
  src="https://mdn.github.io/shared-assets/images/examples/mask-star.svg"
  alt="A star" />
```

#### CSS

We use `mask-star.svg` as a mask image on our first image:

```css
img:first-of-type {
  mask-image: url("https://mdn.github.io/shared-assets/images/examples/mask-star.svg");
}
```

#### Results

The mask is semi-opaque, which is why the colors are not as vibrant as the previous example. The part of the image that is visible is 50% opaque; the opacity of the mask applied.
The mask is smaller than the image, so repeats by default. We could have used `mask-repeat` to control the repeating or `mask-size` to change the size of the mask, which we do in the next example.

### Multiple masks

This example demonstrates applying multiple masks.

```html
<img
  src="https://mdn.github.io/shared-assets/images/examples/progress-pride-flag.jpg"
  alt="Pride flag" />
```

#### CSS

We apply two masks — the same semi-transparent SVG as in the previous example, and a `gradient/repeating-radial-gradient`. We control the size of the masks using the `mask-size` property. Because our first mask is not sized at 100%, we make sure our masks are centered and don't repeat with the `mask-position` and `mask-repeat` properties, respectively.

```css
img {
  mask-size: 95%, 100%;
  mask-position: center;
  mask-repeat: no-repeat;
  mask-image:
    url("https://mdn.github.io/shared-assets/images/examples/mask-star.svg"),
    repeating-radial-gradient(transparent 0 5px, black 5px 10px);
}
```

#### Results

### Masking with SVG `<mask>`

This example demonstrates using SVG `<mask>` elements as masks. In this case, the color of the mask matters as the `mask-type` value for SVG masks defaults to `luminance`, which means white opaque areas (100% luminance) will be masked and visible, transparent and black areas (0% luminance) will be clipped, and anything in between will be partially masked.

#### HTML

We've included an `id` for each of our four images, and an SVG that contains an equal number of `<mask>` elements.

```html
<img
  id="green"
  src="https://mdn.github.io/shared-assets/images/examples/progress-pride-flag.jpg"
  alt="Pride flag" />
<img
  id="stroke"
  src="https://mdn.github.io/shared-assets/images/examples/progress-pride-flag.jpg"
  alt="Pride flag" />
<img
  id="both"
  src="https://mdn.github.io/shared-assets/images/examples/progress-pride-flag.jpg"
  alt="Pride flag" />
<img
  id="alphaMode"
  src="https://mdn.github.io/shared-assets/images/examples/progress-pride-flag.jpg"
  alt="Pride flag" />

<svg height="0" width="0">
  <mask id="greenMask">
    <path
      d="M20,70 A40,40,0,0,1,100,70 A40,40,0,0,1,180,70 Q180,130,100,190 Q20,130,20,70 Z"
      fill="green" />
  </mask>
  <mask id="strokeMask">
    <path
      d="M20,70 A40,40,0,0,1,100,70 A40,40,0,0,1,180,70 Q180,130,100,190 Q20,130,20,70 Z"
      fill="none"
      stroke="white"
      stroke-width="20" />
  </mask>
  <mask id="bothMask">
    <path
      d="M20,70 A40,40,0,0,1,100,70 A40,40,0,0,1,180,70 Q180,130,100,190 Q20,130,20,70 Z"
      fill="green"
      stroke="white"
      stroke-width="20" />
  </mask>
  <mask id="black">
    <path
      d="M20,70 A40,40,0,0,1,100,70 A40,40,0,0,1,180,70 Q180,130,100,190 Q20,130,20,70 Z"
      fill="black" />
  </mask>
</svg>
```

```html
<p>
  <label>
    <input type="checkbox" />
    Set the <code>mask-mode</code> to <code>alpha</code>.
  </label>
</p>
```

#### CSS

We apply a different `<mask>` to each ``. No part of the last image, with the `black` fill, will be visible by default. In this case, while all colors used in this example are fully opaque, the `mask-mode` defaults to `match-type`, which resolves to `luminance` in this case.

```css
#green {
  mask-image: url("#greenMask");
}
#stroke {
  mask-image: url("#strokeMask");
}
#both {
  mask-image: url("#bothMask");
}
#alphaMode {
  mask-image: url("#black");
}

body:has(:checked) img {
  mask-mode: alpha;
}
```

The luminance values of `black`, `white`, and `green` are `0`, `100`, and `46.228`, respectively. This means the areas where the mask is white will be visible, whereas areas where the mask is black or fully transparent will be clipped (not visible). Areas where the mask is green will be visible but lighter, equivalent to having a white mask that is 46.228% opaque.

#### Results

Toggle the checkbox to toggle the value of the `mask-mode` between `alpha` (checked) and the initial value, which resolves to `luminance` (unchecked). When `alpha` is used, the color of the mask doesn't matter; all that matters is the alpha-transparency. When the value resolves to `luminance`, `white` areas are visible, `black` areas are not, and `green` areas are visible but at an opacity that matches the luminance of the color `green`. When `mask-mode` is set to `alpha`, the colors are equivalent as they are all fully opaque.

## See also

- `mask` shorthand
- `mask-origin`
- `mask-position`
- `mask-repeat`
- `mask-size`
- `mask-border`
- `clip-path`
- `background-image`
- Introduction to CSS masking
- CSS `mask` properties
- Declaring multiple masks
- CSS masking module

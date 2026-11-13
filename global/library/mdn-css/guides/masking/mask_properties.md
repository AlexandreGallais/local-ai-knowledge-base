---
title: "CSS mask properties (part 1 of 4)"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/guides/masking/mask_properties/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSS mask properties

CSS masking is a technique that enables you to define visible portions of an element by applying a mask, which selectively reveals or hides parts of the element based on the alpha channels, and optionally colors, of the applied mask images.

The introductory guide to masking introduces the different types of mask images and their modes. The guide to declaring multiple masks discusses the mask layers and the `mask` shorthand property, providing a brief introduction to the shorthand's component properties. In this guide, we explore these component properties in greater detail and look at how they interact. We also explain how, in cases where multiple mask images are declared, the mask layers are composited, or combined.

CSS masks are composed of one or more mask layers, with a mask layer created for every value in the comma-separated list of `mask` or `mask-image` values, whether the values are images, mask sources, or the keyword `none`. Every `mask-image` is positioned relative to an origin box. The mask images can be sized, repeated, and clipped, then composited together with previous layers to create the final visual mask on the element.

## The `mask-image` property

The minimum requirement to create a mask is a `mask-image` property set to a value other than `none`.
The keyword `none` within a list of mask sources creates a mask layer. However, if `none` is the only value of the `mask-image` property, no masking occurs.

The mask image can be a CSS gradient, an imported image (such as a PNG, SVG, etc.), or an SVG `<mask>` element.

In this example, we create five mask layers, including an imported image, two gradients, a layer with no image, and an SVG `<mask>` source as the mask image.

```css
.masked-element {
  mask-image:
    url("alphaImage.png"), linear-gradient(to right, black, transparent),
    radial-gradient(circle, white 50%, transparent 75%), none, url("#svg-mask");
}
```

Because one of the mask images is specified as `none`, only four mask images are applied to the `.masked-element` element, while creating five mask layers.

### The importance of `none`

The `none` layer generally has no visual effect (see the `mask-composite` property for how it impacts the applied mask), but as each value in a comma-separated list of `mask-*` values applies to a separate mask layer, the `none` value serves an important purpose even when it doesn't change the composited mask.

This fourth layer in our five-layer structure will match the fourth value of any other comma-separated `mask-*` property values. As previously mentioned, the number of layers is determined by the number of comma-separated values in the `mask-image` property value, even if a value is `none`. Each `mask-*` value is matched up with the `mask-image` values, in order. If the number of values in a `mask-*` property differs from the number of mask layers, any excess values are ignored, or, if the property has fewer values than the number of mask layers, the values are repeated.

If a `mask-*` property has a single value, this value applies to all the layers. If we have five values, the fourth value applies to the `none` layer, with the last value being applied to the `<mask>` source layer. If there are two comma-separated values, the first value will apply to all the odd layers only, including that `<mask>` source layer. For example, each `mask-*` property may have a different number of values:

```css
.masked-element {
  mask-image:
    url("alphaImage.png"), linear-gradient(to right, black, transparent),
    radial-gradient(circle, white 50%, transparent 75%), none, url("#svg-mask");
  mask-repeat: repeat-x, repeat-y;
  mask-position:
    center,
    top left,
    bottom right;
}
```

In this case, every odd layer will be repeated along the x-axis while every even layer is repeated along the y-axis. The first and fourth layer images will be centered, while the second and fifth will be positioned in the top left corner. The `none` means the fifth layer's `#svg-mask` image will be repeated along the x-axis starting at the top left corner.

Learn more about mask layers and the `none` keyword.

## The `mask-mode` property

The `mask-mode` property can be used to set the mode of each mask layer to either `alpha` or `luminance`, or allow it to default to the source's mode by setting the value to `match-source`, which is the default. While most `mask-*` properties have an analogous `background-*` property (`mask-image` is analogous to the `background-image` property, for example), `mask-mode` and `mask-composite` have no analogous `background` property.

### Mask types: `alpha` and `luminance`

Each mask is either an `alpha` or a `luminance` mask.

With `alpha` masks, the alpha-transparency of each mask pixel is important. Wherever the mask is opaque, the corresponding parts of the element will be visible. Wherever the mask is transparent, the corresponding parts of the element will be hidden. Wherever the mask is semi-opaque, the element will be equally semi-opaque. The color of the mask doesn't matter, just the alpha-transparency of the colors.

With `luminance` masks, both the brightness of mask's colors and the alpha channel determine the opaqueness of the masked areas.

> **Note:**
> All subsequent examples use the following image as a `background-image` on an element to which masks will be applied:
>
>

This example demonstrates the difference between `alpha` and `luminance` masks. The masks are the same, but in the `alpha` mask, only the alpha-transparency of the gradient mask colors matter. In the `luminance` example, the R, G, B, and A all matter.

Two containers contain images, while the last is empty but is included to display the gradient we will be using as our `mask-image`.

```html
<div class="alpha">
  <img
    src="https://mdn.github.io/shared-assets/images/examples/progress-pride-flag.jpg"
    alt="Pride flag" />
</div>
<div class="luminance">
  <img
    src="https://mdn.github.io/shared-assets/images/examples/progress-pride-flag.jpg"
    alt="Pride flag" />
</div>
<div class="gradient"></div>
```

```css
body {
  display: flex;
  gap: 20px;
  padding: 15px;
  background-image: conic-gradient(
    transparent 90deg,
    rgb(0 0 0 / 0.05) 90deg 180deg,
    transparent 180deg 270deg,
    rgb(0 0 0 / 0.05) 270deg
  );
  background-size: 30px 30px;
}
div,
svg,
img {
  width: 220px;
  aspect-ratio: 1;
}
div {
  border: 1px solid black;
}
```

We declare a `repeating-linear-gradient` with red, transparent, and semi-transparent red diagonal stripes. This gradient is used as our mask and, for the last container, as the background image:

```css
img {
  mask-image: repeating-linear-gradient(
    to bottom right,
    red 0 20px,
    #ff000055 20px 40px,
    transparent 40px 60px
  );
}
.gradient {
  background: repeating-linear-gradient(
    to bottom right,
    red 0 20px,
    #ff000055 20px 40px,
    transparent 40px 60px
  );
}
```

We set different values for the `mask-mode` property for each image:

```css
.alpha img {
  mask-mode: alpha;
}

.luminance img {
  mask-mode: luminance;
}
```

In the `alpha` case, only the transparency of the gradient's colors matter. Where the gradient is opaque red, the image is opaque. Where the gradient is transparent, the image is hidden. Where the gradient is 50% opaque, the image is 50% opaque. In the `luminance` case, the color's brightness matters! See Alpha transparency versus luminance to learn about the equation that uses the color's R, G, B, and A channels to determine the opacity of the mask.

### The `mask-mode` default value: `match-source`

The default value of the `mask-mode` property is `match-source`. This value sets the `mask-mode` to match the mask's mode type. The `match-source` value resolves to `alpha` for every mask except masks where the mask source is an SVG `<mask>` element.

When an SVG `<mask>` element is used as the mask source, the `match-source` value resolves to the value of the `<mask>` element's `mask-type` property. If the `<mask>` element (not the "masked element") doesn't have the CSS `mask-type` property defined, this property defaults to the value of the SVG `mask-type` attribute, if present. If that is omitted as well, the `match-source` value will resolve to `luminance`.

Continuing with the `masked-element` example, if we don't explicitly set the `mask-mode` property, it will default to `match-source` for each layer, as if we had set the following:

```css
.masked-element {
  mask-image:
    url("alphaImage.png"), linear-gradient(to right, black, transparent),
    radial-gradient(circle, white 50%, transparent 75%), none, url("#svg-mask");
  mask-mode: match-source;
}
```

or, using the `mask` shorthand:

```css
.masked-element {
  mask:
    url("alphaImage.png") match-source,
    linear-gradient(to right, black, transparent) match-source,
    radial-gradient(circle, white 50%, transparent 75%) match-source,
    none match-source,
    url("#svg-mask") match-source;
}
```

The first mask layer, `url("alphaImage.png")`, references an image. As this isn't a `<mask>` element within an ``, the `mask-mode` resolves to `alpha`, with the opaque parts of this image making the corresponding parts of the element visible, while the transparent or semi-transparent parts are invisible or partially visible.

The `linear-gradient(to right, black, transparent)` is the second mask layer and `radial-gradient(circle, white 50%, transparent 75%)` is the third. Again, these aren't `<mask>` elements, so the `match-source` value resolves to `alpha`. The masking effect of these layers is determined by the opaqueness of the gradient mask by default.

The fourth mask layer has `none` declared, meaning the mask for this layer is transparent black. The `.masked-element` class sets `mask-mode: match-source;`. Had `mask-mode` instead been a comma-separated list of five different values, the fourth value would have applied to this `none` layer, allowing the fifth value to apply to the fifth layer.

The fifth mask layer is comprised of an SVG `<mask>` element that has `svg-mask` as its `id`. While the default mask mode of the other layers is `alpha`, the default mask type of SVG `<mask>` elements is the `mask-type` value, or, if not set, the `mask-type` attribute. If that isn't defined either, the value defaults to `luminance`. In other words, the masking effect of the `<mask>` is determined by both the brightness and transparency of the `<mask>` element's colors.

If we don't declare the `mask-mode` property at all, and allow it to default to `match-source` for each mask layer, the result in this `.masked-element` case would resolve to:

```css
.masked-element {
  mask-image:
    url("alphaImage.png"), linear-gradient(to right, black, transparent),
    radial-gradient(circle, white 50%, transparent 75%), none, url("#svg-mask");
  mask-mode: alpha, alpha, alpha, match-source, luminance;
}
```

or, using the `mask` shorthand:

```css
.masked-element {
  mask:
    url("alphaImage.png") alpha,
    linear-gradient(to right, black, transparent) alpha,
    radial-gradient(circle, white 50%, transparent 75%) alpha,
    none match-source,
    url("#svg-mask") luminance;
}
```

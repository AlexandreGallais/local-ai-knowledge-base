---
title: "CSS mask properties (part 3 of 4)"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/guides/masking/mask_properties/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSS mask properties (part 3 of 4)

## The `mask-clip` property

The `mask-clip` property determines the area of the element that will be affected by a mask, effectively clipping the element at the defined box edge. It is analogous to the `background-clip` property, but with some different values.

Because the `mask-clip` property accepts all the `mask-origin` values and both have the same `border-box` default value, the two properties may seem similar, but they serve very different purposes. While `mask-origin` determines where a mask image will be positioned, the `mask-clip` property causes the original element to have its content clipped to the specified box. It is important to understand them both: if the `mask-origin` causes the `mask-position` to place the mask image outside the clipping area, the mask will be clipped.

The `mask-clip` property accepts all the `mask-origin` values, as well as its own `no-clip` value. The `no-clip` value sets the painted content not to be clipped. You can still cause the mask image to be clipped by positioning it outside of the border content area using `mask-position` values that are less than zero or resolve to greater than 100%.

Setting the `mask-clip` and `mask-origin` to different values can cause the mask layer image to be clipped. For example, if an element with a border and padding has `mask-clip` set to `content-box` and `mask-origin` set to `border-box`, and the `mask-position` is set to the `top left` edge, the mask layer image will be clipped at the top-left edge.

The next example adds clipping options to the previous example to demonstrate the different non-SVG `mask-clip` values and to show how they impact the different `mask-origin` values.

```html
<div class="border-box">
  <img
    src="https://mdn.github.io/shared-assets/images/examples/progress-pride-flag.jpg"
    alt="Pride flag" />
</div>
<fieldset>
  <legend>Set the <code>mask-clip</code> value</legend>
  <label
    ><input type="radio" name="clip" id="clip_border-box" checked />
    border-box</label
  >
  <label
    ><input type="radio" name="clip" id="clip_padding-box" /> padding-box</label
  >
  <label
    ><input type="radio" name="clip" id="clip_content-box" /> content-box</label
  >

  <label><input type="radio" name="clip" id="clip_no-clip" /> no-clip</label>
</fieldset>
<fieldset>
  <legend>Set the <code>mask-origin</code> value</legend>
  <label
    ><input type="radio" name="origin" id="origin_border-box" checked />
    border-box</label
  >
  <label
    ><input type="radio" name="origin" id="origin_padding-box" />
    padding-box</label
  >
  <label
    ><input type="radio" name="origin" id="origin_content-box" />
    content-box</label
  >
</fieldset>
```

```css
:has(#clip_border-box:checked) img {
  mask-clip: border-box;
}
:has(#clip_padding-box:checked) img {
  mask-clip: padding-box;
}
:has(#clip_content-box:checked) img {
  mask-clip: content-box;
}
```

The first mask is placed at the top-left edge of the mask origin container, then repeated. If the origin box is the `border-box` and the clipping region is the `content-box`, the top and left areas of the mask origin container will be clipped. Generally, you will want the `mask-clip` to be the same as the `mask-origin`.

Continuing with the `masked-element` example, if we don't explicitly set the `mask-clip` property, it will default to `border-box` for each layer, as if we had set the following:

```css
.masked-element {
  mask-image:
    url("alphaImage.png"), linear-gradient(to right, black, transparent),
    radial-gradient(circle, white 50%, transparent 75%), none, url("#svg-mask");
  mask-mode: match-source;
  mask-position: 0% 0%;
  mask-origin: border-box;
  mask-clip: border-box;
}
```

or, expanding on the example using the `mask` shorthand:

```css
.masked-element {
  mask:
    url("alphaImage.png") 0% 0% border-box border-box match-source,
    linear-gradient(to right, black, transparent) 0% 0% border-box border-box
      match-source,
    radial-gradient(circle, white 50%, transparent 75%) 0% 0% border-box
      border-box match-source,
    none 0% 0% border-box border-box match-source,
    url("#svg-mask") 0% 0% border-box border-box match-source;
}
```

In the `mask` shorthand, if only one `<geometry-box>` value is given, it sets both the `mask-origin` and `mask-clip` property values. If two `<geometry-box>` values are present, the first defines the `mask-origin` and the second defines the `mask-clip`.

For mask layer images that do not reference an SVG `<mask>` element, the `mask-clip` property defines whether the mask painting area, or the area affected by the mask, is the border, padding, or content box. The painted content of the element will be restricted to this area.

When the mask layer's `mask-image` source is a `<mask>`, the `mask-clip` property has no effect. Rather, the `<mask>` element's `x`, `y`, `width`, `height`, and `maskUnits` attributes determine the mask painting area.

## The `mask-size` property

The `mask-size` property is used to size mask layers. This property is analogous to the `background-size` property, taking the same values. When sizing your masks, remember that areas of the element not covered by the mask images are hidden.

There are three ways to declare a `mask-size`:

- the `cover` or `contain` keyword,
- one length, percentage, or the keyword `auto`, or
- two values that are a combination of lengths, percentages, and the keyword `auto`.

The mask image can be left to its natural size, stretched, or constrained to fit the available space. The aspect ratio of the mask image is maintained by default, but declaring two `<length-percentage>` values can distort the mask image if the ratio of the two values is not the same as the original image (`mask-repeat: round` is the other property/value pair that may distort the mask image).

If the `mask-size` is set to `contain`, the mask image will be the largest size it can be while being fully contained within the mask positioning area. In this case, the mask image is not clipped, but rather, it is fully contained.

When set to `cover`, the mask image will be the smallest size it can be to fully cover the entire mask-positioning area, with the mask being clipped if the mask's aspect ratio differs from the aspect ratio of the mask-positioning area.

In other words, With `cover` and `contain`, at least one dimension of the mask will be the same size as the mask-positioning area's same dimension; the mask image either grows or shrinks so that either the width is the same width as the mask positioning area or the mask image's height is equal to the mask positioning area's height.

With `cover`, `contain`, and `<percentage>` values, the size is relative to the origin box. In our star-mask and flag image example, the aspect ratio of both the mask image and the `` are `1:1`, meaning in this case `cover`, `contain`, and `100%` will all produce the same sized mask. This example demonstrates how, when `mask-size` is set to `cover`, `contain` or a `<percentage>` value, the actual size of the mask may differ depending on the value of the `mask-origin` property:

```html
<div class="border-box">
  <img
    src="https://mdn.github.io/shared-assets/images/examples/progress-pride-flag.jpg"
    alt="Pride flag" />
</div>
<fieldset>
  <legend>Set the <code>mask-origin</code> value</legend>
  <label
    ><input type="radio" name="origin" id="border-box" checked />
    border-box</label
  >
  <label
    ><input type="radio" name="origin" id="padding-box" /> padding-box</label
  >
  <label
    ><input type="radio" name="origin" id="content-box" /> content-box</label
  >
</fieldset>
```

```css
img {
  mask-image: url("https://mdn.github.io/shared-assets/images/examples/mask-star.svg");
  mask-position: top left;
  padding: 15px;
  border: 15px solid;
  background-color: green;
}
```

```css
img {
  mask-size: 100%;
}
:has(#border-box:checked) img {
  mask-origin: border-box;
}
:has(#padding-box:checked) img {
  mask-origin: padding-box;
}
:has(#content-box:checked) img {
  mask-origin: content-box;
}
```

Change the value of the `mask-origin` property to see how the different values impact the mask size:

This example included one `<percentage>` value. When one `<length-percentage>` value is specified, it defines only the mask width, with the height defaulting to `auto`, which maintains the aspect ratio. When two values are specified, the first defines the mask width and the second defines its height.

The default value of `mask-size` is `auto`, rendering the mask at its intrinsic size, the size at which the mask would be displayed if no CSS were applied. The underlying aspect ratio of the mask image is maintained if you set a single `<length-percentage>` value, or two values in the same ratio as the aspect ratio. If you declare two values not in the same ratio as the aspect ratio, the mask image is distorted.

Like with all longhand components of shorthand property, if the `mask` shorthand property is set and the value of the `mask-size` property is not defined within any mask layer, the `mask-size` value is reset to its initial value of `auto` for those mask layers.

If the image has no intrinsic proportion, for example in the case of a CSS gradient, the default `auto` is the entirety of the mask positioning area as set by the `mask-origin` property.

Continuing with the `masked-element` example, if we don't explicitly set the `mask-size` property, it will default to `auto` for each layer, as if we had set the following:

```css
.masked-element {
  mask-image:
    url("alphaImage.png"), linear-gradient(to right, black, transparent),
    radial-gradient(circle, white 50%, transparent 75%), none, url("#svg-mask");
  mask-mode: match-source;
  mask-position: 0% 0%;
  mask-origin: border-box;
  mask-clip: border-box;
  mask-size: auto;
}
```

or, expanding on the example using the `mask` shorthand, with the `mask-size` component going after the `mask-position` value, separated by a forward slash (/):

```css
.masked-element {
  mask:
    url("alphaImage.png") 0% 0% / auto border-box border-box match-source,
    linear-gradient(to right, black, transparent) 0% 0% / auto border-box
      border-box match-source,
    radial-gradient(circle, white 50%, transparent 75%) 0% 0% / auto border-box
      border-box match-source,
    none 0% 0% / auto border-box border-box match-source,
    url("#svg-mask") 0% 0% / auto border-box border-box match-source;
}
```

## The `mask-repeat` property

The `mask-repeat` property defines how mask images are repeated, or tiled, after the initial mask image has been sized and positioned. The `mask-repeat` property defines if and how that mask image is repeated along the horizontal and vertical axes. In most of the previous examples, you may have noticed the star mask repeated along the X and Y axes. This is because `repeat` is the default value.

The `mask-repeat` property is analogous to the `background-repeat` property, accepting the same `<repeat-style>` values. As is the case with `background-repeat`, the first (and possibly only) mask-image repetition is positioned by the `*-position` property and sized by the `*-size` property. The positions of the repeated background or mask images are based on this initial image instance.

Continuing with the `masked-element` example, if we don't explicitly set the `mask-repeat` property, it will default to `repeat` for each layer, as if we had set the following:

```css
.masked-element {
  mask-image:
    url("alphaImage.png"), linear-gradient(to right, black, transparent),
    radial-gradient(circle, white 50%, transparent 75%), none, url("#svg-mask");
  mask-mode: match-source;
  mask-position: 0% 0%;
  mask-origin: border-box;
  mask-clip: border-box;
  mask-size: auto;
  mask-repeat: repeat;
}
```

or, expanding on the example using the `mask` shorthand:

```css
.masked-element {
  mask:
    url("alphaImage.png") 0% 0% / auto repeat border-box border-box match-source,
    linear-gradient(to right, black, transparent) 0% 0% / auto repeat border-box
      border-box match-source,
    radial-gradient(circle, white 50%, transparent 75%) 0% 0% / auto repeat
      border-box border-box match-source,
    none 0% 0% / auto repeat border-box border-box match-source,
    url("#svg-mask") 0% 0% / auto repeat border-box border-box match-source;
}
```

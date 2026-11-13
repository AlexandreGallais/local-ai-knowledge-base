---
title: "CSS mask properties (part 2 of 4)"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/guides/masking/mask_properties/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSS mask properties (part 2 of 4)

## The `mask-position` property

Analogous to the `background-position` property, the `mask-position` property sets the initial position of the mask image relative to the mask layer's origin box, defined by the `mask-origin` property. The syntax follows the `background-position`'s `<position>` syntax, with the value being one, two, or four `<position>` values, defining one to two relative or absolute position offsets.

### One-value syntax

If only one keyword value is specified, that value specifies the mask origin edge against which the mask will be placed with the other dimension being `center`.

If only one `<length-percentage>` value is specified, this specifies the X coordinate relative to the left edge of the mask origin, with the Y coordinate set to `50%`.

If two keyword values are specified, the order of the value doesn't matter, but the value cannot include two vertical or two horizontal axis values; `left right` and `top bottom` are both invalid.

### Two-value syntax

If two values are present, including one keyword and one `<length-percentage>` value, the order only matters if the keyword is `center`:

- If the keyword is `left` or `right`, it defines the X coordinate relative to the left edge, and the value defines the Y coordinate relative to the top edge.
- Similarly, a `top` or `bottom` keyword defines the Y coordinate positioning the element against the top or bottom edge, respectively, with the other value defining the X value relative to the left edge of the mask origin box.
- When one value is the `center` keyword and the other is a `<length-percentage>`, the first value defines the horizontal position and the second value defines the vertical position.

If two values are present and both are `<length-percentage>` values, the order again matters; the first value defines the horizontal positioning as an offset from the left edge of the mask-positioning area while the second value defines the vertical position as an offset from the top edge of the mask-positioning area.

### Four-value syntax

Mask positions can also be relative to corners other than the top left. The four-value syntax enables offsetting the mask from any corner. The value includes two `length-percentage` offsets, each preceded by the origin side for that offset. Whether you declare the horizontal or vertical pair first doesn't matter, but you must declare the origin-side keyword (`left`, `right`, `top`, `bottom`, `x-start`, `x-end`, `y-start`, `y-end`, `block-start`, `block-end`, `inline-start`, or `inline-end`) before the offset `<length-percentage>` in each pair, and the two origin-sides can't be from the same axis.

In the two `<length-percentage>` syntax, the origin sides are `top` and `left`, in that order. For example, `mask-position: 10px 20px` is the equivalent of `mask-position: left 10px top 20px`. When offsetting from the top and left, the offset sides aren't required, but the order matters. With the four value syntax, you can use `mask-position` to offset the mask image from any edge combinations, such as `left 10px bottom 20px`, and the order of the sides doesn't matter, as the offset edge is defined by the keyword preceding it rather than the declaration order.

### Percentage values

When offsetting using percentage values, the mask's dimension is subtracted from the element's dimension, just as is done with percentage offsets with `background-position`.

### Positioning repeating mask images

The `mask-position` property defines the initial position of the mask image. By "initial position", if the mask repeats, the browser places the first mask image in the position defined by the `mask-position` property, thus defining the placement of the mask repetitions.

In this example, we set the position of the first image to `bottom right`, meaning the first mask will be placed at the bottom right edge of the mask origin box. Because mask images repeat by default, the repeating masks will be positioned against the first placed mask's top and left sides.

```html
<div class="keywords">
  <img
    src="https://mdn.github.io/shared-assets/images/examples/progress-pride-flag.jpg"
    alt="Pride flag" />
</div>
<div class="twoValue">
  <img
    src="https://mdn.github.io/shared-assets/images/examples/progress-pride-flag.jpg"
    alt="Pride flag" />
</div>
<div class="fourValue">
  <img
    src="https://mdn.github.io/shared-assets/images/examples/progress-pride-flag.jpg"
    alt="Pride flag" />
</div>
```

```css
div,
img {
  width: calc(30vw - 20px);
}
```

```css
img {
  mask-image: url("https://mdn.github.io/shared-assets/images/examples/mask-star.svg");
}
.keywords img {
  mask-position: bottom right;
}
.twoValue img {
  mask-position: -20px -10px;
}
.fourValue img {
  mask-position: right -20px bottom -10px;
}
```

```css
div::before {
  content: 'class="' attr(class) '"';
  display: block;
  text-align: center;
  font-family: monospace;
}
body {
  flex-flow: row wrap;
}
```

The `mask-position` defines the position of the first mask image's placement. This demo shows where the first image is placed:

```css
img {
  mask-repeat: no-repeat;
}
```

Because the default value for the `mask-repeat` property is `repeat`, the images are repeated along the X and Y axes, based on the position of that first mask:

The two-value example defines the top and left offsets of the original mask. The four-value example combines the previous two previous examples, position the first mask using the same offsets as the second image, but from the same edges as demonstrated in the first image.

In the first image, the first star to be placed is the one on the bottom right, with the repeated stars above and to the left. Because of this positioning, the initial star is not clipped, but the top-most and left-most stars are.

If we don't explicitly set the `mask-position` property, it will default to `0% 0%` for each layer, with the top-left corner of the mask abutting the top-left corner of the mask origin box. Continuing with the `masked-element` example, it is as if we had set the following:

```css
.masked-element {
  mask-image:
    url("alphaImage.png"), linear-gradient(to right, black, transparent),
    radial-gradient(circle, white 50%, transparent 75%), none, url("#svg-mask");
  mask-mode: match-source;
  mask-position: 0% 0%;
}
```

or, expanding on the example using the `mask` shorthand:

```css
.masked-element {
  mask:
    url("alphaImage.png") 0% 0% match-source,
    linear-gradient(to right, black, transparent) 0% 0% match-source,
    radial-gradient(circle, white 50%, transparent 75%) 0% 0% match-source,
    none 0% 0% match-source,
    url("#svg-mask") 0% 0% match-source;
}
```

## The `mask-origin` property

When an element has padding, a border, or both, the `mask-origin` property defines which of these box edge values acts as the mask origin box, or the _mask positioning area_, within which a mask image is positioned, for that layer. The `mask-origin` property is analogous to the `background-origin` property, but with a different initial value and SVG-only values.

HTML elements can have masks contained within their content border box, padding box, or content box. For example, if the `mask-position` is `top left`, is that relative to the border's outer edge, the padding's outer edge, or the content's outer edge?

In the `mask-position` masking example, the position defined was relative to the border-box (the default behavior), although it is worth noting that the `` had no border or padding set, therefore the content-box, padding-box, and border-box origins would all be the same in this case.

```html
<div class="border-box">
  <img
    src="https://mdn.github.io/shared-assets/images/examples/progress-pride-flag.jpg"
    alt="Pride flag" />
</div>
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
div {
  all: unset;
}
legend {
  align-self: baseline;
}
label {
  display: block;
}
```

In this example, the `mask-position` places the initial mask in the top left corner of the `` element that has a large border and padding, with a green background color to enable seeing the star masking on the padding area.

```css
img {
  mask-image: url("https://mdn.github.io/shared-assets/images/examples/mask-star.svg");
  mask-position: top left;
  padding: 15px;
  border: 15px solid;
  background-color: green;
}
:has(#origin_border-box:checked) img {
  mask-origin: border-box;
}
:has(#origin_padding-box:checked) img {
  mask-origin: padding-box;
}
:has(#origin_content-box:checked) img {
  mask-origin: content-box;
}
```

Change the value of the `mask-origin` property by changing the selected radio button, looking at the position of the top left star mask as you do so.

The default value is `border-box`. With this value, the initial mask is placed at the border's top-left edge and is not clipped. When the initial mask is placed at the outer or inner edge of the padding, there is room above it and to the left; these repeating masks are clipped.

Continuing with the `masked-element` example, if we don't explicitly set the `mask-origin` property, it will default to `border-box` for each layer, as if we had set the following:

```css
.masked-element {
  mask-image:
    url("alphaImage.png"), linear-gradient(to right, black, transparent),
    radial-gradient(circle, white 50%, transparent 75%), none, url("#svg-mask");
  mask-mode: match-source;
  mask-position: 0% 0%;
  mask-origin: border-box;
}
```

or, expanding on the example using the `mask` shorthand:

```css
.masked-element {
  mask:
    url("alphaImage.png") 0% 0% border-box match-source,
    linear-gradient(to right, black, transparent) 0% 0% border-box match-source,
    radial-gradient(circle, white 50%, transparent 75%) 0% 0% border-box
      match-source,
    none 0% 0% border-box match-source,
    url("#svg-mask") 0% 0% border-box match-source;
}
```

For SVG elements, which don't have the associated CSS layout boxes, a mask can be contained inside the SVG element's fill, stroke, or view box.

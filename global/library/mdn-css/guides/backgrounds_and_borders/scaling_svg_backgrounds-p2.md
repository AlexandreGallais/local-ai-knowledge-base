---
title: "Scaling SVG backgrounds (part 2 of 2)"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/guides/backgrounds_and_borders/scaling_svg_backgrounds/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Scaling SVG backgrounds (part 2 of 2)

## Scaling examples

Now let's see some examples of what happens as we apply different scaling to these images. In each of the examples below, the enclosing `` elements are 300 pixels wide and 200 pixels tall, with a 2 pixel-wide border. To ensure we display the SVG background image only once for these demonstrations, we set `background-repeat` to `no-repeat`.

```css
div {
  width: 300px;
  height: 200px;
  background-repeat: no-repeat;
  border: 2px solid black;
}
```

### Specifying fixed lengths for both dimensions

If you use `background-size` to specify fixed lengths for both dimensions, those lengths are always used, per rule 1 above. In other words, the image will always get stretched to the dimensions you specify, regardless of whether or not the source image has specified its dimensions and/or aspect ratio.

#### No dimensions or intrinsic ratio

In this example, the image has no dimensions or intrinsic ratio set:

```html
<div></div>
```

```css
div {
  width: 300px;
  height: 200px;
  background-repeat: no-repeat;
  border: 2px solid black;
}
```

```css
div {
  background-image: url("no-dimensions-or-ratio.svg");
  background-size: 125px 175px;
}
```

#### One specified dimension, no intrinsic ratio

In this example, the image has one dimension specified, and no intrinsic ratio set:

```html
<div></div>
```

```css
div {
  width: 300px;
  height: 200px;
  background-repeat: no-repeat;
  border: 2px solid black;
}
```

```css
div {
  background-image: url("100px-wide-no-height-or-ratio.svg");
  background-size: 250px 150px;
}
```

#### One specified dimension with intrinsic ratio

```html
<div></div>
```

In this example, the image has one dimension explicitly set, along with an intrinsic ratio, meaning both dimensions are effectively defined. Setting an absolute height and width for `background-size` overrides the dimensions set in the SVG:

```css
div {
  width: 300px;
  height: 200px;
  background-repeat: no-repeat;
  border: 2px solid black;
}
```

```css
div {
  background-image: url("100px-height-3x4-ratio.svg");
  background-size: 275px 125px;
}
```

#### No specified width or height with intrinsic ratio

In this example, the image has an intrinsic ratio but no dimensions set:

```html
<div></div>
```

```css
div {
  width: 300px;
  height: 200px;
  background-repeat: no-repeat;
  border: 2px solid black;
}
```

```css
div {
  background-image: url("no-dimensions-1x1-ratio.svg");
  background-size: 250px 100px;
}
```

### Using contain or cover

Specifying `cover` for `background-size` makes the picture as small as possible while still covering the entire background area. `contain`, on the other hand, makes the image as large as possible while not being clipped by the background area.

For an image with an intrinsic ratio, exactly one size matches the `cover`/fit criteria alone. But if there is no intrinsic ratio specified, `cover`/fit isn't sufficient, so the large/small constraints choose the resulting size.

#### No dimensions or intrinsic ratio

In this example, the image has no dimensions or intrinsic ratio set. If an image doesn't specify either dimensions or an intrinsic ratio, neither rule 2 nor rule 3 apply, so rule 4 takes over: the background image is rendered covering the entire background area. This satisfies the largest-or-smallest constraint.

```html
<div></div>
```

```css
div {
  width: 300px;
  height: 200px;
  background-repeat: no-repeat;
  border: 2px solid black;
}
```

```css
div {
  background-image: url("no-dimensions-or-ratio.svg");
  background-size: contain;
}
```

#### One specified dimension, no intrinsic ratio

In this example, with the image having one dimension specified but no intrinsic ratio, rule 4 applies, and the image is scaled to cover the entire background area.

```html
<div></div>
```

```css
div {
  width: 300px;
  height: 200px;
  background-repeat: no-repeat;
  border: 2px solid black;
}
```

```css
div {
  background-image: url("100px-wide-no-height-or-ratio.svg");
  background-size: contain;
}
```

#### One specified dimension with intrinsic ratio

In these examples, the image has one dimension explicitly set, along with an intrinsic ratio.

Things change when you specify an intrinsic ratio. In this case, rule 1 isn't relevant, so rule 2 is applied: we try to preserve any intrinsic ratio (while respecting `contain` or `cover`). For example, preserving a 3:4 intrinsic aspect ratio for a 300x200 box with `contain` means drawing a 150x200 background.

##### contain case

```html
<div></div>
```

Given this CSS:

```css
div {
  width: 300px;
  height: 200px;
  background-repeat: no-repeat;
  border: 2px solid black;
}
```

```css
div {
  background-image: url("100px-height-3x4-ratio.svg");
  background-size: contain;
}
```

Notice how the entire image is rendered, fitting as best as possible into the box without clipping any of it away.

##### cover case

```html
<div></div>
```

```css
div {
  width: 300px;
  height: 200px;
  background-repeat: no-repeat;
  border: 2px solid black;
}
```

```css
div {
  background-image: url("100px-height-3x4-ratio.svg");
  background-size: cover;
}
```

Here, the 3:4 ratio is preserved while still stretching the image to fill the entire box. That causes the bottom of the image to be clipped away.

#### No dimensions with intrinsic ratio

These example use the image with an intrinsic ratio set but no defined dimensions. When using an image with no intrinsic dimensions but an intrinsic ratio, things work similarly.

##### contain case

```html
<div></div>
```

```css
div {
  width: 300px;
  height: 200px;
  background-repeat: no-repeat;
  border: 2px solid black;
}
```

```css
div {
  background-image: url("no-dimensions-1x1-ratio.svg");
  background-size: contain;
}
```

Notice that the image is sized to fit the smallest dimension while preserving the 1:1 aspect ratio.

##### cover case

```html
<div></div>
```

```css
div {
  width: 300px;
  height: 200px;
  background-repeat: no-repeat;
  border: 2px solid black;
}
```

```css
div {
  background-image: url("no-dimensions-1x1-ratio.svg");
  background-size: cover;
}
```

Here, the image is sized so that it fills the largest dimension. The 1:1 aspect ratio has been preserved, although with this source image, that can be difficult to see.

### Automatic sizing using "auto" for both dimensions

If `background-size` is set to `auto` or `auto auto`, rule 2 says that rendering must preserve any intrinsic ratio that's provided.

#### No dimensions or intrinsic ratio

When auto-sizing background images with no intrinsic ratio or dimensions specified, rule 4 takes effect, and the image is rendered to fill the background area.

```html
<div></div>
```

```css
div {
  width: 300px;
  height: 200px;
  background-repeat: no-repeat;
  border: 2px solid black;
}
```

```css
div {
  background-image: url("no-dimensions-or-ratio.svg");
  background-size: auto auto;
}
```

#### One dimension and no intrinsic ratio

If no intrinsic ratio is specified, but at least one dimension is specified, rule 3 takes effect, and we render the image obeying those dimensions.

```html
<div></div>
```

```css
div {
  width: 300px;
  height: 200px;
  background-repeat: no-repeat;
  border: 2px solid black;
}
```

```css
div {
  background-image: url("100px-wide-no-height-or-ratio.svg");
  background-size: auto auto;
}
```

Note here that the width, which is specified in the source SVG at 100 pixels, is obeyed, while the height fills the background area since it's not specified (either explicitly or by an intrinsic ratio).

#### One dimension and an intrinsic ratio

If we have an intrinsic ratio with a fixed dimension, that fixes both dimensions in place. As previously mentioned, knowing one dimension and a ratio is the same as specifying both dimensions explicitly.

```html
<div></div>
```

```css
div {
  width: 300px;
  height: 200px;
  background-repeat: no-repeat;
  border: 2px solid black;
}
```

```css
div {
  background-image: url("100px-height-3x4-ratio.svg");
  background-size: auto auto;
}
```

Since this image has an explicit height of `100px`. With the 3:4 ratio set in the SVG, in the case of `auto`, the image's width is 75 pixels.

#### No fixed dimensions with intrinsic ratio

When an intrinsic ratio is specified, but no dimensions, rule 4 is applied — except that rule 2 also applies. The image is therefore rendered just like for the `contain` case.

```html
<div></div>
```

```css
div {
  width: 300px;
  height: 200px;
  background-repeat: no-repeat;
  border: 2px solid black;
}
```

```css
div {
  background-image: url("no-dimensions-1x1-ratio.svg");
  background-size: auto auto;
}
```

### Using "auto" and one specific length

Given rule 1, specified dimensions are always used, so we need to use our rules only to determine the second dimension.

#### No dimensions or intrinsic ratio

If the image has no dimensions or intrinsic ratio, rule 4 applies, and we use the background area's dimension to determine the value for the `auto` dimension.

```html
<div></div>
```

```css
div {
  width: 300px;
  height: 200px;
  background-repeat: no-repeat;
  border: 2px solid black;
}
```

```css
div {
  background-image: url("no-dimensions-or-ratio.svg");
  background-size: auto 140px;
}
```

Here, the width is determined using the background area's width per rule 4, while the height is the `140px` specified in the CSS.

#### One specified dimension with no intrinsic ratio

If the image has one specified dimension but no intrinsic ratio, that specified dimension is used per rule 3 if that dimension is set to `auto` in the CSS.

```html
<div></div>
```

```css
div {
  width: 300px;
  height: 200px;
  background-repeat: no-repeat;
  border: 2px solid black;
}
```

```css
div {
  background-image: url("100px-wide-no-height-or-ratio.svg");
  background-size: 200px auto;
}
```

Here, the `200px` specified in the CSS overrides the `100px` width specified in the SVG, per rule 1. Since there's no intrinsic ratio or height provided, `auto` selects the height of the background area as the height for the rendered image.

```html
<div></div>
```

```css
div {
  width: 300px;
  height: 200px;
  background-repeat: no-repeat;
  border: 2px solid black;
}
```

```css
div {
  background-image: url("100px-wide-no-height-or-ratio.svg");
  background-size: auto 125px;
}
```

In this case, the width is specified as `auto` in the CSS, so the `100px` width specified in the SVG is selected, per rule 3. The height is set at `125px` in the CSS, so that is selected per rule 1.

#### One specified dimension with intrinsic ratio

When a dimension is specified, rule 1 applies that dimension from the SVG to the rendered background unless specifically overridden by the CSS. When an intrinsic ratio is also specified, that's used to determine the other dimension.

```html
<div></div>
```

```css
div {
  width: 300px;
  height: 200px;
  background-repeat: no-repeat;
  border: 2px solid black;
}
```

```css
div {
  background-image: url("100px-height-3x4-ratio.svg");
  background-size: 150px auto;
}
```

In this case, we use the width of the image specified in the CSS set at `150px`, so rule 1 is applied. The intrinsic 3:4 aspect ratio then determines the height for the `auto` case.

#### No specified dimensions with intrinsic ratio

If no dimensions are specified in the SVG, the specified dimension in the CSS is applied, then the intrinsic ratio is used to select the other dimension, per rule 2.

```html
<div></div>
```

```css
div {
  width: 300px;
  height: 200px;
  background-repeat: no-repeat;
  border: 2px solid black;
}
```

```css
div {
  background-image: url("no-dimensions-1x1-ratio.svg");
  background-size: 150px auto;
}
```

The width is set by the CSS to `150px`. The `auto` value for the height is computed using that width and the 1:1 aspect ratio to be `150px` as well.

## See also

- `background-size`
- CSS backgrounds and borders module

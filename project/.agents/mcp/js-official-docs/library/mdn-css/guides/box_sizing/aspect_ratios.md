---
title: "Understanding and setting aspect ratios (part 1 of 2)"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/guides/box_sizing/aspect_ratios/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Understanding and setting aspect ratios

Every element rendered to the page has a height and a width, and, therefore, an aspect ratio, which is the ratio between the width and height. The natural dimensions of a media object, which are its size without any sizing, scaling, zooming, or borders applied, are known as its natural or intrinsic size. An element's intrinsic size is determined by the element itself, not by applying formatting such as box sizing or setting border, margin, or padding widths.

When developing sites, you often want to be able to set the width of an element to a percentage of the viewport or parent container size and have the height change size proportionally, thereby maintaining a specific aspect ratio depending on the size of the viewport. For replaced elements, like images and videos, maintaining a specific aspect ratio is not only necessary for creating responsive web design, but also a vital component of providing good user experience. Setting an asset's aspect ratio prevents loading jank—the layout shift that occurs when media loads after the page has already been painted, causing a reflow because the space for the asset has not been reserved.

Using CSS, you can adjust the size of replaced and non-replaced elements based on their aspect ratio. In this guide, we will learn about the `aspect-ratio` property, discuss aspect ratios for replaced and non-replaced elements, and then examine some common aspect ratio use cases.

## How the `aspect-ratio` property works

The CSS `aspect-ratio` property value defines the preferred width-to-height ratio of an element's box. The value is either a `ratio`, the keyword `auto`, or a space-separated combination of both.

The `<ratio>` is the ratio of the width and height, in that order. It is represented by two positive `number` values separated by a forward slash (`/`) or a single `<number>`. When a single number is used, it is the same as writing the ratio as `<number> / 1`, which is also the width divided by the height.

The following values are all equivalent:

```css
aspect-ratio: 3 / 6;
aspect-ratio: 1 / 2;
aspect-ratio: 0.5 / 1;
aspect-ratio: 0.5;
```

The following values are also all equivalent:

```css
aspect-ratio: 9/6;
aspect-ratio: 3/2;
aspect-ratio: 1.5;
```

```html
<div>0.5</div>
<div>1.5</div>
```

```css
div {
  height: 121px;
  aspect-ratio: 0.5;
  background-color: pink;
  line-height: 100px;
  text-align: center;
  float: left;
  background-image:
    repeating-linear-gradient(to right, black 0px 1px, transparent 1px 20px),
    repeating-linear-gradient(black 0px 1px, transparent 1px 20px);
  background-size:
    181px 5px,
    5px 121px;
  background-repeat: no-repeat;
}

div + div {
  aspect-ratio: 1.5;
  background-color: lightgreen;
  margin-left: 10px;
}
```

The effect of the `auto` keyword depends on whether the element on which it is applied is a replaced element or not. For replaced elements with an intrinsic aspect ratio, `auto` means the intrinsic aspect ratio should be used. In all other instances, the `auto` value means the box has no preferred aspect ratio. In both cases, this is the default behavior as if no `aspect-ratio` property were applied.

When the value contains both the `auto` keyword and a `<ratio>` value, such as `aspect-ratio: auto 2 / 3;` or `aspect-ratio: 0.75 auto;`, the `auto` value is applied to replaced elements with a natural aspect ratio and the specified ratio of the `width / height` or `<number>` is used as the preferred aspect ratio.

You will have noticed the word "preferred" in the definitions above. The `aspect-ratio` value is not always applied when set. The `aspect-ratio` property sets a "preferred" aspect ratio, so only ever has an effect if at least one of the box's sizes is automatic.

When both the height and width or inline and block sizes are explicitly set, the `aspect-ratio` property value is ignored. In this case, no dimension is allowed to be automatically sized - the preferred sizes are explicitly set - so the `aspect-ratio` property has no effect. When you declare both the inline and block dimensions, those take precedence.

With replaced elements, if you don't explicitly set a value (other than `auto`) to either dimension, both will default to their intrinsic size (any `aspect-ratio` value isn't applied). The `aspect-ratio` will apply to non-replaced elements that don't have a dimension explicitly set, as non-replaced elements are either intrinsically or extrinsically sized, getting their size from their content, container, box model properties, etc.

When an element is rendered to the page, if no CSS is applied and no HTML sizing attributes are included, the user agent will render the object at its natural size.

## Adjusting aspect ratios of replaced elements

Replaced elements like `` and `` are replaced with media that have set dimensions and, therefore, an intrinsic aspect ratio. Consider a raster image, such as a JPEG, PNG, or GIF. If you place an image on a page and do not set a height or width, either via `` attributes or with CSS, it will be displayed at its intrinsic size.

```html
<img
  src="https://mdn.github.io/shared-assets/images/examples/progress-pride-flag.jpg?image=good"
  alt="220 pixel square pride flag" />
```

This is a `220px` square image with no CSS applied; it is displayed at its intrinsic or default size.

If replaced content is auto-sized or you provide a size for only one dimension, such as setting a value for `width`, the browser will automatically resize the other dimension, in this case, the height, while maintaining the media's original aspect ratio.

In this example, only the `width` is set on the image, so the user agent preserves its aspect ratio. The same image is repeated three times, displayed at different widths: `55px`, `110px`, and at its natural size of `220px` via the `width: auto` value.

```html
<img
  src="https://mdn.github.io/shared-assets/images/examples/progress-pride-flag.jpg"
  alt="Pride flag" />
<img
  src="https://mdn.github.io/shared-assets/images/examples/progress-pride-flag.jpg"
  alt="Pride flag" />
<img
  src="https://mdn.github.io/shared-assets/images/examples/progress-pride-flag.jpg"
  alt="Pride flag" />
```

```css
img {
  width: 55px;
  margin-right: 5px;
}

img + img {
  width: 110px;
}

img + img + img {
  width: auto;
}
```

Only when you provide sizes for both dimensions is there a risk of distorting the replaced element. For example, setting `width: 100vw;` and `height: 100vh;` on an image creates a variable aspect ratio; the image will appear either stretched or squashed when the viewport's aspect ratio differs from the image's natural aspect ratio.

In this example, the same image is repeated three times, explicitly sized with the same `height` value (`110px`) but different `width` values (`55px`, `110px`, and `220px`).

```html
<img
  src="https://mdn.github.io/shared-assets/images/examples/progress-pride-flag.jpg"
  alt="Pride flag" />
<img
  src="https://mdn.github.io/shared-assets/images/examples/progress-pride-flag.jpg"
  alt="Pride flag" />
<img
  src="https://mdn.github.io/shared-assets/images/examples/progress-pride-flag.jpg"
  alt="Pride flag" />
```

```css
img {
  width: 55px;
  height: 110px;
}

img + img {
  width: 110px;
}

img + img + img {
  width: 220px;
}
```

We have distorted the images intentionally by setting both a `height` and `width`: we've squashed the first one and stretched the third.

We could have created this same distorted effect using the CSS `aspect-ratio` property, by setting a single dimension (not both or neither) and providing a value other than `1` (or `1 / 1`). You likely don't want to do this, but it's good to know that it's possible.

```html
<img
  src="https://mdn.github.io/shared-assets/images/examples/progress-pride-flag.jpg"
  alt="Pride flag" />
```

```css
img {
  height: 90vh;
  aspect-ratio: 3;
}
```

We have declared a single dimension; `100vh` is the full height of the example `` viewport. For `aspect-ratio` to apply to replaced elements, only one dimension must be set. Setting both or neither doesn't work.

### Fitting replaced elements within their containers

To fit a replaced element to the dimensions of its container while maintaining its intrinsic aspect ratio, set the `object-fit` property value to `cover` or `contain`. This will resize the replaced element and either clip it to "cover" the container or display it at a smaller size, fully "contained" within it.

In this example, the square image is placed into a grid of three items, each with an aspect ratio of `5 / 2`.

To begin with, we create a container with three items, each containing one image:

```html
<div class="grid">
  <div>
    <img
      src="https://mdn.github.io/shared-assets/images/examples/progress-pride-flag.jpg"
      alt="Pride flag" />
  </div>
  <div>
    <img
      class="cover"
      src="https://mdn.github.io/shared-assets/images/examples/progress-pride-flag.jpg"
      alt="Pride flag" />
  </div>
  <div>
    <img
      class="contain"
      src="https://mdn.github.io/shared-assets/images/examples/progress-pride-flag.jpg"
      alt="Pride flag" />
  </div>
</div>
```

Next, we designate the container as a grid, where each item has an aspect ratio of `2.5` (`5/2`) with a minimum width of `150px`. Therefore, the minimum height will be `60px`. However, the final width and height are determined by the width of the example's iframe, which will be based on your viewport size:

```css
.grid {
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  font-size: 0; /* to minimize whitespace */
}

div div {
  aspect-ratio: 5 / 2;
  background-color: #cccccc;
}
```

We then size the images and set the `object-fit` property on the last two images:

```css
img {
  height: 100%;
  width: 100%;
}

.cover {
  object-fit: cover;
}

.contain {
  object-fit: contain;
}
```

Only the first image is distorted (stretched). We could have used the `fill` value of `object-fit` to create the same effect. The `cover` image spans the full width of the container, centered vertically, and clipped to fit in the container. The `contain` value ensures the image is contained within the container, centered horizontally, and shrunk to fit.

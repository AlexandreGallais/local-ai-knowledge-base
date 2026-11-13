---
title: "Understanding and setting aspect ratios (part 2 of 2)"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/guides/box_sizing/aspect_ratios/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Understanding and setting aspect ratios (part 2 of 2)

## Defining aspect ratios for non-replaced elements

While the aspect ratio of a replaced element is maintained by default, adjusting the intrinsic size of a non-replaced element usually changes its aspect ratio. For example, identical content may appear as three lines on a widescreen or in a wide parent container, but as eight lines on a narrow screen or container.

In this example, the same quote is displayed in `200px` and `600px` wide containers, and a square is set with a height matching its `200px` width:

```html
<p>Narrow:</p>
<blockquote>
  <q
    >When you stop living your life based on what others think of you real life
    begins. At that moment, you will finally see the door of self acceptance
    opened.</q
  >
  - Shannon L. Alder
</blockquote>
<p>Wide:</p>
<blockquote>
  <q
    >When you stop living your life based on what others think of you real life
    begins. At that moment, you will finally see the door of self acceptance
    opened.</q
  >
  - Shannon L. Alder
</blockquote>
<p>Aspect ratio with overflow:</p>
<blockquote>
  <q
    >When you stop living your life based on what others think of you real life
    begins. At that moment, you will finally see the door of self acceptance
    opened.</q
  >
  - Shannon L. Alder
</blockquote>
<p>
  <label
    ><input type="checkbox" checked /> Toggle between
    <code>overflow</code> values <code>auto</code> and
    <code>visible</code></label
  >
</p>
```

To highlight the issue with setting a non-replaced element's aspect ratio via size dimensions, toggle the `overflow` property between `auto` and `visible`.

```css
blockquote {
  border: 3px dotted #cccccc;
  padding: 0 3px;
  margin: 20px 0;
  font-size: 1.25rem;
  line-height: 1.5;
}

body:has(:checked) blockquote {
  overflow: auto;
}

:checked + code,
:not(:checked) + code + code {
  outline: 1px solid green;
}

p:nth-last-of-type(n + 2) {
  font-weight: bold;
}
```

```css
blockquote {
  width: 200px;
}

blockquote:nth-of-type(2) {
  width: 600px;
}

blockquote:nth-of-type(3) {
  height: 200px;
}
```

While it's possible to define an aspect ratio on non-replaced elements by setting both the dimensions and hiding overflowing content, the CSS `aspect-ratio` property provides explicit aspect ratio support. This means a specific aspect ratio can be set even when you don't know the content or screen sizes.

In the next example, we render square boxes regardless of the width of the text by setting `aspect ratio: 1` on ``, a non-replaced element:

```html
<p>Short text:</p>
<blockquote>Breath.</blockquote>
<p>Longer text:</p>
<blockquote>You're perfect just as you are.</blockquote>
```

```css
blockquote {
  inline-size: max-content;
  aspect-ratio: 1;
}
```

```css
blockquote {
  border: 1px solid #cccccc;
  padding: 1px;
  margin: 20px 0;
  background-color: #ededed;
}
```

Each box has one dimension defined: the `inline-size`, which is the width in horizontal languages, is set to `max-content`, which sets the size to be as wide as it needs to be to fit the content without wrapping. The second dimension, in this case, the `block-size` or `height`, is set to be the same length as the first dimension. This is accomplished with the `aspect-ratio` property. We defined the desired width-to-height ratio of the element's box to be `1`, which is the same as `1 / 1`, a square. This sets the block direction to match the width of the element, without using the `height` or `block-size` properties.

In these examples, a size was explicitly set on the element itself. When working with non-replaced elements, aspect ratio comes into play when no size dimension is explicitly set.

### Creating a circle based on the container size

The inline-size of non-replaced block-level elements is the size of their container's content box. Because they have a size by default, they don't need to have an explicit size set for the `aspect-ratio` property to work.

In this example, we have a container `` that is `200px` wide, which includes `5px` of padding on each side. Therefore, the inline-size of the content box is `190px`. Without setting a height or width on the nested `` element, we know its inline-size is `190px`. With `aspect-ratio: 1` set, the paragraph will be `190px` tall, unless it has visible overflowing content causing it to be taller (which it doesn't).

The height of the `` element is not explicitly set, but it contains the `190px` tall paragraph, the `5px` of padding on top and bottom, and the combined heights of the default top and bottom margins of ``. As a result, it is taller than it is wide. Both elements have a `border-radius` of `50%`, so the container is an oval while the child, with an `aspect-ratio` of `1` but no inline or block sizing explicitly defined, is a circle.

```html
<div><p>Hello world</p></div>
```

```css
div,
p {
  border-radius: 50%;
}

div {
  width: 200px;
  padding: 5px;
  border: 1px solid black;
  background-color: #66ccff;
}

p {
  aspect-ratio: 1;
  text-align: center;
  border: 10px solid white;
  background-color: #f4aab9;
}
```

To make the `` a circle, we can set the `height` and `width` to the same value, or set `aspect-ratio: 1` and set the `overflow` to `auto` or `hidden`. Alternatively, we can simply remove the margins on the paragraph with `margin-block: 0`. Both these options are shown below.

```html
<div><p>Hello world</p></div>
<div><p>Hello world</p></div>
```

```css
div {
  width: 200px;
  padding: 5px;
  margin: 1rem;
  border: 1px solid black;
  background-color: #66ccff;
}

p {
  text-align: center;
  border: 10px solid white;
  background-color: #f4aab9;
}
```

```css
div,
p {
  aspect-ratio: 1;
  border-radius: 50%;
}

div:first-of-type {
  overflow: hidden;
}

div:last-of-type p {
  margin-block: 0;
}
```

## Common `aspect-ratio` use cases

Let's look at a few situations where you can use `aspect-ratio` to address some common challenges while creating responsive designs.

### Making external assets responsive

All content should be responsive, even when that content is third-party embeds, such as videos from TikTok, YouTube, or Instagram. The code snippet you include to embed these external videos generally creates an ``.

While a `` element typically adopts the aspect ratio of its media file, `iframe` elements lack this capability. This poses the challenge of ensuring that the `` is responsive while always maintaining the aspect ratio of the video it contains. One of the techniques we can use is to set the iframe's width to `100%` of its container or `100vw` to match the viewport width regardless of the viewport's size. However, setting a fixed height might stretch or squash the video. Instead, we set the `aspect-ratio` on the video's container, aligning it to be the same aspect ratio as the video. Problem solved!

For context, the standard aspect ratio of YouTube videos is 16:9 when viewed on a desktop computer or laptop, while TikTok and Instagram videos have a 9:16 aspect ratio.

```css
.youtube {
  aspect-ratio: 16/9;
}

.instagram,
.tiktok {
  aspect-ratio: 9/16;
}
```

We can use the `aspect-ratio` feature within the `@media` query alongside the `aspect-ratio` property to adjust the size of both the iframe and the video it contains. This ensures that the video content is always as large as possible - taking up either the full width or height of the viewport, regardless of the viewport size - while maintaining a specific aspect ratio.

We can set the landscape-oriented YouTube videos to be as wide as the viewport and the portrait-oriented TitTok and Instagram video iframes to be as tall as the viewport. If a viewport's aspect ratio is wider than 16:9, we set the YouTube video to be the height of the viewport. If the viewport is narrower than 9:16, we set both Instagram and TikTok videos to the width of the viewport.

```css
iframe.youtube {
  aspect-ratio: 16/9;
  width: 100vw;
  height: auto;
}

iframe.instagram,
iframe.tiktok {
  aspect-ratio: 9/16;
  height: 100vh;
  width: auto;
}

/* If the viewport is very wide but not very tall */
@media (aspect-ratio > 16 / 9) {
  iframe.youtube {
    width: auto;
    height: 100vh;
  }
}

/* If the viewport is very tall but not very wide */
@media (aspect-ratio < 9 / 16) {
  iframe.instagram,
  iframe.tiktok {
    height: auto;
    width: 100vw;
  }
}
```

### Making grid cells square

A grid of square cells can be created by defining fixed column track sizes, ensuring each row matches the size of the column track. However, when creating responsive grids using `auto-fill` to fit as many column tracks as possible within the container, the width of each item becomes uncertain. This makes it challenging to determine the appropriate height for creating square items.

By setting an aspect ratio on the items, we can ensure when the grid items are laid out, each grid item will be as tall as it is wide, creating square grid items regardless of the container's dimensions.

In this example of square grid items, the grid tracks are auto-sized, taking their size from the items. Each item will be at least `95px` wide but could be much wider. No matter the width, each item will be a square, with the height determined by the `aspect-ratio` to match its width.

```css
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(95px, 1fr));
}

.item {
  aspect-ratio: 1;
}
```

```css
div {
  gap: 20px;
  font-size: 1.1rem;
}

div div {
  background-color: #cccccc;
  aspect-ratio: 1;
  counter-increment: items;
}

div div::after {
  content: counter(items);
}

.item::after {
  /*  hide the number if there's content  */
  position: absolute;
  color: transparent;
}
```

```html
<div class="grid">
  <div></div>
  <div></div>
  <div class="item">
    This text would overflow the parent, but we've set properties to prevent it
    from doing so.
  </div>
  <div></div>
  <div></div>
  <div></div>
  <div class="item">
    <img
      src="https://mdn.github.io/shared-assets/images/examples/progress-pride-flag.jpg"
      alt="Pride flag" />
  </div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
</div>
```

For the content of a grid item to not grow beyond the preferred height set by the `aspect-ratio`, set the `min-height` to `0` and the `overflow` to a value other than `visible`. This will work for intrinsically sized content. If you have content that is intrinsically larger than the available space, set that content to not be larger than the grid item by setting the `max-height` (or `max-width`, depending on the content) to `100%`.

```css
.item {
  min-height: 0;
  overflow: auto;
}

.item > * {
  max-height: 100%;
}
```

## See also

- CSS box sizing module

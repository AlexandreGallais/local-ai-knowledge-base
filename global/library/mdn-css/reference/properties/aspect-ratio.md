---
title: "`aspect-ratio` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/aspect-ratio/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `aspect-ratio` CSS property

The **`aspect-ratio`** CSS property allows you to define the desired width-to-height ratio of an element's box.

```css
aspect-ratio: auto;
```

```css
aspect-ratio: 1 / 1;
```

```css
aspect-ratio: 16 / 9;
```

```css
aspect-ratio: 0.5;
```

```html
<section id="default-example">
  <img
    class="transition-all"
    height="640"
    id="example-element"
    src="/shared-assets/images/examples/plumeria.jpg"
    width="466" />
</section>
```

```css
#example-element {
  height: 100%;
  width: auto;
}
```

## Syntax

```css
aspect-ratio: 1 / 1;
aspect-ratio: 1;

/* fallback to 'auto' for replaced elements */
aspect-ratio: auto 3/4;
aspect-ratio: 9/6 auto;

/* Global values */
aspect-ratio: inherit;
aspect-ratio: initial;
aspect-ratio: revert;
aspect-ratio: revert-layer;
aspect-ratio: unset;
```

### Values

This property is specified as one or both of the keyword `auto` or a `<ratio>`.

- `auto`
    Replaced elements with an intrinsic aspect ratio use _that_ aspect ratio, otherwise the box has no preferred aspect ratio. Size calculations involving intrinsic aspect ratio always work with the content box dimensions.

- `<ratio>`
    The box's preferred aspect ratio is the specified ratio of `width` / `height`. If `height` and the preceding slash character are omitted, `height` defaults to `1`. Size calculations involving preferred aspect ratio work with the dimensions of the box specified by `box-sizing`.

- `auto && <ratio>`
    When both `auto` and a `<ratio>` are specified together, `auto` is used if the element is a replaced element with a natural aspect ratio, like an `` element. Otherwise, the specified ratio of `width` / `height` is used as the preferred aspect ratio.

## Description

The `aspect-ratio` property defines a desired width-to-height ratio of an element's box. This means that even if the parent container or viewport size changes, the browser will adjust the element's dimensions to maintain the specified width-to-height ratio. The specified aspect ratio is used in the calculation of auto sizes and some other layout functions.

At least one of the box's sizes needs to be automatic in order for `aspect-ratio` to have any effect. If neither the width nor height is an automatic size, then the provided aspect ratio has no effect on the box's preferred sizes.

This property is specified as one or both of the keyword auto or a `<ratio>`. If both are given, and the element is a replaced element, such as ``, then the given ratio is used until the content is loaded. After the content is loaded, the `auto` value is applied, so the intrinsic aspect ratio of the loaded content is used.

If the element is not a replaced element, then the given `ratio` is used.

## Examples

### Exploring aspect-ratio effects with fixed width

In this example, the width of the `` elements has been set to `100px` and height to `auto`. Since the width value is fixed here, the `aspect-ratio` property affects only the height of the `` elements to maintain the specified width-to-height ratio.

```html
<div>1/1</div>
<div>0.5</div>
<div>1</div>
<div>1/0.5</div>
<div>16/9</div>
```

```css
div {
  display: inline-flex;
  background-color: lime;
  justify-content: center;
}
```

```css
div {
  width: 100px;
  height: auto;
}
div:nth-child(1) {
  aspect-ratio: 1/1;
}
div:nth-child(2) {
  aspect-ratio: 0.5;
}
div:nth-child(3) {
  aspect-ratio: 1;
}
div:nth-child(4) {
  aspect-ratio: 1/0.5;
}
div:nth-child(5) {
  aspect-ratio: 16/9;
}
```

### Fallback to natural aspect ratio

In this example we are using two `` elements. The first element does not have its `src` attribute set to an image file.

```html
<img src="" /> <img src="plumeria.jpg" />
```

The following code sets `3/2` as the preferred aspect ratio and `auto` as a fallback.

```css
img {
  display: inline;
  width: 200px;
  border: 2px dashed red;
  background-color: lime;
  vertical-align: top;

  aspect-ratio: 3/2 auto;
}
```

Note how the first image without replaced content keeps the `3/2` aspect ratio, while the second image after the content is loaded uses the image's natural aspect ratio.

## See also

- Understanding aspect ratios
- Image aspect-ratio: preventing jank
- Designing an aspect ratio unit for CSS
- Setting Height And Width On Images Is Important Again

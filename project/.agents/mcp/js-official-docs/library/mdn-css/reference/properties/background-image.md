---
title: "`background-image` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/background-image/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `background-image` CSS property

The **`background-image`** CSS property sets one or more background images on an element.

```css
background-image: url("/shared-assets/images/examples/lizard.png");
```

```css
background-image:
  url("/shared-assets/images/examples/lizard.png"),
  url("/shared-assets/images/examples/star.png");
```

```css
background-image:
  url("/shared-assets/images/examples/star.png"),
  url("/shared-assets/images/examples/lizard.png");
```

```css
background-image:
  linear-gradient(rgb(0 0 255 / 0.5), rgb(255 255 0 / 0.5)),
  url("/shared-assets/images/examples/lizard.png");
```

```html
<section id="default-example">
  <div id="example-element"></div>
</section>
```

```css
#example-element {
  min-width: 100%;
  min-height: 100%;
  padding: 10%;
}
```

## Syntax

```css
/* single image */
background-image: linear-gradient(black, white);
background-image: url("cat-front.png");

/* multiple images */
background-image:
  radial-gradient(circle, transparent 45%, black 48%),
  radial-gradient(ellipse farthest-corner, #fc1c14 20%, #cf15cf 80%);

/* Global values */
background-image: inherit;
background-image: initial;
background-image: revert;
background-image: revert-layer;
background-image: unset;
```

### Values

This property is specified as the keyword `none` or as a comma-separated list of `image` values.

- `none`
    Is a keyword denoting the absence of images.
- `<image>`
    Is an `image` denoting the image to display.

## Description

The `background-image` property sets background images on an element.

You can define multiple backgrounds on an element by specifying a list of comma-separated image. The background images are drawn on stacking context layers on top of each other. The first layer specified is drawn as if it is closest to the user.

The borders of the element are then drawn on top of them, and the `background-color` is drawn beneath them. How the images are drawn relative to the box and its borders is defined by the `background-clip` and `background-origin` CSS properties.

If a specified image cannot be drawn (for example, when the file denoted by the specified URI cannot be loaded), browsers handle it as they would a `none` value.

> **Note:**
> Even if the images are opaque and the color won't be displayed in normal circumstances, web developers should always specify a `background-color`. If the images cannot be loaded—for instance, when the network is down—the background color will be used as a fallback.

## Accessibility

Browsers do not provide any special information on background images to assistive technology. This is important primarily for screen readers, as a screen reader will not announce its presence and therefore convey nothing to its users. If the image contains information critical to understanding the page's overall purpose, it is better to describe it semantically in the document.

- MDN Understanding WCAG, Guideline 1.1 explanations
- Understanding Success Criterion 1.1.1 | W3C Understanding WCAG 2.0

Additionally, it is important to ensure that the contrast ratio between the background image and the foreground text is high enough that people with low vision can read the page content.

Color contrast ratio is determined by comparing the luminance of the text and background color values. To meet Web Content Accessibility Guidelines (WCAG), a ratio of 4.5:1 is required for body text content and 3:1 for larger text such as headings. Large text is defined as 24px or larger, or bolded 18.66px or larger.

- WebAIM: Color Contrast Checker
- Understanding WCAG, Guideline 1.4 explanation
- Understanding Success Criterion 1.4.3 | Understanding WCAG 2.0, W3C (2023)

## Examples

### Layering background images

Note that the star image is partially transparent and is layered over the cat image.

#### HTML

```html
<div>
  <p class="cats-and-stars">This paragraph is full of cats<br />and stars.</p>
  <p>This paragraph is not.</p>
  <p class="cats-and-stars">Here are more cats for you.<br />Look at them!</p>
  <p>And no more.</p>
</div>
```

#### CSS

```css
p {
  font-weight: bold;
  font-size: 1.5em;
  color: white;
  text-shadow: 0.07em 0.07em 0.05em black;
  background-image: none;
  background-color: transparent;
}

div {
  background-image: url("mdn_logo_only_color.png");
}

.cats-and-stars {
  background-image: url("star-transparent.gif"), url("cat-front.png");
  background-color: transparent;
}
```

#### Result

## See also

- ``
- Image-related functions:
  - `linear-gradient()`
  - `radial-gradient()`
  - `conic-gradient()`
  - `repeating-linear-gradient()`
  - `repeating-radial-gradient()`
  - `repeating-conic-gradient()`
  - `<url>`
- Using CSS gradients
- Implementing image sprites in CSS
- CSS images module

- Background-related properties
  - `background-attachment`
  - `background-clip`
  - `background-color`
  - `background-origin`
  - `background-position`
  - `background-repeat`
  - `background-size`
  - `background` shorthand
- Learn: Backgrounds and borders
- Using multiple backgrounds
- Resizing background images
- CSS backgrounds and borders module

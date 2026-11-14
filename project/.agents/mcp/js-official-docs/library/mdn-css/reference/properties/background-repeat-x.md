---
title: "`background-repeat-x` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/background-repeat-x/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `background-repeat-x` CSS property

The **`background-repeat-x`** CSS property sets how background images are repeated, or not, along the horizontal axis.

The `background-repeat-x` and `background-repeat-y` properties can also be set using the `background-repeat` or `background` shorthand properties.

```css
background-repeat-x: repeat;
```

```css
background-repeat-x: space;
```

```css
background-repeat-x: round;
```

```css
background-repeat-x: no-repeat;
```

```html
<section id="default-example">
  <div id="example-element"></div>
</section>
```

```css
#example-element {
  background: #cccccc url("/shared-assets/images/examples/moon.jpg") no-repeat
    center / 120px;
  min-width: 100%;
  min-height: 100%;
}
```

## Syntax

```css
/* Keyword values */
background-repeat-x: repeat;
background-repeat-x: space;
background-repeat-x: round;
background-repeat-x: no-repeat;

/* Global values */
background-repeat-x: inherit;
background-repeat-x: initial;
background-repeat-x: revert;
background-repeat-x: revert-layer;
background-repeat-x: unset;
```

The `background-repeat-x` property is specified as one or more values, separated by commas.

## Values

- `repeat`
    The default value. The image is repeated as many times as needed to cover the entire width of the background image painting area. The edge image is clipped if multiple images do not fit exactly into the background width.

- `no-repeat`
    The image is not repeated. The position of the non-repeated background image is defined by the `background-position` CSS property.

- `space`
    The image is repeated as much as possible without clipping. The first and last images are pinned to the left and right of the element, and the whitespace is evenly distributed between them. The `background-position-x` property is ignored unless one or more images can be displayed without clipping. If the image is wider than the element, it is clipped, as there isn't enough room to display it.

- `round`
    The image is repeated horizontally. As the available space increases in size, the repeated images will stretch (leaving no gaps) until there is room for another one to be added. If multiple images don't fit the background exactly, they are rescaled to fit.

## Description

The `background-repeat-x` property accepts a comma-separated list of `<repetition>` keyterms, which define how the background image(s) should repeat horizontally, or not repeat at all.

The default value is `repeat`. With this value, the background image repeats horizontally, covering the entire width of the background paint area, with edge images being clipped to the size of the element. Whether the left, right, or both edges are clipped depends on the value of the corresponding `background-position` value. How many times images are repeated and how much the images on the edges are clipped depends on the size of the background painting area and width value of the corresponding `background-size` property.

The repeating images can be evenly spaced apart, ensuring the repeated images aren't clipped in the horizontal direction. With the `space` value, if the width of the background paint area is not a multiple of the width of the image or does not otherwise have a size that is a multiple of the background size in the width direction, there will be areas not covered by the background image.

Alternatively, the repeated background image can be stretched to cover the entire width of the background area without clipping. With `round`, the repeated image is stretched to fill all the available space until there is room to add an additional repeated image.

For example, given a background image that is `100px` x `100px` and a background paint area that is `1099px` wide, the image will be resized to `109.9px wide` and repeated 10 times in the horizontal direction. This will alter the image's aspect ratio and distort it. If the width of the paint area increases by `1px` to `1100px`, an 11th image will fit horizontally, with each image being painted at `100px` wide, and no longer distorted horizontally.

## Examples

### Setting background-repeat-x

#### HTML

```html
<ol>
  <li>
    no-repeat
    <div class="one"></div>
  </li>
  <li>
    repeat
    <div class="two"></div>
  </li>
  <li>
    space
    <div class="three"></div>
  </li>
  <li>
    round
    <div class="four"></div>
  </li>
</ol>
```

#### CSS

```css
ol,
li {
  margin: 0;
  padding: 0;
}
li {
  margin-bottom: 12px;
}
div {
  background-image: url("star-solid.gif");
  width: 160px;
  height: 70px;
}

/* Background repeats */
.one {
  background-repeat-x: no-repeat;
}
.two {
  background-repeat-x: repeat;
}
.three {
  background-repeat-x: space;
}
.four {
  background-repeat-x: round;
}
```

```css
@layer no-support {
  @supports not (background-repeat-x: repeat) {
    body::before {
      content: "Your browser doesn't support the `background-repeat-x` property.";
      background-color: wheat;
      display: block;
      text-align: center;
      padding: 1rem 0;
    }
  }
}
```

#### Result

In this example, each list item is matched with a different value of `background-repeat-x`.

## See also

- `background-repeat-y` and the `background-repeat` shorthand.
- `background` shorthand components: `background-attachment`, `background-clip`, `background-color`, `background-image`, `background-origin`, `background-position` (`background-position-x` and `background-position-y`), and `background-size`
- Using multiple backgrounds
- CSS backgrounds and borders module
- Understanding aspect ratios

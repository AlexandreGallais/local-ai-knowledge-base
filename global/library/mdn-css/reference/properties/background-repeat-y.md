---
title: "`background-repeat-y` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/background-repeat-y/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `background-repeat-y` CSS property

The **`background-repeat-y`** CSS property sets how background images are repeated, or not, along the vertical axis.

The `background-repeat-x` and `background-repeat-y` properties can also be set using the `background-repeat` or `background` shorthand properties.

```css
background-repeat-y: repeat;
```

```css
background-repeat-y: space;
```

```css
background-repeat-y: round;
```

```css
background-repeat-y: no-repeat;
```

```html
<section id="default-example">
  <div id="example-element"></div>
</section>
```

```css
#example-element {
  background: #cccccc url("/shared-assets/images/examples/moon.jpg") center /
    120px;
  min-width: 100%;
  min-height: 100%;
}
```

## Syntax

```css
/* Keyword values */
background-repeat-y: repeat;
background-repeat-y: space;
background-repeat-y: round;
background-repeat-y: no-repeat;

/* Global values */
background-repeat-y: inherit;
background-repeat-y: initial;
background-repeat-y: revert;
background-repeat-y: revert-layer;
background-repeat-y: unset;
```

The `background-repeat-y` property is specified as one or more values, separated by commas.

## Values

- `repeat`
    The default value. The image is repeated as many times as needed to cover the entire height of the background image painting area. The edge image is clipped if multiple images do not fit exactly into the background height.

- `no-repeat`
    The image is not repeated. The position of the non-repeated background image is defined by the `background-position` CSS property.

- `space`
    The image is repeated as much as possible without clipping. The first and last images are pinned to the top and bottom of the element, and the whitespace is distributed evenly between the images. The `background-position-y` property is ignored unless one or more images can be displayed without clipping. If the image is taller than the element, it is clipped, as there isn't enough room to display it.

- `round`
    The image is repeated vertically. As the available space increases in size, the repeated images will stretch (leaving no gaps) until there is room for another one to be added. If multiple images don't fit the background exactly, they are rescaled to fit.

## Description

The `background-repeat-y` property accepts a comma-separated list of `<repetition>` keyterms, which define how background image(s) should repeat vertically, or not repeat at all.

The default value is `repeat`. With this value, the background image repeats vertically, covering the entire height of the background paint area, with edge images being clipped to the size of the element. Whether the top, bottom, or both edges are clipped depends on the value of the corresponding `background-position` value. How many times images are repeated and how much the images on the edges are clipped depends on the size of the background painting area and height value of the corresponding `background-size` property.

The repeating images can be evenly spaced apart, ensuring the repeated images aren't clipped in the vertical direction. With the `space` value, if the height of the background paint area is not a multiple of the image's height or does not otherwise have a size that is a multiple of the background size in along the y-axis, there will be areas not covered by the background image.

Alternatively, the repeated background image can be stretched to cover the entire height of the background area without clipping. With `round`, if the height of the background paint area is not a multiple of the height of the background image, the repeated image is stretched to fill all the available space until there is room to add an additional repeated image.

For example, given a background image that is 100px x 100px and a background paint area that is 1099px tall, the image will be repeated 10 times in the vertical direction with each image stretched to be 109.9px tall, possibly altering the image's aspect ratio and distorting it. If the height of the paint area increases by 1px, becoming 1100px tall, an 11th image will fit vertically, with each image will be painted at 100px tall, no longer being stretched in the vertical direction.

## Examples

### Setting background-repeat-y

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
  background-repeat-y: no-repeat;
}
.two {
  background-repeat-y: repeat;
}
.three {
  background-repeat-y: space;
}
.four {
  background-repeat-y: round;
}
```

```css
@layer no-support {
  @supports not (background-repeat-y: repeat) {
    body::before {
      content: "Your browser doesn't support the `background-repeat-y` property.";
      background-color: wheat;
      display: block;
      text-align: center;
      padding: 1rem 0;
    }
  }
}
```

#### Result

In this example, each list item is matched with a different value of `background-repeat-y`.

## See also

- `background-repeat-x` and the `background-repeat` shorthand.
- `background` shorthand components: `background-attachment`, `background-clip`, `background-color`, `background-image`, `background-origin`, `background-position` (`background-position-x` and `background-position-y`), and `background-size`
- Using multiple backgrounds
- CSS backgrounds and borders module
- Understanding aspect ratios

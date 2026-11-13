---
title: "CSS backgrounds and borders"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/guides/backgrounds_and_borders/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSS backgrounds and borders

The **CSS backgrounds and borders** module provides properties for adding backgrounds, borders, rounded corners, and box shadows to elements.

You can add different types of border styles, including borders made of images of any image type, from raster images to CSS gradients. Borders can be square or rounded, and a different radius can be set for each corner. Elements can be rounded whether or not they have a visible border.

Box shadows include inset and outset shadow, single or multiple shadows, and solid or allowed to fade to transparent. An outer box-shadow casts a shadow as if the border-box of the element were opaque. An inner box-shadow casts a shadow as if everything outside the padding edge were opaque. The shadow can be solid or include a spread distance with the shadow color transitioning to transparent.

The properties in this module also let you define whether cells inside a `` should have shared or separate borders.

## Backgrounds, borders, and box shadows in action

This sample of borders, backgrounds, and box shadows consists of centered background images made of linear and radial gradients. A series of box shadows make the border appear to "pop". The element on the left has a border image set. The element on the right has a rounded dotted border.

```html
<article>
  <div></div>
  <div></div>
</article>
```

```css
article {
  display: flex;
  gap: 10px;
}
div {
  color: #58ade3;
  height: 320px;
  width: 240px;
  padding: 20px;
  margin: 10px;
  border: dotted 15px; /* defaults to `currentColor` */
  border-radius: 100px 0;
  background-image:
    radial-gradient(
      circle,
      transparent 60%,
      currentColor 60% 70%,
      transparent 70%
    ),
    linear-gradient(45deg, currentColor, white),
    linear-gradient(transparent, transparent);
  /* the third transparent background image was added to provide space for the background color to show through */
  background-color: currentColor;
  background-position: center;
  background-size:
    60px 60px,
    120px 120px;
  background-clip: content-box, content-box, padding-box;
  box-shadow:
    inset 5px 5px 5px rgb(0 0 0 / 0.4),
    inset -5px -5px 5px rgb(0 0 0 / 0.4),
    5px 5px 5px rgb(0 0 0 / 0.4),
    -5px -5px 5px rgb(0 0 0 / 0.4);
}
div:first-of-type {
  border-radius: 0;
  border-image-source: repeating-conic-gradient(
    from 3deg at 25% 25%,
    currentColor 0 3deg,
    transparent 3deg 6deg
  );
  border-image-slice: 30;
}
```

The background images are defined with `background-image`. The images are centered with `background-position`. Different values of the `background-clip` property for the multiple background images are used to make the background images stay within the content box. The background color gets clipped to the padding box preventing the background from appearing through the transparent sections for the `border-image` and the `dotted` `border`. The rounded corners in the element on the right are created using the `border-radius` property. A single `box-shadow` declaration is used to set all the shadows, both inset and outset.

## Reference

### Properties

- `background-attachment`
- `background-clip`
- `background-color`
- `background-image`
- `background-origin`
- `background-position`
- `background-repeat-x`
- `background-repeat-y`
- `background-repeat` shorthand
- `background-size`
- `background` shorthand
- `background-position-x`
- `background-position-y`
- `border-bottom-color`
- `border-bottom-style`
- `border-bottom-width`
- `border-bottom` shorthand
- `border-left-color`
- `border-left-style`
- `border-left-width`
- `border-left` shorthand
- `border-right-color`
- `border-right-style`
- `border-right-width`
- `border-right` shorthand
- `border-top-color`
- `border-top-style`
- `border-top-width`
- `border-top` shorthand
- `border-color` shorthand
- `border-style` shorthand
- `border-width` shorthand
- `border` shorthand
- `border-bottom-left-radius`
- `border-bottom-right-radius`
- `border-top-left-radius`
- `border-top-right-radius`
- `border-radius` shorthand
- `border-image-outset`
- `border-image-repeat`
- `border-image-slice`
- `border-image-source`
- `border-image-width`
- `border-image` shorthand
- `box-shadow`

The CSS backgrounds module level 4 also introduces the `background-position-block`, `background-position-inline`, `background-repeat-block`, `background-repeat-inline`, and `background-tbd` properties. Currently, no browsers support these features.

### Data types

- `line-style` enumerated type

## Guides

- Using multiple backgrounds
    Setting one or more backgrounds on an element.
- Resizing background images
    Changing the size and repeating behavior of background images.
- Scaling SVG backgrounds
    How SVG aspect ratio, SVG dimension values, and the CSS `background-size` property impact the scaling of SVG background images.
- Using CSS gradients
    Creating CSS gradients and using them as background images.
- Learn CSS: background and borders
    Learn how to implement decorative images using CSS background images.
- Learn CSS: the box model
    Learn how borders and other box model properties impact the CSS box model.

## Related concepts

- `border-block-end-color`
- `border-block-start-color`
- `border-inline-end-color`
- `border-inline-start-color`
- `border-block-end-style`
- `border-block-start-style`
- `border-inline-end-style`
- `border-inline-start-style`
- `border-block-end-width`
- `border-block-start-width`
- `border-inline-end-width`
- `border-inline-start-width`
- `border-start-start-radius`
- `border-start-end-radius`
- `border-end-start-radius`
- `border-end-end-radius`
- `box-sizing`
- `box-decoration-break`
- `text-shadow`
- `<url>` data type
- `url` data type
- `image` data type
- `position` data type
- `currentColor` keyword

## See also

- `filter`
- `backdrop-filter`
- `drop-shadow()` filter function
- Applying color to HTML elements using CSS
- Tools:
  - Border-image generator
  - Border-radius generator
  - Box-shadow generator

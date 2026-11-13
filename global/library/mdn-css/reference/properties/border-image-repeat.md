---
title: "`border-image-repeat` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/border-image-repeat/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `border-image-repeat` CSS property

The **`border-image-repeat`** CSS property defines how the images for the sides and the middle part of the border image are scaled and tiled. The middle region can be displayed by using the keyword "fill" in the `border-image-slice` property.

```css
border-image-repeat: stretch;
```

```css
border-image-repeat: repeat;
```

```css
border-image-repeat: round;
```

```css
border-image-repeat: space;
```

```css
border-image-repeat: round stretch;
```

```html
<section id="default-example">
  <div id="example-element">This is a box with a border around it.</div>
</section>
```

```css
#example-element {
  width: 80%;
  height: 80%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 50px;
  background: #fff3d4;
  color: black;
  border: 30px solid;
  border-image: url("/shared-assets/images/examples/border-diamonds.png") 30
    round;
  font-size: 1.2em;
}
```

## Syntax

```css
/* Keyword values */
border-image-repeat: stretch;
border-image-repeat: repeat;
border-image-repeat: round;
border-image-repeat: space;

/* top and bottom | left and right */
border-image-repeat: round stretch;

/* Global values */
border-image-repeat: inherit;
border-image-repeat: initial;
border-image-repeat: revert;
border-image-repeat: revert-layer;
border-image-repeat: unset;
```

The `border-image-repeat` property may be specified using one or two values chosen from the list of values below.

- When **one** value is specified, it applies the same behavior on **all four sides**.
- When **two** values are specified, the first applies to the **top, middle, and bottom**, the second to the **left and right**.

### Values

- `stretch`
    The source image's edge regions are stretched to fill the gap between each border.
- `repeat`
    The source image's edge regions are tiled (repeated) to fill the gap between each border. Tiles may be clipped to achieve the proper fit.
- `round`
    The source image's edge regions are tiled (repeated) to fill the gap between each border. Tiles may be stretched to achieve the proper fit.
- `space`
    The source image's edge regions are tiled (repeated) to fill the gap between each border. Extra space will be distributed in between tiles to achieve the proper fit.

## Examples

### Repeating border images

#### CSS

```css
#bordered {
  width: 12rem;
  margin-bottom: 1rem;
  padding: 1rem;
  border: 40px solid;
  border-image: url("border.png") 27;
  border-image-repeat: stretch; /* Can be changed in the live sample */
}
```

```html
<div id="bordered">You can try out various border repetition rules on me!</div>

<select id="repetition">
  <option value="stretch">stretch</option>
  <option value="repeat">repeat</option>
  <option value="round">round</option>
  <option value="space">space</option>
  <option value="stretch repeat">stretch repeat</option>
  <option value="space round">space round</option>
</select>
```

```js
const repetition = document.getElementById("repetition");
repetition.addEventListener("change", (evt) => {
  document.getElementById("bordered").style.borderImageRepeat =
    evt.target.value;
});
```

#### Results

## See also

- Backgrounds and borders
- Learn CSS: Backgrounds and borders
- Border images in CSS: A key focus area for Interop 2023 on MDN blog (2023)

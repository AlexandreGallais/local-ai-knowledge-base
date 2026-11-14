---
title: "`perspective-origin` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/perspective-origin/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `perspective-origin` CSS property

The **`perspective-origin`** CSS property determines the position at which the viewer is looking. It is used as the _vanishing point_ by the `perspective` property.

The **`perspective-origin`** and `perspective` properties are attached to the parent of a child transformed in 3-dimensional space, unlike the `perspective()` transform function which is placed on the element being transformed.

```css
perspective-origin: center;
```

```css
perspective-origin: top;
```

```css
perspective-origin: bottom right;
```

```css
perspective-origin: -170%;
```

```css
perspective-origin: 500% 200%;
```

```html
<section class="default-example" id="default-example">
  <div class="transition-all" id="example-element">
    <div class="face front">1</div>
    <div class="face back">2</div>
    <div class="face right">3</div>
    <div class="face left">4</div>
    <div class="face top">5</div>
    <div class="face bottom">6</div>
  </div>
</section>
```

```css
#default-example {
  background: linear-gradient(skyblue, khaki);
  perspective: 550px;
}

#example-element {
  width: 100px;
  height: 100px;
  transform-style: preserve-3d;
  perspective: 250px;
}

.face {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  position: absolute;
  backface-visibility: inherit;
  font-size: 60px;
  color: white;
}

.front {
  background: rgb(90 90 90 / 0.7);
  transform: translateZ(50px);
}

.back {
  background: rgb(0 210 0 / 0.7);
  transform: rotateY(180deg) translateZ(50px);
}

.right {
  background: rgb(210 0 0 / 0.7);
  transform: rotateY(90deg) translateZ(50px);
}

.left {
  background: rgb(0 0 210 / 0.7);
  transform: rotateY(-90deg) translateZ(50px);
}

.top {
  background: rgb(210 210 0 / 0.7);
  transform: rotateX(90deg) translateZ(50px);
}

.bottom {
  background: rgb(210 0 210 / 0.7);
  transform: rotateX(-90deg) translateZ(50px);
}
```

## Syntax

```css
/* One-value syntax */
perspective-origin: x-position;

/* Two-value syntax */
perspective-origin: x-position y-position;

/* When both x-position and y-position are keywords,
   the following is also valid */
perspective-origin: y-position x-position;

/* Global values */
perspective-origin: inherit;
perspective-origin: initial;
perspective-origin: revert;
perspective-origin: revert-layer;
perspective-origin: unset;
```

### Values

- _x-position_
    Indicates the position of the abscissa of the _vanishing point_. It can have one of the following values:
    - `<length-percentage>` indicating the position as an absolute length value or relative to the width of the element. The value may be negative.
    - `left`, a keyword being a shortcut for the `0` length value.
    - `center`, a keyword being a shortcut for the `50%` percentage value.
    - `right`, a keyword being a shortcut for the `100%` percentage value.

- _y-position_
    Indicates the position of the ordinate of the _vanishing point_. It can have one of the following values:
    - `<length-percentage>` indicating the position as an absolute length value or relative to the height of the element. The value may be negative.
    - `top`, a keyword being a shortcut for the `0` length value.
    - `center`, a keyword being a shortcut for the `50%` percentage value.
    - `bottom`, a keyword being a shortcut for the `100%` percentage value.

## Examples

### Changing the perspective origin

An example showing how to change `perspective-origin` is given in Using CSS transforms > Changing the perspective origin.

## See also

- Using CSS Transforms
- `transform-style`
- `transform-function`
- `perspective`
- `transform: perspective()` function

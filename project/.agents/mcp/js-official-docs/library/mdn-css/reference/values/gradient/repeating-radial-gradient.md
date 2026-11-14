---
title: "`repeating-radial-gradient()` CSS function"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/values/gradient/repeating-radial-gradient/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `repeating-radial-gradient()` CSS function

The **`repeating-radial-gradient()`** CSS function creates an image consisting of repeating gradients that radiate from an origin. It is similar to `radial-gradient()` and takes the same arguments, but it repeats the color stops infinitely in all directions so as to cover its entire container, similar to `repeating-linear-gradient()`. The function's result is an object of the `gradient` data type, which is a special kind of `image`.

```css
background: repeating-radial-gradient(#e66465, #9198e5 20%);
```

```css
background: repeating-radial-gradient(closest-side, #3f87a6, #ebf8e1, #f69d3c);
```

```css
background: repeating-radial-gradient(
  circle at 100%,
  #333333,
  #333333 10px,
  #eeeeee 10px,
  #eeeeee 20px
);
```

```html
<section class="display-block" id="default-example">
  <div id="example-element"></div>
</section>
```

```css
#example-element {
  min-height: 100%;
}
```

With each repetition, the positions of the color stops are shifted by a multiple of the dimensions of the basic <example-value> gradient (the distance between the last color stop and the first). Thus, the position of each ending color stop coincides with a starting color stop; if the color values are different, this will result in a sharp visual transition, which can be mitigated by repeating the first color as the last color.

As with any gradient, a repeating radial gradient has no intrinsic dimensions; i.e., it has no natural or preferred size, nor a preferred ratio. Its concrete size will match the size of the element it applies to.

Because `<gradient>`s belong to the `<image>` data type, they can only be used where `<image>`s can be used. For this reason, `repeating-radial-gradient()` won't work on `background-color` and other properties that use the `<color>` data type.

## Syntax

```css
/* A gradient at the center of its container,
   starting red, changing to blue, and finishing green,
   with the colors repeating every 30px */
repeating-radial-gradient(circle at center, red 0, blue, green 30px)

/* An elliptical gradient near the top left of its container,
   starting red, changing to green and back again,
   repeating five times between the center and the bottom right corner,
   and only once between the center and the top left corner */
repeating-radial-gradient(farthest-corner at 20% 20%, red 0, green, red 20%)
```

### Values

- `<position>`
    The position of the gradient, interpreted in the same way as `background-position` or `transform-origin`. If unspecified, it defaults to `center`.
- `<shape>`
    The gradient's shape. The value can be `circle` (meaning that the gradient's shape is a circle with constant radius) or `ellipse` (meaning that the shape is an axis-aligned ellipse). If unspecified, it defaults to `ellipse`.
- `<extent-keyword>`
    A keyword describing how big the ending shape must be. The possible values are:

    | Keyword           | Description                                                                                                                                                                     |
    | ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
    | `closest-side`    | The gradient's ending shape meets the side of the box closest to its center (for circles) or meets both the vertical and horizontal sides closest to the center (for ellipses). |
    | `closest-corner`  | The gradient's ending shape is sized so that it exactly meets the closest corner of the box from its center.                                                                    |
    | `farthest-side`   | Similar to `closest-side`, except the ending shape is sized to meet the side of the box farthest from its center (or vertical and horizontal sides).                            |
    | `farthest-corner` | The gradient's ending shape is sized so that it exactly meets the farthest corner of the box from its center.                                                                   |

    > **Note:**
    > Early implementations of this function included other keywords (`cover` and `contain`) as synonyms of the standard `farthest-corner` and `closest-side`, respectively. Use the standard keywords only, as some implementations have already dropped those older variants.

- `<color-stop>`
    A color-stop's `<color>` value, followed by an optional stop position (either a `<percentage>` or a `<length>` along the gradient's axis). A percentage of `0%`, or a length of `0`, represents the center of the gradient; the value `100%` represents the intersection of the ending shape with the virtual gradient ray. Percentage values in between are linearly positioned on the virtual gradient ray.

## Examples

### Black and white gradient

```html
<div class="radial-gradient"></div>
```

```css
.radial-gradient {
  width: 120px;
  height: 120px;
}
```

```css
.radial-gradient {
  background: repeating-radial-gradient(
    black,
    black 5px,
    white 5px,
    white 10px
  );
}
```

### Farthest-corner

```html
<div class="radial-gradient"></div>
```

```css
.radial-gradient {
  width: 240px;
  height: 120px;
}
```

```css
.radial-gradient {
  background: repeating-radial-gradient(
    ellipse farthest-corner at 20% 20%,
    red,
    black 5%,
    blue 5%,
    green 10%
  );
  background: repeating-radial-gradient(
    ellipse farthest-corner at 20% 20%,
    red 0 5%,
    green 5% 10%
  );
}
```

The elliptical gradient will be centered 20% from the top left, and will repeat 10 times between the center and the farthest corner (the bottom right corner). Browsers supporting multi position color stops will display a red and green striped ellipse. Browsers not supporting the syntax yet will see a gradient that goes from red to black and then from blue to green.

### Interpolating with hue

```html
<div class="shorter"></div>
<div class="longer"></div>
```

```css
div {
  display: inline-block;
  margin-top: 1rem;
  width: 45vw;
  height: 80vh;
}

.shorter::before {
  content: "shorter hue";
  display: block;
  margin-top: -1rem;
}

.longer::before {
  content: "longer hue";
  display: block;
  margin-top: -1rem;
}
```

In this example for interpolation, hsl color system is being used and hue is being interpolated.

```css
.shorter {
  background-image: repeating-radial-gradient(
    circle at center in hsl shorter hue,
    red 30px,
    blue 60px
  );
}

.longer {
  background-image: repeating-radial-gradient(
    circle at center in hsl longer hue,
    red 30px,
    blue 60px
  );
}
```

The box on the left uses shorter interpolation, meaning the color goes from red to blue using the shorter arc on color wheel. The box on the right uses longer interpolation, meaning the color goes from red to blue using the longer arc, traversing through greens, yellows, and oranges.

> **Note:**
> Please see Using CSS gradients for more examples.

## See also

- Using CSS gradients
- Other gradient functions: `radial-gradient()`, `linear-gradient()`, `repeating-linear-gradient()`, `conic-gradient()`, `repeating-conic-gradient()`
- `hue-interpolation-method`
- `color-interpolation-method`
- `image`
- `image()`
- `element()`
- `image-set()`
- `cross-fade()`

---
title: "`repeating-conic-gradient()` CSS function"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/values/gradient/repeating-conic-gradient/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `repeating-conic-gradient()` CSS function

The **`repeating-conic-gradient()`** CSS function creates an image consisting of a repeating gradient (rather than a single gradient) with color transitions rotated around a center point (rather than radiating from the center).

```css
background: repeating-conic-gradient(red 0%, yellow 15%, red 33%);
```

```css
background: repeating-conic-gradient(
  from 45deg at 10% 50%,
  brown 0deg 10deg,
  darkgoldenrod 10deg 20deg,
  chocolate 20deg 30deg
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

## Syntax

```css
/* Starburst: a blue on blue starburst: the gradient
   is a starburst of lighter and darker blue,
   centered in the upper left quadrant,
   offset by 3degrees so there is no up/down straight line */
repeating-conic-gradient(
  from 3deg at 25% 25%,
  hsl(200 100% 50%) 0deg 15deg,
  hsl(200 100% 60%) 10deg 30deg
)

/* Interpolation in polar color space
  with shorter hue interpolation method */
repeating-conic-gradient(in hsl shorter hue, red, blue 90deg, green 180deg)
```

### Values

- `angle`
    Preceded by the `from` keyterm, and taking an angle as its value, defines the gradient rotation in clockwise direction.
- `<position>`
    Using the same length, order and keyterm values as the background-position property, the position defines center of the gradient. If omitted, the default value is `center`, meaning the gradient will be centered.
- `<angular-color-stop>`
    A color-stop's `<color>` value, followed by one or two optional stop positions, (an `angle` along the gradient's circumference axis). The last color stop minus the first color-stop angle defines the size of the repeating gradient.
- `<color-hint>`
    An interpolation hint defining how the gradient progresses between adjacent color stops. The length defines at which point between two color stops the gradient color should reach the midpoint of the color transition. If omitted, the midpoint of the color transition is the midpoint between two color stops.

> **Note:**
> Rendering of color stops in repeating conic gradients follows the same rules as color stops in linear gradients.

## Description

Example repeating conic gradients include starbursts. The result of the `repeating-conic-gradient()` function is an object of the `gradient` data type, which is a special kind of `image`.

If neither the first nor the last color stops include a color stop angle greater than 0deg or less than 360 degrees respectively, the conic-gradient will not repeat.

As with any gradient, a repeating-conic gradient has no intrinsic dimensions; i.e., it has no natural or preferred size, nor a preferred ratio. Its concrete size will match the size of the element it applies to, or the size the `<image>` is set to if it's set to something other than the element's size.

Because `<gradient>`s belong to the `<image>` data type, they can only be used where `<image>`s can be used. For this reason, `repeating-conic-gradient()` won't work on `background-color` and other properties that use the `<color>` data type.

> **Note:**
> To create a conic gradient that does not repeat, make the gradient a full 360 degree rotation, or use the `conic-gradient()` function instead.

### Understanding repeating conic gradients

The repeating-conic-gradient syntax is similar to the `conic-gradient()` and `repeating-radial-gradient()` syntax. Like the non-repeating conic-gradient, the color-stops are placed around a gradient arc. Like the repeating radial gradient, the size of the repeating section is the first color stop subtracted from the angle of the last color stop.

The above gradients are defined as being one third blue, one third red, and one third yellow.

```css
repeating-conic-gradient(from 0deg, red 0deg 30deg, yellow 30deg 60deg, blue 60deg 90deg);

repeating-radial-gradient(red 0 8%, yellow 8% 16%, blue 16% 24%);

conic-gradient(red 120deg, yellow 120deg 240deg, blue 240deg);

radial-gradient(red 33%, yellow 33% 66%, blue 66%);
```

For a repeating gradient to repeat we define the first and last color stops. Like in non-repeating gradients, the first and last color stops are assumed to be 0 and either 100% or 360deg if not explicitly declared. When defaulting to these values, the repeating arc is 360 degrees, and therefore doesn't repeat.

Like the non-repeating conic gradient, the color-stops are placed around a gradient arc — the circumference of a circle, rather than on the gradient line emerging from the center of the gradient. The colors transition as if spun around the center of a circle, starting at the top if no `from <angle>` is declared, and going clockwise for the size of the angle that is the different between the largest and smallest color angle, then repeating.

A repeating conic gradient is specified by indicating a rotation angle, the center of the gradient, and then specifying a list of color-stops. Like non-repeating conic gradients, the color-stops of a repeating conic gradient are specified with an `angle`. Units include `deg` for degrees, `grad` for gradients, `rad` for radians, and `turn` for turns. There are 360 degrees, 400 gradians, 2π radians, and 1 turn in a circle. Browsers supporting repeating conic gradients also accept percent values, with 100% equaling 360 degrees, but this is not in the specification.

Radial and conic gradient syntax provides for positioning the center of the gradient anywhere within, or even outside, the image. The values for the position are similar to the syntax for 2-value `background-position`.

The gradient arc is part of the circumference of the gradient. 0 degrees is north, or 12:00pm. The colors of the gradient are determined by the angled color stops, their starting points, ending points, and, in between, and optional angled color-stop points. The transitions between colors can be altered with color hints between adjacent colors' color stops.

#### Customizing gradients

By adding more angled color-stop points on the gradient arc, you can create a highly customized transition between multiple colors. A color-stop's position can be explicitly defined by using an `angle`. If you don't specify the location of a color stop, it is placed halfway between the one that precedes it and the one that follows it. Like the non-repeating gradient counterpart, if you don't specify an angle for the first or last color stop, the values will be 0deg and 360deg. If you don't declare an angle for either, you'll get a non-repeating conic gradient. If you declare a non 0 or 360degree for the first or last respectively, the gradient will repeat based on that value. For example, if you don't declare an angle for the first color, and declare 10% on the last color stop, the arc will repeat 10 times. Rather, the starting point is the first color stop declared, and the last color stop is the last color stop angle declared. The following two gradients are equivalent:

```css
repeating-conic-gradient(red, orange, yellow, green, blue 50%);
repeating-conic-gradient(from -45deg, red 45deg, orange, yellow, green, blue 225deg)
```

By default, colors transition smoothly from the color at one color stop to the color at the subsequent color stop, with the midpoint between the colors being the half way point between the color transition. You can move this color transition midpoint to any point between two color stops by adding a color hint, indicating where the middle of the color transition should be.

If two or more color stops are at the same location, the transition will be a hard line between the first and last colors declared at that location.

While you can mix and match different angle units, don't. It makes CSS hard to read.

## Accessibility

Browsers do not provide any special information on background images to assistive technology. This is important primarily for screen readers, as a screen reader will not announce its presence and therefore convey nothing to its users. While it is possible to create pie charts, checkerboards, and other effects with conic gradients, CSS images provide no native way to assign alternative text, and therefore the image represented by the conic gradient will not be accessible to screen reader users. If the image contains information critical to understanding the page's overall purpose, it is better to describe it semantically in the document.

- MDN Understanding WCAG, Guideline 1.1 explanations
- Understanding Success Criterion 1.1.1 | W3C Understanding WCAG 2.0

## Examples

### Black and white starburst

```css
div {
  width: 200px;
  height: 200px;
}
```

```html
<div></div>
```

```css
div {
  background-image: repeating-conic-gradient(white 0 9deg, black 9deg 18deg);
}
```

### Off-centered gradient

This gradient repeats 18 times, but since we only see the right half, we only see 9 repeats.

```css
div {
  width: 200px;
  height: 200px;
}
```

```html
<div></div>
```

```css
div {
  background: repeating-conic-gradient(
    from 3deg at 25% 25%,
    green,
    blue 2deg 5deg,
    green,
    yellow 15deg 18deg,
    green 20deg
  );
}
```

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
  background-image: repeating-conic-gradient(
    in hsl shorter hue,
    red,
    blue 180deg
  );
}

.longer {
  background-image: repeating-conic-gradient(
    in hsl longer hue,
    red,
    blue 180deg
  );
}
```

The box on the left uses shorter interpolation, meaning color goes straight from red to blue using the shorter arc on the color wheel. The box on the right uses longer interpolation, meaning the color goes from red to blue using the longer arc, traversing through greens, yellows, and oranges.

### More repeating-conic-gradient examples

Please see Using CSS gradients for more examples.

## See also

- Using CSS gradients
- Other gradient functions: `conic-gradient()`, `linear-gradient()`, `repeating-linear-gradient()`, `radial-gradient()`, `repeating-radial-gradient()`
- `hue-interpolation-method`
- `color-interpolation-method`
- `image`
- `image()`
- `element()`
- `image-set()`
- `cross-fade()`

---
title: "`superellipse()` CSS function"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/values/superellipse/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `superellipse()` CSS function

The **`superellipse()`** CSS function defines the curvature of an ellipse, and is used to specify corner shapes either directly, or via `<corner-shape-value>` keywords.

## Syntax

```css
superellipse(infinity)
superellipse(4)
superellipse(1.7)
superellipse(0)
superellipse(-2.8)
superellipse(-3)
superellipse(-infinity)
```

### Parameters

- `<number>`
    A number in the range of `-infinity` to `infinity`, inclusive.

### Return value

A superellipse shape.

## Description

The `superellipse()` function returns a superellipse shape, which is used to specify `corner-shape` values. A superellipse is a closed curve symmetric shape between a rectangle and an ellipse. It resembles an ellipse that retains the geometric features of its two axes.

The superellipse shape is calculated using a modified version of an ellipse. The following equation defines an ellipse centered at the origin:

<math display="block">
  <mfrac>
    <msup>
      <mi>x</mi>
      <mn>2</mn>
    </msup>
    <msup>
      <mi>a</mi>
      <mn>2</mn>
    </msup>
  </mfrac>
  <mo>+</mo>
  <mfrac>
    <msup>
      <mi>y</mi>
      <mn>2</mn>
    </msup>
    <msup>
      <mi>b</mi>
      <mn>2</mn>
    </msup>
  </mfrac>
    <mo>=</mo>
    <mn>1</mn>
  </math>

The `a` and `b` variables refer to the radii of the ellipse, while the `x` and `y` coordinates are points on the ellipse's circumference.

A circle is an ellipse where the radii, the `a` and `b` in the previous equation, are the same length. With `a` and `b` both equal to `r`, the equation for a circle can be written as:

<math display="block">
  <mrow>
    <msup>
      <mi>x</mi>
      <mn>2</mn>
    </msup>
    <mo>+</mo>
    <msup>
      <mi>y</mi>
      <mn>2</mn>
    </msup>
    <mo>=</mo>
    <msup>
      <mi>r</mi>
      <mn>2</mn>
    </msup>
  </mrow>
</math>

In this equation, the `x` and `y` are coordinates of points on the circle's circumference, and the `r` is the radius of the circle, with the center of the circle being `(0, 0)`. The ellipse is produced by scaling a circle shape along the `x` and/or `y` axis.

A superellipse shape is created by replacing the `2` exponent in each case with 2K, `K` being the argument passed to the `superellipse()` function, which modifies the curvature of the ellipse:

<math display="block">
  <mrow>
    <msup>
      <mi>x</mi>
      <msup>
        <mn>2</mn>
        <mi>K</mi>
      </msup>
    </msup>
    <mo>+</mo>
    <msup>
      <mi>y</mi>
      <msup>
        <mn>2</mn>
        <mi>K</mi>
      </msup>
    </msup>
    <mo>=</mo>
    <mn>1</mn>
  </mrow>
</math>

The following diagram illustrates different `superellipse()` values for the top right corner of a container: `infinity`, `1`, `0`, `-1`, and `-infinity`:

- A `K` value of `0` creates a straight line. This value can be used to create beveled corners and corresponds to the `<corner-shape-value>` `bevel` keyword.
- A `K` value of `1` creates an ordinary ellipse, corresponding to the `round` keyword.
- A `K` value of `>1` makes the ellipse shape more square; `2` corresponds to the `squircle` keyword.
- A `K` value of `infinity` creates a perfect square (corresponding to the `square` keyword), although `K` values of `10` or more are virtually indistinguishable from a square.
- Negative `K` values result in a concave curve, resulting in corner shapes that are curved inward, or "scooped out". A `K` value of `-1` corresponds to the `scoop` keyword and `-infinity` corresponds to the `notch` keyword.

A negative or positive superellipse would appear symmetrical to a superellipse with its inverse value.

> **Note:**
> For any `K` parameter value passed, the `superellipse()` function's return value will always be the same for that `K` value. When that value is applied to two elements, the appearance of the corner shape may differ if the box size or `border-radius` values differ.

## Examples

### `superellipse()` value comparison

In this example, two `` sliders allow you to cycle through many different `corner-shape` `superellipse()` values and `border-radius` values enabling you to compare the effects of each on a container. The code is hidden for brevity, but the full explanation of the superellipse value comparison is provided on the `corner-shape` reference page.

```html
<form>
  <div>
    <label for="superellipse-slider">Choose a superellipse() value:</label>
    <input
      type="range"
      id="superellipse-slider"
      min="-5"
      value="0"
      max="5"
      step="0.1" />
  </div>
  <div>
    <label for="radius-slider">Choose a border-radius value:</label>
    <input type="range" id="radius-slider" min="0" value="45" max="90" />
  </div>
</form>
<section></section>
```

```css
html {
  font-family: "Helvetica", "Arial", sans-serif;
}

body {
  width: fit-content;
  margin: 20px auto;
}

section {
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 100%;
  margin-top: 20px;
}

form div {
  margin-top: 5px;
  display: flex;
}

section {
  width: 100%;
  height: 180px;
  background-color: orange;
  background-image: linear-gradient(
    to bottom,
    rgb(255 255 255 / 0),
    rgb(255 255 255 / 0.5)
  );
}

section {
  box-shadow: 1px 1px 3px gray;
}
```

```js
const rectangle = document.querySelector("section");
const superEllipseRange = document.getElementById("superellipse-slider");
const borderRadiusRange = document.getElementById("radius-slider");

function setCorners() {
  const seValue = `superellipse(${superEllipseRange.value})`;
  rectangle.style.cornerShape = seValue;
  const brValue = `${borderRadiusRange.value}px`;
  rectangle.style.borderRadius = brValue;
  rectangle.innerHTML = `<div><code>corner-shape: ${seValue};</code><br><code>border-radius: ${brValue};</code></div>`;
}

superEllipseRange.addEventListener("input", setCorners);
borderRadiusRange.addEventListener("input", setCorners);
setCorners();
```

> **Note:**
> See also the `<corner-shape-value>` value comparison example.

## See also

- `corner-shape`
- `<corner-shape-value>`
- CSS borders and box decorations module

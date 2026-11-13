---
title: "`hue-rotate()` CSS function"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/values/filter-function/hue-rotate/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `hue-rotate()` CSS function

The **`hue-rotate()`** CSS function rotates the hue of an element and its contents. It is used as a value for the `filter` and `backdrop-filter` properties.

> **Note:**
> `hue-rotate()` is specified as a matrix operation on the RGB color. It does not actually convert the color to the HSL model, which is a non-linear operation. Therefore, it may not preserve the saturation or lightness of the original color, especially for saturated colors.

```css
filter: hue-rotate(0);
```

```css
filter: hue-rotate(90deg);
```

```css
filter: hue-rotate(-0.25turn);
```

```css
filter: hue-rotate(3.142rad);
```

```html
<section id="default-example">
  <img
    class="transition-all"
    id="example-element"
    src="/shared-assets/images/examples/firefox-logo.svg"
    width="200" />
</section>
```

## Syntax

```css
/* No rotation */
hue-rotate()
hue-rotate(0deg)

/* Half-turn rotation */
hue-rotate(-180deg)
hue-rotate(540deg)
hue-rotate(200grad)
hue-rotate(3.14159rad)
hue-rotate(0.5turn)
```

### Parameters

- `angle` (optional)
    Specifies the relative change in hue of the input sample. A value of `0deg` leaves the input unchanged. A positive hue rotation increases the hue value, while a negative rotation decreases the hue value. The initial value for interpolation is `0`. There is no minimum or maximum value. Given `hue-rotate(Ndeg)`, the effect evaluates to `N` modulo 360. The default value is `0deg`.

### Return value

A `filter-function` value.

## Examples

### With the backdrop-filter property

This example applies a `hue-rotate()` filter via the `backdrop-filter` CSS property to the paragraph, color shifting to the area behind the ``.

```css
.container {
  background: url("/shared-assets/images/examples/listen_to_black_women.jpg")
    no-repeat left / contain #011296;
}
p {
  backdrop-filter: hue-rotate(240deg);
  text-shadow: 2px 2px #011296;
}
```

```css
.container {
  padding: 3rem;
  width: 30rem;
}
p {
  padding: 0.5rem;
  color: white;
  font-size: 2rem;
  font-family: sans-serif;
}
```

```html
<div class="container">
  <p>
    Text on images can be illegible and inaccessible even with a drop shadow.
  </p>
</div>
```

### With the filter property

This example applies a `hue-rotate()` filter via the `filter` CSS property adding the color shift to the entire element, including content, border, and background image.

```css
p {
  filter: hue-rotate(-60deg);
  text-shadow: 2px 2px blue;
  background-color: magenta;
  color: goldenrod;
  border: 1em solid rebeccapurple;
  box-shadow:
    inset -5px -5px red,
    5px 5px yellow;
}
```

```css
p {
  padding: 0.5rem;
  font-size: 2rem;
  font-family: sans-serif;
  width: 85vw;
}
```

```html
<p>The person who wrote this example is not a designer, fortunately.</p>
```

### Using the SVG filter

This example shows three images for comparison: an image with a `hue-rotate()` filter function applied, an image with the equivalent SVG filter applied, and the original image.

#### SVG

The SVG `<feColorMatrix>` filter element can also be used to rotate the hue of content. We set the `type` to `hueRotate` and the `values` to the angle in degrees, then we can reference the SVG effect by the ID of the `<filter>`:

```html
<svg height="0" role="none">
  <filter id="hue-rotate90" color-interpolation-filters="sRGB">
    <feColorMatrix type="hueRotate" values="90" />
  </filter>
</svg>
```

The following declarations produce the same effect:

```css
filter: hue-rotate(90deg);
filter: url("#hue-rotate90"); /* with embedded SVG */
filter: url("fileName.svg#hue-rotate90"); /* external SVG */
```

#### CSS

We include CSS that will rotate the hue of elements based on their `css-filter` or `svg-filter` class:

```css
.css-filter {
  filter: hue-rotate(90deg);
}

.svg-filter {
  filter: url("#hue-rotate90");
}
```

```css
th,
td {
  padding: 5px;
}
```

```html
<table>
  <thead>
    <tr>
      <th><code>hue-rotate()</code> filter</th>
      <th>SVG filter equivalent</th>
      <th>Original image</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <img
          class="css-filter"
          src="https://mdn.github.io/shared-assets/images/examples/progress-pride-flag.jpg"
          alt="Pride flag" />
      </td>
      <td>
        <img
          class="svg-filter"
          src="https://mdn.github.io/shared-assets/images/examples/progress-pride-flag.jpg"
          alt="Pride flag" />
      </td>
      <td>
        <img
          src="https://mdn.github.io/shared-assets/images/examples/progress-pride-flag.jpg"
          alt="Pride flag" />
      </td>
    </tr>
  </tbody>
</table>
```

### hue-rotate() does not preserve saturation or lightness

The diagram below compares two color gradients starting with red: the first is generated using `hue-rotate()`, and the second uses actual HSL color values. Note how the `hue-rotate()` gradient shows obvious differences in saturation and lightness in the middle.

```html
<div>
  <p>Using <code>hue-rotate()</code></p>
  <div id="hue-rotate"></div>
</div>
<div>
  <p>Using <code>hsl()</code></p>
  <div id="hsl"></div>
</div>
```

```css
#hue-rotate,
#hsl {
  display: flex;
  margin: 1em 0;
}

#hue-rotate div,
#hsl div {
  width: 2px;
  height: 100px;
}
```

```js
const hueRotate = document.getElementById("hue-rotate");
const hsl = document.getElementById("hsl");

for (let i = 0; i < 360; i++) {
  const div1 = document.createElement("div");
  div1.style.backgroundColor = `hsl(${i}, 100%, 50%)`;
  hsl.appendChild(div1);

  const div2 = document.createElement("div");
  div2.style.backgroundColor = "red";
  div2.style.filter = `hue-rotate(${i}deg)`;
  hueRotate.appendChild(div2);
}
```

## See also

- CSS filter effects module
- The other `filter-function` functions available to be used in values of the `filter` and `backdrop-filter` properties include:
  - `blur()`
  - `brightness()`
  - `contrast()`
  - `drop-shadow()`
  - `grayscale()`
  - `invert()`
  - `opacity()`
  - `saturate()`
  - `sepia()`

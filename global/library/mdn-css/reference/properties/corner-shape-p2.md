---
title: "`corner-shape` CSS property (part 2 of 2)"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/corner-shape/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `corner-shape` CSS property (part 2 of 2)

## Examples

### Basic `corner-shape` usage

#### HTML

The markup for this example contains a single `` element.

```html
<div>Nice scooped corners</div>
```

#### CSS

We give the box a fixed `height`, a `box-shadow`, a `border-radius` of 30 pixels, and a `corner-shape` of `scoop`, along with some additional styles that we've hidden for brevity.

```css
body {
  font-family: "Helvetica", "Arial", sans-serif;
  width: 240px;
  margin: 20px auto;
}

div {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: cyan;
  background-image: linear-gradient(
    to bottom,
    rgb(255 255 255 / 0),
    rgb(255 255 255 / 0.5)
  );
}

@supports not (corner-shape: scoop) {
  body {
    all: unset !important;
  }

  body::before {
    content: "Your browser does not support the 'corner-shape' property.";
    color: black;
    background-color: #ffcd33;
    display: block;
    width: 100%;
    text-align: center;
    padding: 1rem 0;
  }
}
```

```css
div {
  height: 180px;
  box-shadow: 1px 1px 3px gray;
  border-radius: 30px;
  corner-shape: scoop;
}
```

#### Result

The rendered result looks like this:

Note how the `corner-shape` value of `scoop` gives the container concave corners — the curve is an inversion of the default `border-radius` curve. Note also how the background, border, and box shadow follow the shape of the curve.

### Demonstration of properties that follow the `corner-shape`

#### HTML

The markup for this example contains a single `` element with some text content inside it.

```html
<div>
  Some styles follow the corner shape, such as border, outline, box-shadow,
  overflow, and backdrop-filter. This is useful for helping various aspects of
  your design to not clash. As shown, it can result in some interesting visual
  effects, so you should test your design carefully.
</div>
```

#### CSS

To demonstrate how some styles follow the shape of a container's corners, we apply a `background-image` to the document `<body>`, then apply a `border-radius` of `40px` and a `corner-shape` of `scoop notch` to the ``.

We then apply the following to the ``:

- A semi-transparent `background-color`.
- A different color and style of `border` on each edge.
- A `backdrop-filter` that inverts the `background-image` set on the `<body>`.
- A `:hover` style so you can see that the clickable content area falls outside the corner shape.

Additional set up styles have been hidden for brevity.

```css
html {
  height: 100%;
}

body {
  font-family: "Helvetica", "Arial", sans-serif;
  height: inherit;
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

div {
  width: 240px;
  height: 180px;
}

@supports not (corner-shape: scoop notch) {
  :root::before {
    content: "Your browser does not support the 'corner-shape' property.";
    color: black;
    background-color: wheat;
    display: block;
    text-align: center;
    padding: 1rem 0;
  }
}
```

```css
body {
  background: url("https://mdn.github.io/shared-assets/images/examples/leopard.jpg")
    no-repeat;
  background-size: cover;
}

div {
  border-radius: 40px;
  corner-shape: scoop notch;
  background-color: rgb(255 255 255 / 0.2);
  border-top: 3px solid blue;
  border-left: 6px dashed red;
  border-bottom: 9px solid yellow;
  border-right: 12px double green;
  backdrop-filter: invert(100%);
}

div:hover {
  background-color: white;
}
```

#### Result

The rendered result looks like this:

Note how most of the set styles follow the shape of the `` resulting from its `corner-shape` styles, but not all. The content is displayed relative to the original box, and the hover effect is still applied if you hover over the text sticking out past the top- and bottom-left corners.

### Comparing `corner-shape` values

In this demonstration, you can select different `corner-shape` values and set different `border-radius` values on a container and compare the effects.

#### HTML

The markup for this example contains a `<select>` picker from which different `corner-shape` values can be selected, an `` slider to select different `border-radius` values, and a `` element to create a container to apply those values to. The select `<option>` elements provide multiple keyword and `superellipse()` value choices, broken into two groups using `<optgroup>` elements. In the case of the keyword values, we've also included the `superellipse()` value equivalent for each one, separated by a pipe character.

```html
<form>
  <div>
    <label for="corner-shape-choice">Choose a corner-shape value:</label>
    <select id="corner-shape-choice">
      <optgroup label="Keywords">
        <option value="square">square | superellipse(infinity)</option>
        <option selected value="squircle">squircle | superellipse(2)</option>
        <option value="round">round | superellipse(1)</option>
        <option value="bevel">bevel | superellipse(0)</option>
        <option value="scoop">scoop | superellipse(-1)</option>
        <option value="notch">notch | superellipse(-infinity)</option>
      </optgroup>
      <optgroup label="Functions">
        <option>superellipse(3)</option>
        <option>superellipse(1.5)</option>
        <option>superellipse(0.5)</option>
        <option>superellipse(-0.5)</option>
        <option>superellipse(-1.5)</option>
        <option>superellipse(-3)</option>
      </optgroup>
    </select>
  </div>
  <div>
    <label for="radius-slider">Choose a border-radius value:</label>
    <input
      type="range"
      id="radius-slider"
      min="0"
      value="45"
      max="90"
      step="1" />
  </div>
</form>
<section></section>
```

#### CSS

We apply a `box-shadow` to the ``. We also give the `` and form elements some basic <example-value>, which we've hidden for brevity.

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
  margin-top: 20px;
}

select {
  padding: 3px 5px;
}

form div:nth-of-type(2) {
  margin-top: 5px;
  display: flex;
}

section {
  width: 100%;
  height: 180px;
  background-color: gold;
  background-image: linear-gradient(
    to bottom,
    rgb(255 255 255 / 0),
    rgb(255 255 255 / 0.5)
  );
}

@supports not (corner-shape: scoop) {
  :root::before {
    content: "Your browser does not support the 'corner-shape' property.";
    background-color: wheat;
    display: block;
    text-align: center;
    padding: 1rem 0;
  }
}
```

```css
section {
  box-shadow: 1px 1px 3px gray;
}
```

```js
const rectangle = document.querySelector("section");
const select = document.querySelector("select");
const range = document.getElementById("radius-slider");

function setCorners() {
  rectangle.style.cornerShape = select.value;
  const brValue = `${range.value}px`;
  rectangle.style.borderRadius = brValue;
  rectangle.innerHTML = `<div><code>corner-shape: ${select.value};</code><br><code>border-radius: ${brValue};</code></div>`;
}

select.addEventListener("change", setCorners);
range.addEventListener("input", setCorners);
setCorners();
```

The JavaScript that applies the user-selected values to the `` has been hidden for brevity.

#### Result

The rendered result looks like this:

Try selecting different values to see how this affects the shape of the corners.

### `superellipse()` value comparison

In this example, we provide two `` sliders allowing you to cycle through many different `corner-shape` `superellipse()` values and `border-radius` values to compare the effects of each on a container.

#### HTML

The markup for this example contains two `` elements from which different `corner-shape` `superellipse()` and `border-radius` values can be selected, and a `` element to apply those values to.

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
    <input
      type="range"
      id="radius-slider"
      min="0"
      value="45"
      max="90"
      step="1" />
  </div>
</form>
<section></section>
```

#### CSS

We apply a `box-shadow` to the `` element. Additional basic <example-value> have been hidden for brevity.

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

@supports not (corner-shape: superellipse(0)) {
  :root::before {
    content: "Your browser does not support the 'corner-shape' property.";
    background-color: wheat;
    display: block;
    text-align: center;
    padding: 1rem 0;
  }
}
```

```css
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

The JavaScript that applies the user-selected values to the `` has been hidden for brevity.

#### Result

The rendered result looks like this:

Try selecting different values to see how this affects the shape of the corners.

### Animating `corner-shape`

In this example, we demonstrate how the `corner-shape` property can be animated.

#### HTML

```html
<div></div>
```

#### CSS

We create a set of `@keyframes` that animate smoothly between the `corner-shape` values of `square` and `notch`. We then apply an `animation` based on those `@keyframes` to the `` when its containing `<html>` element is hovered over or focused. Additional basic `` styles have been hidden for brevity.

```css
body {
  width: 200px;
  margin: 20px auto;
}

div {
  width: 100%;
  height: 200px;
  background-color: green;
  background-image: linear-gradient(
    to bottom,
    rgb(255 255 255 / 0),
    rgb(255 255 255 / 0.5)
  );
  box-shadow: 1px 1px 3px gray;
  border-radius: 50%;
  corner-shape: square;
  outline: none;
}

@supports not (corner-shape: square) {
  :root::before {
    content: "Your browser does not support the 'corner-shape' property.";
    background-color: wheat;
    display: block;
    text-align: center;
    padding: 1rem 0;
  }
}
```

```css
@keyframes corner-pulse {
  0% {
    corner-shape: square;
  }

  /* To make the starting point apparent, let us keep
  the shape the same for a small duration. */
  20% {
    corner-shape: square;
  }

  100% {
    corner-shape: notch;
  }
}

div {
  animation: corner-pulse infinite alternate 4s linear;
}
```

#### Result

The rendered result looks like this:

## See also

- `border-radius`
- `border-shape`
- CSS borders and box decorations module
- CSS backgrounds and borders module
- CSS animations module

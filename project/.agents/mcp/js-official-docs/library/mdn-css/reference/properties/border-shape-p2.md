---
title: "`border-shape` CSS property (part 2 of 2)"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/border-shape/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `border-shape` CSS property (part 2 of 2)

## Examples

### Basic `border-shape` stroke usage

This example shows how to use `border-shape` in stroke mode.

#### HTML

The markup for this example contains a single `` element.

```html
<p>Circle</p>
```

#### CSS

```css
html {
  height: 100%;
}

body {
  margin: 0;
  height: inherit;
  display: flex;
  justify-content: center;
  align-items: center;
}

p {
  box-sizing: border-box;
  font-family: "Helvetica", "Arial";
  font-size: 1.6rem;
  padding: 40px 50px;
  background-color: chartreuse;
  display: flex;
  align-items: center;
}
```

We give the box a `width` of `fit-content` and an `aspect-ratio` of `1/1` to neatly fit the content inside a square. We also set a thick black `border` and a `box-shadow` before setting a `border-shape` of `circle(50%)` to create a circular border that neatly fits the content and background.

```css
p {
  width: fit-content;
  aspect-ratio: 1/1;
  border: 15px solid black;
  box-shadow: 5px 5px 10px rgb(0 0 0 / 0.5);
  border-shape: circle(50%);
}
```

#### Result

Note how the `border` and `box-shadow` neatly follow the defined shape.

### Basic `border-shape` fill usage

This example builds on the previous one, showing how to use `border-shape` in fill mode to create an irregular filled border.

The HTML is the same as in the previous example.

#### CSS

The CSS is the same as in the previous example, except this time we color the border `hotpink`, and we include two `<basic-shape>` definitions inside the `border-shape` value. There's an outer rectangle that covers the whole area of the content and an inner circle that's the same as in the previous example.

```css
p {
  width: fit-content;
  aspect-ratio: 1/1;
  border: 15px solid hotpink;
  box-shadow: 5px 5px 10px rgb(0 0 0 / 0.5);
  border-shape: rect(0% 100% 100% 0% round 20px) circle(50%);
}
```

#### Result

Note how this time, the border covers the area between the rectangle and the circle, and it adopts the color set in the `border` declaration.

### Comparing `border-shape` values

In this example, we let you select from different `border-shape` values to apply to an element, so you can compare and contrast how they render.

#### HTML

The HTML is similar to that in the previous example, except this time we include a bit more text in the `` element. We've also included a `<select>` element so you can choose different classes to apply to the `` via JavaScript (we've hidden both the `<select>` and the JavaScript for brevity).

```html
<p>Blessed are the cheesemakers.</p>
```

```html
<form>
  <label for="shape-select">Select border-shape type:</label>
  <br />
  <select id="shape-select">
    <option>circle</option>
    <option selected>ellipse</option>
    <option>inset</option>
    <option>path</option>
    <option>polygon</option>
    <option>rect</option>
    <option>shape</option>
    <option>two-polygons</option>
    <option>xywh</option>
  </select>
</form>
```

The classes set different `border-shape` values on the `` element. To begin with, a `class` of `ellipse` is set on the `` element, so initially it has an `ellipse()` `border-shape`.

```js
const box = document.querySelector("p");
const select = document.querySelector("select");

select.addEventListener("change", selectClass);

function selectClass() {
  box.className = select.value;
}

selectClass();
```

#### CSS

In the CSS, we give the box a `width` of `550px`, a thick black `border`, and a `box-shadow`.

```css
p {
  width: 550px;
  border: 15px solid black;
  box-shadow: 5px 5px 10px rgb(0 0 0 / 0.5);
}
```

Next, we define the rules for each of the classes that will be applied when you select the different options in the `<select>` element:

```css
.circle {
  border-shape: circle(60%);
}

.ellipse {
  border-shape: ellipse(50% 40%);
}

.inset {
  border-shape: inset(10px 20px 10px 20px round 20px);
}

.path {
  border-shape: path(
      "M 35,95 C 35,50 60,15 100,20 C 120,5 160,5 180,22 C 200,5 250,5 270,22 C 295,5 340,5 360,22 C 460,10 477,35 496,75 C 515,157 450,120 430,128 C 400,145 360,145 330,130 C 300,145 260,145 230,130 C 200,145 160,145 130,130 C 80,142 35,120 35,95 Z"
    )
    view-box;
}

.polygon {
  border-shape: polygon(0% 60%, 0% 85%, 8% 100%, 18% 88%, 30% 100%, 42% 88%, 55% 100%, 68% 88%, 80% 100%, 86% 88%, 90% 75%, 100% 60%, 90% 30%, 85% 5%, 75% 18%, 65% 3%, 52% 16%, 40% 3%, 27% 16%, 15% 3%, 5% 18%) view-box;
}

.rect {
  border-shape: rect(10px 500px 130px 20px round 20px);
}

.shape {
  border-shape: shape(
    from 0% 64.5%,
    curve to 15.71% 8.26% with 0% 30.76%/6.04% 4.51%,
    curve to 35.05% 9.76% with 20.55% -2.99%/30.21% -2.99%,
    curve to 56.8% 9.76% with 39.88% -2.99%/51.97% -2.99%,
    curve to 78.56% 9.76% with 62.84% -2.99%/73.72% -2.99%,
    curve to 97.89% 49.5% with 87.02% 0.76%/97.89% 19.51%,
    curve to 95.47% 89.25% with 101.52% 60.75%/100.31% 83.25%,
    curve to 71.3% 90.75% with 88.22% 102%/78.56% 102%,
    curve to 47.13% 90.75% with 64.05% 102%/54.38% 102%,
    curve to 22.96% 90.75% with 39.88% 102%/30.21% 102%,
    curve to 0% 64.5% with 10.88% 99.75%/0% 83.25%,
    close
  );
}

.two-polygons {
  border-shape: polygon(0% 60%, 0% 85%, 8% 100%, 18% 88%, 30% 100%, 42% 88%, 55% 100%, 68% 88%, 80% 105%, 86% 88%, 91% 75%, 101% 60%, 93% 30%, 86% 5%, 75% 18%, 65% 3%, 52% 16%, 40% 3%, 27% 16%, 15% 3%, 5% 18%)
    polygon(0% 55%, 0% 90%, 6% 104%, 17% 93%, 30% 100%, 43% 93%, 56% 102%, 69% 93%, 81% 102%, 88% 93%, 94% 78%, 100% 58%, 94% 24%, 88% -2%, 76% 13%, 64% -4%, 51% 11%, 39% -4%, 26% 11%, 13% -4%, 3% 13%);
}

.xywh {
  border-shape: xywh(5% 5% 90% 90% round 20px);
}
```

```css
form {
  position: absolute;
  border: 2px solid black;
  background: white;
  padding: 5px;
  bottom: 0;
  right: 0;
}

form select {
  width: 100%;
  padding: 2px 5px;
  margin-top: 10px;
}
```

#### Result

Select different options from the drop-down menu to see how the different border shapes render. At any point, feel free to use your browser's developer tools to inspect the `border-shape` values applied to the `` element and edit them to get an idea of how the values work.

### Animating a `border-shape`

This example demonstrates how you can animate the `border-shape` property.

#### HTML

The same `` element is used as in the previous example, except this time we've included a `tabindex` attribute so it can be focused via the keyboard.

```html
<p tabindex="0">Blessed are the cheesemakers.</p>
```

#### CSS

For this example, we apply a `polygon()` `border-shape` to the ``.

```css
p {
  width: 550px;
  border: 15px solid black;
  box-shadow: 5px 5px 10px rgb(0 0 0 / 0.5);
  border-shape: polygon(0% 60%, 0% 85%, 8% 100%, 18% 88%, 30% 100%, 42% 88%, 55% 100%, 68% 88%, 80% 100%, 86% 88%, 90% 75%, 100% 60%, 90% 30%, 85% 5%, 75% 18%, 65% 3%, 52% 16%, 40% 3%, 27% 16%, 15% 3%, 5% 18%) view-box;
}
```

We also set an `animation` on the `` element's `:hover` and `:focus` states, so that when the element is hovered or focused, it smoothly animates back and forth between two polygon border shapes for infinite iterations.

```css
p:hover,
p:focus {
  animation: morph 1s ease-in-out infinite alternate;
}

@keyframes morph {
  from {
    border-shape: polygon(0% 60%, 0% 85%, 8% 100%, 18% 88%, 30% 100%, 42% 88%, 55% 100%, 68% 88%, 80% 100%, 86% 88%, 90% 75%, 100% 60%, 90% 30%, 85% 5%, 75% 18%, 65% 3%, 52% 16%, 40% 3%, 27% 16%, 15% 3%, 5% 18%) view-box;
  }
  to {
    border-shape: polygon(0% 55%, 0% 90%, 6% 104%, 17% 93%, 30% 100%, 43% 93%, 56% 102%, 69% 93%, 81% 102%, 88% 93%, 94% 78%, 100% 58%, 94% 24%, 88% -2%, 76% 13%, 64% -4%, 51% 11%, 39% -4%, 26% 11%, 13% -4%, 3% 13%) view-box;
  }
}
```

#### Result

Hover over or focus the paragraph to see the animation.

```css
@supports not (border-shape: circle(50%)) {
  body::before {
    content: "Your browser does not support the 'border-shape' property.";
    font-family: sans-serif;
    background-color: wheat;
    padding: 1rem 0;
    text-align: center;

    z-index: 1;
    position: fixed;
    inset: 40% 0 auto;
  }
}
```

## See also

- `border`
- `corner-shape`
- Creating an irregular nav menu with border-shape
- CSS borders and box decorations module
- CSS backgrounds and borders module
- border-shape: the future of the non-rectangular web by Una Kravets (2026)
- Get Ready For the Powerful CSS border-shape Property! on CSS Tricks (2026)

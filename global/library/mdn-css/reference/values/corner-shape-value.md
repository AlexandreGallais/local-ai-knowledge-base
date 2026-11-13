---
title: "`<corner-shape-value>` CSS type"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/values/corner-shape-value/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `<corner-shape-value>` CSS type

The **`<corner-shape-value>`** CSS data type describes the shape of a container corner. It is used by the `corner-shape` shorthand property and its constituent properties to specify the shape to apply to affected container corners.

## Syntax

The `<corner-shape-value>` data type can take a `superellipse()` function that defines a custom shape, or one of six keyword values that describe common `superellipse()` values.

### Values

- `superellipse()`
    Defines a custom corner superellipse shape. A negative parameter creates an inward, or concave, curve while a positive parameter creates an outward, or convex, curve.
- Keywords
    The available keyword values are as follows:
    - `bevel`
        Defines a straight, diagonal corner, which is neither convex nor concave. The `bevel` keyword is equivalent to `superellipse(0)`.
    - `notch`
        Defines a 90-degree concave square corner. The `notch` keyword is equivalent to `superellipse(-infinity)`.
    - `round`
        Defines a convex ordinary ellipse, which is the standard rounded corner created by `border-radius` without a `corner-shape` applied. The `round` keyword is equivalent to `superellipse(1)`. This is the default (initial) value for all `corner-shape` properties.
    - `scoop`
        Defines a concave ordinary ellipse. The `scoop` keyword is equivalent to `superellipse(-1)`.
    - `square`
        Defines a 90-degree convex square corner, which is the default corner shape when no `border-radius` (or `border-radius: 0`) is applied. The `square` keyword is equivalent to `superellipse(infinity)`.
    - `squircle`
        Defines a "squircle", which is a convex curve in between `round` and `square`. The `squircle` keyword is equivalent to `superellipse(2)`.

> **Note:**
> You can smoothly animate between different `superellipse()` values, and between different corner shape keywords, as the animation interpolates between their `superellipse()` equivalents.

## Examples

### `<corner-shape-value>` value comparison

In this example, we provide a drop-down menu allowing you to select different `<corner-shape-value>` values and a slider that updates the container's `border-radius`. This enables visualizing the effect of the different keywords and `superellipse()` parameter values.

The `corner-shape` property defines the shape of the box's corners while the region the shape is applied to is specified by the `border-radius` property. The code is hidden for brevity, but you can find a full explanation of `corner-shape` values along with other related examples on the `corner-shape` reference page.

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

> **Note:**
> See also the `superellipse()` function value comparison example.

## See also

- `corner-shape`
- `border-radius`
- `superellipse()`
- CSS borders and box decorations module

---
title: "CSS borders and box decorations"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/guides/borders_and_box_decorations/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSS borders and box decorations

The **CSS borders and box decorations** module provides properties for adding borders, shaped corners, and box shadows to elements. This module extends borders and box decorations introduced in the CSS backgrounds and borders module, adding `corner-shape` and `border-shape` properties, logical `border-radius` properties, longhand properties for the `box-shadow` property, and properties to create partial borders.

## Borders and box decorations in action

Select a `superellipse()` value from the dropdown menu to change the border shape. Use the slider to change the border radius size. Toggle the checkbox to hide and show the box shadow.

```html
<p>
  <label for="corner-shape-choice"
    >Choose a <code>superellipse()</code> value:</label
  >
  <select id="corner-shape-choice">
    <option>superellipse(infinity)</option>
    <option>superellipse(5)</option>
    <option>superellipse(3)</option>
    <option>superellipse(2)</option>
    <option>superellipse(1.5)</option>
    <option>superellipse(1)</option>
    <option>superellipse(0.5)</option>
    <option>superellipse(0)</option>
    <option>superellipse(-0.5)</option>
    <option selected>superellipse(-1)</option>
    <option>superellipse(-1.5)</option>
    <option>superellipse(-2)</option>
    <option>superellipse(-3)</option>
    <option>superellipse(-5)</option>
    <option>superellipse(-infinity)</option>
  </select>
</p>
<p>
  <label for="radius">Choose a <code>border-radius</code> value:</label>
  <input
    type="range"
    step="5"
    min="0"
    max="100"
    value="30"
    id="radius"
    list="tens" />
  <datalist id="tens">
    <option value="0" label="0"></option>
    <option value="20" label="20px"></option>
    <option value="40" label="40px"></option>
    <option value="60" label="60px"></option>
    <option value="80" label="80px"></option>
    <option value="100" label="100px"></option>
  </datalist>
</p>

<p>
  <input type="checkbox" id="check" />
  <label for="check">Toggle the box-shadow</label>
</p>
<div></div>
```

```css
div {
  width: 100%;
  height: 200px;
  background-color: plum;
  background-image:
    repeating-linear-gradient(transparent 0 19px, #00000022 19px 20px),
    repeating-linear-gradient(to left, transparent 0 19px, #00000022 19px 20px);
}

div {
  box-shadow: 3px 3px 5px rgb(0 0 0 / 0.5);
  border-radius: 30px;
}
body:has(input:checked) div {
  box-shadow: none;
}

@layer page-setup {
  html {
    font-family: "Helvetica", "Arial", sans-serif;
  }
  body {
    max-width: 600px;
    min-width: fit-content;
    margin: 20px auto;
  }
  div {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
  }
  select {
    padding: 3px 5px;
  }
  code {
    font-weight: bolder;
  }
}
```

```js
const rectangle = document.querySelector("div");
const select = document.querySelector("select");
const range = document.getElementById("radius");

function setCornerShape() {
  rectangle.style.cornerShape = select.value;
  rectangle.style.borderRadius = `${range.value}px`;
  rectangle.innerHTML = `<pre>div {
  corner-shape: ${select.value};
  border-radius: ${range.value}px;
}</pre>`;
}

select.addEventListener("change", setCornerShape);
range.addEventListener("input", setCornerShape);
setCornerShape();
```

## Reference

### Properties

- `border-block`
- `border-block-color`
- `border-block-end`
- `border-block-end-color`
- `border-block-end-style`
- `border-block-end-width`
- `border-block-start`
- `border-block-start-color`
- `border-block-start-style`
- `border-block-start-width`
- `border-block-style`
- `border-block-width`
- `border-bottom`
- `border-bottom-color`
- `border-bottom-left-radius`
- `border-bottom-right-radius`
- `border-bottom-style`
- `border-bottom-width`
- `border-color`
- `border-end-end-radius`
- `border-end-start-radius`
- `border-inline`
- `border-inline-color`
- `border-inline-end`
- `border-inline-end-color`
- `border-inline-end-style`
- `border-inline-end-width`
- `border-inline-start`
- `border-inline-start-color`
- `border-inline-start-style`
- `border-inline-start-width`
- `border-inline-style`
- `border-inline-width`
- `border-left`
- `border-left-color`
- `border-left-style`
- `border-left-width`
- `border-radius`
- `border-right`
- `border-right-color`
- `border-right-style`
- `border-right-width`
- `border-shape`
- `border-start-end-radius`
- `border-start-start-radius`
- `border-top`
- `border-top-color`
- `border-top-left-radius`
- `border-top-right-radius`
- `border-top-style`
- `border-top-width`
- `box-shadow`
- `corner-block-end-shape`
- `corner-block-start-shape`
- `corner-bottom-left-shape`
- `corner-bottom-right-shape`
- `corner-bottom-shape`
- `corner-end-end-shape`
- `corner-end-start-shape`
- `corner-inline-end-shape`
- `corner-inline-start-shape`
- `corner-left-shape`
- `corner-right-shape`
- `corner-shape`
- `corner-start-end-shape`
- `corner-start-start-shape`
- `corner-top-left-shape`
- `corner-top-right-shape`
- `corner-top-shape`

The CSS borders and box decorations module level 4 also introduces the `border-limit`, and `border-clip` properties, along with the `border-clip-bottom`, `border-clip-left`, `border-clip-right`, `border-clip-top` longhand properties. Currently, no browsers support these features. The module also introduces component properties for the well supported `border-radius` and `box-shadow` properties, including `border-block-end-radius`, `border-block-start-radius`, `border-bottom-radius`, `border-inline-end-radius`, `border-inline-start-radius`, `border-right-radius`, `border-top-radius`, `box-shadow-blur`, `box-shadow-color`, `box-shadow-offset`, `box-shadow-position`, and `box-shadow-spread`. These component properties are also as yet unsupported.

### Data types

- `corner-shape-value`

### Functions

- `superellipse()`

## Guides

- Learn CSS: the box model
    Learn how borders and other box model properties impact the CSS box model.
- Creating an irregular nav menu with border-shape
    How to use the `border-shape` property to create an irregular animated navigation menu.

## Related concepts

- `box-sizing` property
- `box-decoration-break` property
- `text-shadow` property
- `<url>` data type
- `<color>` data type
- `image` data type
- `<position>` data type
- `currentColor` keyword

CSS backgrounds and borders module

- `background-attachment`
- `background-clip`
- `background-color`
- `background-image`
- `background-origin`
- `background-position`
- `background-repeat`
- `background-size`
- `background` shorthand
- `background-position-x`
- `background-position-y`
- `border-image-outset`
- `border-image-repeat`
- `border-image-slice`
- `border-image-source`
- `border-image-width`
- `border-image` shorthand

## See also

- `filter`
- `backdrop-filter`
- `drop-shadow()` filter function
- Applying color to HTML elements using CSS
- Tools:
  - Border-image generator
  - Border-radius generator

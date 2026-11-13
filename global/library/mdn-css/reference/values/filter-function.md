---
title: "`<filter-function>` CSS type"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/values/filter-function/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `<filter-function>` CSS type

The **`<filter-function>`** CSS data type represents a graphical effect that can change the appearance of an input image. It is used in the `filter` and `backdrop-filter` properties.

## Syntax

The `<filter-function>` data type is specified using one of the filter functions listed below. Each function requires an argument which, if invalid, results in no filter being applied.

- `blur()`
    Blurs the image.
- `brightness()`
    Makes the image brighter or darker.
- `contrast()`
    Increases or decreases the image's contrast.
- `drop-shadow()`
    Applies a drop shadow behind the image.
- `grayscale()`
    Converts the image to grayscale.
- `hue-rotate()`
    Changes the overall hue of the image.
- `invert()`
    Inverts the colors of the image.
- `opacity()`
    Makes the image transparent.
- `saturate()`
    Super-saturates or desaturates the input image.
- `sepia()`
    Converts the image to sepia.

## Examples

### Filter function comparison

This example provides a graphic, a select menu to allow you to choose between the different types of filter function, and a slider to allow you to vary the values used inside the filter function. Updating the controls updates the filter effect in real time, allowing you to investigate the effects of different filters.

The dropdown selects the function name, and the slider sets the parameter value for that function. For `drop-shadow`, the value is used for both the horizontal and vertical offsets, and the radius is set to half the value.

```html
<div></div>
<ul>
  <li>
    <label for="filter-select">Choose a filter function:</label>
    <select id="filter-select">
      <option selected>blur</option>
      <option>brightness</option>
      <option>contrast</option>
      <option>drop-shadow</option>
      <option>grayscale</option>
      <option>hue-rotate</option>
      <option>invert</option>
      <option>opacity</option>
      <option>saturate</option>
      <option>sepia</option>
    </select>
  </li>
  <li><input type="range" /><output></output></li>
  <li>
    <p>Current value: <code></code></p>
  </li>
</ul>
```

```css
div {
  width: 100%;
  height: 512px;
  background-image: url("https://mdn.github.io/shared-assets/images/examples/fx-nightly-512.png");
  background-repeat: no-repeat;
  background-position: center center;
}

li {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
}

input {
  width: 60%;
}

output {
  width: 5%;
  text-align: center;
}

select {
  width: 40%;
  margin-left: 2px;
}
```

```js
const selectElem = document.querySelector("select");
const divElem = document.querySelector("div");
const slider = document.querySelector("input");
const output = document.querySelector("output");
const curValue = document.querySelector("p code");

selectElem.addEventListener("change", () => {
  setSlider(selectElem.value);
  setDiv(selectElem.value);
});

slider.addEventListener("input", () => {
  setDiv(selectElem.value);
});

function setSlider(filter) {
  switch (filter) {
    case "blur":
      slider.value = 0;
      slider.min = 0;
      slider.max = 30;
      slider.step = 1;
      slider.setAttribute("data-unit", "px");
      break;
    case "brightness":
    case "contrast":
    case "saturate":
      slider.value = 1;
      slider.min = 0;
      slider.max = 4;
      slider.step = 0.05;
      slider.setAttribute("data-unit", "");
      break;
    case "drop-shadow":
      slider.value = 0;
      slider.min = -20;
      slider.max = 40;
      slider.step = 1;
      slider.setAttribute("data-unit", "px");
      break;
    case "opacity":
      slider.value = 1;
      slider.min = 0;
      slider.max = 1;
      slider.step = 0.01;
      slider.setAttribute("data-unit", "");
      break;
    case "grayscale":
    case "invert":
    case "sepia":
      slider.value = 0;
      slider.min = 0;
      slider.max = 1;
      slider.step = 0.01;
      slider.setAttribute("data-unit", "");
      break;
    case "hue-rotate":
      slider.value = 0;
      slider.min = 0;
      slider.max = 360;
      slider.step = 1;
      slider.setAttribute("data-unit", "deg");
      break;
    default:
      console.error("Unknown filter set");
  }
}

function setDiv(filter) {
  const unit = slider.getAttribute("data-unit");
  const offset = `${Math.round(slider.value)}${unit}`;
  const radius = `${Math.round(Math.abs(slider.value / 2))}${unit}`;
  divElem.style.filter =
    filter === "drop-shadow"
      ? `${selectElem.value}(${offset} ${offset} ${radius})`
      : `${selectElem.value}(${slider.value}${unit})`;

  updateOutput();
  updateCurValue();
}

function updateOutput() {
  output.textContent = slider.value;
}

function updateCurValue() {
  curValue.textContent = `filter: ${divElem.style.filter}`;
}

setSlider(selectElem.value);
setDiv(selectElem.value);
```

## See also

- Properties that use this data type: `filter` and `backdrop-filter`

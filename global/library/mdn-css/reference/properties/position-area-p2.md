---
title: "`position-area` CSS property (part 2 of 2)"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/position-area/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `position-area` CSS property (part 2 of 2)

## Examples

### Basic <example-value>

In this example, a positioned element is tethered and positioned relative to its associated anchor using the `position-area` property.

#### HTML

The HTML includes a `` and a ``. The `` will be positioned relative to the `` with CSS. We also include a style block that will be made visible. All elements are set to be directly editable via the `contenteditable` attribute.

```html
<div class="anchor" contenteditable="true">⚓︎</div>

<p class="positionedElement" contenteditable="true">This can be edited.</p>

<style contenteditable="true">.positionedElement {
    position-area: top center;
  }
</style>
```

#### CSS

We convert the `` to an anchor element with the `anchor-name` property. We then associate the absolutely-positioned `` with it by setting its `position-anchor` value to the same anchor name.

We set the initial `position-area` value to `top center`. This value is set on a `p` selector, so the value has less specificity than any value added to the `<style>` block's `.positionedElement` class selector. As a result, you can override the initial `position-area` value by setting a `position-area` value inside the style block.

```css
.anchor {
  anchor-name: --infobox;
  background: palegoldenrod;
  font-size: 3em;
  width: fit-content;
  border: 1px solid goldenrod;
  margin: 100px auto;
}

p {
  position: absolute;
  position-anchor: --infobox;
  position-area: top center;
  margin: 0;
  background-color: darkkhaki;
  border: 1px solid darkolivegreen;
}

style {
  display: block;
  white-space: pre;
  font-family: monospace;
  background-color: #ededed;
  -webkit-user-modify: read-write-plaintext-only;
  line-height: 1.5;
  padding: 10px;
}
```

#### Results

Try changing the amount of text in the anchor-positioned element to see how it grows. Also, try changing the value of the `position-area` property to something else, like `center`.

### `position-area` value comparison

This demo creates an anchor and tethers a positioned element to it. It also provides a drop-down menu allowing you to choose various `position-area` values to apply to the positioned element, to see their effect. One of the options causes a text field to appear that enables you to enter a custom value. Finally, a checkbox is provided to turn `writing-mode: vertical-lr` on and off, allowing you to observe how `position-area` value effects differ across different writing modes.

#### HTML

In the HTML, we specify two `` elements, one with a class of `anchor` and one with a class of `infobox`. These are intended to be the anchor element and the positioned element we will associate with it, respectively. We've included the `contenteditable` attribute on both, making them directly editable.

We've also included two forms that contain the `<select>` and `` elements for setting different `position-area` values, and the `` element for toggling the vertical `writing-mode` on and off. The code for these, along with the JavaScript, has been hidden for the sake of brevity.

```html
<div class="anchor" contenteditable>⚓︎</div>

<div class="infobox">
  <p contenteditable>You can edit this text.</p>
</div>
```

```html
<form id="position-area-form">
  <div>
    <label for="position-area-select">Choose a position-area:</label>
    <select id="position-area-select" name="position-area-select">
      <optgroup label="Enter custom value">
        <option>Custom</option>
      </optgroup>
      <optgroup label="Physical, single tile">
        <option selected>top left</option>
        <option>bottom right</option>
      </optgroup>
      <optgroup label="Physical, span two">
        <option>bottom span-right</option>
        <option>left span-top</option>
      </optgroup>
      <optgroup label="Physical, span all">
        <option>top</option>
        <option>left</option>
      </optgroup>
      <optgroup label="Logical, single tile">
        <option>start center</option>
        <option>inline-start block-end</option>
      </optgroup>
      <optgroup label="Logical, span two">
        <option>start span-end</option>
        <option>center span-start</option>
        <option>inline-start span-block-end</option>
        <option>span-block-start center</option>
      </optgroup>
      <optgroup label="Logical, span all">
        <option>start span-all</option>
        <option>block-end</option>
      </optgroup>
      <optgroup label="Coordinates, single tile">
        <option>x-start center</option>
        <option>x-end y-end</option>
      </optgroup>
      <optgroup label="Coordinates, span two">
        <option>center span-y-start</option>
        <option>y-start span-x-end</option>
      </optgroup>
      <optgroup label="Coordinates, span all">
        <option>x-start span-all</option>
        <option>y-end</option>
      </optgroup>
    </select>
  </div>
  <div id="position-area-custom-container">
    <label for="position-area-custom">Enter a custom position-area:</label
    ><br />
    <input type="text" id="position-area-custom" name="position-area-custom" />
  </div>
</form>

<form id="writing-mode-form">
  <label for="writing-mode-checkbox">writing-mode: vertical-lr</label><br />
  <input
    type="checkbox"
    id="writing-mode-checkbox"
    name="writing-mode-checkbox" />
</form>
```

#### CSS

In the CSS, we first declare the `anchor` `` as an anchor element by setting an anchor name on it via the `anchor-name` property.

The positioned element is associated with the anchor element by setting its anchor name as the value of the positioned element's `position-anchor` property. We also give it an initial position with `position-area: top left`; this will be overridden when new values are selected from the `<select>` menu. Finally, we set its `opacity` to `0.8`, so that when the positioned element is given a `position-area` value that places it over the top of the anchor, you can still see the elements' position relative to one another.

```css
.anchor {
  font-size: 1.8rem;
  text-align: center;
  color: white;
  text-shadow: 1px 1px 1px black;
  background-color: hsl(240 100% 75%);
  min-width: 50px;
  min-height: 50px;
  line-height: 50px;
  border-radius: 10px;
  border: 1px solid black;
  padding: 3px;
}

html {
  height: 100%;
}

body {
  margin: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

form {
  background: white;
  border: 1px solid black;
  padding: 5px;
  position: fixed;
}

#position-area-form {
  top: 0;
  right: 2px;
}

#position-area-form div:last-child {
  margin-top: 10px;
}

#position-area-form div :last-child {
  margin-top: 5px;
}

#writing-mode-form {
  bottom: 0;
  left: 2px;
  writing-mode: horizontal-tb;
}

#position-area-custom-container {
  display: none;
}

.infobox {
  color: darkblue;
  background-color: azure;
  border: 1px solid #dddddd;
  padding: 5px 2px;
  border-radius: 5px;
  font-size: 1rem;
  box-sizing: border-box;
}
```

```css
.anchor {
  anchor-name: --my-anchor;
}

.infobox {
  position-anchor: --my-anchor;
  position: fixed;
  opacity: 0.8;
  position-area: top left;
}
```

```js
const anchorContainer = document.querySelector("body");
const infobox = document.querySelector(".infobox");

const positionAreaForm = document.querySelector("#position-area-form");
const selectElem = document.querySelector("select");
const inputElemContainer = document.querySelector(
  "#position-area-custom-container",
);
const inputElem = document.querySelector("#position-area-custom");
const checkboxElem = document.querySelector("#writing-mode-checkbox");

// Stop form from submitting when enter is pressed on it
positionAreaForm.addEventListener("submit", (e) => {
  e.preventDefault();
});

// Update positioned element position-area to value selected in drop-down
selectElem.addEventListener("change", () => {
  const area = selectElem.value;

  if (area === "Custom") {
    // Show the custom value input field
    inputElemContainer.style.display = "block";
  } else {
    // Hide the custom value input field
    inputElemContainer.style.display = "none";
    // Set the position-area to the value chosen in the select box
    infobox.style.positionArea = area;
  }
});

// Update positioned element position-area to entered custom value
inputElem.addEventListener("change", () => {
  const customArea = inputElem.value;

  // Set the position-area to the value in the input box
  infobox.style.positionArea = customArea;
});

// Change writing-mode to match checkbox setting
checkboxElem.addEventListener("change", () => {
  if (checkboxElem.checked) {
    anchorContainer.style.writingMode = "vertical-lr";
  } else {
    anchorContainer.style.writingMode = "horizontal-tb";
  }
});
```

#### Result

The result is as follows:

Try selecting new `position-area` values from the `<select>` menu to see the effect they have on the position of the infobox. Select the "Custom" value and try entering some custom `position-area` values into the text input to see their effect. Add text to the anchor and the anchor positioned elements to see how the anchor positioned element grows based on the `position-area` value. Finally, check the checkbox and then experiment with different `position-area` values to see which ones give the same result across different writing modes, and which ones give different results.

## See also

- `anchor-name`
- `position-anchor`
- `position-try-fallbacks`
- The `anchor()` function
- The `<position-area>` value
- Using CSS anchor positioning guide
- Fallback options and conditional hiding for overflow guide
- CSS anchor positioning module

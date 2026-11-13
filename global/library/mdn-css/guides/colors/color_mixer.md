---
title: "Color mixer (part 1 of 2)"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/guides/colors/color_mixer/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Color mixer

This tool lets you mix two colors in any color space using the `color_value/color-mix` function and copy the resulting color in any CSS color format.

The two input colors, `color-one` and `color-two`, are shown on the outside, and the mixed color returned by the function is shown in the middle. Click the outer swatches to select new colors to mix. Use the sliders to change the percentages of each input color included in the mix. Use the drop-down menu to change the color space of the function's output. The resulting color's values in different formats appear in a table following the widget and can be copied. You can also click a color format name to learn more about it.

```html
<div id="color-mixer">
  <div>color-one</div>
  <div>mixed-color</div>
  <div>color-two</div>

  <div id="color-background">
    <button
      id="color-one"
      type="button"
      class="color-one"
      aria-label="Open the color one picker dialog"></button>
    <div id="mixed-color"></div>
    <button
      id="color-two"
      type="button"
      class="color-two"
      aria-label="Open the color two picker dialog"></button>
  </div>
  <div>
    <label
      id="percentage-one-label"
      for="percentage-one"
      aria-label="color one percentage">
      50%
    </label>
    <input id="percentage-one" type="range" name="percent1" step="0.01" />
  </div>
  <div>
    <label
      id="percentage-two-label"
      for="percentage-two"
      aria-label="color two percentage">
      50%
    </label>
    <input id="percentage-two" type="range" name="percent2" step="0.01" />
  </div>

  <label for="color-space">Color space: </label>
  <select id="color-space">
    <option value="srgb">sRGB</option>
    <option value="srgb-linear">sRGB-linear</option>
    <option value="hsl">HSL</option>
    <option value="hwb">HWB</option>
    <option value="lab">Lab</option>
    <option value="lch">LCH</option>
    <option value="oklab" selected>Oklab</option>
    <option value="oklch">OkLCh</option>
    <option value="xyz-d50">XYZ-D50</option>
    <option value="xyz-d65">XYZ-D65</option>
  </select>

  <label id="interpolation-method-label" for="interpolation-method">
    Hue interpolation method:
  </label>
  <select id="interpolation-method">
    <option value="shorter hue" selected>shorter hue</option>
    <option value="longer hue">longer hue</option>
    <option value="increasing hue">increasing hue</option>
    <option value="decreasing hue">decreasing hue</option>
  </select>
  <div id="mix-output-text"></div>
  <dialog id="picker-dialog">
    <div>Pick a color</div>
    <table>
      <tbody>
        <tr>
          <td><label for="color-text">Enter color:</label></td>
          <td><input type="text" id="color-text" value="#bada55" /></td>
        </tr>
        <tr>
          <td><label for="color-input">Pick color:</label></td>
          <td><input type="color" id="color-input" value="#bada55" /></td>
        </tr>
        <tr>
          <td><label for="color-opacity">Select an opacity:</label></td>
          <td>
            <input
              type="range"
              id="color-opacity"
              value="1"
              min="0"
              max="1"
              step="0.01" />
          </td>
        </tr>
      </tbody>
    </table>
    <div><button id="picker-ok-button">Ok</button></div>
  </dialog>
</div>
<hr />
<table id="output-colors">
  <caption>
    Mixed color in different formats:
  </caption>
  <tbody>
    <tr id="rgb-function">
      <th>
        <a
          href="https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/rgb"
          target="_blank">
          RGB
        </a>
      </th>
      <td><button id="copy-rgb-button">Copy</button><span></span></td>
    </tr>
    <tr id="hex">
      <th>
        <a
          href="https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/hex-color"
          target="_blank"
          >HEX</a
        >
      </th>
      <td><button id="copy-hex-button">Copy</button><span></span></td>
    </tr>
    <tr id="hsl-function">
      <th>
        <a
          href="https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/hsl"
          target="_blank">
          HSL
        </a>
      </th>
      <td><button id="copy-hsl-button">Copy</button><span></span></td>
    </tr>
    <tr id="hwb-function">
      <th>
        <a
          href="https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/hwb"
          target="_blank">
          HWB
        </a>
      </th>
      <td><button id="copy-hwb-button">Copy</button><span></span></td>
    </tr>
    <tr id="color-function">
      <th>
        <a
          href="https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/color"
          target="_blank">
          color()
        </a>
      </th>
      <td><button id="copy-color-button">Copy</button><span></span></td>
    </tr>
    <tr id="lab-function">
      <th>
        <a
          href="https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/lab"
          target="_blank">
          Lab
        </a>
      </th>
      <td><button id="copy-lab-button">Copy</button><span></span></td>
    </tr>
    <tr id="lch-function">
      <th>
        <a
          href="https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/lch"
          target="_blank">
          LCH
        </a>
      </th>
      <td><button id="copy-lch-button">Copy</button><span></span></td>
    </tr>
    <tr id="oklab-function">
      <th>
        <a
          href="https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/oklab"
          target="_blank">
          Oklab
        </a>
      </th>
      <td><button id="copy-oklab-button">Copy</button><span></span></td>
    </tr>
    <tr id="oklch-function">
      <th>
        <a
          href="https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/oklch"
          target="_blank">
          OkLCh
        </a>
      </th>
      <td><button id="copy-oklch-button">Copy</button><span></span></td>
    </tr>
    <tr id="xyz-d50-function">
      <th>
        <a
          href="https://developer.mozilla.org/en-US/docs/Glossary/Color_space#xyz-d50"
          target="_blank">
          XYZ D50
        </a>
      </th>
      <td><button id="copy-xyz-d50-button">Copy</button><span></span></td>
    </tr>
    <tr id="xyz-d65-function">
      <th>
        <a
          href="https://developer.mozilla.org/en-US/docs/Glossary/Color_space#xyz"
          target="_blank">
          XYZ D65
        </a>
      </th>
      <td><button id="copy-xyz-d65-button">Copy</button><span></span></td>
    </tr>
  </tbody>
</table>
```

```css
#picker-dialog[open] {
  position: fixed;
  top: 30%;
  z-index: 100;
  padding: 1rem;
  width: 70vw;
  background: #dddddd;
  display: flex;
  flex-flow: column;
  align-items: center;
}

#picker-dialog #color-opacity {
  width: 200px;
}

#picker-dialog > div:first-child {
  font-weight: bold;
  margin-bottom: 1rem;
}

#picker-dialog > div {
  width: max-content;
  margin: 0.4rem auto;
  white-space: nowrap;
}

#picker-dialog #color-text {
  width: 200px;
}

#picker-dialog label {
  margin: 1rem 0;
}

#picker-dialog button {
  width: 100px;
  margin-top: 1rem;
}

dialog#picker-dialog table {
  width: fit-content;
}

#color-mixer {
  margin: 0.5rem;
  font-family: sans-serif;
  display: grid;
  grid-template-columns: 150px 1fr 1fr 150px;
  grid-template-areas:
    "color-one-label   mix-label        mix-label           color-two-label"
    "color-background  color-background color-background    color-background"
    "percent-one       percent-one      percent-two         percent-two"
    "color-space-label color-space      interpolation-label interpolation"
    "mix-output-text   mix-output-text  mix-output-text     mix-output-text";
}

#color-mixer > * {
  padding: 0;
  margin: 0 auto;
}

#color-mixer > :nth-child(1) {
  grid-area: color-one-label;
}

#color-mixer > :nth-child(2) {
  grid-area: mix-label;
}

#color-mixer > :nth-child(3) {
  grid-area: color-two-label;
}

#color-mixer > :nth-child(4) {
  grid-area: color-background;
  background:
    linear-gradient(
      0deg,
      transparent 0 38%,
      47%,
      rgb(0 0 0 / 0.7) 50%,
      white 50% 100%
    ),
    conic-gradient(
      black 0 90deg,
      transparent 90deg 180deg,
      black 180deg 270deg,
      transparent 270deg 360deg
    );
  background-size:
    100% 100%,
    20px 20px;
  display: flex;
  align-items: center;
  margin: 0;
  padding: 0;
  border-radius: 10%;
}

#color-one {
  height: 100px;
  flex: 1 1 100%;
  border-radius: 20% 0 0 20%;
  cursor: pointer;
  border: none;
  z-index: 1;
  box-shadow: -5px 5px 5px grey;
  background-color: coral;
}

#mixed-color {
  flex: 2 0.7 100%;
  height: 100px;
}

#color-two {
  height: 100px;
  flex: 1 1 100%;
  border-radius: 0 20% 20% 0;
  cursor: pointer;
  border: none;
  z-index: 1;
  box-shadow: 5px 5px 5px grey;
  background-color: cyan;
}

#color-mixer > :nth-child(5) {
  grid-area: percent-one;
  width: 100%;
  display: flex;
}

#percentage-one-label,
#percentage-two-label {
  width: 2rem;
  text-align: end;
}

#color-mixer > :nth-child(6) {
  grid-area: percent-two;
  width: 100%;
  display: flex;
}

#color-mixer > :nth-child(7) {
  grid-area: color-space-label;
  margin: 0.5rem 0 0 auto;
}

#color-mixer > :nth-child(8) {
  grid-area: color-space;
  margin: 0.5rem auto 0 1rem;
}

#color-mixer > :nth-child(9) {
  grid-area: interpolation-label;
  margin: 0.5rem 0 0 auto;
}

#color-mixer > :nth-child(10) {
  grid-area: interpolation;
  margin: 0.5rem auto 0 1rem;
}

#color-mixer > :nth-child(11) {
  grid-area: mix-output-text;
  margin: 1rem 0;
  padding: 1rem 0;
  text-align: center;
  background-color: #dfdfde;
  font-family: monospace;
}

input[type="range"] {
  width: 80%;
}

label {
  margin: 1rem;
}

*:focus {
  outline: 2px dashed purple;
  outline-offset: 1px;
}

table {
  width: 100%;
}
caption {
  font-family: sans-serif;
}
th {
  padding: 5px 15px;
  background-color: #ededed;
}
td {
  background-color: #dedede;
  font-family: monospace;
  padding: 5px;
}

#output-colors th {
  padding-right: 0;
  width: 20%;
}

#output-colors td button {
  margin-right: 0.4rem;
}
```

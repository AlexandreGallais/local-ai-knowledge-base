---
title: "Color format converter (part 2 of 3)"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/guides/colors/color_format_converter/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Color format converter (part 2 of 3)

## How to use the tool

Enter a color in any format or pick one in the sRGB color space. You can also adjust the opacity (alpha channel).

Click the **Copy** button next to the corresponding color format to quickly copy its value. You can also click a color format name to learn more about it.

```html
<div class="container">
  <dialog open>
    <p>
      <label for="color-text">
        Enter a color value in any format or pick a color:
      </label>
      <span class="color-inputs">
        <input type="text" id="color-text" />
        <input type="color" id="color-input" />
      </span>
    </p>
    <p>
      <label for="opacity-input">Adjust the opacity: </label>
      <input
        type="range"
        id="opacity-input"
        value="1"
        min="0"
        max="1"
        step="0.01" />
    </p>
    <hr />
    <table id="output-colors">
      <caption>
        Your color in different formats:
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
              target="_blank">
              HEX
            </a>
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
  </dialog>
</div>
```

```css
dialog {
  border: 1px solid;
  border-radius: 5px;
  box-shadow: 3px 3px 10px rgb(0 0 0 / 0.2);
  background-color: white;
  font-family: "Segue", "Helvetica", "Arial", sans-serif;
  margin-top: 5vh;
  width: 550px;
}

table {
  width: 100%;
}

td,
th {
  padding: 3px 0;
}

th {
  background-color: #ededed;
}

td {
  background-color: #dedede;
  font-family: monospace;
}

body {
  background:
    linear-gradient(
      -90deg,
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
  padding: 0;
  margin: 0;
}

.container {
  width: 100vw;
  height: 100vh;
}

.color-inputs {
  display: inline-flex;
  margin-top: 0.6rem;
  margin-bottom: 1.5rem;
}

button {
  margin-right: 0.5rem;
}

input[type="text"] {
  width: 300px;
  margin-right: 0.5rem;
}

input[type="range"] {
  width: 350px;
}

label {
  user-select: none;
}

p {
  display: flex;
  flex-flow: column;
  align-items: center;
  margin: 0;
}
```

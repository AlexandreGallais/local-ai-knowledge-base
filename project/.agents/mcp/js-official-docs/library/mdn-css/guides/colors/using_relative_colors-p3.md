---
title: "Using relative colors (part 3 of 4)"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/guides/colors/using_relative_colors/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Using relative colors (part 3 of 4)

## Examples

> **Note:**
> You can find additional examples demonstrating the use of relative color syntax in the different functional notation types on their dedicated pages: `color()`, `hsl()`, `hwb()`, `lab()`, `lch()`, `oklab()`, `oklch()`, `rgb()`.

### Color palette generator

This example allows you to choose a base color and a color palette type. The browser will then show an appropriate palette of colors based on the chosen base color. The color palette choices are as follows:

- **Complementary**: Includes two colors that are at opposite sides of a color wheel, or to put it another way, _opposite hues_ (see the `hue` data type for more information on hues and color wheels). The two colors are defined as a base color, and the base color with hue channel +180 degrees.
- **Triadic**: Includes three colors equal distances apart around the color wheel. The three colors are defined as a base color, base color with hue channel -120 degrees, and base color with hue channel +120 degrees.
- **Tetradic**: Includes four colors equal distances apart around the color wheel. The four colors are defined as a base color, and base color with hue channel +90, +180, and +270 degrees.
- **Monochrome**: Includes multiple colors with the same hue but varying lightness values. In our example we've defined five colors in a monochrome palette — base color, and base color with lightness channel -20, -10, +10, and +20.

#### HTML

The full HTML is included below for reference. The most interesting parts are as follows:

- The `--base-color` custom property is stored as an inline `style` on the `` element with the ID of `container`. We've placed it there so we can update the value using JavaScript. We've provided an initial value of `#ff0000` (`red`) to show a color palette based on that value when the example loads. Note that normally we'd probably set this on the `<html>` element, but the MDN live sample was removing it when rendering.
- The base color picker is created using an `` control. When a new value is set in this control, the `--base-color` custom property is set to this value using JavaScript, which in turn generates a new color palette. All the displayed colors are relative colors based on `--base-color`.
- The set of `` controls enables choosing a color palette type to generate. When a new value is chosen here, JavaScript is used to set a new class on the `container` `` to represent the chosen palette. In the CSS, descendant selectors are used to target the child ``s (e.g., `.comp :nth-child(1)`) so they can have the correct colors applied to them and hide the unused `` nodes.
- The `container` `` containing the child ``s that display the colors of the generated palette. Note that an initial class of `comp` is set on it, so that the page will display a complementary color scheme when first loaded.

```html
<div>
  <h1>Color palette generator</h1>
  <form>
    <div id="color-picker">
      <label for="color">Select a base color:</label>
      <input type="color" id="color" name="color" value="#ff0000" />
    </div>
    <div>
      <fieldset>
        <legend>Select a color palette type:</legend>

        <div>
          <input
            type="radio"
            id="comp"
            name="palette-type"
            value="comp"
            checked />
          <label for="comp">Complementary</label>
        </div>

        <div>
          <input
            type="radio"
            id="triadic"
            name="palette-type"
            value="triadic" />
          <label for="triadic">Triadic</label>
        </div>

        <div>
          <input
            type="radio"
            id="tetradic"
            name="palette-type"
            value="tetradic" />
          <label for="tetradic">Tetradic</label>
        </div>

        <div>
          <input
            type="radio"
            id="monochrome"
            name="palette-type"
            value="monochrome" />
          <label for="monochrome">Monochrome</label>
        </div>
      </fieldset>
    </div>
  </form>
  <div id="container" class="comp">
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>
</div>
```

#### CSS

Below we are only showing the CSS that sets the palette colors. Note how, in each case, descendant selectors are used to apply the correct `background-color` to each child `` for the chosen palette. We care more about the position of the ``s in the source order than the type of element, so we have used `:nth-child` to target them.

In the last rule we've used the general sibling selector (`~`) to target the unused `` elements in each palette type, setting `display: none` to stop them being rendered.

The colors themselves include the `--base-color`, plus relative colors derived from that `--base-color`. The relative colors use the `lch()` function — passing in the origin `--base-color` and defining an output color with an adjusted lightness or hue channel as appropriate.

```css
html {
  font-family: sans-serif;
}

body {
  margin: 0;
}

h1 {
  margin-left: 16px;
}

/* Basic form styling */

#color-picker {
  margin-left: 16px;
  margin-bottom: 20px;
}

#color-picker label,
legend {
  display: block;
  font-size: 0.8rem;
  margin-bottom: 10px;
}

input[type="color"] {
  width: 200px;
  display: block;
}

fieldset {
  display: flex;
  gap: 20px;
  border: 0;
}

/* Palette container styling */

#container {
  /* Default value */
  --base-color: red;

  display: flex;
  width: 100vw;
  height: 250px;
  box-sizing: border-box;
}

#container div {
  flex: 1;
}
```

```css
/* Complementary colors */
/* Base color, and base color with hue channel +180 degrees */

.comp :nth-child(1) {
  background-color: var(--base-color);
}

.comp :nth-child(2) {
  background-color: lch(from var(--base-color) l c calc(h + 180));
}

/* Use @supports to add in support old syntax that requires deg units
   to be specified in hue calculations. This is required for Safari 16.4+. */
@supports (color: lch(from red l c calc(h + 180deg))) {
  .comp :nth-child(2) {
    background-color: lch(from var(--base-color) l c calc(h + 180deg));
  }
}

/* Triadic colors */
/* Base color, base color with hue channel -120 degrees, and base color */
/* with hue channel +120 degrees */

.triadic :nth-child(1) {
  background-color: var(--base-color);
}

.triadic :nth-child(2) {
  background-color: lch(from var(--base-color) l c calc(h - 120));
}

.triadic :nth-child(3) {
  background-color: lch(from var(--base-color) l c calc(h + 120));
}

/* Use @supports to add in support old syntax that requires deg units
   to be specified in hue calculations. This is required for Safari 16.4+. */
@supports (color: lch(from red l c calc(h + 120deg))) {
  .triadic :nth-child(2) {
    background-color: lch(from var(--base-color) l c calc(h - 120deg));
  }

  .triadic :nth-child(3) {
    background-color: lch(from var(--base-color) l c calc(h + 120deg));
  }
}

/* Tetradic colors */
/* Base color, and base color with hue channel +90, +180, and +270 degrees */

.tetradic :nth-child(1) {
  background-color: var(--base-color);
}

.tetradic :nth-child(2) {
  background-color: lch(from var(--base-color) l c calc(h + 90));
}

.tetradic :nth-child(3) {
  background-color: lch(from var(--base-color) l c calc(h + 180));
}

.tetradic :nth-child(4) {
  background-color: lch(from var(--base-color) l c calc(h + 270));
}

/* Use @supports to add in support old syntax that requires deg units
   to be specified in hue calculations. This is required for Safari 16.4+. */
@supports (color: lch(from red l c calc(h + 90deg))) {
  .tetradic :nth-child(2) {
    background-color: lch(from var(--base-color) l c calc(h + 90deg));
  }

  .tetradic :nth-child(3) {
    background-color: lch(from var(--base-color) l c calc(h + 180deg));
  }

  .tetradic :nth-child(4) {
    background-color: lch(from var(--base-color) l c calc(h + 270deg));
  }
}

/* Monochrome colors */
/* Base color, and base color with lightness channel -20, -10, +10, and +20 */

.monochrome :nth-child(1) {
  background-color: lch(from var(--base-color) calc(l - 20) c h);
}

.monochrome :nth-child(2) {
  background-color: lch(from var(--base-color) calc(l - 10) c h);
}

.monochrome :nth-child(3) {
  background-color: var(--base-color);
}

.monochrome :nth-child(4) {
  background-color: lch(from var(--base-color) calc(l + 10) c h);
}

.monochrome :nth-child(5) {
  background-color: lch(from var(--base-color) calc(l + 20) c h);
}

/* Hide unused swatches for each palette type */
.comp :nth-child(2) ~ div,
.triadic :nth-child(3) ~ div,
.tetradic :nth-child(4) ~ div {
  display: none;
}
```

##### An aside on `@supports` testing

In the example CSS you'll notice `@supports` blocks being used to provide different `background-color` values to browsers that support a previous draft specification of the relative color syntax. These are required because Safari's initial implementation was based on an older version of the spec in which origin color channel values resolved to `<number>`s or other unit types depending on the context. This meant that values sometimes required units when performing additions and subtractions, which created confusion. In newer implementations, origin color channel values always resolve to an equivalent `<number>` value, which means calculations are always done with unitless values.

Note how the support test in each case is done using any color declaration — `color: lch(from red l c calc(h + 90deg))` for example — not necessarily the actual value that we need to vary for other browsers. When testing complex values like these, you should use the simplest possible declaration that still contains the syntactic difference you want to test for.

Including a custom property in the `@supports` test doesn't work — the test always comes back as positive regardless of what value the custom property is given. This is because a custom property value only becomes invalid when assigned to be an invalid value (or part of an invalid value) of a regular CSS property. To work around this, in each test we have replaced `var(--base-color)` with the `red` keyword.

#### JavaScript

In the JavaScript, we:

- Add a `change` event listener to the radio buttons so that when one is selected, the `setContainer()` function runs. This function updates the `class` value of the `` with `id="container"` with the value of the selected radio button so that the correct background colors will be applied to the child ``s for the chosen palette type.
- Add an `input` event listener to the color picker control so that when a new color is selected, the `setBaseColor()` function runs. This function sets the `--base-color` custom property's value to the new color.

```js
const form = document.forms[0];
const radios = form.elements["palette-type"];
const colorPicker = form.elements["color"];
const containerElem = document.getElementById("container");

for (const radio of radios) {
  radio.addEventListener("change", setContainer);
}

colorPicker.addEventListener("input", setBaseColor);

function setContainer(e) {
  const palType = e.target.value;
  console.log("radio changed");
  containerElem.setAttribute("class", palType);
}

function setBaseColor(e) {
  console.log("color changed");
  containerElem.style.setProperty("--base-color", e.target.value);
}
```

#### Results

The output is as follows. This starts to show the power of relative CSS colors — we are defining multiple colors and generating palettes that are updated live by adjusting a single custom property.

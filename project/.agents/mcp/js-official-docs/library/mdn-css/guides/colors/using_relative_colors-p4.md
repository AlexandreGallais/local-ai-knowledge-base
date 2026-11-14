---
title: "Using relative colors (part 4 of 4)"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/guides/colors/using_relative_colors/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Using relative colors (part 4 of 4)

### Live UI color scheme updater

This example shows a card containing a heading and text, but with a twist — below the card is a slider (``) control. When its value is changed, JavaScript is used to set a `--hue` custom property value to the new slider value.

This in turn adjusts the color scheme for the entire UI:

- The `--base-color` value is a relative color with its hue channel set to the value of `--hue`.
- The other colors used in the design are relative colors based on `--base-color`. As a result, they change when the `--base-color` changes.

#### HTML

The HTML for the example is shown below.

- The `` element acts as an outer wrapper to contain the rest of the content, allowing the card and form to be centered vertically and horizontally inside `` as one unit.
- The `` element contains the `<h1>` and `` elements that define the card's content.
- The `<form>` element contains the (``) control and its ``.

```html
<main>
  <section>
    <h1>A love of colors</h1>
    <p>
      Colors, the vibrant essence of our surroundings, are truly awe-inspiring.
      From the fiery warmth of reds to the calming coolness of blues, they bring
      unparalleled richness to our world. Colors stir emotions, ignite
      creativity, and shape perceptions, acting as a universal language of
      expression. In their brilliance, colors create a visually enchanting
      tapestry that invites admiration and sparks joy.
    </p>
  </section>
  <form>
    <label for="hue-adjust">Adjust the hue:</label>
    <input
      type="range"
      name="hue-adjust"
      id="hue-adjust"
      value="240"
      min="0"
      max="360" />
  </form>
</main>
```

#### CSS

In the CSS the `:root` has a default `--hue` value set on it, relative `lch()` colors to define the color scheme, plus a radial gradient that fills the whole body.

The relative colors are as follows:

- `--base-color`: The base color takes an origin color of `red` (although any full color would do) and adjusts its hue value to the value set in the `--hue` custom property.
- `--bg-color`: A much lighter variant of `--base-color`, intended to be used as a background. This is created by taking an origin color of `--base-color` and adding 40 to its lightness value.
- `--complementary-color`: A complementary color 180 degrees around the color wheel from `--base-color`. This is created by taking an origin color of `--base-color` and adding 180 to its hue value.

Now have a look at the rest of the CSS and take note of all the places where these colors are used. This includes backgrounds, borders, `text-shadow`, and even the `accent-color` of the slider.

> **Note:**
> For brevity, only the parts of the CSS relevant to relative color usage are shown.

```css
html {
  font-family: sans-serif;
}

main {
  width: 80vw;
  margin: 2rem auto;
}

h1 {
  text-align: center;
  margin: 0;
  color: black;
  border-radius: 16px 16px 0 0;
  font-size: 3rem;
  letter-spacing: -1px;
}

p {
  line-height: 1.5;
  margin: 0;
  padding: 1.2rem;
}

form {
  width: fit-content;
  display: flex;
  margin: 2rem auto;
  padding: 0.4rem;
}
```

```css
:root {
  /* Default hue value */
  --hue: 240;

  /* Relative color definitions */
  --base-color: lch(from red l c var(--hue));
  --bg-color: lch(from var(--base-color) calc(l + 40) c h);
  --complementary-color: lch(from var(--base-color) l c calc(h + 180));

  background: radial-gradient(ellipse at center, white 20%, var(--base-color));
}

/* Use @supports to add in support for --complementary-color with old
   syntax that requires deg units to be specified in hue calculations.
   This is required for in Safari 16.4+. */
@supports (color: lch(from red l c calc(h + 180deg))) {
  body {
    --complementary-color: lch(from var(--base-color) l c calc(h + 180deg));
  }
}

/* Box styling */

section {
  background-color: var(--bg-color);
  border: 3px solid var(--base-color);
  border-radius: 20px;
  box-shadow: 10px 10px 30px rgb(0 0 0 / 0.5);
}

h1 {
  background-color: var(--base-color);
  text-shadow:
    1px 1px 1px var(--complementary-color),
    -1px -1px 1px var(--complementary-color),
    0 0 3px var(--complementary-color);
}

/* Range slider styling */

form {
  background-color: var(--bg-color);
  border: 3px solid var(--base-color);
}

input {
  accent-color: var(--complementary-color);
}
```

#### JavaScript

The JavaScript adds an `input` event listener to the slider control so that when a new value is set, the `setHue()` function runs. This function sets a new inline `--hue` custom property value on the `:root` (the `<html>` element) that overrides the original default value we set in our CSS.

```js
const rootElem = document.querySelector(":root");
const slider = document.getElementById("hue-adjust");

slider.addEventListener("input", setHue);

function setHue(e) {
  rootElem.style.setProperty("--hue", e.target.value);
}
```

#### Results

The output is shown below. Relative CSS colors are being used here to control the color scheme of an entire UI, which can be adjusted live as a single value is modified.

## See also

- The `<color>` data type
- CSS colors module
- sRGB on Wikipedia
- CIELAB on Wikipedia
- CSS relative color syntax on developer.chrome.com (2023)

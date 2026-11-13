---
title: "CSS color values (part 2 of 3)"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/guides/colors/color_values/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSS color values (part 2 of 3)

## Color functions with a hue component

The color functions that have a `hue` component — an `angle` from that color model's color wheel — include the `srgb` color functions `hsl()` and `hwb()`, CIElab's `lch()` function, and OKLab's `oklch()` color function. These color functions are more intuitive as the hue allows us to tell the difference or similarity between colors like red, orange, yellow, green, blue, etc.

### HSL functional notation

The `hsl()` CSS color function was the first hue-based color function to be supported in browsers. `hsl()` is more intuitive than `rgb()` — it is generally easier to determine the effect of varying hue (`h`), saturation (`s`), and lightness (`l`) values than it is to declare specific colors via red, green, and blue channel values. In addition, HSL is similar to the HSB (hue, saturation, and brightness) color picker in Photoshop, which made it immediately familiar to many people when first supported.

The `hsl()` and `hwb()` sRGB color functions are both cylindrical. Hue defines the color as an `angle` on a circular color wheel. The diagram below shows an HSL color cylinder. Saturation is a percentage that defines how far the color is along a scale between completely grayscale and having the maximum possible amount of the given hue.
As the value of lightness increases, the color transitions from the darkest to the lightest possible color (from black to white).

Image courtesy of user SharkD on Wikipedia, distributed under the CC BY-SA 3.0 license.

The value of the hue (`H`) component of an HSL (or HWB) color is an angle that starts at 0° as red, then moves through yellow, green, cyan, blue, and magenta, before ending up back at red again at 360°. The value can be specified in any `angle` unit supported by CSS, including degrees (`deg`), radians (`rad`), gradians (`grad`), or turns (`turn`). The hue value identifies what the base shade of the color is, but it doesn't control how vivid or dull, or how light or dark the color is.

The saturation (`S`) component of the color specifies the percentage of the final color comprised of the specified hue, with 100% being fully saturated and 0% being a complete lack of color (greyscale). The lightness (`L`) component specifies how light the color is along a sliding scale between completely black (`0%`) and completely white (`100%`). You can also optionally include an alpha channel, preceded by a slash (`/`) to make the color less than 100% opaque.

Here are some sample colors in HSL notation:

```css
table {
  border: 1px solid black;
  font:
    16px "Open Sans",
    "Helvetica",
    "Arial",
    sans-serif;
  border-spacing: 0;
  border-collapse: collapse;
}

th,
td {
  border: 1px solid black;
  padding: 4px 6px;
  text-align: left;
}

th {
  background-color: hsl(0 0% 75%);
}
```

```html
<table>
  <thead>
    <tr>
      <th scope="col">Color in HSL notation</th>
      <th scope="col">Example</th>
    </tr>
  </thead>
  <tbody></tbody>
</table>
```

```js
const colors = [
  "hsl(90deg 0% 50%)",
  "hsl(90 100% 50%)",
  "hsl(0.15turn 50% 75%)",
  "hsl(0.15turn 90% 75%)",
  "hsl(0.15turn 90% 50%)",
  "hsl(270deg 90% 50% / 50%)",
];

const tbody = document.querySelector("tbody");
for (const color of colors) {
  const tr = document.createElement("tr");
  const td1 = document.createElement("td");
  td1.appendChild(document.createElement("code")).textContent = color;
  const td2 = document.createElement("td");
  td2.style.backgroundColor = color;
  tr.appendChild(td1);
  tr.appendChild(td2);
  tbody.appendChild(tr);
}
```

The last value is semi-opaque; it includes the optional alpha value, preceded by a forward slash.

> **Note:**
> When you omit the hue's unit, it's assumed to be in degrees (`deg`).

### HWB functional notation

The `hwb()` color function uses the same hue coordinate system as `hsl()`, with `0deg` being red. However, instead of `hsl()`'s lightness and saturation, `hwb()` functions specify whiteness (`W`) and blackness (`B`). This function is also fairly intuitive — allowing you to pick a hue and then mix in amounts of white and or black to achieve the desired color.

`W` and `B` values range from `0%` to `100%` (or `0` to `1`). If the combined value of `W` and `B` is 100% (or `1`) or greater, the color will be gray, similar to setting the `s` to `0%` with `hsl()`. As with `hsl()`, an optional alpha value can be included, preceded by a forward slash `/`.

Here are some examples of using HWB notation:

```css
/* These examples all specify varying shades of a lime green. */
hwb(90 10% 10%)
hwb(90 50% 10%)
hwb(90deg 10% 10%)
hwb(1.5708rad 60% 0%)
hwb(.25turn 0% 40%)

/* Same lime green but with an alpha value */
hwb(90 10% 10% / 0.5)
hwb(90 10% 10% / 50%)
```

In the below examples, we set the same hues as in the `hsl()` examples, but we are adding whiteness and blackness to each hue via `hwb()` instead of saturation and lightness:

```css
table {
  border: 1px solid black;
  font:
    16px "Open Sans",
    "Helvetica",
    "Arial",
    sans-serif;
  border-spacing: 0;
  border-collapse: collapse;
}

th,
td {
  border: 1px solid black;
  padding: 4px 6px;
  text-align: left;
}

th {
  background-color: hwb(0 75% 25%);
}
```

```html
<table>
  <thead>
    <tr>
      <th scope="col">Color in HWB notation</th>
      <th scope="col">Example</th>
    </tr>
  </thead>
  <tbody></tbody>
</table>
```

```js
const colors = [
  "hwb(90deg 50% 50%)",
  "hwb(90 0% 0%)",
  "hwb(0.15turn 25% 0%)",
  "hwb(0.15turn 10% 25%)",
  "hwb(1turn 10% 65%)",
  "hwb(270deg 75% 10%)",
];

const tbody = document.querySelector("tbody");
for (const color of colors) {
  const tr = document.createElement("tr");
  const td1 = document.createElement("td");
  td1.appendChild(document.createElement("code")).textContent = color;
  const td2 = document.createElement("td");
  td2.style.backgroundColor = color;
  tr.appendChild(td1);
  tr.appendChild(td2);
  tbody.appendChild(tr);
}
```

### LCH and OkLCh: CIELAB and Oklab color spaces

While `hsl()` and `hwb()` are intuitive, they have a major drawback. With these functions, every fully-saturated hue angle (`hsl(<angle> 100% 50%)` or `hwb(<angle> 0% 0%)`) has the same lightness, but that is not how human vision or monitors work. Putting white text on fully saturated blue (`hsl(240deg 100% 50%)`) is legible, but that same text on fully saturated yellow (`hsl(60deg 100% 50%)`) will not only be illegible, but may hurt your user's eyes. In these color functions, the lightness of a color is relative to other colors, not to human perception. In reality, not all hues have the same max saturation.

Wouldn't it be fantastic if you could simply change the hue channel of a color on a site without making text illegible? You can with color functions in the CIELAB and Oklab color spaces.

The CIELAB and Oklab color spaces represent the entire range of colors that humans can see. CIE Lab color functions include `lch()` and `lab()`. Oklab color functions include `oklch()` and `oklab()`. The primary purpose of these models is that they are uniform so that a given distance between any two points in the color space should appear equally different to a viewer. Oklab is a color space that uses the same model type as CIELAB but is built using additional numerical optimization steps, so the values are considered more accurate than CIELAB. Because of this optimization, hues are more perceptually uniform.

The `lch()` and `oklch()` functions use lightness (`L`), chroma (`C`), and hue (`H`), and are discussed further in this section. The `lab()` and `oklab()` functions work differently, using lightness (`L`), red/green-ness (along the `a`-axis), and yellow/blue-ness (along the `b`-axis). These axes are referred to as rectangular coordinates. The main benefit of these color functions is that the "lightness" is perceived lightness; it is the brightness of a color as perceived by the human eye rather than the lightness as compared to other colors.

Similar to the sRGB hue color functions, the hue (`h`) value in `lch()` and `oklch()` is a number, an angle, or the keyword `none` (equivalent to `0deg`) representing the color's `<hue>` angle. However, the colors at each angle value are not the same. The angles corresponding to particular hues differ across the sRGB, CIELAB (used by `lch()`), and Oklab (used by `oklch()`) color spaces.

The following gradients demonstrate the hue colors at every angle form `0deg` to `360deg` in the sRGB, CIE Lab, and OKlab color spaces:

```html
<p>sRGB (<code>hsl()</code> and <code>hwb()</code>)</p>
<div id="srgb"></div>
<p>CIE Lab (<code>lch()</code>)</p>
<div id="lch"></div>
<p>OKLab (<code>oklch()</code>)</p>
<div id="oklch"></div>
<p>
  <label><input type="checkbox" /> Toggle greyscale</label>
</p>
```

```css
div:has(~ p input:checked) {
  filter: grayscale(100%);
}
p {
  margin: 0;
}
div {
  height: 50px;
  margin-bottom: 10px;
}
#srgb {
  background: linear-gradient(
    to right,
    hsl(0deg 100% 50%),
    hsl(90deg 100% 50%),
    hsl(180deg 100% 50%),
    hsl(270deg 100% 50%),
    hsl(360deg 100% 50%)
  );
}
#lch {
  background: linear-gradient(
    to right,
    lch(50% 100% 0deg),
    lch(50% 100% 90deg),
    lch(50% 100% 180deg),
    lch(50% 100% 270deg),
    lch(50% 100% 360deg)
  );
}
#oklch {
  background: linear-gradient(
    to right,
    oklch(50% 100% 0deg),
    oklch(50% 100% 90deg),
    oklch(50% 100% 180deg),
    oklch(50% 100% 270deg),
    oklch(50% 100% 360deg)
  );
}
```

You may notice how the brightness of the latter gradients is more even across the spectrum of hues than the sRGB gradient. Select the checkbox in the example above to convert the hue gradient to greyscale to make this more apparent.

Note also how the spread of blue values in CIE Lab is longer than in the other two. This is the difference between `lch()` and `oklch()`. The `lch()` blue spread is due to a bug that shifts the chroma and lightness of hue values between `270deg` and `330deg`. This was resolved in the oklab color space and therefore the `oklch()` color notation.

As discussed above, the hue (`H`) in the `lch()` and `oklch()` is an `<angle>`, `number` or the keyword `none`. The `lightness` is either a `percentage` or for `lch()` a number between `0` and `100` and for `oklch()` a number between `0` and `1`, with `0` or `0%` being the complete lack of lightness, which is black.

The `C` is a `<number>`, `<percentage>`, or the keyword `none` (equivalent to `0%`) is the color's chroma, or the "amount of color". This is similar to the `S` saturation value of the `hsl()` color function. The value `0` is the complete lack of chroma or saturation; resulting in a gray between white and black inclusive, depending on the lightness value. The number values are theoretically unbounded, with `100%` being equal to `150` for `lch()` and `0.4` with `oklch()`.

Like the other color functions, there is also an optional alpha transparency value, preceded by a slash (`/`).

The example below shows the effect of changing the lightness value in the `lch()` and `oklch()` functions.

```css
/* Varying shades of pink */
.container {
  display: grid;
  font-family: sans-serif;
  font-size: 14px;
  color: white;
  grid-template-columns: repeat(6, 1fr);
  gap: 4px;
}

.dark-text {
  color: lch(1% 40 0deg);
}

.container div {
  border-radius: 8px;
  padding: 8px 4px;
}
```

```html
<div class="container"></div>
```

```js
const container = document.querySelector(".container");
for (let l = 0; l <= 100; l += 10) {
  const div = document.createElement("div");
  const usedL = l === 0 ? 1 : l === 100 ? 99 : l;
  div.textContent = div.style.backgroundColor = `lch(${usedL}% 40 0)`;
  if (usedL >= 80) div.classList.add("dark-text");
  container.appendChild(div);
}
container.appendChild(document.createElement("div"));
for (let l = 0; l <= 100; l += 10) {
  const div = document.createElement("div");
  const usedL = l === 0 ? 1 : l === 100 ? 99 : l;
  div.textContent = div.style.backgroundColor = `oklch(${usedL}% 0.12 0)`;
  if (usedL >= 80) div.classList.add("dark-text");
  container.appendChild(div);
}
```

## Lab and OKLab

The `lab()` functional notation expresses a given color in the CIE L\*a\*b\* color space. The `oklab()` function defines colors in the OKLab color space. These functions represent the entire range of colors that humans can see by specifying the color's lightness (`L`), a red/green axis value (`a`), a blue/yellow axis value (`b`), and an optional alpha transparency value.

Similar to `lch()` and `oklch()`, the `lightness` is either:

- A `percentage`, with `0%` being completely black and `100%` being completely white.
- A number between `0` and `100` for `lab()` and `0` and `1` for `oklab()`, where `0` is completely black and `1`/`100` is completely white.

The `a` value is `<number>` between `-125` and `125` for `lab()` or `-0.4` and `0.4` for `oklab()`, a `<percentage>` between `-100%` and `100%`, or the keyword `none` (equivalent to `0%` in this case). This value specifies the color's distance along the a-axis in the color space, which defines how green (moving towards -100%) or red (moving towards +100%) the color is.

Note that these values are signed (allowing both positive and negative values) and theoretically unbounded, meaning that you can set values outside the ±125 or ±0.4 (±100%) limits. In practice, values cannot exceed ±160 or ±0.5, respectively.

The `b` value has the same constraints. It specifies the color's distance along the b-axis in the color space, which defines how blue (moving towards -100%) or yellow (moving towards +100%) the color is.

The following example demonstrates the effects of varying the `a` axis via a `lab()` function and the `b` axis via an `oklab()` function.

```html
<div class="container"></div>
```

```css
/* Varying shades of pink */
.container {
  display: grid;
  font-family: sans-serif;
  font-size: 14px;
  color: white;
  grid-template-columns: repeat(5, 1fr);
  gap: 4px;
}
.container div {
  border-radius: 8px;
  padding: 8px 4px;
}
```

```js
const container = document.querySelector(".container");

for (let a = -100; a <= 100; a += 25) {
  const div = document.createElement("div");
  div.textContent = div.style.backgroundColor = `lab(50% ${a}% 0)`;
  container.appendChild(div);
}
container.appendChild(document.createElement("div"));
for (let b = -4; b <= 4; b++) {
  const div = document.createElement("div");
  div.textContent = div.style.backgroundColor = `oklab(50% 0 ${b / 10})`;
  container.appendChild(div);
}
```

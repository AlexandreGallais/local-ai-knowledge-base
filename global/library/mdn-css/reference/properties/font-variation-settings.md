---
title: "`font-variation-settings` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/font-variation-settings/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `font-variation-settings` CSS property

The **`font-variation-settings`** CSS property provides low-level control over variable font characteristics by letting you specify the four letter axis names of the characteristics you want to vary along with their values.

```css
font-variation-settings: "wght" 50;
```

```css
font-variation-settings: "wght" 850;
```

```css
font-variation-settings: "wdth" 25;
```

```css
font-variation-settings: "wdth" 75;
```

```html
<section id="default-example">
  <p id="example-element">
    ...it would not be wonderful to meet a Megalosaurus, forty feet long or so,
    waddling like an elephantine lizard up Holborn Hill.
  </p>
</section>
```

```css
@font-face {
  src: url("/shared-assets/fonts/variable-fonts/AmstelvarAlpha-VF.woff2");
  font-family: "Amstelvar";
  font-style: normal;
}

p {
  font-size: 1.5rem;
  font-family: "Amstelvar", serif;
}
```

## Syntax

```css
/* Use the default settings */
font-variation-settings: normal;

/* Set values for variable font axis names */
font-variation-settings: "xhgt" 0.7;

/* Global values */
font-variation-settings: inherit;
font-variation-settings: initial;
font-variation-settings: revert;
font-variation-settings: revert-layer;
font-variation-settings: unset;
```

### Values

This property is specified as `normal` or a comma-separated list of string-number value pairs:

- `normal`
    Text is laid out using default settings.
- `<string> <number>`
    When rendering text, the list of variable font axis names is passed to the text layout engine to enable or disable font features. Each setting is always one or more pairs consisting of a `<string>` of 4 ASCII characters followed by a `number` indicating the axis value to set. If the `<string>` has more or fewer characters or contains characters outside the U+20 - U+7E code point range, the whole property is invalid. The `<number>` can be fractional or negative, depending on the value range available in your font, as defined by the font designer.

## Description

This property is a low-level mechanism designed to set variable font features where no other way to enable or access those features exist. You should only use it when no basic <example-value> exist to set those features (e.g., `font-weight`, `font-style`).

Font characteristics set using `font-variation-settings` will always override those set using the corresponding basic font properties, e.g., `font-weight`, no matter where they appear in the cascade. In some browsers, this is currently only true when the `@font-face` declaration includes a `font-weight` range.

### Registered and custom axes

Variable font axes come in two types: **registered** and **custom**.

Registered axes are the most commonly encountered — common enough that the authors of the specification felt they were worth standardizing. Note that this doesn't mean that the author has to include all of these in their font.

Here are the registered axes along with their corresponding CSS properties:

       | Axis Tag
       | CSS Property

       | "wght"
       | `font-weight`

       | "wdth"
       | `font-stretch`

       | "slnt" (slant)
       | `font-style`: `oblique + angle`

       | "ital"
       | `font-style`: `italic`

       | "opsz"
       | `font-optical-sizing`

Custom axes can be anything the font designer wants to vary in their font, for example ascender or descender heights, the size of serifs, or anything else they can imagine. Any axis can be used as long as it is given a unique 4-character axis. Some will end up becoming more common, and may even become registered over time.

> **Note:**
> Registered axis tags are identified using lower-case tags, whereas custom axes should be given upper-case tags. Note that font designers aren't forced to follow this practice in any way, and some won't. The important takeaway here is that axis tags are case-sensitive.

To use variable fonts on your operating system, you need to make sure that it is up to date. For example Linux OSes need the latest Linux FreeType version, and macOS before 10.13 does not support variable fonts. If your operating system is not up to date, you will not be able to use variable fonts in web pages or the Firefox Developer Tools.

## Examples

You can find a number of other variable font examples in our Variable fonts guide.

### Controlling variable font weight (wght)

Click "Play" in the code blocks below to edit the example in the MDN Playground. Edit the CSS to play with different font weight values. See what happens when you specify a value outside the weight range.

```html
<div>
  <p class="p1">Weight</p>
  <span>(font-weight: 625)</span>
</div>
<div>
  <p class="p2">Weight</p>
  <span>(font-variation-settings: "wght" 625)</span>
</div>
<div class="adjustable">
  <p class="p3">Weight</p>
  (font-variation-settings: "wght" <span id="angle-text">625</span>)<br />
  <label for="text-axis">Adjust Weight: </label>
  <input
    type="range"
    id="text-axis"
    name="text-axis"
    min="300"
    max="900"
    value="625" />
</div>
```

```css
@font-face {
  font-family: "Amstelvar VF";
  src: url("https://mdn.github.io/shared-assets/fonts/variable-fonts/AmstelvarAlpha-VF.woff2")
    format("woff2-variations");
  font-weight: 300 900;
  font-stretch: 35% 100%;
  font-style: normal;
  font-display: swap;
}

p {
  font:
    1.2em "Amstelvar VF",
    "Georgia",
    serif;
  font-size: 4rem;
  margin: 1rem;
  display: inline-block;
}

.adjustable {
  border: 1px dashed;
  --text-axis: 625;
}
```

```css
/* weight range is 300 to 900 */
.p1 {
  font-weight: 625;
}

/* weight range is 300 to 900 */
.p2 {
  font-variation-settings: "wght" 625;
}

/* Adjust with slider & custom property */
.p3 {
  font-variation-settings: "wght" var(--text-axis);
}
```

```js
const angle = document.querySelector("#text-axis");
const text = document.querySelector("#angle-text");
const adjustable = document.querySelector(".adjustable");

angle.addEventListener("input", (e) => {
  const angle = e.target.value;
  text.innerText = angle;
  adjustable.style.setProperty("--text-axis", angle);
});
```

### Controlling variable font slant (slnt)

Click "Play" in the code blocks below to edit the example in the MDN Playground. Edit the CSS to play with different font slant/oblique values.

```html
<div>
  <p class="p1">Slant</p>
  <span>(font-style: oblique 14deg)</span>
</div>
<div>
  <p class="p2">Slant</p>
  <span>(font-variation-settings: 'slnt' 12)</span>
</div>
<div class="adjustable">
  <p class="p3">Slant</p>
  (font-variation-settings: 'slnt' <span id="angle-text">5</span>)<br />
  <label for="text-axis">Adjust Weight: </label>
  <input
    type="range"
    id="text-axis"
    name="text-axis"
    min="0"
    max="12"
    value="5" />
</div>
```

```css
@font-face {
  font-family: "Roboto VF";
  src: url("https://mdn.github.io/shared-assets/fonts/variable-fonts/Roboto-VF.woff2")
    format("woff2-variations");
  font-weight: 100 900;
  font-stretch: 75% 100%;
  font-style: oblique 0deg 12deg;
  font-display: swap;
}

p {
  font:
    1.2em "Roboto VF",
    "Helvetica",
    sans-serif;
  font-size: 4rem;
  margin: 1rem;
  display: inline-block;
}

.adjustable {
  border: 1px dashed;
  --text-axis: 5;
}
```

```css
/* slant range is from 0deg to 12deg */
.p1 {
  font-style: oblique 14deg;
}

/* slant range is from 0 to 12 */
.p2 {
  font-variation-settings: "slnt" 12;
}

/* Adjust with slider & custom property */
.p3 {
  font-variation-settings: "slnt" var(--text-axis);
}
```

```js
const angle = document.querySelector("#text-axis");
const text = document.querySelector("#angle-text");
const adjustable = document.querySelector(".adjustable");

angle.addEventListener("input", (e) => {
  const angle = e.target.value;
  text.innerText = angle;
  adjustable.style.setProperty("--text-axis", angle);
});
```

## See also

- Variable fonts guide
- OpenType font variations overview on microsoft.com
- OpenType design-variation axis tag registry on microsoft.com
- OpenType variable fonts on axis-praxis.org
- Variable fonts on v-fonts.com

---
title: "Variable fonts (part 2 of 3)"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/guides/fonts/variable_fonts/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Variable fonts (part 2 of 3)

## Introducing the 'variation axis'

The heart of the new variable fonts format is the concept of an **axis of variation** describing the allowable range of that particular aspect of the typeface design. So the 'weight axis' describes how light or how bold the letterforms can be; the 'width axis' describes how narrow or how wide they can be; the 'italic axis' describes if italic letterforms are present and can be turned on or off accordingly, etc. Note that an axis can be a range or a binary choice. Weight might range from 1–999, whereas italic might be 0 or 1 (off or on).

As defined in the specification, there are two kinds of axes: **registered** and **custom**:

- Registered axes are those that are most frequently encountered, and common enough that the authors of the specification felt it was worth standardizing. The five currently registered axes are weight, width, slant, italic, and optical size. The W3C has undertaken to map them to existing CSS attributes, and in one case introduced a new one, which you'll see below.
- Custom axes are limitless: the typeface designer can define and scope any axis they like and are just required to give it a four-letter **tag** to identify it within the font file format itself. You can use these four-letter tags in CSS to specify a point along that axis of variation, as will be shown in the code examples below.

### Registered axes and existing CSS attributes

In this section we'll demonstrate the five registered axes defined with examples and the corresponding CSS. Where possible, both the standard and lower-level syntax are included. The lower-level syntax (`font-variation-settings`) was the first mechanism implemented to test the early implementations of variable font support and is necessary to utilize new or custom axes beyond the five registered ones. However, the W3C's intent was for this syntax not to be used when other attributes are available. Therefore wherever possible, the appropriate property should be used, with the lower-level syntax of `font-variation-settings` only being used to set values or axes not available otherwise.

#### Notes

1. When using `font-variation-settings` it is important to note that axis names are case-sensitive. The registered axis names must be in lower case, and custom axes must be in upper case. For example:

   ```css
   font-variation-settings:
     "wght" 375,
     "GRAD" 88;
   ```

   `wght` (weight) is a registered axis, and `GRAD` (grade) is a custom one.

2. If you have set values using `font-variation-settings` and want to change one of those values, you must redeclare all of them (in the same way as when you set OpenType font features using `font-feature-settings`). You can work around this limitation by using CSS Custom Properties (CSS variables) for the individual values, and modifying the value of an individual custom property. Example code follows at the end of the guide.

### Weight

Weight (represented by the `wght` tag) defines the design axis of how thin or thick (light or heavy, in typical typographic terms) the strokes of the letterforms can be. For a long time in CSS there has existed the ability to specify this via the `font-weight` property, which takes numeric values ranging from 100 to 900 in increments of 100, and keywords like `normal` or `bold`, which are aliases for their corresponding numeric values (400 and 700 in this case). These are still applied when dealing with non-variable or variable fonts, but with variable ones, any number from 1 to 1000 is now valid.

It should be noted that at this point there is no way in the `@font-face` declaration to 'map' a specific point on the variation axis of a variable font to the keyword `bold` (or any other keyword). This can generally be resolved fairly easily, but does require an extra step in writing your CSS:

```css
font-weight: 375;

font-variation-settings: "wght" 375;
```

Click "Play" in the code blocks below to edit the example in the MDN Playground. Edit the CSS code to play with font-weight values.

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

### Width

Width (represented by the `wdth` tag) defines the design axis of how narrow or wide (condensed or extended, in typographic terms) the letterforms can be. This is typically set in CSS using the `font-stretch` property, with values expressed as a percentage above or below 'normal' (100%), any number greater than 0 is technically valid—though it is far more likely that the range would fall closer to the 100% mark, such as 75%-125%. If a number value supplied is outside the range encoded in the font, the browser should render the font at the closest value allowed.

> **Note:**
> The % symbol is not used when utilizing `font-variation-settings`.

```css
font-stretch: 115%;

font-variation-settings: "wdth" 115;
```

Click "Play" in the code blocks below to edit the example in the MDN Playground. Edit the CSS code to play with font width values.

```html
<div>
  <p class="p1">Width</p>
  <span>(font-stretch: 60%)</span>
</div>
<div>
  <p class="p2">Width</p>
  <span>(font-variation-settings: "wdth" 60)</span>
</div>
<div class="adjustable">
  <p class="p3">Width</p>
  (font-variation-settings: "wdth" <span id="angle-text">60</span>)<br />

  <label for="text-axis">Adjust Width: </label>
  <input
    type="range"
    id="text-axis"
    name="text-axis"
    min="55"
    max="100"
    value="60" />
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
  --text-axis: 60;
}
```

```css
/* width range is 55% to 100% */
.p1 {
  font-stretch: 60%;
}

/* width range is an integer from 55 to 100 */
.p2 {
  font-variation-settings: "wdth" 60;
}

/* Adjust with slider & custom property */
.p3 {
  font-variation-settings: "wdth" var(--text-axis);
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

### Italic

The Italic (`ital`) axis can be set in the range `[0-1]`, where `0` specifies "not italic," `0.5` specifies "halfway italic," and `1` specifies "fully italic." Italic designs often include dramatically different letterforms from their upright counterparts, so in the transition from upright to italic, several glyph (or character) substitutions usually occur. Italic and oblique are often used somewhat interchangeably, but in truth are quite different. Oblique is defined in this context with the term `slant` (see the below section), and a typeface would typically have one or the other, but not both.

In CSS, both italic and oblique are applied to text using the `font-style` property. Also note the introduction of `font-synthesis: none;` — which will prevent browsers from accidentally applying the variation axis and a synthesized italic. This can be used to prevent faux-bolding as well.

```css
font-style: italic;

font-variation-settings: "ital" 1;

font-synthesis: none;
```

Click "Play" in the code blocks below to edit the example in the MDN Playground. Edit the CSS code to play with font-italics.

```html
<div>
  <p class="p1">Italic</p>
  <span>(font-style: italic)</span>
  <p class=".p1-no-synthesis">Italic</p>
  <span>(font-style: italic; font-synthesis: none)</span>
</div>
<div>
  <p class="p2">Italic</p>
  <span>(font-variation-settings: "ital" 1)</span>
</div>
<div class="adjustable">
  <p class="p3">Italic</p>
  (font-variation-settings: "ital" <span id="angle-text">1</span>)<br />

  <label for="slant-angle">Adjust Italic: </label>
  <input
    type="range"
    id="text-axis"
    name="text-axis"
    min="0"
    max="1"
    value="1" />
</div>
```

```css
@font-face {
  font-family: "Jost VF";
  src: url("https://mdn.github.io/shared-assets/fonts/variable-fonts/jost-VF.woff2")
    format("woff2-variations");
  font-weight: 300 900;
  font-stretch: 75% 150%;
  font-display: swap;
}

p {
  font:
    1.2em "Jost VF",
    "Helvetica",
    "Arial",
    sans-serif;
  font-size: 4rem;
  margin: 1rem;
  display: inline-block;
}

.adjustable {
  border: 1px dashed;
  --text-axis: 1;
}
```

```css
/* font-style: italic, with and without font-synthesis */
.p1 {
  font-style: italic;
}

.p1-no-synthesis {
  font-style: italic;
  font-synthesis: none;
}

/* italic range is 0 or 1 */
.p2 {
  font-variation-settings: "ital" 1;
  font-synthesis: none;
}

/* Adjust with slider & custom property */
.p3 {
  font-synthesis: none;
  font-variation-settings: "ital" var(--text-axis);
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

### Slant

Slant (represented by the `slnt` tag), or as it's often referred to, 'oblique' — is different from true italics in that it changes the angle of the letterforms but doesn't perform any kind of character substitution. It is also variable, in that it is expressed as a numeric range. This allows the font to be varied anywhere along the slant axis. The allowed range is from -90 to 90 degrees.

The two properties that can control the slant are `font-style` and `font-variation-settings`. The following two property declarations are the same:

```plain
font-style: oblique 14deg;

font-variation-settings: "slnt" -14;
```

Prefer the `font-style` property over the `font-variation-settings` property. The `deg` keyword is not used when using the `font-variation-settings` property. Also, in the case of the `font-variation-settings` property, a positive angle means a counter-clockwise slant.

In the following live example, you can adjust the slant.

```html
<div>
  <p class="font-style">Slant</p>
  <span>(font-style: oblique 5deg)</span>
</div>
<div>
  <p class="font-variation">Slant</p>
  <span>(font-variation-settings: 'slnt' -5)</span>
</div>
<div class="adjustable-box">
  <p class="adjustable">Slant</p>
  (font-variation-settings: 'slnt' <span id="angle-text">-5</span>)<br />

  <label for="slant-angle">Adjust Slant: </label>
  <input
    type="range"
    name="range-slider"
    value="5"
    id="slant-angle"
    min="-15"
    max="15" />
</div>
```

```css
@font-face {
  font-family: "SlantFont";
  font-style: oblique -15deg 15deg;
  src: url("https://mdn.github.io/shared-assets/fonts/font_with_slant_axis.woff2")
    format("woff2");
}

p {
  font-family: "SlantFont", sans-serif;
  display: inline-block;
  margin: 1rem;
  font-size: 4rem;
}

.adjustable-box {
  border: 1px dashed;
  --text-axis: -5;
}
```

```css
.font-style {
  font-style: oblique 5deg;
}

.font-variation {
  font-variation-settings: "slnt" -5;
}

.adjustable {
  font-variation-settings: "slnt" var(--slant-angle);
}
```

```js
const angle = document.querySelector("#slant-angle");
const text = document.querySelector("#angle-text");
const adjustable = document.querySelector(".adjustable");

angle.addEventListener("input", (e) => {
  const angle = -1 * e.target.value;
  text.innerText = angle;
  adjustable.style.setProperty("--slant-angle", angle);
});
```

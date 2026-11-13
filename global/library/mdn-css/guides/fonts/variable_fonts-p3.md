---
title: "Variable fonts (part 3 of 3)"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/guides/fonts/variable_fonts/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Variable fonts (part 3 of 3)

### Optical size

This is something new to digital fonts and CSS, but is a centuries-old technique in designing and creating metal type. Optical sizing refers to the practice of varying the overall stroke thickness of letterforms based on physical size. If the size was very small (such as an equivalent to 10 or 12px), the characters would have an overall thicker stroke, and perhaps other small modifications to ensure that it would reproduce and be readable at a physically smaller size. Conversely, when a much larger size was being used (like 48 or 60px), there might be much greater variation in thick and thin stroke weights, showing the typeface design more in line with the original intent.

While this was originally done to compensate for the ink and paper printing process (very thin lines at small sizes often didn't print, giving the letterforms a broken appearance), it translates well to digital displays when compensating for screen quality and physical size rendering.

Optical size values are generally intended to be automatically applied corresponding to `font-size`, but can also be manipulated using the lower-level `font-variation-settings` syntax.

There is a new attribute, `font-optical-sizing`, created to support variable fonts in CSS. When using `font-optical-sizing`, the only allowed values are `auto` or `none` — so this attribute only allows for turning optical sizing on or off. However when using `font-variation-settings: 'opsz' <num>`, you can supply a numeric value. In most cases you would want to match the `font-size` (the physical size the type is being rendered) with the `opsz` value (which is how optical sizing is intended to be applied when using `auto`). The option to provide a specific value is provided so that should it be necessary to override the default — for legibility, aesthetic, or some other reason — a specific value can be applied.

```css
font-optical-sizing: auto;

font-variation-settings: "opsz" 36;
```

Click "Play" in the code blocks below to edit the example in the MDN Playground. Edit the CSS code to play with optical size values.

```html
<div>
  <p class="p1">Optical Size</p>
  <span>(font-optical-sizing: none)</span>
</div>
<div>
  <p class="p2">Optical Size</p>
  <span>(font-optical-sizing: auto)</span>
</div>
<div>
  <p class="p3">Optical Size</p>
  <span>(font-variation-settings: "opsz" 64)</span>
</div>

<div class="adjustable">
  <p class="p4">Optical Size</p>
  (font-variation-settings: "opsz" <span id="angle-text">-64</span>)<br />

  <label for="slant-angle">Adjust Optical Sizing: </label>
  <input
    type="range"
    name="text-axis"
    value="64"
    id="text-axis"
    min="8"
    max="144" />
</div>
```

```css
@font-face {
  font-family: "Amstelvar VF";
  src: url("https://mdn.github.io/shared-assets/fonts/variable-fonts/AmstelvarAlpha-VF.woff2")
    format("woff2-variations");
  font-weight: 300 900;
  font-stretch: 75% 150%;
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
  --text-axis: 64;
}
```

```css
.p1 {
  font-optical-sizing: none;
}
/* font-optical-sizing can be auto or none */
.p2 {
  font-optical-sizing: auto;
}

/* optical range is from 8 to 144 */
.p3 {
  font-variation-settings: "opsz" 64;
}

/* Adjust with slider & custom property */
.p4 {
  font-variation-settings: "opsz" var(--text-axis);
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

### Custom axes

Custom axes are just that: they can be any axis of design variation that the typeface designer imagines. There may be some that become fairly common — or even become registered — but only time will tell.

### Grade

Grade may become one of the more common custom axes as it has a known history in typeface design. The practice of designing different grades of a typeface was often done in reaction to intended use and printing technique. The term 'grade' refers to the relative weight or density of the typeface design, but differs from traditional 'weight' in that the physical space the text occupies does not change, so changing the text grade doesn't change the overall layout of the text or elements around it. This makes grade a useful axis of variation as it can be varied or animated without causing a reflow of the text itself.

```css
font-variation-settings: "GRAD" 88;
```

Click "Play" in the code blocks below to edit the example in the MDN Playground. Edit the CSS code to play with font-grade values.

```html
<div>
  <p class="p1">Grade</p>
  <span>(font-variation-settings: 'GRAD' 88)</span>
</div>

<div class="adjustable">
  <p class="p2">Grade</p>
  (font-variation-settings: 'GRAD' <span id="angle-text">88</span>)<br />

  <label for="slant-angle">Adjust Grade: </label>
  <input
    type="range"
    name="text-axis"
    value="88"
    id="text-axis"
    min="88"
    max="150" />
</div>
```

```css
@font-face {
  font-family: "Amstelvar VF";
  src: url("https://mdn.github.io/shared-assets/fonts/variable-fonts/AmstelvarAlpha-VF.woff2")
    format("woff2-variations");
  font-weight: 300 900;
  font-stretch: 75% 150%;
  font-style: normal;
  font-display: swap;
}

p {
  font:
    1.2em "Amstelvar VF",
    "Georgia",
    serif;
  font-size: 64px;
  margin: 1rem;
  display: inline-block;
}

.adjustable {
  border: 1px dashed;
  --text-axis: 88;
}
```

```css
/* grade range is 88 to 150 */
.p1 {
  font-size: 64px;
  font-variation-settings: "GRAD" 88;
}

/* Adjust with slider & custom property */
.p2 {
  font-size: 64px;
  font-variation-settings: "GRAD" var(--text-axis);
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

### Using a variable font: @font-face changes

The syntax for loading variable fonts is very similar to any other web font, with a few notable differences, which are provided via upgrades to the traditional `@font-face` syntax now available in modern browsers.

The basic <example-value> is the same, but the font technology can be specified, and allowable ranges for descriptors like `font-weight` and `font-stretch` can be supplied, rather than named according to the font file being loaded.

#### Example for a standard upright (Roman) font

```css
@font-face {
  font-family: "MyVariableFontName";
  src: url("path/to/font/file/my-variable-font.woff2")
    format("woff2-variations");
  font-weight: 125 950;
  font-stretch: 75% 125%;

  font-style: normal;
}
```

In this case, the `font-style: normal` declaration indicates that this font file should be used when `font-family` is set to `MyVariableFontName` and `font-style` is set to `normal`. As an alternative, you could use `font-style: oblique 0deg` or `font-style: oblique 0deg 20deg` to indicate that the font has normal upright glyphs (indicated by `0deg`).

#### Example for a font that contains only italics and no upright characters

```css
@font-face {
  font-family: "MyVariableFontName";
  src: url("path/to/font/file/my-variable-font.woff2")
    format("woff2-variations");
  font-weight: 125 950;
  font-stretch: 75% 125%;

  font-style: italic;
}
```

In this case, the `font-style: italic` declaration indicates that this font file should be used when `font-family` is set to `MyVariableFontName` and `font-style` is set to `italic`. As an alternative, you could use `font-style: oblique 14deg` to indicate that the font has italic glyphs.

#### Example for a font that contains an oblique (slant) axis

```css
@font-face {
  font-family: "MyVariableFontName";
  src: url("path/to/font/file/my-variable-font.woff2")
    format("woff2-variations");
  font-weight: 125 950;
  font-stretch: 75% 125%;

  font-style: oblique 0deg 12deg;
}
```

In this case, the `oblique 0deg 12deg` value indicates that this font file should be used when in a style rule the `font-family` property is `MyVariableFontName` and the font-style property is oblique with an angle between zero and 12 degrees inclusive.

> **Note:**
> Not all browsers have implemented the full syntax for font format, so test carefully. All browsers that support variable fonts will still render them if you set the format to just the file format, rather than format-variations (i.e., `woff2` instead of `woff2-variations`), but it's best to use the proper syntax if possible.

> **Note:**
> Supplying value ranges for `font-weight`, `font-stretch`, and `font-style` will keep the browser from attempting to render an axis outside that range if you are using the appropriate attribute (i.e., `font-weight` or `font-stretch`), but will not block you from supplying an invalid value via `font-variation-settings`, so use with care.

## Working with older browsers

Variable font support can be checked with CSS Feature Queries (see `@supports`), so it's possible to use variable fonts in production and scope the CSS calling the variable fonts inside a feature query block.

```css
h1 {
  font-family: some-non-variable-font-family;
}

@supports (font-variation-settings: "wdth" 115) {
  h1 {
    font-family: some-variable-font-family;
  }
}
```

## Sample pages

The following example pages show two different ways to structure your CSS. The first uses the standard attributes wherever possible. The second example uses CSS Custom Properties to set values for a `font-variation-settings` string and shows how you can more easily update single variable values by overriding a single variable rather than rewriting the whole string. Note the hover effect on the `h2`, which only alters the grade axis custom property value. Click "Play" in the code blocks below to edit the example in the MDN Playground:

```html
<div class="container container1">
  <h1>Moby-Dick</h1>
  <h2>CHAPTER 1. Loomings.</h2>
  <p>
    Call me Ishmael. Some years ago—never mind how long precisely–having little
    or no money in my purse, and nothing particular to interest me on shore, I
    thought I would sail about a little and see the watery part of the world. It
    is a way I have of driving off the spleen and regulating the circulation.
    Whenever I find myself growing grim about the mouth; whenever it is a damp,
    drizzly November in my soul; whenever I find myself involuntarily pausing
    before coffin warehouses, and bringing up the rear of every funeral I meet;
    and especially whenever my hypos get such an upper hand of me, that it
    requires a strong moral principle to prevent me from deliberately stepping
    into the street, and methodically knocking people's hats off then, I account
    it high time to get to sea as soon as I can.
  </p>
</div>
<hr />
<div class="container container2 demo2">
  <h1>Moby-Dick</h1>
  <h2>CHAPTER 1. (hover here)</h2>
  <p>
    Call me Ishmael. Some years ago—never mind how long precisely–having little
    or no money in my purse, and nothing particular to interest me on shore, I
    thought I would sail about a little and see the watery part of the world. It
    is a way I have of driving off the spleen and regulating the circulation.
    Whenever I find myself growing grim about the mouth; whenever it is a damp,
    drizzly November in my soul; whenever I find myself involuntarily pausing
    before coffin warehouses, and bringing up the rear of every funeral I meet;
    and especially whenever my hypos get such an upper hand of me, that it
    requires a strong moral principle to prevent me from deliberately stepping
    into the street, and methodically knocking people's hats off then, I account
    it high time to get to sea as soon as I can.
  </p>
</div>
```

```css
@font-face {
  font-family: "Amstelvar VF";
  src: url("https://mdn.github.io/shared-assets/fonts/variable-fonts/AmstelvarAlpha-VF.woff2")
    format("woff2-variations");
  font-weight: 300 900;
  font-stretch: 75% 150%;
  font-style: normal;
  font-display: swap;
}

body {
  font:
    1.2em "Amstelvar VF",
    "Georgia",
    serif;
  margin: 20px;
  padding: 0;
}

.container * {
  margin: 0.5rem auto 1rem;
  max-width: 42rem;
}
```

```css
.container1 h1 {
  font-optical-sizing: auto;
  font-size: 5rem;
  font-stretch: 85%;
  font-weight: 450;
}
.container1 h2 {
  font-optical-sizing: auto;
  font-size: 2.25rem;
  font-stretch: 90%;
  font-weight: 575;
}
.container1 p {
  font-optical-sizing: auto;
  font-size: 1rem;
  font-stretch: 100%;
  font-weight: 375;
}
.demo2 {
  --text-wght: 375;
  --text-wdth: 100;
  --text-opsz: 16;
  --text-GRAD: 88;
}
.container2 > * {
  font-size: 5rem;
  font-variation-settings:
    "wght" var(--text-wght),
    "wdth" var(--text-wdth),
    "opsz" var(--text-opsz),
    "GRAD" var(--text-GRAD);
}
.container2 h1 {
  --text-wght: 450;
  --text-wdth: 85;
  --text-opsz: 80;
  font-size: 5rem;
}
.container2 h2 {
  --text-wght: 575;
  --text-wdth: 95;
  --text-opsz: 36;
  font-size: 2.25rem;
}
.container2 h2:hover {
  --text-GRAD: 130;
}
.container2 p {
  font-size: 1rem;
}
```

## Resources

- W3C CSS Fonts Module 4 Specification (editor's draft)
- W3C GitHub issue queue
- Microsoft Open Type Variations introduction
- Microsoft OpenType Design-Variation Axis Tag Registry
- Wakamai Fondue (a site that will tell you what your font can do via a drag-and-drop inspection interface)
- Axis Praxis (the original variable fonts playground site)
- V-Fonts.com (a catalog of variable fonts and where to get them)
- Font Playground (another playground for variable fonts with some very unique approaches to user interface)

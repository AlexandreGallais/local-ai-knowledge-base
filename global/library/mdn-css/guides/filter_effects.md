---
title: "CSS filter effects"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/guides/filter_effects/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSS filter effects

The properties in the **CSS filter effects** module let you define a way of processing an element's rendering before the element is displayed in the document. Examples of such effects include blurring and changing the intensity of the color of an element.

## Filter effects in action

Play with the various sliders to apply filter effects to the image below.

```html
<article>
  <img
    src="https://mdn.github.io/shared-assets/images/examples/george_floyd_memorial_sm.jpg"
    width="600"
    height="400"
    alt="A colorful memorial honoring George Floyd and the Black Lives Matter movement" />
  <form>
    <fieldset>
      <legend>Select your filters</legend>
      <label>
        <input type="range" name="blur" value="0" min="0" max="1" step="0.1" />
        blur()
      </label>
      <label>
        <input
          type="range"
          name="brightness"
          value="1"
          min="0"
          max="2"
          step="0.1" />
        brightness()
      </label>
      <label>
        <input
          type="range"
          name="contrast"
          value="1"
          min="0"
          max="2"
          step="0.1" />
        contrast()
      </label>
      <label>
        <input
          type="range"
          name="dropShadow"
          value="0"
          min="-1"
          max="1"
          step="0.1" />
        drop-shadow()
      </label>
      <label>
        <input
          type="range"
          name="grayscale"
          value="0"
          min="0"
          max="1"
          step="0.1" />
        grayscale()
      </label>
      <label>
        <input
          type="range"
          name="hueRotate"
          value="0"
          min="-1"
          max="1"
          step="0.1" />
        hue-rotate()
      </label>
      <label>
        <input
          type="range"
          name="invert"
          value="0"
          min="0"
          max="1"
          step="0.1" />
        invert()
      </label>
      <label>
        <input
          type="range"
          name="opacity"
          value="1"
          min="0"
          max="1"
          step="0.1" />
        opacity()
      </label>
      <label>
        <input
          type="range"
          name="saturate"
          value="1"
          min="0"
          max="2"
          step="0.1" />
        saturate()
      </label>
      <label>
        <input type="range" name="sepia" value="0" min="0" max="1" step="0.1" />
        sepia()
      </label>
      <button type="reset">Reset</button>
    </fieldset>
  </form>
</article>

<pre><output></output></pre>

<p>Image by <cite>DigitalNomad</cite></p>
```

```css
article {
  display: grid;
  grid-template-columns: minmax(200px, 800px) 15em;
  gap: 1rem;
  max-width: 100%;
}
label {
  display: block;
  font-family: sans-serif;
}
input {
  vertical-align: middle;
  margin-right: 0.25em;
  max-width: 50%;
}
output {
  white-space: normal;
  overflow-wrap: break-word;
  display: block;
  width: 100%;
}

img {
  margin: 1rem;
  width: 100%;
  object-fit: cover;
  overflow: hidden;
}
```

```js
const image = document.querySelector("img");
const controls = document.querySelectorAll("input");
const output = document.querySelector("output");

for (control of controls) {
  control.addEventListener("change", () => {
    /* do function */
    changeCSS();
  });
}
document.querySelector("button").addEventListener("click", () => {
  setTimeout(() => {
    changeCSS();
  }, 50);
});

function changeCSS() {
  let currentFilter = "filter: ";
  for (const filter of [
    blur(),
    brightness(),
    contrast(),
    dropShadow(),
    grayscale(),
    hueRotate(),
    invert(),
    opacity(),
    saturate(),
    sepia(),
  ]) {
    currentFilter += filter;
  }
  currentFilter += ";";
  image.setAttribute("style", currentFilter);
  output.innerText = currentFilter;
}
function blur() {
  let blurValue = document.getElementsByName("blur")[0].value;
  return blurValue === "0" ? "" : `blur(${blurValue}rem) `;
}
function brightness() {
  let brightnessValue = document.getElementsByName("brightness")[0].value;
  return brightnessValue.toString() === "1"
    ? ""
    : `brightness(${brightnessValue}) `;
}
function contrast() {
  let contrastValue = document.getElementsByName("contrast")[0].value;
  return contrastValue === 1 ? "" : `contrast(${contrastValue}) `;
}
function dropShadow() {
  let dropShadowValue = document.getElementsByName("dropShadow")[0].value;
  return dropShadowValue === 0
    ? ""
    : `drop-shadow(${dropShadowValue}rem ${dropShadowValue}rem 0rem orange) `;
}
function grayscale() {
  let grayscaleValue = document.getElementsByName("grayscale")[0].value;
  return grayscaleValue === 0 ? "" : `grayscale(${grayscaleValue}) `;
}
function hueRotate() {
  let hueRotateValue = document.getElementsByName("hueRotate")[0].value;
  return hueRotateValue === 0 ? "" : `hue-rotate(${hueRotateValue}turn) `;
}
function invert() {
  let invertValue = document.getElementsByName("invert")[0].value;
  return invertValue === 0 ? "" : `invert(${invertValue}) `;
}
function opacity() {
  let opacityValue = document.getElementsByName("opacity")[0].value;
  return opacityValue === 1 ? "" : `opacity(${opacityValue}) `;
}
function saturate() {
  let saturateValue = document.getElementsByName("saturate")[0].value;
  return saturateValue === 1 ? "" : `saturate(${saturateValue}) `;
}
function sepia() {
  let sepiaValue = document.getElementsByName("sepia")[0].value;
  return sepiaValue === 0 ? "" : `sepia(${sepiaValue})`;
}
```

## Reference

### Properties

- `backdrop-filter`
- `filter`

### Functions

- `blur()`
- `brightness()`
- `contrast()`
- `drop-shadow()`
- `grayscale()`
- `hue-rotate()`
- `invert()`
- `opacity()`
- `saturate()`
- `sepia()`

## Guides

- Using CSS filter effects
    Overview of the concepts surrounding CSS filter effects, including properties, filter functions, and SVG filters, with an explanation of filter values, source order, and value interactions.

## Related concepts

- `image` data type
- `filter-function` data type

- `background-image` CSS property
- `background-blend-mode` CSS property
- `mix-blend-mode` CSS property

- interpolation glossary term

- `color-interpolation-filters` SVG property

## See also

- Properties in the CSS compositing and blending module enable blending an element's background layers together and blending an element with its container
- The SVG `<filter>` element and the SVG filter primitives: `<feSpotLight>`, `<feBlend>`, `<feColorMatrix>`, `<feComponentTransfer>`, `<feComposite>`, `<feConvolveMatrix>`, `<feDiffuseLighting>`, `<feDisplacementMap>`, `<feDropShadow>`, `<feFlood>`, `<feGaussianBlur>`, `<feImage>`, `<feMerge>`, `<feMorphology>`, `<feOffset>`, `<feSpecularLighting>`, `<feTile>`, `<feTurbulence>`

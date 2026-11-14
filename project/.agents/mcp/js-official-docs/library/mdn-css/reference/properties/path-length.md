---
title: "`path-length` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/path-length/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `path-length` CSS property

The **`path-length`** CSS property specifies a total path length, in user units. All path computations are then scaled using the ratio `path-length` / _(computed value of path length)_ — this includes text paths, animation paths, and various stroke operations.

The `path-length` property only applies to `<circle>`, `<ellipse>`, `<line>`, ``, `<polygon>`, `<polyline>`, and `<rect>` elements nested in an ``.

> **Note:**
> If present, the `path-length` CSS property overrides an SVG element's `pathLength` attribute.
> This property doesn't apply to SVG, HTML, or pseudo-elements other than those listed above.

## Syntax

```css
/* Keyword value */
path-length: none;

/* <length> values */
path-length: 0;
path-length: 70px;
path-length: 500px;

/* Global values */
path-length: inherit;
path-length: initial;
path-length: revert;
path-length: revert-layer;
path-length: unset;
```

### Values

- `none`
    No author path length is specified and the user agent's own computed path length is used for all path-related calculations.

- `<length>`
    A non-negative `<length>` representing an author-defined total path length.

## Examples

### Basic usage

This example defines a path and shows how to apply a path length to it using the `path-length` CSS property.

#### SVG

Our SVG defines a single curved `` element with a colored `stroke`. It includes a `stroke-dasharray` attribute that defines a regular dashed pattern for the stroke.

```html
<svg viewBox="0 0 600 200">
  <path
    d="M 30 100 C 150 20, 250 180, 380 100 S 520 20, 570 100"
    fill="none"
    stroke="#D85A30"
    stroke-width="4"
    stroke-dasharray="24 24"></path>
</svg>
```

#### CSS

We set a `path-length` value on the ``:

```css
path {
  path-length: 500px;
}
```

#### Results

Setting a large `path-length` value results in the dashes becoming smaller and more frequent.

### Animating `path-length`

One major advantage of making `path-length` available as a CSS property is that you can apply standard CSS functionality such as animations and transitions to it. This example builds on the previous one, showing how to animate a `path-length` with a CSS animation.

#### HTML and SVG

This example includes the same SVG `` as the previous one. In addition, it includes an `` element that can be used to change the value of `path-length` applied to the `` at runtime. We also include an `<output>` element to display the current slider value.

```html
<div>
  <label for="path-slider">Adjust path-length</label>
  <input type="range" id="path-slider" min="0" max="800" value="200" />
  <output>200</output>
</div>
```

#### CSS

On the `:root` element, we define a CSS custom property called `--path-length` and give it an initial value of `200px`. We then set the `` element's `path-length` value to the `--path-length` property, and set an `animation` on it that runs an infinite number of times and alternates between forwards and backwards.

```css
:root {
  --path-length: 200px;
}

path {
  path-length: var(--path-length);
  animation: path-length-anim 2s alternate infinite ease-in-out;
}
```

```css
div {
  position: fixed;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
}
```

Next, we define the `@keyframes` block for the animation — it animates the `path-length` property between the `--path-length` value and the `--path-length` value multiplied by `1.5`.

```css
@keyframes path-length-anim {
  from {
    path-length: var(--path-length);
  }

  to {
    path-length: calc(var(--path-length) * 1.5);
  }
}
```

#### JavaScript

We start our script by grabbing references to the ``, `<output>`, and `:root` elements.

```js
const slider = document.querySelector("input");
const output = document.querySelector("output");
const rootElem = document.querySelector(":root");
```

Next, we add an `input` event handler to the range slider so that, when its value is changed, the `<output>` element's `textContent` and the value of the `--path-length` custom property are set to equal the slider's new value.

```js
slider.addEventListener("input", () => {
  output.textContent = `${slider.value}px`;
  rootElem.style.setProperty("--path-length", `${slider.value}px`);
});
```

#### Results

Adjust the slider, and note how larger values result in a smaller dash size.

## See also

- SVG `pathLength` attribute

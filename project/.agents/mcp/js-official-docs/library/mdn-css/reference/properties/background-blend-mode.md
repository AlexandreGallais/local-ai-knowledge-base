---
title: "`background-blend-mode` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/background-blend-mode/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `background-blend-mode` CSS property

The **`background-blend-mode`** CSS property sets how an element's background images should blend with each other and with the element's background color.

Blending modes should be defined in the same order as the `background-image` property. If the blending modes' and background images' list lengths are not equal, it will be repeated and/or truncated until lengths match.

```css
background-blend-mode: normal;
```

```css
background-blend-mode: multiply;
```

```css
background-blend-mode: hard-light;
```

```css
background-blend-mode: difference;
```

```html
<section class="default-example" id="default-example">
  <div class="example-container">
    <div class="transition-all" id="example-element"></div>
  </div>
</section>
```

```css
#example-element {
  background-color: green;
  background-image: url("/shared-assets/images/examples/balloon.jpg");
  width: 250px;
  height: 305px;
}
```

## Syntax

```css
/* One value */
background-blend-mode: normal;

/* Two values, one per background */
background-blend-mode: darken, luminosity;

/* Global values */
background-blend-mode: inherit;
background-blend-mode: initial;
background-blend-mode: revert;
background-blend-mode: revert-layer;
background-blend-mode: unset;
```

### Values

- `<blend-mode>`
    The blending mode to be applied. There can be several values, separated by commas.

## Examples

### Basic <example-value>

```css
.item {
  width: 300px;
  height: 300px;
  background: url("image1.png"), url("image2.png");
  background-blend-mode: screen;
}
```

### Try out different blend modes

```html
<div id="div"></div>
<select id="select">
  <option>normal</option>
  <option>multiply</option>
  <option selected>screen</option>
  <option>overlay</option>
  <option>darken</option>
  <option>lighten</option>
  <option>color-dodge</option>
  <option>color-burn</option>
  <option>hard-light</option>
  <option>soft-light</option>
  <option>difference</option>
  <option>exclusion</option>
  <option>hue</option>
  <option>saturation</option>
  <option>color</option>
  <option>luminosity</option>
</select>
```

```css
#div {
  width: 300px;
  height: 300px;
  background: url("br.png"), url("tr.png");
  background-blend-mode: screen;
}
```

```js
document.getElementById("select").onchange = (event) => {
  document.getElementById("div").style.backgroundBlendMode =
    document.getElementById("select").selectedOptions[0].innerHTML;
};
console.log(document.getElementById("div"));
```

## See also

- `<blend-mode>`
- `mix-blend-mode`

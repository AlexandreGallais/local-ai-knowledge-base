---
title: "`saturate()` CSS function"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/values/filter-function/saturate/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `saturate()` CSS function

The **`saturate()`** CSS function super-saturates or desaturates the input image. It is used as a value for the `filter` and `backdrop-filter` properties.

> **Note:**
> `saturate()` is specified as a matrix operation on the RGB color. It does not actually convert the color to the HSL model, which is a non-linear operation. Therefore, it may not preserve the hue or lightness of the original color.

```css
filter: saturate(1);
```

```css
filter: saturate(4);
```

```css
filter: saturate(50%);
```

```css
filter: saturate(0);
```

```html
<section id="default-example">
  <img
    class="transition-all"
    id="example-element"
    src="/shared-assets/images/examples/firefox-logo.svg"
    width="200" />
</section>
```

## Syntax

```css
/* Completely unsaturated */
saturate(0)

/* No change */
saturate()
saturate(1)
saturate(100%)

/* 60% saturation */
saturate(.6)
saturate(60%)

/* Double saturation */
saturate(2)
saturate(200%)
```

### Parameters

- `<number>` or `<percentage>` (optional)
    Specifies the amount of the conversion. A value under `100%` desaturates the image, while a value over `100%` super-saturates it. A value of `0%` is completely unsaturated, while a value of `100%` leaves the input unchanged. Negative values are not allowed. The initial value for interpolation is `1`. The default value is `1`.

### Return value

A `filter-function` value.

## Examples

### saturate() does not preserve hue or lightness

The diagram below compares two color gradients with `hsl(0 50% 50%)` as the mid-point: the first is generated using `saturate()`, and the second uses actual HSL color values. Note how the `saturate()` gradient shows differences in hue and lightness towards the two ends.

```html
<div>
  <p>Using <code>saturate()</code></p>
  <div id="saturate"></div>
</div>
<div>
  <p>Using <code>hsl()</code></p>
  <div id="hsl"></div>
</div>
```

```css
#saturate,
#hsl {
  display: flex;
  margin: 1em 0;
}

#saturate div,
#hsl div {
  width: 2px;
  height: 100px;
}
```

```js
const saturate = document.getElementById("saturate");
const hsl = document.getElementById("hsl");

for (let i = 0; i <= 200; i++) {
  const div1 = document.createElement("div");
  div1.style.backgroundColor = `hsl(0 ${i / 2}% 50%)`;
  hsl.appendChild(div1);

  const div2 = document.createElement("div");
  div2.style.backgroundColor = "hsl(0 50% 50%)";
  div2.style.filter = `saturate(${i}%)`;
  saturate.appendChild(div2);
}
```

### Using the SVG filter

This example shows three images for comparison: an image with a `saturate()` filter function applied, an image with the equivalent SVG filter applied, and the original image.

#### SVG

The SVG `<feColorMatrix>` filter element can also be used to adjust the saturation of content. We set the `type` to `saturate` and the `values` to the saturation amount, then we can reference the SVG effect by the ID of the `<filter>`:

```html
<svg height="0" role="none">
  <filter id="saturate20" color-interpolation-filters="sRGB">
    <feColorMatrix type="saturate" values="0.2" />
  </filter>
</svg>
```

The following declarations produce the same effect:

```css
filter: saturate(0.2);
filter: saturate(20%);
filter: url("#saturate20"); /* with embedded SVG */
filter: url("fileName.svg#saturate20"); /* external SVG */
```

#### CSS

We include CSS that will adjust the saturation of elements based on their `css-filter` or `svg-filter` class:

```css
.css-filter {
  filter: saturate(0.2);
}

.svg-filter {
  filter: url("#saturate20");
}
```

```css
th,
td {
  padding: 5px;
}
```

```html
<table>
  <thead>
    <tr>
      <th><code>saturate()</code> filter</th>
      <th>SVG filter equivalent</th>
      <th>Original image</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <img
          class="css-filter"
          src="https://mdn.github.io/shared-assets/images/examples/progress-pride-flag.jpg"
          alt="Pride flag" />
      </td>
      <td>
        <img
          class="svg-filter"
          src="https://mdn.github.io/shared-assets/images/examples/progress-pride-flag.jpg"
          alt="Pride flag" />
      </td>
      <td>
        <img
          src="https://mdn.github.io/shared-assets/images/examples/progress-pride-flag.jpg"
          alt="Pride flag" />
      </td>
    </tr>
  </tbody>
</table>
```

## See also

- CSS filter effects module
- The other `filter-function` functions available to be used in values of the `filter` and `backdrop-filter` properties include:
  - `blur()`
  - `brightness()`
  - `contrast()`
  - `drop-shadow()`
  - `grayscale()`
  - `hue-rotate()`
  - `invert()`
  - `opacity()`
  - `sepia()`

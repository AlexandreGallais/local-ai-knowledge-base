---
title: "`blur()` CSS function"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/values/filter-function/blur/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `blur()` CSS function

The **`blur()`** CSS function applies a Gaussian blur to the input image. It is used as a value for the `filter` and `backdrop-filter` properties.

```css
filter: blur(0);
```

```css
filter: blur(4px);
```

```css
filter: blur(1.5rem);
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
/* No blur */
blur()
blur(0)

/* Blur with 8px radius */
blur(8px)

/* Blur with 1.17rem radius */
blur(1.17rem)
```

### Parameters

- `length` (optional)
    Specifies the radius of the blur. It defines the value of the standard deviation to the Gaussian function, that is, how many pixels on the screen blend into each other. Therefore, a larger value will create more blur. A value of `0` leaves the input unchanged. The initial value for interpolation is `0`. Percentage values and negative values are invalid. The default value is `0`.

### Return value

A `filter-function` value.

## Examples

### Using the SVG filter

This example shows three images for comparison: an image with a `blur()` filter function applied, an image with the equivalent SVG filter applied, and the original image.

#### SVG

The SVG `<feGaussianBlur>` filter element can also be used to blur content. We set the `stdDeviation` to the blur radius, then we can reference the SVG effect by the ID of the `<filter>`:

```html
<svg height="0" role="none">
  <filter id="blur35" color-interpolation-filters="sRGB">
    <feGaussianBlur stdDeviation="3.5" />
  </filter>
</svg>
```

The following declarations produce the same effect:

```css
filter: blur(3.5px);
filter: url("#blur35"); /* with embedded SVG */
filter: url("fileName.svg#blur35"); /* external SVG */
```

#### CSS

We include CSS that will blur elements based on their `css-filter` or `svg-filter` class:

```css
.css-filter {
  filter: blur(3.5px);
}

.svg-filter {
  filter: url("#blur35");
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
      <th><code>blur()</code> filter</th>
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
  - `brightness()`
  - `contrast()`
  - `drop-shadow()`
  - `grayscale()`
  - `hue-rotate()`
  - `invert()`
  - `opacity()`
  - `saturate()`
  - `sepia()`

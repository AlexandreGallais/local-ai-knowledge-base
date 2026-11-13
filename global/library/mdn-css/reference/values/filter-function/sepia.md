---
title: "`sepia()` CSS function"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/values/filter-function/sepia/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `sepia()` CSS function

The **`sepia()`** CSS function converts the input image to sepia, giving it a warmer, more yellow/brown appearance. It is used as a value for the `filter` and `backdrop-filter` properties.

```css
filter: sepia(0);
```

```css
filter: sepia(0.2);
```

```css
filter: sepia(60%);
```

```css
filter: sepia(1);
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
/* No sepia conversion */
sepia(0)

/* Complete sepia conversion */
sepia()
sepia(1)
sepia(100%)

/* 60% sepia conversion */
sepia(.6)
sepia(60%)
```

### Parameters

- `<number>` or `<percentage>` (optional)
    Specifies the amount of the conversion. A value of `100%` applies a complete sepia conversion, while a value of `0%` leaves the input unchanged. Values between `0%` and `100%` are linear multipliers on the effect. Values above `100%` are allowed, but the effect is clamped to `100%`. Negative values are not allowed. The initial value for interpolation is `0`. The default value is `1`.

### Return value

A `filter-function` value.

## Examples

### Using the SVG filter

This example shows three images for comparison: an image with a `sepia()` filter function applied, an image with the equivalent SVG filter applied, and the original image.

#### SVG

The SVG `<feColorMatrix>` filter element can also be used to convert content to sepia. We set the `values` for the color matrix, then we can reference the SVG effect by the ID of the `<filter>`:

```html
<svg height="0" role="none">
  <filter id="sepia70" color-interpolation-filters="sRGB">
    <feColorMatrix
      type="matrix"
      values="0.5751 0.5383 0.1323 0 0
              0.2443 0.7802 0.1176 0 0
              0.1904 0.3738 0.3917 0 0
              0 0 0 1 0" />
  </filter>
</svg>
```

The following declarations produce the same effect:

```css
filter: sepia(0.7);
filter: sepia(70%);
filter: url("#sepia70"); /* with embedded SVG */
filter: url("fileName.svg#sepia70"); /* external SVG */
```

#### CSS

We include CSS that will convert elements to sepia based on their `css-filter` or `svg-filter` class:

```css
.css-filter {
  filter: sepia(0.7);
}

.svg-filter {
  filter: url("#sepia70");
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
      <th><code>sepia()</code> filter</th>
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
  - `saturate()`

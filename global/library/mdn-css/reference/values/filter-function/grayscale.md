---
title: "`grayscale()` CSS function"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/values/filter-function/grayscale/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `grayscale()` CSS function

The **`grayscale()`** CSS function converts the input image to grayscale. It is used as a value for the `filter` and `backdrop-filter` properties.

```css
filter: grayscale(0);
```

```css
filter: grayscale(0.2);
```

```css
filter: grayscale(60%);
```

```css
filter: grayscale(1);
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
/* No grayscale conversion */
grayscale(0)

/* Complete grayscale conversion */
grayscale()
grayscale(1)
grayscale(100%)

/* 60% grayscale conversion */
grayscale(.6)
grayscale(60%)
```

### Parameters

- `<number>` or `<percentage>` (optional)
    Specifies the amount of the conversion. A value of `100%` is completely grayscale, while a value of `0%` leaves the input unchanged. Values between `0%` and `100%` are linear multipliers on the effect. Values above `100%` are allowed, but the effect is clamped to `100%`. The initial value for interpolation is `0`. The default value is `1`.

### Return value

A `filter-function` value.

## Examples

### Using the SVG filter

This example shows three images for comparison: an image with a `grayscale()` filter function applied, an image with the equivalent SVG filter applied, and the original image.

#### SVG

The SVG `<feColorMatrix>` filter element can also be used to convert content to grayscale. We set the `values` for the color matrix, then we can reference the SVG effect by the ID of the `<filter>`:

```html
<svg height="0" role="none">
  <filter id="grayscale70" color-interpolation-filters="sRGB">
    <feColorMatrix
      type="matrix"
      values="0.44882 0.50064 0.05054 0 0
              0.14882 0.80064 0.05054 0 0
              0.14882 0.50064 0.35054 0 0
              0 0 0 1 0" />
  </filter>
</svg>
```

The following declarations produce the same effect:

```css
filter: grayscale(0.7);
filter: grayscale(70%);
filter: url("#grayscale70"); /* with embedded SVG */
filter: url("fileName.svg#grayscale70"); /* external SVG */
```

#### CSS

We include CSS that will convert elements to grayscale based on their `css-filter` or `svg-filter` class:

```css
.css-filter {
  filter: grayscale(0.7);
}

.svg-filter {
  filter: url("#grayscale70");
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
      <th><code>grayscale()</code> filter</th>
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
  - `hue-rotate()`
  - `invert()`
  - `opacity()`
  - `saturate()`
  - `sepia()`

---
title: "`invert()` CSS function"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/values/filter-function/invert/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `invert()` CSS function

The **`invert()`** CSS function inverts the color samples in the input image. It is used as a value for the `filter` and `backdrop-filter` properties.

```css
filter: invert(0);
```

```css
filter: invert(0.3);
```

```css
filter: invert(50%);
```

```css
filter: invert(70%);
```

```css
filter: invert(1);
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
/* No inversion */
invert(0)

/* Complete inversion */
invert()
invert(1)
invert(100%)

/* 60% inversion */
invert(.6)
invert(60%)
```

### Parameters

- `<number>` or `<percentage>` (optional)
    Specifies the amount of the conversion. A value of `100%` applies a complete inversion, while a value of `0%` leaves the input unchanged. Values between `0%` and `100%` are linear multipliers on the effect. Values above `100%` are allowed, but the effect is clamped to `100%`. Negative values are not allowed. The initial value for interpolation is `0`. The default value is `1`.

### Return value

A `filter-function` value.

## Examples

### Using the SVG filter

This example shows three images for comparison: an image with an `invert()` filter function applied, an image with the equivalent SVG filter applied, and the original image.

#### SVG

The SVG `<feComponentTransfer>` filter element can also be used to invert content by creating equivalent inversion on nested `<feFuncR>`, `<feFuncG>`, and `<feFuncB>` table elements. We set the same `tableValue` for the red, green, and blue filter primitives to the same value, then we can reference the SVG effect by the ID of the `<filter>`:

```html
<svg height="0" role="none">
  <filter id="invert70" color-interpolation-filters="sRGB">
    <feComponentTransfer>
      <feFuncR type="table" tableValues="0.7 0.3" />
      <feFuncG type="table" tableValues="0.7 0.3" />
      <feFuncB type="table" tableValues="0.7 0.3" />
    </feComponentTransfer>
  </filter>
</svg>
```

The following declarations produce the same effect:

```css
filter: invert(0.7);
filter: invert(70%);
filter: url("#invert70"); /* with embedded SVG */
filter: url("fileName.svg#invert70"); /* external SVG */
```

#### CSS

We include CSS that will invert elements based on their `css-filter` or `svg-filter` class:

```css
.css-filter {
  filter: invert(0.7);
}

.svg-filter {
  filter: url("#invert70");
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
      <th><code>invert()</code> filter</th>
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
  - `opacity()`
  - `saturate()`
  - `sepia()`

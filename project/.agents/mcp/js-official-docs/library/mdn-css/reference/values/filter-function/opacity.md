---
title: "`opacity()` CSS function"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/values/filter-function/opacity/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `opacity()` CSS function

The **`opacity()`** CSS function applies transparency to the input image. It is used as a value for the `filter` and `backdrop-filter` properties.

```css
filter: opacity(1);
```

```css
filter: opacity(80%);
```

```css
filter: opacity(50%);
```

```css
filter: opacity(0.2);
```

```css
filter: opacity(0);
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

> **Note:**
> This function is similar to the more established `opacity` property. The difference is that with filters, some browsers provide hardware acceleration for better performance.

## Syntax

```css
/* Completely transparent */
opacity(0)

/* No change */
opacity()
opacity(1)
opacity(100%)

/* 60% opacity */
opacity(.6)
opacity(60%)
```

### Parameters

- `<number>` or `<percentage>` (optional)
    Specifies the amount of the conversion. A value of `0%` applies complete transparency, while a value of `100%` leaves the input unchanged. Values between `0%` and `100%` are linear multipliers on the effect. Values above `100%` are allowed, but the effect is clamped to `100%`. The initial value for interpolation is `1`. The default value is `1`.

### Return value

A `filter-function` value.

## Examples

### Using the SVG filter

This example shows three images for comparison: an image with an `opacity()` filter function applied, an image with the equivalent SVG filter applied, and the original image.

#### SVG

The SVG `<feComponentTransfer>` filter element can also be used to adjust the opacity of content by creating equivalent transparency on a nested `<feFuncA>` table element. We set the `tableValues` for the alpha filter primitive, then we can reference the SVG effect by the ID of the `<filter>`:

```html
<svg height="0" role="none">
  <filter id="opacity70" color-interpolation-filters="sRGB">
    <feComponentTransfer>
      <feFuncA type="table" tableValues="0 0.7" />
    </feComponentTransfer>
  </filter>
</svg>
```

The following declarations produce the same effect:

```css
filter: opacity(0.7);
filter: opacity(70%);
filter: url("#opacity70"); /* with embedded SVG */
filter: url("fileName.svg#opacity70"); /* external SVG */
```

#### CSS

We include CSS that will adjust the opacity of elements based on their `css-filter` or `svg-filter` class:

```css
.css-filter {
  filter: opacity(0.7);
}

.svg-filter {
  filter: url("#opacity70");
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
      <th><code>opacity()</code> filter</th>
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
  - `saturate()`
  - `sepia()`
- The CSS `opacity` property

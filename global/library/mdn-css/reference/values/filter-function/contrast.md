---
title: "`contrast()` CSS function"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/values/filter-function/contrast/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `contrast()` CSS function

The **`contrast()`** CSS function adjusts the contrast of the input image. It is used as a value for the `filter` and `backdrop-filter` properties.

```css
filter: contrast(1);
```

```css
filter: contrast(1.75);
```

```css
filter: contrast(50%);
```

```css
filter: contrast(0);
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
/* Completely gray */
contrast(0)

/* No change */
contrast()
contrast(1)
contrast(100%)

/* 60% contrast */
contrast(.6)
contrast(60%)

/* Double contrast */
contrast(2)
contrast(200%)
```

### Parameters

- `<number>` or `<percentage>` (optional)
    Specifies the amount of the conversion. A value under `100%` decreases the contrast, while a value over `100%` increases it. A value of `0` or `0%` will create an image that is completely gray, while a value of `1` or `100%` leaves the input unchanged. Negative values are not allowed. The initial value for interpolation is `1`. The default value is `1`.

### Return value

A `filter-function` value.

## Examples

### With the backdrop-filter property

This example applies a `contrast()` filter via the `backdrop-filter` CSS property to the paragraph, shifting the color of the area behind the ``.

```css
.container {
  background: url("unity_for_the_people.jpg") no-repeat center / contain #333399;
}
p {
  backdrop-filter: contrast(0.2);
}
```

```css
.container {
  padding: 3rem;
  width: 30rem;
}
p {
  padding: 0.5rem;
  color: white;
  font-family: sans-serif;
}
```

```html
<div class="container">
  <p>
    Always ensure there is enough contrast between text and all background
    colors. If you think your text may land on top of a background image,
    include a <code>backdrop-filter</code>. Reducing the contrast of background
    colors with the <code>contrast()</code> filter may improve legibility but
    does not guarantee accessibility.
  </p>
</div>
```

### With the filter property

This example applies a `contrast()` filter via the `filter` CSS property, changing contrast by shifting colors of the entire element, including content, border, background, and shadows.

```css
p:first-of-type {
  filter: contrast(30%);
}
p:last-of-type {
  filter: contrast(300%);
}
```

```css
p {
  text-shadow: 2px 2px blue;
  background-color: magenta;
  color: palegoldenrod;
  border: 1em solid rebeccapurple;
  box-shadow:
    inset -5px -5px red,
    5px 5px yellow;
  padding: 0.25rem;
  font-size: 1.25rem;
  font-family: sans-serif;
  width: 85vw;
}
```

```html
<p>This paragraph has reduced contrast.</p>
<p>This paragraph has normal contrast.</p>
<p>This paragraph has increased contrast.</p>
```

### Using the SVG filter

This example shows three images for comparison: an image with a `contrast()` filter function applied, an image with the equivalent SVG filter applied, and the original image.

#### SVG

The SVG `<feComponentTransfer>` filter element can also be used to adjust the contrast of content by creating equivalent contrast adjustments on nested `<feFuncR>`, `<feFuncG>`, and `<feFuncB>` linear elements. We set the same `slope` and `intercept` for the red, green, and blue filter primitives, then we can reference the SVG effect by the ID of the `<filter>`:

```html
<svg height="0" role="none">
  <filter id="contrast200" color-interpolation-filters="sRGB">
    <feComponentTransfer>
      <feFuncR type="linear" slope="2" intercept="-0.5" />
      <feFuncG type="linear" slope="2" intercept="-0.5" />
      <feFuncB type="linear" slope="2" intercept="-0.5" />
    </feComponentTransfer>
  </filter>
</svg>
```

The following declarations produce the same effect:

```css
filter: contrast(2);
filter: contrast(200%);
filter: url("#contrast200"); /* with embedded SVG */
filter: url("fileName.svg#contrast200"); /* external SVG */
```

#### CSS

We include CSS that will adjust the contrast of elements based on their `css-filter` or `svg-filter` class:

```css
.css-filter {
  filter: contrast(2);
}

.svg-filter {
  filter: url("#contrast200");
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
      <th><code>contrast()</code> filter</th>
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
  - `drop-shadow()`
  - `grayscale()`
  - `hue-rotate()`
  - `invert()`
  - `opacity()`
  - `saturate()`
  - `sepia()`

---
title: "`brightness()` CSS function"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/values/filter-function/brightness/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `brightness()` CSS function

The **`brightness()`** CSS function applies a linear multiplier value on an element or an input image, making the image appear brighter or darker. It is used as a value for the `filter` and `backdrop-filter` properties.

```css
filter: brightness(1);
```

```css
filter: brightness(1.75);
```

```css
filter: brightness(50%);
```

```css
filter: brightness(0);
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
/* Completely black */
brightness(0)

/* No change */
brightness()
brightness(1)
brightness(100%)

/* 60% brightness */
brightness(.6)
brightness(60%)

/* Double brightness */
brightness(2)
brightness(200%)
```

### Parameters

- `<number>` or `<percentage>` (optional)
    Specifies the amount of the conversion. A value less than `100%` darkens the input image or element, while a value over `100%` brightens it. A value of `0%` creates a completely black image or element, while a value of `100%` leaves the input unchanged. Values between `0%` and `100%` are linear multipliers on the effect. Values greater than `100%` are allowed, providing brighter results. The initial value for interpolation is `1`. Negative values are not allowed. The default value is `1`.

### Return value

A `filter-function` value.

## Examples

### Applying brightness using the backdrop-filter property

This example shows how to apply the `brightness()` filter to a paragraph via the `backdrop-filter` CSS property.

#### CSS

```css
.container {
  background: url("be_fierce.jpg") no-repeat right / contain #d4d5b2;
}
p {
  backdrop-filter: brightness(150%);
  text-shadow: 2px 2px white;
}
```

```css
.container {
  padding: 5rem 3rem 1rem;
  width: 30rem;
}
p {
  padding: 0.5rem;
  color: black;
  font-size: 2rem;
  font-family: sans-serif;
}
```

```html
<div class="container">
  <p>
    Text on images can be illegible and inaccessible even with a drop shadow.
  </p>
</div>
```

#### Result

In this example, the colors in the area behind the `` element shift linearly. If the `backdrop-filter` property was set to `brightness(0%)`, the `` area with the `` element would have been black and hidden the image behind. At `brightness(100%)`, the `` area color would be the same as the input `#d4d5b2`, and the image behind would be completely transparent. With the brightness set to `150%` as in this example, the colors in the image behind are getting hidden by the brightness of the `` element.

### Applying brightness using the filter property

In this example, a `brightness()` filter is applied to the entire element, including content, border, and background image via the `filter` CSS property. The result shows three variations of different brightness values.

```css
p:first-of-type {
  filter: brightness(50%);
}
p:last-of-type {
  filter: brightness(200%);
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
<p>This paragraph has reduced brightness.</p>
<p>This paragraph has normal brightness.</p>
<p>This paragraph has increased brightness.</p>
```

### Using the SVG filter

This example shows three images for comparison: an image with a `brightness()` filter function applied, an image with the equivalent SVG filter applied, and the original image.

#### SVG

The SVG `<feComponentTransfer>` filter element can also be used to adjust the brightness of content by creating equivalent brightness adjustments on nested `<feFuncR>`, `<feFuncG>`, and `<feFuncB>` linear elements. We set the same `slope` for the red, green, and blue filter primitives, then we can reference the SVG effect by the ID of the `<filter>`:

```html
<svg height="0" role="none">
  <filter id="brightness75" color-interpolation-filters="sRGB">
    <feComponentTransfer>
      <feFuncR type="linear" slope="0.75" />
      <feFuncG type="linear" slope="0.75" />
      <feFuncB type="linear" slope="0.75" />
    </feComponentTransfer>
  </filter>
</svg>
```

The following declarations produce the same effect:

```css
filter: brightness(0.75);
filter: brightness(75%);
filter: url("#brightness75"); /* with embedded SVG */
filter: url("fileName.svg#brightness75"); /* external SVG */
```

#### CSS

We include CSS that will adjust the brightness of elements based on their `css-filter` or `svg-filter` class:

```css
.css-filter {
  filter: brightness(0.75);
}

.svg-filter {
  filter: url("#brightness75");
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
      <th><code>brightness()</code> filter</th>
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
  - `contrast()`
  - `drop-shadow()`
  - `grayscale()`
  - `hue-rotate()`
  - `invert()`
  - `opacity()`
  - `saturate()`
  - `sepia()`

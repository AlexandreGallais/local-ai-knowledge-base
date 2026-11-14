---
title: "`font-stretch` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/font-stretch/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `font-stretch` CSS property

> **Note:**
> The `font-stretch` property was renamed to `font-width` in the CSS Fonts specification. To preserve compatibility, the specification retains `font-stretch` as a legacy alias for the `font-width` property.

The **`font-stretch`** CSS property selects a normal, condensed, or expanded face from a font.

```css
font-stretch: condensed;
```

```css
font-stretch: expanded;
```

```css
font-stretch: ultra-expanded;
```

```css
font-stretch: 50%;
```

```css
font-stretch: 100%;
```

```css
font-stretch: 150%;
```

```html
<section class="default-example" id="default-example">
  <p class="transition-all" id="example-element">
    London. Michaelmas term lately over, and the Lord Chancellor sitting in
    Lincoln's Inn Hall. Implacable November weather. As much mud in the streets
    as if the waters had but newly retired from the face of the earth, and it
    would not be wonderful to meet a Megalosaurus, forty feet long or so,
    waddling like an elephantine lizard up Holborn Hill.
  </p>
</section>
```

```css
@font-face {
  src: url("/shared-assets/fonts/LeagueMono-VF.ttf") format("truetype");
  font-family: "League";
  font-style: normal;
  font-weight: normal;
}

section {
  font-size: 1.2em;
  font-family: "League", sans-serif;
}
```

## Syntax

```css
/* Keyword values */
font-stretch: normal;
font-stretch: ultra-condensed;
font-stretch: extra-condensed;
font-stretch: condensed;
font-stretch: semi-condensed;
font-stretch: semi-expanded;
font-stretch: expanded;
font-stretch: extra-expanded;
font-stretch: ultra-expanded;

/* Percentage values */
font-stretch: 50%;
font-stretch: 100%;
font-stretch: 200%;

/* Global values */
font-stretch: inherit;
font-stretch: initial;
font-stretch: revert;
font-stretch: revert-layer;
font-stretch: unset;
```

### Values

This property is specified as a single value from the following list:

- `normal`
    Specifies a normally condensed font face.
- `semi-condensed`, `condensed`, `extra-condensed`, `ultra-condensed`
    Specifies a more condensed font face than normal, with `ultra-condensed` being the most condensed.
- `semi-expanded`, `expanded`, `extra-expanded`, `ultra-expanded`
    Specifies a more expanded font face than normal, with `ultra-expanded` being the most expanded.
- `<percentage>`
    A `<percentage>` value between 50% and 200% (inclusive). Negative values are not allowed for this property.

### Keyword to numeric mapping

The table below shows the mapping between the keyword values and numeric percentages:

| Keyword           | Percentage |
| ----------------- | ---------- |
| `ultra-condensed` | 50%        |
| `extra-condensed` | 62.5%      |
| `condensed`       | 75%        |
| `semi-condensed`  | 87.5%      |
| `normal`          | 100%       |
| `semi-expanded`   | 112.5%     |
| `expanded`        | 125%       |
| `extra-expanded`  | 150%       |
| `ultra-expanded`  | 200%       |

## Description

Some font families offer additional faces in which the characters are narrower than the normal face (_condensed_ faces) or wider than the normal face (_expanded_ faces).

You can use `font-stretch` to select a condensed or expanded face from such fonts. If the font you are using does not offer condensed or expanded faces, this property has no effect.

### Font face selection

The face selected for a given value of `font-stretch` depends on the faces supported by the font in question. If the font does not provide a face that exactly matches the given value, then values less than `100%` map to a condensed face, and values greater than or equal to `100%` map to an expanded face.

The table below demonstrates the effect of setting different percentage values of `font-stretch` on two different fonts:

```css
@font-face {
  font-family: "Inconsolata";
  src: url("https://mdn.github.io/shared-assets/fonts/inconsolata/Inconsolata-VF.woff2")
    format("woff2");
}

@font-face {
  font-family: "Anek Malayalam";
  src: url("https://mdn.github.io/shared-assets/fonts/anek-malayalam/AnekMalayalam-VF.woff2")
    format("woff2");
}

body {
  font-family: system-ui;
}

table {
  border-collapse: collapse;
  width: 100%;
}

tbody th {
  text-align: right;
}

th,
td {
  padding: 0.25rem;
  font-weight: normal;
  text-align: center;
}

td {
  border: solid;
  border-width: 1px;
  font-size: 5rem;
}

.inconsolata {
  font-family: "Inconsolata", sans-serif;
}

.anek-malayalam {
  font-family: "Anek Malayalam", sans-serif;
}

td:nth-child(2) {
  font-stretch: 50%;
}
td:nth-child(3) {
  font-stretch: 62.5%;
}
td:nth-child(4) {
  font-stretch: 75%;
}
td:nth-child(5) {
  font-stretch: 87.5%;
}
td:nth-child(6) {
  font-stretch: 100%;
}
td:nth-child(7) {
  font-stretch: 112.5%;
}
td:nth-child(8) {
  font-stretch: 125%;
}
td:nth-child(9) {
  font-stretch: 150%;
}
td:nth-child(10) {
  font-stretch: 200%;
}
```

```html
<table>
  <thead>
    <tr>
      <th scope="row"></th>
      <th scope="col">50%</th>
      <th scope="col">62.5%</th>
      <th scope="col">75%</th>
      <th scope="col">87.5%</th>
      <th scope="col">100%</th>
      <th scope="col">112.5%</th>
      <th scope="col">125%</th>
      <th scope="col">150%</th>
      <th scope="col">200%</th>
    </tr>
  </thead>
  <tbody>
    <tr class="inconsolata">
      <th scope="row">Inconsolata</th>
      <td>e</td>
      <td>e</td>
      <td>e</td>
      <td>e</td>
      <td>e</td>
      <td>e</td>
      <td>e</td>
      <td>e</td>
      <td>e</td>
    </tr>
    <tr class="anek-malayalam">
      <th scope="row">Anek Malayalam</th>
      <td>e</td>
      <td>e</td>
      <td>e</td>
      <td>e</td>
      <td>e</td>
      <td>e</td>
      <td>e</td>
      <td>e</td>
      <td>e</td>
    </tr>
  </tbody>
</table>
```

- Inconsolata is a variable font that offers a continuous range of widths from 50% to 200%.
- Anek Malayalam is a variable google font that supports widths from 75% to 125%. Values below and above this range select the closest matching font.

## Examples

### Setting font stretch percentages

```html
<p class="condensed">an elephantine lizard</p>
<p class="normal">an elephantine lizard</p>
<p class="expanded">an elephantine lizard</p>
```

```css
@font-face {
  src: url("/shared-assets/fonts/LeagueMono-VF.ttf") format("truetype");
  font-family: "LeagueMonoVariable";
  font-style: normal;
}

p {
  font:
    1.5rem "LeagueMonoVariable",
    sans-serif;
}

.condensed {
  font-stretch: 50%;
}

.normal {
  font-stretch: 100%;
}

.expanded {
  font-stretch: 200%;
}
```

## See also

- `@font-face/font-stretch` descriptor for `@font-face`
- Modern `font-width` property, replacing `font-stretch`
- `font-style` property
- `font-weight` property
- SVG `font-stretch` attribute
- Learn: Fundamental text and font styling
- CSS fonts module

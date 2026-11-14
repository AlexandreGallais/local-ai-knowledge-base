---
title: "`-webkit-device-pixel-ratio` CSS media feature"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/at-rules/@media/-webkit-device-pixel-ratio/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `-webkit-device-pixel-ratio` CSS media feature

The **`-webkit-device-pixel-ratio`** is a non-standard Boolean CSS media feature which is an alternative to the standard `resolution` media feature.

> **Note:**
> If possible, use the `resolution` media feature query instead, which is a standard media feature. While this prefixed media feature is a WebKit feature, other browser engines may support it. See browser compatibility below.

## Syntax

The `-webkit-device-pixel-ratio` feature is specified as a `<number>` value. It is a range feature, meaning that you can also use the prefixed **`-webkit-min-device-pixel-ratio`** and **`-webkit-max-device-pixel-ratio`** variants to query minimum and maximum values, respectively.

### Values

- `<number>`
    The number of device pixels used to represent each CSS `px`. Although the value is a `<number>`, and thus doesn't syntactically allow units, its implicit unit is `dppx`.

## Implementation

```css
/* A unit of "dppx" is implied: */
@media (-webkit-min-device-pixel-ratio: 2) {
  /* … */
}
/* It is equivalent to: */
@media (min-resolution: 2dppx) {
  /* … */
}

/* Similarly: */
@media (-webkit-max-device-pixel-ratio: 2) {
  /* … */
}
/* It is equivalent to: */
@media (max-resolution: 2dppx) {
  /* … */
}
```

## Examples

### HTML

```html
<p>This is a test of your device's pixel density.</p>
```

### CSS

```css
/* Exact resolution */
@media (-webkit-device-pixel-ratio: 1) {
  p {
    color: red;
  }
}

/* Minimum resolution */
@media (-webkit-min-device-pixel-ratio: 1.1) {
  p {
    font-size: 1.5em;
  }
}

/* Maximum resolution */
@media (-webkit-max-device-pixel-ratio: 3) {
  p {
    background: yellow;
  }
}
```

## See also

- Using media queries
- `resolution`
- `-webkit-transform-2d`
- `-webkit-transform-3d`
- `-webkit-transition`
- `-webkit-animation`
- W3C Suggested Method to UnPrefix

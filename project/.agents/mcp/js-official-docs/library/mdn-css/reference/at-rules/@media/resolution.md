---
title: "`resolution` CSS media feature"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/at-rules/@media/resolution/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `resolution` CSS media feature

The **`resolution`** CSS media feature can be used to test the pixel density of the output device.

## Syntax

The `resolution` feature is specified as a `resolution` value representing the pixel density of the output device. It is a range feature, meaning that you can also use the prefixed **`min-resolution`** and **`max-resolution`** variants to query minimum and maximum values, respectively.

## Examples

### HTML

```html
<p>This is a test of your device's pixel density.</p>
```

### CSS

```css
/* Exact resolution with unit `dpi` */
@media (resolution: 150dpi) {
  p {
    color: red;
  }
}

/* Minimum resolution synonym units: `dppx` and `x` */
@media (min-resolution: 2dppx) {
  p {
    text-decoration: underline;
  }
}

@media (min-resolution: 2x) {
  p {
    text-decoration: underline;
  }
}

/* Maximum resolution with unit `dpcm` */
@media (max-resolution: 2dpcm) {
  p {
    background: yellow;
  }
}
```

## See also

- `window.devicePixelRatio`
- The `image-resolution` property

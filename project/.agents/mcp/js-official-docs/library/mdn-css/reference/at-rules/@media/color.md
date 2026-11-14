---
title: "`color` CSS media feature"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/at-rules/@media/color/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `color` CSS media feature

The **`color`** CSS media feature can be used to test the number of bits per color component (red, green, blue) of the output device.

## Syntax

The `color` feature is specified as an `<integer>` value that represents the number of bits per color component (red, green, blue) of the output device. If the device is not a color device, the value is zero. It is a range feature, meaning that you can also use the prefixed **`min-color`** and **`max-color`** variants to query minimum and maximum values, respectively.

> **Note:**
> If the various color components are represented by different numbers of bits, the smallest number is used. For example, if a display uses 5 bits for blue and red and 6 bits for green, then the device is considered to use 5 bits per color component. If the device uses indexed colors, the minimum number of bits per color component in the color table is used.

See Applying color to HTML elements using CSS to learn more about using CSS to apply color to HTML.

## Examples

### HTML

```html
<p>
  This text should be black on non-color devices, red on devices with a low
  number of colors, and greenish on devices with a high number of colors.
</p>
```

### CSS

```css
p {
  color: black;
}

/* Any color device */
@media (color) {
  p {
    color: red;
  }
}

/* Any color device with at least 8 bits per color component */
@media (min-color: 8) {
  p {
    color: #24ba13;
  }
}
```

## See also

- The CSS `color` property
- The CSS `<color>` data unit

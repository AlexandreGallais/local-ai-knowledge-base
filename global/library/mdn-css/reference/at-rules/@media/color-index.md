---
title: "`color-index` CSS media feature"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/at-rules/@media/color-index/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `color-index` CSS media feature

The **`color-index`** CSS media feature can be used to test the number of entries in the output device's color lookup table.

## Syntax

The `color-index` feature is specified as an `<integer>` value representing the number of entries in the output device's color lookup table. (This value is zero if the device does not use such a table.) It is a range feature, meaning that you can also use the prefixed **`min-color-index`** and **`max-color-index`** variants to query minimum and maximum values, respectively.

## Examples

### Basic <example-value>

#### HTML

```html
<p>This is a test.</p>
```

#### CSS

```css
p {
  color: black;
}

@media (color-index) {
  p {
    color: red;
  }
}

@media (min-color-index: 15000) {
  p {
    color: #1475ef;
  }
}
```

#### Result

### Custom stylesheet

This HTML will apply a special stylesheet for devices that have at least 256 colors.

```html
<link rel="stylesheet" href="https://cdn.example.com/base.css" />
<link
  rel="stylesheet"
  media="(color-index >= 256)"
  href="https://cdn.example.com/color-stylesheet.css" />
```

## See also

- Using Media Queries
- @media

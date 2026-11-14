---
title: "`width` CSS media feature"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/at-rules/@media/width/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `width` CSS media feature

The **`width`** CSS media feature can be used to test the width of the viewport (or the page box, for paged media).

## Syntax

The `width` feature is specified as a `<length>` value representing the viewport width. It is a range feature, meaning that you can also use the prefixed **`min-width`** and **`max-width`** variants to query minimum and maximum values, respectively.

## Examples

### HTML

```html
<div>Watch this element as you resize your viewport's width.</div>
```

### CSS

```css
/* Exact width */
@media (width: 360px) {
  div {
    color: red;
  }
}

/* Minimum width */
@media (min-width: 35rem) {
  div {
    background: yellow;
  }
}

/* Maximum width */
@media (max-width: 50rem) {
  div {
    border: 2px solid blue;
  }
}
```

## See also

- Using media queries
- @media

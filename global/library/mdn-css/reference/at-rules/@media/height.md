---
title: "`height` CSS media feature"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/at-rules/@media/height/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `height` CSS media feature

The **`height`** CSS media feature can be used to apply styles based on the height of the viewport (or the page box, for paged media).

## Syntax

The `height` feature is specified as a `<length>` value representing the viewport height. It is a range feature, meaning that you can also use the prefixed **`min-height`** and **`max-height`** variants to query minimum and maximum values, respectively.

## Examples

### HTML

```html
<div>Watch this element as you resize your viewport's height.</div>
```

### CSS

```css
/* Exact height */
@media (height: 360px) {
  div {
    color: red;
  }
}

/* Minimum height */
@media (min-height: 25rem) {
  div {
    background: yellow;
  }
}

/* Maximum height */
@media (max-height: 40rem) {
  div {
    border: 2px solid blue;
  }
}
```

## See also

- Using media queries
- @media

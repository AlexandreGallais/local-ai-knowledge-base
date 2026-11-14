---
title: "`clip` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/clip/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `clip` CSS property

> **Warning:**
> Authors are encouraged to use the `clip-path` property instead.

The **`clip`** CSS property defines a visible portion of an element. The `clip` property applies only to absolutely positioned elements — that is, elements with `position:absolute` or `position:fixed`.

## Syntax

```css
/* Keyword value */
clip: auto;

/* <shape> values */
clip: rect(1px, 10em, 3rem, 2ch);

/* Global values */
clip: inherit;
clip: initial;
clip: revert;
clip: revert-layer;
clip: unset;
```

### Values

This property is specified as a single value from the following list:

- `rect()`
    A rectangle defined using a `rect()` function of the form `rect(<top>, <right>, <bottom>, <left>)`. The `<top>` and `<bottom>` values are offsets from the _inside top border edge_ of the box, while `<right>` and `<left>` are offsets from the _inside left border edge_ of the box — that is, the extent of the padding box.

    The `<top>`, `<right>`, `<bottom>`, and `<left>` values may be either a `<length>` or `auto`. If any side's value is `auto`, the element is clipped to that side's _inside border edge_.

> **Note:**
> The `rect()` `shape` function used in the deprecated `clip` property is different from the CSS `rect()` function used to define a CSS `basic-shape`.

- `auto`
    The element does not clip (default). This is different from `rect(auto, auto, auto, auto)`, which clips to the element's inside border edges.

## Examples

### Clipping an image

```html
<p class="dotted-border">
  <img src="macarons.png" alt="Original graphic" />
  <img id="top-left" src="macarons.png" alt="Graphic clipped to upper left" />
  <img id="middle" src="macarons.png" alt="Graphic clipped towards middle" />
  <img
    id="bottom-right"
    src="macarons.png"
    alt="Graphic clipped to bottom right" />
</p>
```

```css
.dotted-border {
  border: dotted;
  position: relative;
  width: 390px;
  height: 400px;
}

#top-left,
#middle,
#bottom-right {
  position: absolute;
  top: 0;
}

#top-left {
  left: 400px;
  clip: rect(0, 130px, 90px, 0);
}

#middle {
  left: 270px;
  clip: rect(100px, 260px, 190px, 130px);
}

#bottom-right {
  left: 140px;
  clip: rect(200px, 390px, 290px, 260px);
}
```

## See also

- `clip-path`
- `position`
- `mask`
- `shape-image-threshold`
- `shape-outside`

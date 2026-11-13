---
title: "`overscroll-behavior-inline` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/overscroll-behavior-inline/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `overscroll-behavior-inline` CSS property

The **`overscroll-behavior-inline`** CSS property sets the browser's behavior when the inline direction boundary of a scrolling area is reached.

See `overscroll-behavior` for a full explanation.

## Syntax

```css
/* Keyword values */
overscroll-behavior-inline: auto; /* default */
overscroll-behavior-inline: chain;
overscroll-behavior-inline: contain;
overscroll-behavior-inline: none;

/* Global values */
overscroll-behavior-inline: inherit;
overscroll-behavior-inline: initial;
overscroll-behavior-inline: revert;
overscroll-behavior-inline: revert-layer;
overscroll-behavior-inline: unset;
```

### Values

This property is specified as one of the following keyword values:

- `auto`
    Allows the default behavior at a scroll boundary. Scrolling may continue in another scroll container.
- `chain`
    Allows scrolling to continue outside the scroll container, but prevents overscroll "bounce" effects.
- `contain`
    Prevents scrolling from continuing outside the scroll container. "Bounce" effects may still occur.
- `none`
    Prevents scrolling from continuing outside the scroll container and also prevents overscroll "bounce" effects.

## Examples

### Preventing inline overscrolling

In this demo we have two block-level boxes, one inside the other. The outer box has a large `width` set on it so the page will scroll horizontally. The inner box has a small width (and `height`) set on it so it sits comfortably inside the viewport, but its content is given a large width so it will also scroll horizontally.

By default, when the inner box is scrolled and a scroll boundary is reached, the whole page will begin to scroll, which is probably not what we want. To avoid this happening in the inline direction, we've set `overscroll-behavior-inline: contain` on the inner box.

#### HTML

```html
<main>
  <div>
    <div>
      <p>
        <code>overscroll-behavior-inline</code> has been used to make it so that
        when the scroll boundaries of the yellow inner box are reached, the
        whole page does not begin to scroll.
      </p>
    </div>
  </div>
</main>
```

#### CSS

```css
main {
  height: 400px;
  width: 3000px;
  background-color: white;
  background-image: repeating-linear-gradient(
    to right,
    transparent 0px,
    transparent 19px,
    rgb(0 0 0 / 50%) 20px
  );
}

main > div {
  height: 300px;
  width: 400px;
  overflow: auto;
  position: relative;
  top: 50px;
  left: 50px;
  overscroll-behavior-inline: contain;
}

div > div {
  height: 100%;
  width: 1500px;
  background-color: yellow;
  background-image: repeating-linear-gradient(
    to right,
    transparent 0px,
    transparent 19px,
    rgb(0 0 0 / 50%) 20px
  );
}

p {
  padding: 10px;
  background-color: rgb(255 0 0 / 50%);
  margin: 0;
  width: 360px;
  position: relative;
  top: 10px;
  left: 10px;
}
```

#### Result

## See also

- `overscroll-behavior`
- `overscroll-behavior-x`
- `overscroll-behavior-y`
- `overscroll-behavior-block`
- CSS overscroll behavior module

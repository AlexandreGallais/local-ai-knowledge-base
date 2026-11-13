---
title: "`overscroll-behavior-block` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/overscroll-behavior-block/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `overscroll-behavior-block` CSS property

The **`overscroll-behavior-block`** CSS property sets the browser's behavior when the block direction boundary of a scrolling area is reached.

See `overscroll-behavior` for a full explanation.

## Syntax

```css
/* Keyword values */
overscroll-behavior-block: auto; /* default */
overscroll-behavior-block: chain;
overscroll-behavior-block: contain;
overscroll-behavior-block: none;

/* Global values */
overscroll-behavior-block: inherit;
overscroll-behavior-block: initial;
overscroll-behavior-block: revert;
overscroll-behavior-block: revert-layer;
overscroll-behavior-block: unset;
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

### Preventing block overscrolling

In this demo we have two block-level boxes, one inside the other. The outer box has a large `height` set on it so the page will scroll vertically. The inner box has a small `width` (and `height`) set on it so it sits comfortably inside the viewport, but its content is given a large `height` so it will also scroll vertically.

By default, when the inner box is scrolled and a scroll boundary is reached, the whole page will begin to scroll, which is probably not what we want. To avoid this happening in the block direction, we've set `overscroll-behavior-block: contain` on the inner box.

#### HTML

```html
<main>
  <div>
    <div>
      <p>
        <code>overscroll-behavior-block</code> has been used to make it so that
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
  height: 3000px;
  width: 500px;
  background-color: white;
  background-image: repeating-linear-gradient(
    to bottom,
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
  overscroll-behavior-block: contain;
}

div > div {
  height: 1500px;
  width: 100%;
  background-color: yellow;
  background-image: repeating-linear-gradient(
    to bottom,
    transparent 0px,
    transparent 19px,
    rgb(0 0 0 / 50%) 20px
  );
}

p {
  padding: 10px;
  background-color: rgb(255 0 0 / 50%);
  margin: 0;
  width: 340px;
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
- `overscroll-behavior-inline`
- CSS overscroll behavior module

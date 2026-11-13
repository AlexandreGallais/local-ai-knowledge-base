---
title: "`offset-distance` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/offset-distance/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `offset-distance` CSS property

The **`offset-distance`** CSS property specifies a position along an `offset-path` for an element to be placed.

```css
offset-distance: 0%;
```

```css
offset-distance: 80%;
```

```css
offset-distance: 50px;
```

```html
<section class="default-example" id="default-example">
  <div class="transition-all" id="example-element"></div>
</section>
```

```css
#example-element {
  width: 24px;
  height: 24px;
  background: #2bc4a2;
  offset-path: path("M-70,-40 C-70,70 70,70 70,-40");
  clip-path: polygon(0% 0%, 70% 0%, 100% 50%, 70% 100%, 0% 100%, 30% 50%);
}

/* Provides a reference image of what path the element is following */
#default-example {
  background-position: calc(50% - 12px) calc(50% + 14px);
  background-repeat: no-repeat;
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="-75 -45 150 140" width="150" height="140"><path d="M-70,-40 C-70,70 70,70 70,-40" fill="none" stroke="lightgrey" stroke-width="2" stroke-dasharray="4.5"/></svg>');
}
```

## Syntax

```css
/* Default value */
offset-distance: 0;

/* the middle of the offset-path */
offset-distance: 50%;

/* a fixed length positioned along the path */
offset-distance: 40px;

/* Global values */
offset-distance: inherit;
offset-distance: initial;
offset-distance: revert;
offset-distance: revert-layer;
offset-distance: unset;
```

- `<length-percentage>`
    A length that specifies how far the element is along the path (defined with `offset-path`).

    100% represents the total length of the path (when the `offset-path` is defined as a basic shape or `path()`).

## Examples

### Using offset-distance in an animation

The motion aspect in CSS Motion Path typically comes from animating the `offset-distance` property. If you want to animate an element along its full path, you would define its `offset-path` and then set up an animation that takes the `offset-distance` from `0%` to `100%`.

#### HTML

```html
<div id="motion-demo"></div>
```

#### CSS

```css
#motion-demo {
  offset-path: path("M20,20 C20,100 200,0 200,100");
  animation: move 3000ms infinite alternate ease-in-out;
  width: 40px;
  height: 40px;
  background: cyan;
}

@keyframes move {
  0% {
    offset-distance: 0%;
  }
  100% {
    offset-distance: 100%;
  }
}
```

#### Result

## See also

- `offset`
- `offset-anchor`
- `offset-path`
- `offset-position`
- `offset-rotate`

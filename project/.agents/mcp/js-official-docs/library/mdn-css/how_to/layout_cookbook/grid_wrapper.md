---
title: "Grid wrapper"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/how_to/layout_cookbook/grid_wrapper/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Grid wrapper

The grid wrapper pattern is useful for aligning grid content within a central wrapper while also allowing items to break out and align to the edge of the containing element or page.

## Requirements

Items placed on the grid should be able to align to a horizontally-centered max-width wrapper or the outer edges of the grid, or both.

## Recipe

Click "Play" in the code blocks below to edit the example in the MDN Playground:

```html
<div class="grid">
  <div class="wrapper">
    <p>
      This item aligns to a central "wrapper" – columns that have a maximum
      width.
    </p>
  </div>
  <div class="full-width">
    <p>This item aligns to the edge of the grid container.</p>
  </div>
  <div class="left-edge">
    <p>
      This item aligns to the left edge of the grid container and the right edge
      of the wrapper.
    </p>
  </div>
  <div class="right-wrapper">
    <p>This item aligns to the right edge of the "wrapper" columns.</p>
  </div>
</div>
```

```css
body {
  font: 1.2em sans-serif;
}
.grid {
  display: grid;
  grid-template-columns: minmax(20px, 1fr) repeat(6, minmax(0, 60px)) minmax(
      20px,
      1fr
    );
  grid-auto-rows: minmax(100px, auto);
  grid-gap: 10px;
}

.grid > * {
  border: 2px solid rgb(95 97 110);
  border-radius: 0.5em;
  padding: 20px;
}

.full-width {
  grid-column: 1 / -1;
}

.wrapper {
  grid-column: 2 / -2;
}

.left-edge {
  grid-column: 1 / -2;
}

.right-wrapper {
  grid-column: 4 / -2;
}
```

## Choices made

This recipe uses the CSS grid `minmax()` function to define the grid track sizes in the `grid-template-columns` property. For the central columns with a maximum width, we can set a minimum value of `0` or greater and a maximum value that specifies the maximum size the column tracks will grow to. Using relative or absolute `length` units (pixels, ems, rems) will create a fixed maximum size for the central wrapper, whereas using `percentage` values or viewport units will cause the wrapper to grow or shrink in response to its context.

The outer two columns have a maximum size of `1fr`, meaning that they will each expand to fill the remaining available space in the grid container.

## Useful fallbacks or alternative methods

To center the grid horizontally on the page you can set a `max-width` along with left and right `auto` `margin`s:

```css
.grid {
  max-width: 96vw; /* Limits the width to 96% of the width of the viewport */
  margin: 0 auto; /* horizontally centers the container */
}
```

## Accessibility concerns

Although CSS grid enables positioning items anywhere (within reason), ensuring that your underlying markup follows a logical order is important (see CSS grid layout and accessibility for more details).

## See also

- `grid-template-columns` property
- CSS grid layout module
- CSS grid: More flexibility with `minmax()` (2018)
- Breaking out with CSS grid (2017)

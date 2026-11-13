---
title: "Aligning items in CSS grid layout (part 2 of 2)"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/guides/grid_layout/box_alignment/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Aligning items in CSS grid layout (part 2 of 2)

## Alignment and auto margins

Another way to align items inside their area is to use auto margins. If you have ever centered a layout in the viewport, or any block level element within its parent, you may have done so by setting the right and left margin of element you wanted to center to `auto`. The auto margin absorbs all of the available space. Setting the margin to `auto` on both sides pushes the block-level element into the middle as both margins attempt to take all of the space.

In this next example, item 1 has its `margin-left` property set to `auto`. This pushes the content over to the right side of the area, as the auto margin takes up the available space that remained after space needed for the content has been assigned:

```css
* {
  box-sizing: border-box;
}

.wrapper {
  border: 2px solid #f76707;
  border-radius: 5px;
  background-color: #fff4e6;
}

.wrapper > div {
  border: 2px solid #ffa94d;
  border-radius: 5px;
  background-color: #ffd8a8;
  padding: 1em;
  color: #d9480f;
}
```

```css
.wrapper {
  display: grid;
  grid-template-columns: repeat(3, 100px);
  grid-template-rows: repeat(3, 100px);
  height: 500px;
  width: 500px;
  gap: 10px;
  grid-template-areas:
    "a a b"
    "a a b"
    "c d d";
}
.item1 {
  grid-area: a;
  margin-left: auto;
}
.item2 {
  grid-area: b;
}
.item3 {
  grid-area: c;
}
.item4 {
  grid-area: d;
}
```

```html
<div class="wrapper">
  <div class="item1">Item 1</div>
  <div class="item2">Item 2</div>
  <div class="item3">Item 3</div>
  <div class="item4">Item 4</div>
</div>
```

Use the grid inspector in your browser developer tools to see how the item is aligned:

## Alignment and writing modes

All these examples were in English, a left-to-right language. This means that our start lines are top and left of our grid when thinking in physical directions.

CSS grid layout and CSS box alignment work with writing modes in CSS. When displaying a right to left language, such as Arabic, the start of the grid is the top right, so the default of `justify-content: start` would be for grid tracks to start on the right-hand side of the grid.

Setting physical properties, such as setting auto margins using `margin-right` or `margin-left`, or absolutely positioning items using the `top`, `right`, `bottom`, and `left` offsets, does not honor writing modes. In the grids, logical values, and writing modes guide, we will look further into this interaction between CSS grid layout, box alignment and writing modes. This will be important to understand, if you develop sites that are then displayed in multiple languages, or if you want to mix languages or writing modes in a design.

## See also

- Basic <example-value> of grid layout
- Relationship of grid layout with other layout methods
- Grid layout using line-based placement
- Grid template areas
- Grid layout using named grid lines
- Auto-placement in grid layout
- Box alignment in CSS grid layout

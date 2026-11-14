---
title: "Grid layout using line-based placement (part 2 of 2)"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/guides/grid_layout/line-based_placement/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Grid layout using line-based placement (part 2 of 2)

## Using the `span` keyword

In addition to specifying the start and end lines by number, you can specify a start line and then the number of tracks you would like the area to span using the `span` keyword.

```css
* {
  box-sizing: border-box;
}

.wrapper {
  border: 2px solid #f76707;
  border-radius: 5px;
  background-color: #fff4e6;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 100px);
}

.wrapper > div {
  border: 2px solid #ffa94d;
  border-radius: 5px;
  background-color: #ffd8a8;
  padding: 1em;
  color: #d9480f;
}
```

```html
<div class="wrapper">
  <div class="box1">One</div>
  <div class="box2">Two</div>
  <div class="box3">Three</div>
  <div class="box4">Four</div>
</div>
```

```css
.box1 {
  grid-column: 1;
  grid-row: 1 / span 3;
}
.box2 {
  grid-column: 3;
  grid-row: 1 / span 2;
}
.box3 {
  grid-column: 2;
  grid-row: 1;
}
.box4 {
  grid-column: 2 / span 2;
  grid-row: 3;
}
```

You can also use the `span` keyword in the value of `grid-row-start`/`grid-row-end` and `grid-column-start/grid-column-end`. The following two examples will create the same grid area. In the first we set the start row line, then the end line we specify that we want the area to cover 3 tracks. The area will start at line 1 and end 3 lines from line 1; that is, the area will end at line 4.

```css
.box1 {
  grid-column-start: 1;
  grid-row-start: 1;
  grid-row-end: span 3;
}
```

In the second example, we specify the end row line we want the item to finish at and then set the start line as `span 3`. This means the item will need to span upwards from the specified row line. The area will start at line 4 and span 3 lines to line 1.

```css
.box1 {
  grid-column-start: 1;
  grid-row-start: span 3;
  grid-row-end: 4;
}
```

To become familiar with line based positioning in grid, try to build a few common layouts by placing items onto grids with varying numbers of columns. Remember that if you do not place all of the items, any leftover items will be placed according to auto-placement rules. This may result in the layout you want, but if something is appearing somewhere unexpected, check that you have set a position for it.

Also, remember that items on the grid can overlap when you place them explicitly like this. Overlapping items can create some nice effects, however, you can also end up with incorrect overlapping if you specify the wrong start or end line. Inspecting grids with your browser developer tools can be very helpful for identifying such problems as you learn, especially if your grid is quite complicated.

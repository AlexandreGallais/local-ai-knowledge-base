---
title: "Grid layout using line-based placement (part 1 of 2)"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/guides/grid_layout/line-based_placement/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Grid layout using line-based placement

In the basic <example-value> of grid layout guide, we took a brief look at positioning items on a grid using line numbers. In this guide, we will fully explore how this fundamental feature of the specification works.

Starting your exploration of grid with numbered lines is the most logical place to begin because when you use grid layout, you always have numbered lines. The lines are numbered for columns and rows, and are indexed from `1`. Note that grid is indexed according to the writing mode of the document. In a left-to-right language, such as English, line 1 is on the left-hand side of the grid. If you are working in a right-to-left language, such as Arabic, then line 1 will be on the right-hand of the grid. We will learn more about the interaction between writing modes and grids in the grids, logical values, and writing modes guide.

## A basic <example-value>

As a basic <example-value>, we create a grid with 3 column tracks and 3 row tracks. This gives us 4 lines in each dimension.

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
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 100px);
}
```

Inside our grid container, we include four child elements.

```html
<div class="wrapper">
  <div class="box1">One</div>
  <div class="box2">Two</div>
  <div class="box3">Three</div>
  <div class="box4">Four</div>
</div>
```

If we do not place these onto the grid in any way, they will lay out according to the auto-placement rules, one item in each of the first four cells. You can inspect the grid with your browser developer tools to see how the grid defines columns and rows.

## Positioning items by line number

We can use line-based placement to control where these items sit on the grid. We can use the `grid-column-start` and `grid-column-end` properties to make the first item start on the far left of the grid and span a single column track. With `grid-row-start` and `grid-row-end`, we make the item start on the first row line at the top of the grid, and span to the fourth row line.

```css
.box1 {
  grid-column-start: 1;
  grid-column-end: 2;
  grid-row-start: 1;
  grid-row-end: 4;
}
```

As you position some items, other items on the grid will continue to be laid out using the auto-placement rules. This behavior is explained in the Auto-placement in grid layout guide. For now, observe how the grid is laying out un-placed items into empty cells of the grid.

Addressing each item individually using the same properties but with different values, we place all four items, spanning row and column tracks.

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
  grid-column-start: 1;
  grid-column-end: 2;
  grid-row-start: 1;
  grid-row-end: 4;
}
.box2 {
  grid-column-start: 3;
  grid-column-end: 4;
  grid-row-start: 1;
  grid-row-end: 3;
}
.box3 {
  grid-column-start: 2;
  grid-column-end: 3;
  grid-row-start: 1;
  grid-row-end: 2;
}
.box4 {
  grid-column-start: 2;
  grid-column-end: 4;
  grid-row-start: 3;
  grid-row-end: 4;
}
```

Note that we can leave cells empty if we wish. One of the very nice things about grid layout is the ability to have white space in our designs without any hacks.

## The `grid-column` and `grid-row` shorthands

The previous example had quite a lot of code to position each item. It should come as no surprise to know there is a shorthand. The `grid-column-start` and `grid-column-end` properties can be combined into `grid-column`, `grid-row-start` and `grid-row-end` into `grid-row`. In this example, we replicate the above example using these shorthand properties:

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
  grid-column: 1 / 2;
  grid-row: 1 / 4;
}
.box2 {
  grid-column: 3 / 4;
  grid-row: 1 / 3;
}
.box3 {
  grid-column: 2 / 3;
  grid-row: 1 / 2;
}
.box4 {
  grid-column: 2 / 4;
  grid-row: 3 / 4;
}
```

## Default spans

In the above examples, we specified every end row and column line, in order to demonstrate the properties, however in practice if an item only spans one track you can omit the `grid-column-end` or `grid-row-end` value. Grid defaults to spanning one track.

### Default spans with longhand placement

This means that our initial, long-hand, example would look like this:

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
  grid-column-start: 1;
  grid-row-start: 1;
  grid-row-end: 4;
}
.box2 {
  grid-column-start: 3;
  grid-row-start: 1;
  grid-row-end: 3;
}
.box3 {
  grid-column-start: 2;
  grid-row-start: 1;
}
.box4 {
  grid-column-start: 2;
  grid-column-end: 4;
  grid-row-start: 3;
}
```

### Default spans with shorthand placement

Our shorthand would look like the following code, with no forward slash and second value for the items spanning one track only.

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
  grid-row: 1 / 4;
}
.box2 {
  grid-column: 3;
  grid-row: 1 / 3;
}
.box3 {
  grid-column: 2;
  grid-row: 1;
}
.box4 {
  grid-column: 2 / 4;
  grid-row: 3;
}
```

## The `grid-area` property

We can take things a step further and define each area with a single property – `grid-area`. The order of the values for `grid-area` is as follows.

– `grid-row-start`
– `grid-column-start`
– `grid-row-end`
– `grid-column-end`

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
  grid-area: 1 / 1 / 4 / 2;
}
.box2 {
  grid-area: 1 / 3 / 3 / 4;
}
.box3 {
  grid-area: 1 / 2 / 2 / 3;
}
.box4 {
  grid-area: 3 / 2 / 4 / 4;
}
```

This order of values for `grid-area` can seem a little strange — it is the opposite of the direction in which we specify margins and padding as a shorthand, for example. It may help to realize that this is due to CSS grid layout using the flow-relative directions defined in CSS writing modes. We explore how grids work with writing modes in grids, logical values, and writing modes. For now, consider the concept of four flow-relative directions:

- `block-start`
- `block-end`
- `inline-start`
- `inline-end`

We are working in English, a left-to-right language. Our `block-start` is the top row line of the grid container, `block-end` is the final row line of the container. Our `inline-start` is the left-hand column line as `inline-start` is always the point from which text would be written in the current writing mode, while `inline-end` is the final column line of our grid.

When we specify our grid area using the `grid-area` property we first define both start lines `block-start` and `inline-start`, then both end lines `block-end` and `inline-end`. This seems unusual at first as we are used to the physical properties of `top`, `right`, `bottom`, and `left`, but it makes more sense if you start to think of websites as being multi-directional in different writing modes.

## Counting backwards

We can also count backwards from the block and inline ends of the grid, for English that would be the right-hand column line and final row line. The last lines of the explicit grid can be addressed as `-1`, and you can count back from there – so the second to last line is `-2`.

Do note that negative values are relevant only to the explicit grid. The final line is the final line of the grid defined by `grid-template-columns` and `grid-template-rows`, and does not take into account any rows or columns added in the _implicit grid_ outside of that.

In this next example, we have flipped the layout we were working with by working from the right and bottom of our grid when placing the items.

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
  grid-column-start: -1;
  grid-column-end: -2;
  grid-row-start: -1;
  grid-row-end: -4;
}
.box2 {
  grid-column-start: -3;
  grid-column-end: -4;
  grid-row-start: -1;
  grid-row-end: -3;
}
.box3 {
  grid-column-start: -2;
  grid-column-end: -3;
  grid-row-start: -1;
  grid-row-end: -2;
}
.box4 {
  grid-column-start: -2;
  grid-column-end: -4;
  grid-row-start: -3;
  grid-row-end: -4;
}
```

### Stretching an item across the grid

Being able to address the start and end lines of the grid is useful as you can then stretch an item right across the grid with:

```css
.item {
  grid-column: 1 / -1;
}
```

## Gutters or Alleys

CSS grid includes the ability to add gutters between column and row tracks with the `column-gap` and `row-gap` properties, or `gap` shorthand.

Gaps only appear between tracks of the grid, they do not add space to the top and bottom, left or right of the container. We can add gaps to our earlier example by using these properties on the grid container.

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
  grid-row: 1 / 4;
}
.box2 {
  grid-column: 3;
  grid-row: 1 / 3;
}
.box3 {
  grid-column: 2;
  grid-row: 1;
}
.box4 {
  grid-column: 2 / 4;
  grid-row: 3;
}
.wrapper {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 100px);
  column-gap: 20px;
  row-gap: 1em;
}
```

### The gap shorthand

The two properties can also be expressed as a shorthand, `gap`. If you only give one value for `gap` it will apply to both column and row gaps. If you specify two values, the first is used for `row-gap` and the second for `column-gap`.

```css
.wrapper {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 100px);
  gap: 1em 20px;
}
```

In terms of line-based positioning of items, the gap acts as if the line has gained extra width. Anything starting at that line starts after the gap and you cannot address the gap or place anything into it. If you want gutters that act more like regular tracks you can define a track for that purpose.

---
title: "Basic concepts of grid layout (part 1 of 2)"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/guides/grid_layout/basic_concepts/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Basic concepts of grid layout

CSS grid layout introduces a two-dimensional grid system to CSS. Grids can be used to lay out major page areas or small user interface elements. This guide introduces the CSS grid layout and the terminology that is part of the CSS grid layout specification. The features shown in this overview will then be explained in greater detail in the other guides in this series.

## What is a grid?

A grid is a set of intersecting horizontal and vertical lines defining rows and columns. Elements can be placed onto the grid within these column and row lines. CSS grid layout has the following features:

### Fixed and flexible track sizes

You can create a grid with fixed track sizes – using pixels for example. This sets the grid to the specified pixel which fits to the layout you desire. You can also create a grid using flexible sizes with percentages or with the `fr` unit designed for this purpose.

### Item placement

You can place items into a precise location on the grid using line numbers, names or by targeting an area of the grid. Grid also contains an algorithm to control the placement of items not given an explicit position on the grid.

### Creation of additional tracks to hold content

You can define an explicit grid with grid layout. The features defined by the grid layout module provide the flexibility to add additional rows and columns when needed. Features such as adding "as many columns that will fit into a container" are included.

### Alignment control

CSS grid layout and CSS box alignment features enable us to control how the items align once placed into a grid area, and how the entire grid is aligned.

### Control of overlapping content

More than one item can be placed into a grid cell or area and they can partially overlap each other. This layering may then be controlled with the `z-index` property.

Grid is a powerful layout method that, when combined with other parts of CSS such as flexbox, can help you create layouts that are responsive, flexible, and accessible. It all starts by creating a grid in your **grid container**.

## Grid container

We create a _grid container_ by declaring `display: grid` or `display: inline-grid` on an element. As soon as we do this, all _direct children_ of that element become _grid items_.

In this example, we have a containing div with a class of `wrapper`. Nested inside are five child elements.

```html
<div class="wrapper">
  <div>One</div>
  <div>Two</div>
  <div>Three</div>
  <div>Four</div>
  <div>Five</div>
</div>
```

We make the `.wrapper` a grid container using `display: grid;`.

```css
.wrapper {
  display: grid;
}
```

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

All the direct children are now grid items. In a web browser, you won't see any difference to how these items are displayed before turning them into a grid, as grid has created a single column grid for the items. If you inspect the grid in your browsers developer tools, you may see a small icon next to the value `grid`. Click this and, in most browsers, the grid on this element will be overlaid in the browser window.

As you learn and then work with the CSS grid layout, your browser tools will give you a better idea of what is happening with your grids visually.

If we want to start making this more grid-like we need to add column tracks.

## Grid tracks

We define rows and columns on our grid with the `grid-template-rows` and `grid-template-columns` properties. These define grid tracks. A _grid track_ is the space between any two adjacent lines on the grid. The image below shows a highlighted track – this is the first-row track in our grid.

Grid tracks are defined in the explicit grid by using the `grid-template-columns` and `grid-template-rows` properties or the shorthand `grid` or `grid-template` properties. Tracks are also created in the implicit grid by positioning a grid item outside of the tracks created in the explicit grid.

### Basic <example-value>

We can add column tracks to our earlier example by adding the `grid-template-columns` property, then defining the size of the column tracks.

We have now created a grid with three 200-pixel-wide column tracks. The child items will be laid out on this grid one in each grid cell.

```html
<div class="wrapper">
  <div>One</div>
  <div>Two</div>
  <div>Three</div>
  <div>Four</div>
  <div>Five</div>
</div>
```

```css
.wrapper {
  display: grid;
  grid-template-columns: 200px 200px 200px;
}
```

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

### The fr unit

Tracks can be defined using any length unit. Grid also introduces an additional length unit to help us create flexible grid tracks. The `fr` unit represents a fraction of the available space in the grid container. The next grid definition would create three equal width tracks that grow and shrink according to the available space.

```html
<div class="wrapper">
  <div>One</div>
  <div>Two</div>
  <div>Three</div>
  <div>Four</div>
  <div>Five</div>
</div>
```

```css
.wrapper {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}
```

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

### Unequal sizes

In this example, we create a definition with a `2fr` track then two `1fr` tracks. The available space is split into four. Two parts are given to the first track and one part each to the next two tracks.

```html
<div class="wrapper">
  <div>One</div>
  <div>Two</div>
  <div>Three</div>
  <div>Four</div>
  <div>Five</div>
</div>
```

```css
.wrapper {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
}
```

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

### Mixing flexible and absolute sizes

In this final example, we mix absolute sized tracks with `fr` units. The first track is `500px`, so the fixed width is taken away from the available space. The remaining space is divided into three and assigned in proportion to the two flexible tracks.

```html
<div class="wrapper">
  <div>One</div>
  <div>Two</div>
  <div>Three</div>
  <div>Four</div>
  <div>Five</div>
</div>
```

```css
.wrapper {
  display: grid;
  grid-template-columns: 500px 1fr 2fr;
}
```

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

### Track listings with repeat() notation

Large grids with many tracks can use the `repeat()` notation, to repeat all or a section of the list of grid tracks. For example the grid definition:

```css
.wrapper {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}
```

Can also be written as:

```css
.wrapper {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}
```

Repeat notation can be used for a part of the list of tracks. In this example, we create an 8-column grid; the initial track is `20px`, then a repeating section of 6 `1fr` tracks, and a final `20px` track.

```css
.wrapper {
  display: grid;
  grid-template-columns: 20px repeat(6, 1fr) 20px;
}
```

Repeat notation (`repeat()`) uses the track listing to create a repeating pattern of tracks. In this example, the grid will have 10 tracks; a `1fr` track is followed by a `2fr` track, with this pattern being repeated five times.

```css
.wrapper {
  display: grid;
  grid-template-columns: repeat(5, 1fr 2fr);
}
```

### Implicit and explicit grids

When creating our example grid, we specifically defined our column tracks with the `grid-template-columns` property, with the grid creating rows as needed to fit the content. The columns define the explicit grid while the rows are part of the implicit grid.

The _explicit grid_ consists of rows and columns defined with `grid-template-columns` or `grid-template-rows`. The
_implicit grid_ extends the defined explicit grid when content is placed outside of that grid, such as into the rows by drawing additional grid lines.

If you place something outside of the defined grid or, due to the amount of content, more grid tracks are needed, then the grid creates rows and columns in the _implicit grid_. These implicit tracks are auto-sized by default, meaning the size of the created rows or columns is influenced by both their content and by the available free space within the grid container. The `auto` keyword allows the generated tracks to accommodate content while also sharing any remaining space.

You can also define a set size for tracks created in the implicit grid with the `grid-auto-rows` and `grid-auto-columns` properties.

In this example, we set `grid-auto-rows: 200px`, ensuring the tracks created in this implicit grid are `200px` tall.

```html
<div class="wrapper">
  <div>One</div>
  <div>Two</div>
  <div>Three</div>
  <div>Four</div>
  <div>Five</div>
</div>
```

```css
.wrapper {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: 200px;
}
```

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

### Track sizing and minmax

When setting up an explicit grid or defining the sizing for automatically created rows or columns we may want to give tracks a minimum size, but also ensure they expand to fit any content that is added. For example, we may want our rows to never collapse smaller than 100 pixels, but if our content stretches to 300 pixels in height, then we would like the row to stretch to that height. This is solved by the `minmax()` function.

In this example, we use `minmax()` within the `grid-auto-rows` property value. By setting `grid-auto-rows: minmax(100px, auto);`, automatically created rows will be a minimum of `100px` tall, and have a maximum of `auto`. Setting `auto` as the maximum value allows the track to grow to accommodate its content (up to its `max-content` size) while also sharing any available free space within the grid container.

```css
.wrapper {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: minmax(100px, auto);
}
```

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

```html
<div class="wrapper">
  <div>One</div>
  <div>
    Two
    <p>We have some more content.</p>
    <p>This makes me taller than 100 pixels.</p>
  </div>
  <div>Three</div>
  <div>Four</div>
  <div>Five</div>
</div>
```

## Grid lines

It should be noted that when we define a grid we define the grid tracks, not the lines. Grid then gives us numbered lines to use when positioning items. In our three column, two row grid we have four column lines.

Lines are numbered according to the writing mode of the document. In a left-to-right language, line 1 is on the left-hand side of the grid. In a right-to-left language, it is on the right-hand side of the grid. Lines can also be named, which is discussed in the grid layout using named grid lines guide.

### Positioning items against lines

The following example demonstrates basic <example-value> placement; when placing an item, we target the line rather than the track. We explore this in greater detail in the grid layout using line-based placement guide.

In this example, the first two items on our three column track grid are placed using the `grid-column-start`, `grid-column-end`, `grid-row-start` and `grid-row-end` properties. Working from left to right, the first item is placed against column line 1, and spans to column line 4, which in our case is the far-right line on the grid. It begins at row line 1 and ends at row line 3, therefore spanning two row tracks.

The second item starts on grid column line 1, and spans one track. This is the default, so we do not need to specify the end line. It also spans two row tracks from row line 3 to row line 5. The other items will place themselves into empty spaces on the grid.

```html
<div class="wrapper">
  <div class="box1">One</div>
  <div class="box2">Two</div>
  <div class="box3">Three</div>
  <div class="box4">Four</div>
  <div class="box5">Five</div>
</div>
```

```css
.wrapper {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: 100px;
}

.box1 {
  grid-column-start: 1;
  grid-column-end: 4;
  grid-row-start: 1;
  grid-row-end: 3;
}

.box2 {
  grid-column-start: 1;
  grid-row-start: 3;
  grid-row-end: 5;
}
```

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

Use the grid inspector in your developer tools to see how the items are positioned against the lines of the grid.

### Line-positioning shorthands

The longhand values used above can be compressed onto one line for columns with the `grid-column` shorthand, and one line for rows with the `grid-row` shorthand. The following example would give the same positioning as in the previous code, but with far less CSS. The value before the forward slash character (`/`) is the start line, the value after the end line.

You can omit the end value if the area only spans one track.

```css
.wrapper {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: 100px;
}

.box1 {
  grid-column: 1 / 4;
  grid-row: 1 / 3;
}

.box2 {
  grid-column: 1;
  grid-row: 3 / 5;
}
```

## Grid cells

A _grid cell_ is the smallest unit on a grid. Conceptually it is like a table cell. As we saw in our earlier examples, once a grid is defined as a parent the child items will lay themselves out in one cell each of the defined grid. In the below image, the first cell of the grid is highlighted.

---
title: "Auto-placement in grid layout (part 1 of 2)"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/guides/grid_layout/auto-placement/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Auto-placement in grid layout

CSS grid layout contains rules that control what happens when you create a grid and do not explicitly place some or all of the child items within the grid. When you don't need explicit control over content placement, this "auto-placement" is the simplest way of creating a grid for a set of items.

## Default placement

If you don't give the items placement information, they automatically position themselves on the grid, placing one grid item in each grid cell.

```css
body {
  font: 1.2em sans-serif;
}
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
  gap: 10px;
}
```

```html
<div class="wrapper">
  <div>One</div>
  <div>Two</div>
  <div>Three</div>
  <div>Four</div>
  <div>Five</div>
</div>
```

## Default rules for auto-placement

As you can see with the above example, if you create a grid without placing any items, the child items will lay themselves out, with one grid item in each grid cell in source-code order. The default flow is to arrange items by row. Grid will lay an item out into each cell of the first row. If you have created additional rows using the `grid-template-rows` property, then grid will continue placing items in these rows. If the grid does not have enough rows in the explicit grid to place all of the items new _implicit_ rows will be created.

### Sizing rows in the implicit grid

The default for automatically created rows in the implicit grid is for them to be _auto-sized_. This means that they will size themselves to contain the content added to them without causing an overflow.

The size of these rows can be controlled using the `grid-auto-rows` property. For example, to make all rows 100px tall, you can use `grid-auto-rows: 100px;`:

```css
body {
  font: 1.2em sans-serif;
}
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
  gap: 10px;
  grid-auto-rows: 100px;
}
```

### Sizing rows using minmax()

The `minmax` function enables creating rows that have a minimum size, and can grow to fit content as needed when set as the `grid-auto-rows` value. By setting `grid-auto-rows: minmax(100px, auto);` we set each row to be at least 100px tall, while allowing each row to be as tall as needed:

```css
body {
  font: 1.2em sans-serif;
}
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
  <div>Two</div>
  <div>Three</div>
  <div>
    Four <br />This cell <br />Has extra <br />content. <br />Max is auto
    <br />so the row expands.
  </div>
  <div>Five</div>
</div>
```

```css
.wrapper {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  grid-auto-rows: minmax(100px, auto);
}
```

### Sizing rows using a track listing

You can also pass in a track listing. This will repeat. The following track listing will create an initial implicit row track as 100 pixels and a second as `200px`. This will continue for as long as content is added to the implicit grid.

```css
body {
  font: 1.2em sans-serif;
}
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
  <div>Two</div>
  <div>Three</div>
  <div>Four</div>
  <div>Five</div>
  <div>Six</div>
  <div>Seven</div>
  <div>Eight</div>
</div>
```

```css
.wrapper {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  grid-auto-rows: 100px 200px;
}
```

### Auto-placement by column

You can also ask grid to auto-place items by column. Using the property `grid-auto-flow` with a value of `column`. In this case grid will add items in rows that you have defined using `grid-template-rows`. When it fills up a column it will move onto the next explicit column, or create a new column track in the implicit grid. As with implicit row tracks, these column tracks will be auto sized. You can control the size of implicit column tracks with `grid-auto-columns`. This works in the same way as `grid-auto-rows`.

In this example, we have a grid with three 200px high row tracks. We declare `grid-auto-flow: column;` to auto-place by column. With `grid-auto-columns: 300px 100px;`, the columns created will alternate between being `300px` wide and `100px` wide until there are enough column tracks to hold all of the items.

```css
.wrapper {
  display: grid;
  grid-template-rows: repeat(3, 200px);
  gap: 10px;
  grid-auto-flow: column;
  grid-auto-columns: 300px 100px;
}
```

```css
body {
  font: 1.2em sans-serif;
}
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
  <div>Two</div>
  <div>Three</div>
  <div>Four</div>
  <div>Five</div>
  <div>Six</div>
  <div>Seven</div>
  <div>Eight</div>
</div>
```

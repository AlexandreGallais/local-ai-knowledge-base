---
title: "Relationship of grid layout to other layout methods (part 2 of 2)"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/guides/grid_layout/relationship_with_other_layout_methods/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Relationship of grid layout to other layout methods (part 2 of 2)

## Grid and absolutely positioned elements

Grid interacts with absolutely positioned elements, which can be useful if you want to position an item inside a grid or grid area. The specification defines the behavior when a grid container is a containing block and a parent of the absolutely positioned item.

### A grid container as containing block

To make the grid container a containing block, you need to add the `position` property to the container with a value of `relative`, just as you would make a containing block for any other absolutely positioned items. Once you have done this, if you give a grid item `position: absolute` it will take as its containing block the grid container or, if the item also has a grid position, the area of the grid it is placed into.

In the below example we have a wrapper containing four child items. Item three is absolutely positioned and also placed on the grid using line-based placement. The grid container has `position: relative` and so becomes the positioning context of this item.

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
  <div class="box1">One</div>
  <div class="box2">Two</div>
  <div class="box3">
    This block is absolutely positioned. In this example the grid container is
    the containing block and so the absolute positioning offset values are
    calculated in from the outer edges of the area it has been placed into.
  </div>
  <div class="box4">Four</div>
</div>
```

```css
.wrapper {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: 200px;
  gap: 20px;
  position: relative;
}
.box3 {
  grid-column-start: 2;
  grid-column-end: 4;
  grid-row-start: 1;
  grid-row-end: 3;
  position: absolute;
  top: 40px;
  left: 40px;
}
```

You can see that the item is taking the area from grid column line 2 to 4, and starting after line 1. Then it is offset in that area using the top and left properties. However, it has been taken out of flow as is usual for absolutely positioned items and so the auto-placement rules now place items into the same space. The item also doesn't cause the additional row to be created to span to row line 3.

If we remove `position: absolute` from the rules for `.box3`, you can see how it would display without the positioning.

### A grid container as parent

If the absolutely positioned child has a grid container as a parent but that container does not create a new positioning context, then it is taken out of flow as in the previous example. The _positioning context_ is the element the absolutely positioned element is positioned relative to. The positioning context will be whatever element creates a positioning context as is common to other layout methods. In our case, if we remove `position: relative` from the wrapper above, positioning context is from the viewport, as shown in this image.

Once again, the item no longer participates in the grid layout in terms of sizing or when other items are auto-placed.

### With a grid area as the parent

If the absolutely positioned item is nested inside a grid area, then you can create a positioning context on that area. In this example, we have our grid as before, but this time we have nested an item inside `.box3` of the grid.

We have given `.box3` position relative and then positioned the sub-item with the offset properties. In this case, the positioning context is the grid area.

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
  <div class="box1">One</div>
  <div class="box2">Two</div>
  <div class="box3">
    Three
    <div class="abspos">
      This block is absolutely positioned. In this example the grid area is the
      containing block and so the absolute positioning offset values are
      calculated in from the outer edges of the grid area.
    </div>
  </div>
  <div class="box4">Four</div>
</div>
```

```css
.wrapper {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: 200px;
  gap: 20px;
}
.box3 {
  grid-column-start: 2;
  grid-column-end: 4;
  grid-row-start: 1;
  grid-row-end: 3;
  position: relative;
}
.abspos {
  position: absolute;
  top: 40px;
  left: 40px;
  background-color: rgb(255 255 255 / 50%);
  border: 1px solid rgb(0 0 0 / 50%);
  color: black;
  padding: 10px;
}
```

## Grid and display: contents

A final interaction worth noting is the interaction between CSS grid layout and `display: contents`, defined in the CSS display module. When the `display` property is set to `contents`, the element itself does not generate any boxes, but its children and pseudo-elements still generate boxes as normal. This means that, for the purposes of box generation and layout, the element is treated as if it had been replaced with its children and pseudo-elements in the document tree.

If you set an item to `display: contents`, the box it would normally create disappears and the boxes of the child elements appear as if they have risen up a level. This means that children of a grid item can become grid items. Sound odd? Here is an example.

### Grid layout with nested child elements

In this example, first item of our grid is set to span all three column tracks. It contains three nested items. As these items are not direct children, they don't become part of the grid layout and so display using regular block layout.

```css
* {
  box-sizing: border-box;
}

.wrapper {
  border: 2px solid #f76707;
  border-radius: 5px;
  background-color: #fff4e6;
}

.box {
  border: 2px solid #ffa94d;
  border-radius: 5px;
  background-color: #ffd8a8;
  padding: 1em;
  color: #d9480f;
}
.nested {
  border: 2px solid #ffec99;
  border-radius: 5px;
  background-color: #fff9db;
  padding: 1em;
}
```

```html
<div class="wrapper">
  <div class="box box1">
    <div class="nested">a</div>
    <div class="nested">b</div>
    <div class="nested">c</div>
  </div>
  <div class="box box2">Two</div>
  <div class="box box3">Three</div>
  <div class="box box4">Four</div>
  <div class="box box5">Five</div>
</div>
```

```css
.wrapper {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: minmax(100px, auto);
}
.box1 {
  grid-column-start: 1;
  grid-column-end: 4;
}
```

### Using display: contents

If we now add `display: contents` to the rules for `box1`, the box for that item vanishes and the sub-items now become grid items and lay themselves out using the auto-placement rules.

```css
* {
  box-sizing: border-box;
}

.wrapper {
  border: 2px solid #f76707;
  border-radius: 5px;
  background-color: #fff4e6;
}

.box {
  border: 2px solid #ffa94d;
  border-radius: 5px;
  background-color: #ffd8a8;
  padding: 1em;
  color: #d9480f;
}
.nested {
  border: 2px solid #ffec99;
  border-radius: 5px;
  background-color: #fff9db;
  padding: 1em;
}
```

```html
<div class="wrapper">
  <div class="box box1">
    <div class="nested">a</div>
    <div class="nested">b</div>
    <div class="nested">c</div>
  </div>
  <div class="box box2">Two</div>
  <div class="box box3">Three</div>
  <div class="box box4">Four</div>
  <div class="box box5">Five</div>
</div>
```

```css
.wrapper {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: minmax(100px, auto);
}
.box1 {
  grid-column-start: 1;
  grid-column-end: 4;
  display: contents;
}
```

This can be a way to get items nested into the grid to act as if they are part of the grid. You can also use `display: contents` in a similar way with flexbox to enable nested items to become flex items.

As you can see from this guide, CSS grid layout is just one part of your toolkit. Don't be afraid to mix it with other methods of doing layout to get the different effects you need.

## See also

- Flexbox guides
- Multiple-column layout guides

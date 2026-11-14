---
title: "Box alignment in flexbox"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/guides/box_alignment/in_flexbox/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Box alignment in flexbox

The box alignment module details how alignment works in various layout methods. In this guide, we explore how box alignment works in the context of flexbox. As this guide aims to detail things which are specific to flexbox and box alignment, it should be read in conjunction with the box alignment overview guide, which details the common features of box alignment across layout methods.

## Basic <example-value>

In this flexbox example, three flex items are aligned on the main axis using `justify-content` and on the cross axis using `align-items`. The first item overrides the `align-items` values set on the group by setting `align-self` to `center`.

```css
body {
  font-family: sans-serif;
}
.box > * {
  padding: 20px;
  border: 2px solid rgb(96 139 168);
  border-radius: 5px;
  background-color: rgb(96 139 168 / 0.2);
}
```

```html
<div class="box">
  <div>One</div>
  <div>Two</div>
  <div>Three <br />has <br />extra <br />text</div>
</div>
```

```css
.box {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  border: 2px dotted rgb(96 139 168);
}

.box :first-child {
  align-self: center;
}
```

## The axes and flex-direction

Flexbox respects the writing mode of the document, therefore if you are working in English and set `justify-content` to `flex-end` this will align the items to the end of the flex container. If you are working with `flex-direction` set to `row`, this alignment will be in the inline direction.

However, in flexbox you can change the main axis by setting `flex-direction` to `column`. In this case, `justify-content` will align items in the block direction. Therefore it is easiest to think about the main and cross axis when working in flexbox like so:

- The main axis = direction set by `flex-direction` = alignment via `justify-content`
- The cross axis = runs across the main axis = alignment via `align-content`, `align-self`/`align-items`

### Main Axis Alignment

- `justify-content`

### Cross Axis Alignment

- `align-self`
- `align-items`
- `align-content`

### There is no justify-self in flexbox

On the main axis, Flexbox deals with the flex items as a group. The amount of space required to lay out the items is calculated, and the leftover space is then available for distribution. The `justify-content` property controls how that leftover space is used. Set `justify-content: flex-end` and the extra space is placed before the items, `justify-content: space-around` and it is placed either side of the item in that dimension, etc.

This means that a `justify-self` property does not make sense in flexbox as we are always dealing with moving the entire group of items around.

On the cross axis `align-self` makes sense as we potentially have additional space in the flex container in that dimension, in which a single item can be moved to the start and end.

## Alignment and auto margins

There is a specific use case in flexbox where we might think that a `justify-self` property is what we need, and this is when we want to split a set of flex items, perhaps to create a split navigation pattern. For this use case, we can use an `auto` margin. A margin set to `auto` will absorb all available space in its dimension. This is how centering a block with auto margins works. By setting the left and right margin to `auto`, both sides of our block try to take up all of the available space and so push the box into the center.

By setting a `margin` of `auto` on one item in a set of flex items all aligned to start, we can create a split navigation. This works well with flexbox and the alignment properties. As soon as there is no space available for the auto margin, the item behaves in the same way as all the other flex items and shrinks to try to fit into space.

```html
<div class="box">
  <div>One</div>
  <div>Two</div>
  <div>Three</div>
  <div class="push">Four</div>
  <div>Five</div>
</div>
```

```css
.box {
  display: flex;
  border: 2px dotted rgb(96 139 168);
}
.push {
  margin-left: auto;
}
```

## The `gap` properties

- `row-gap`
- `column-gap`
- `gap`

### Creating fixed size gaps between items

On the main axis, the `column-gap` property creates fixed size gaps between adjacent items.

On the cross axis the `row-gap` property creates spacing between adjacent flex lines, therefore `flex-wrap` must also be set to `wrap` for this to have any effect.

```html
<div class="box">
  <div>One</div>
  <div>Two</div>
  <div>Three</div>
  <div>Four</div>
  <div>Five</div>
  <div>Six</div>
</div>
```

```css
.box {
  width: 450px;
  display: flex;
  flex-wrap: wrap;
  row-gap: 10px;
  column-gap: 2em;
  border: 2px dotted rgb(96 139 168);
}

.box > * {
  flex: 1;
}
```

## See also

- CSS box alignment module
- Box alignment overview
- Box alignment in CSS grid layout
- Box alignment in multiple-column layout
- Box alignment for block, absolutely positioned, and table layouts
- Aligning items in flex container
- Cross axis
- Main axis

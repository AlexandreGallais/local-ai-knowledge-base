---
title: "Mastering wrapping of flex items (part 1 of 2)"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/guides/flexible_box_layout/wrapping_items/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Mastering wrapping of flex items

Flexbox was designed as a single-dimensional layout tool — it deals with laying out items as a row or column — but not both at once. It is, however, possible to wrap flex items onto new lines, creating new rows if `flex-direction` is `row` and new columns if `flex-direction` is `column`. This guide explains flexbox wrapping, what it is designed for, and what situations require CSS grid layout rather than flexbox.

## Making things wrap

The initial value of the `flex-wrap` property is `nowrap`. This means if a set of flex items is too wide for their flex container, they will overflow it. To make them wrap once they are too wide, add the `flex-wrap` property with a value of `wrap`, or use the shorthand `flex-flow` with values of `row wrap` or `column wrap`. Items will then wrap onto new lines when they overflow their container.

In this example, there are ten flex items with a `flex-basis` of `160px` that can grow and shrink. Once there is not enough space to place another 160 pixel item in a row, a new flex line is created. New lines are created as needed until all of the items are placed. As the items can grow, they will expand to fill each row completely. If there is only one item on the final line it will stretch to fill the entire line.

```html
<div class="box">
  <div>One</div>
  <div>Two</div>
  <div>Three</div>
  <div>Four</div>
  <div>Five</div>
  <div>Six</div>
  <div>Seven</div>
  <div>Eight</div>
  <div>Nine</div>
  <div>Ten</div>
</div>
```

```css
.box {
  width: 500px;
  border: 2px dotted rgb(96 139 168);
  display: flex;
  flex-wrap: wrap;
}

.box > * {
  border: 2px solid rgb(96 139 168);
  border-radius: 5px;
  background-color: rgb(96 139 168 / 0.2);
  flex: 1 1 160px;
}
```

The same thing happens with flex columns. To wrap and create new columns, the container needs to have a height. In the case of columns, items stretch vertically to fill each column completely.

```html
<div class="box">
  <div>One</div>
  <div>Two</div>
  <div>Three</div>
  <div>Four</div>
  <div>Five</div>
  <div>Six</div>
  <div>Seven</div>
  <div>Eight</div>
  <div>Nine</div>
  <div>Ten</div>
</div>
```

```css
.box {
  border: 2px dotted rgb(96 139 168);
  height: 300px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
}
.box > * {
  border: 2px solid rgb(96 139 168);
  border-radius: 5px;
  background-color: rgb(96 139 168 / 0.2);
  flex: 1 1 80px;
}
```

## Wrapping and flex-direction

Wrapping works as you might expect when combined with `flex-direction`. If `flex-direction` is set to `row-reverse` then the items will start from the end edge of the container and lay themselves out in reverse ordered lines.

```html
<div class="box">
  <div>One</div>
  <div>Two</div>
  <div>Three</div>
  <div>Four</div>
  <div>Five</div>
  <div>Six</div>
  <div>Seven</div>
  <div>Eight</div>
  <div>Nine</div>
  <div>Ten</div>
</div>
```

```css
.box {
  border: 2px dotted rgb(96 139 168);
  display: flex;
  flex-wrap: wrap;
  flex-direction: row-reverse;
  width: 500px;
}
.box > * {
  border: 2px solid rgb(96 139 168);
  border-radius: 5px;
  background-color: rgb(96 139 168 / 0.2);
  flex: 1 1 160px;
}
```

Note that the reversing is only happening in the inline, row direction. We start on the right then go onto the second line and again start from the right. We aren't reversing in both directions, starting from the bottom coming up the container!

## Balanced wrapping

One potential issue with flexbox wrapping is that, by default, the flex items are not distributed evenly across the lines. In the previous example, we have three items on the first three lines, but only one on the last line. We can distribute the flex items more evenly across the four flex lines by including the `balance` keyword within the `flex-wrap` value, alongside the `wrap` or `wrap-reverse` keyword.

This example uses the same HTML as the previous example, and nearly the same CSS, except that the `flex-wrap` value has been changed from `wrap` to `wrap balance`.

```html
<div class="box">
  <div>One</div>
  <div>Two</div>
  <div>Three</div>
  <div>Four</div>
  <div>Five</div>
  <div>Six</div>
  <div>Seven</div>
  <div>Eight</div>
  <div>Nine</div>
  <div>Ten</div>
</div>
```

```css
.box {
  border: 2px dotted rgb(96 139 168);
  display: flex;
  flex-wrap: wrap balance;
  flex-direction: row-reverse;
  width: 500px;
}
.box > * {
  border: 2px solid rgb(96 139 168);
  border-radius: 5px;
  background-color: rgb(96 139 168 / 0.2);
  flex: 1 1 160px;
}
```

```css
@supports not (flex-wrap: balance) {
  body::before {
    content: "Your browser does not support flex-wrap: balance.";
    background-color: wheat;
    text-align: center;
    padding: 1rem 0;

    z-index: 1;
    position: fixed;
    inset: 40% 0 auto;
  }
}
```

```css
flex-wrap: wrap balance;
```

This line could also have been written as just `flex-wrap: balance`. If `balance` is specified as the only keyword in the `flex-wrap` value, the other keyword defaults to `wrap`. We wrote it out explicitly so it is clearer what is going on. Note that including the `balance` keyword with the `nowrap` value is invalid, and the declaration will be ignored.

The updated rendering looks like so:

Note how the items are now distributed more evenly, or "balanced," with two lines of three items and two lines of two items.

If you want to distribute your balanced flex items across a greater number of lines, you can do so using the `flex-line-count` property. This specifies a minimum number of lines. If we add the following to the previous example:

```css
.box {
  border: 2px dotted rgb(96 139 168);
  display: flex;
  flex-wrap: wrap balance;
  flex-line-count: 5;
  flex-direction: row-reverse;
  width: 500px;
}
.box > * {
  border: 2px solid rgb(96 139 168);
  border-radius: 5px;
  background-color: rgb(96 139 168 / 0.2);
  flex: 1 1 160px;
}
```

```css
flex-line-count: 5;
```

We end up with the following:

We now have five lines of two flex items.

The `flex-line-count` property has no effect on flex-containers that do not have the `balance` keyword included in their `flex-wrap` property values.

## Single-dimensional layout explained

As we have seen from the above examples if our items are allowed to grow and shrink, when there are fewer items in the last row or column then those items grow to fill the available space.

There are no flexbox features to tell items in one row to line up with items in the row above — each flex line acts like a new flex container. It deals with space distribution across the main axis. If there is only one item, and that item is allowed to grow, it will fill the axis just as if you had a single item flex container. If you want layout in two dimensions then you probably want grid layout.

This example demonstrates the difference, using CSS grid layout to create a layout with as many columns of at least `160px` as will fit, distributing the extra space between all columns. We use the same HTML as the flexbox wrapped row example above but set `display: grid` on it. Instead of the `flex` shorthand, which has no effect outside of flexbox, we set the item's minimum width and ability to grow directly on the container with `grid-template-columns`. With CSS grid, the last item stays in its grid cell; grid items don't stretch when there are fewer of them in the last row.

```html
<div class="box">
  <div>One</div>
  <div>Two</div>
  <div>Three</div>
  <div>Four</div>
  <div>Five</div>
  <div>Six</div>
  <div>Seven</div>
  <div>Eight</div>
  <div>Nine</div>
  <div>Ten</div>
</div>
```

```css
.box {
  border: 2px dotted rgb(96 139 168);
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  width: 500px;
}

.box > * {
  border: 2px solid rgb(96 139 168);
  border-radius: 5px;
  background-color: rgb(96 139 168 / 0.2);
}
```

This is the difference between one and two-dimensional layouts. In a one-dimensional layout method like flexbox, we only control the row or column. In a two-dimensional grid layout, we control both at the same time. If you want the space distribution row by row, use Flexbox. If you don't, use CSS grid.

## How do flexbox-based grid systems work?

Flexbox-based layouts can be forced to line up as grid systems, but that is not the intended purpose of flexbox. If you assign percentage widths to flex items — either using `flex-basis` or by adding a width to the item itself and leaving the value of `flex-basis` as `auto` — you can give the impression of a two-dimensional layout.

In this example, `flex-grow` and `flex-shrink` have been set to `0` to make inflexible flex items. The flexibility is controlled via percentages.

```html
<div class="box">
  <div>One</div>
  <div>Two</div>
  <div>Three</div>
  <div>Four</div>
  <div>Five</div>
  <div>Six</div>
  <div>Seven</div>
  <div>Eight</div>
  <div>Nine</div>
  <div>Ten</div>
</div>
```

```css
* {
  box-sizing: border-box;
}

.box {
  width: 500px;
  border: 2px dotted rgb(96 139 168);
  display: flex;
  flex-wrap: wrap;
}

.box > * {
  border: 2px solid rgb(96 139 168);
  border-radius: 5px;
  background-color: rgb(96 139 168 / 0.2);
  flex: 0 0 33.3333%;
}
```

This technique allows you to line up flex items on the cross-axis. However, when you catch yourself adding widths to flex items in this way or adding empty flex items to take up space, it is a good indication you may want to switch to CSS grid layout for that component.

## Creating gutters between items

To create gaps or gutters between flex items, use the `gap` property directly on the flex container to create a fixed space between adjacent flex items. The `gap` property is a shorthand for `row-gap` and `column-gap`. These properties specify the size of the gutters between rows and columns within grid, flex, and multi-column layouts.

The `gap` property is not the only thing that can add space between items. Margins, padding, `justify-content`, and `align-content` can also increase the size of the gutter, affecting the actual size of the gap.

To see how the `gap` property differs from `margin` in both axes, try changing the `gap` value in the container `.box` and adding a `margin` value to the `.box > *` rule in the stylesheet below. Click the "Reset" button to revert to the previous values.

```html
<div class="wrapper">
  <div class="box">
    <div>One</div>
    <div>Two</div>
    <div>Three</div>
    <div>Four</div>
    <div>Five</div>
    <div>Six</div>
    <div>Seven</div>
    <div>Eight</div>
    <div>Nine</div>
    <div>Ten</div>
  </div>
</div>
```

```css
.wrapper {
  border: 2px dotted rgb(96 139 168);
  width: 500px;
}
.box {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
.box > * {
  flex: 1 1 160px;
  border: 2px solid rgb(96 139 168);
  border-radius: 5px;
  background-color: rgb(96 139 168 / 0.2);
}
```

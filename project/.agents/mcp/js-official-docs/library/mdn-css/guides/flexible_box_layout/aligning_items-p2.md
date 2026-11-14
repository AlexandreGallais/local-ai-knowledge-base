---
title: "Aligning items in a flex container (part 2 of 2)"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/guides/flexible_box_layout/aligning_items/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Aligning items in a flex container (part 2 of 2)

## Using auto margins for main axis alignment

We don't have a `justify-items` or `justify-self` property available to us on the main axis as our items are treated as a group on that axis. However it is possible to do some individual alignment in order to separate an item or a group of items from others by using auto margins along with flexbox.

A common pattern is a navigation bar where some key items are aligned to the right, with the main group on the left. You might think that this should be a use case for a `justify-self` property. However, consider the image below. As an example, take the following image with three items on one side and two on the other. If `justify-self` were to work on flex items and was set on item _d_, it would also change the alignment of item _e_ that follows, which may or may not be what is intended.

Instead, the _d_ item can be pushed over using CSS margins.

In this live example, item 4 is separated from the first three items by setting `margin-left` to `auto`, which consumes all the space it can in its axis. This is how centering a block with `margin` auto left and right works. Each side tries to take as much space as it can, and so the block is pushed into the middle.

In this live example, the flex items are arranged in a row with the basic flex values, and the class `push`, set on the fourth item, applies `margin-left: auto` to that item. Try removing the class on the fourth item or adding the class to a different item to see how it works.

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

.box > * {
  padding: 20px;
  border: 2px solid rgb(96 139 168);
  border-radius: 5px;
  background-color: rgb(96 139 168 / 0.2);
}
.push {
  margin-left: auto;
}
```

## Creating gaps between items

To create a gap between flex items, use the `gap`, `column-gap`, and `row-gap` properties. The `column-gap` property creates gaps between items in a row. The `row-gap` property creates gaps between flex lines when you have `flex-wrap` set to `wrap`.

The `gap` property is a shorthand that sets both `row-gap` and `column-gap`.
The gaps between flex items or flex lines depend on the direction. If the `flex-direction` property creates rows, the first value defines the gap between flex lines, and the second value defines the gap between items within each line. With columns (when `flex-direction` is set to `column` or `column-reverse`), the first value defines the gap between flex items, and the second value defines the gaps between flex lines.

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
  display: flex;
  flex-wrap: wrap;
  row-gap: 10px;
  column-gap: 2em;
  border: 2px dotted rgb(96 139 168);
}

.box > * {
  flex: 1;
  padding: 20px;
  border: 2px solid rgb(96 139 168);
  border-radius: 5px;
  background-color: rgb(96 139 168 / 0.2);
}
```

## See also

- CSS box alignment module
- CSS flexible box layout module
- Box alignment in flexbox
- Box alignment in grid layout

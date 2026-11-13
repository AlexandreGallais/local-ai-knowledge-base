---
title: "Controlling ratios of flex items along the main axis (part 2 of 2)"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/guides/flexible_box_layout/controlling_flex_item_ratios/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Controlling ratios of flex items along the main axis (part 2 of 2)

## The `flex-shrink` property

The `flex-shrink` property specifies the **flex shrink factor**, which determines how much the flex item will shrink relative to the rest of the flex items in the flex container when negative free space is distributed.

This property deals with situations where the combined `flex-basis` value of the flex items is too large to fit in the flex container and would otherwise overflow. As long as an item's `flex-shrink` is a positive value, the item will shrink to not overflow the container.

While `flex-grow` is used to add available space to items that can grow, `flex-shrink` is used to remove space to ensure items fit in their container without overflowing.

In this example, there are three `200px`-wide flex items in a `500px`-wide container. With `flex-shrink` set to `0`, the items are not allowed to shrink, causing them to overflow the container.

```html
<div class="box">
  <div>One</div>
  <div>Two</div>
  <div>Three has more content</div>
</div>
```

```css
.box > * {
  border: 2px solid rgb(96 139 168);
  border-radius: 5px;
  background-color: rgb(96 139 168 / 0.2);
  flex: 0 0 auto;
  width: 200px;
}

.box {
  width: 500px;
  border: 2px dotted rgb(96 139 168);
  display: flex;
}
```

Change the `flex-shrink` value to `1`; each item will shrink by the same amount, fitting all the items into the container. The negative free space has been proportionally removed from each item, making each flex item smaller than its initial width.

### Combining `flex-shrink` and `flex-basis`

It may appear that `flex-shrink` works in the same way as `flex-grow`, by shrinking rather than growing elements. However, there are some important differences to note.

The concept of flex base size affects how negative space is distributed across flex items. The flex shrink factor is multiplied by the flex base size when distributing negative space. This distributes negative space in proportion to how much the item is able to shrink. So, for example, a small item won't shrink to zero before a larger item has been noticeably reduced.

Small items will not shrink to less than their `min-content` size, which is the smallest size the element can be if it used all the available soft wrapping opportunities.

This example demonstrates `min-content` flooring, with the `flex-basis` resolving to the size of the content. If you change the width on the flex container, such as increasing it to `700px`, and then reduce the flex item width, you can see that the first two items will wrap. However, they will never become smaller than their `min-content` size. When the container gets small, the space is only removed from the third item when shrunken further.

```html
<div class="box">
  <div>Item One</div>
  <div>Item Two</div>
  <div>Item Three has more content and so has a larger size</div>
</div>
```

```css
.box > * {
  border: 2px solid rgb(96 139 168);
  border-radius: 5px;
  background-color: rgb(96 139 168 / 0.2);
  flex: 1 1 auto;
}

.box {
  border: 2px dotted rgb(96 139 168);
  width: 500px;
  display: flex;
}
```

In practice, this shrinking behavior provides reasonable results. It prevents content from disappearing completely and from becoming smaller than its minimum content size. The above rules are sensible for content that needs to shrink to fit its container.

### Giving items different `flex-shrink` factors

In the same way as `flex-grow`, you can give flex items different `flex-shrink` factors. This can help change the default behavior if, for example, you want an item to shrink more or less rapidly than its siblings or to not shrink at all.

In this example, the first item has a `flex-shrink` factor of `1`, the second item `0` (so it won't shrink at all), and the third item `4`, making a total of `5` shrink factors. The third item, therefore, shrinks approximately four times more rapidly than the first, but neither will shrink below their `min-content` width. Play around with the different values: as with `flex-grow`, you can use decimals or larger numbers here as well.

```html
<div class="box">
  <div class="one">One</div>
  <div class="two">Two</div>
  <div class="three">Three</div>
</div>
```

```css
.box > * {
  border: 2px solid rgb(96 139 168);
  border-radius: 5px;
  background-color: rgb(96 139 168 / 0.2);
  width: 200px;
}

.box {
  display: flex;
  width: 500px;
  border: 2px dotted rgb(96 139 168);
}

.one {
  flex: 1 1 auto;
}

.two {
  flex: 1 0 auto;
}

.three {
  flex: 2 4 auto;
}
```

## Mastering sizing of flex items

To understand how flex item sizing works, you need to consider the factors below, which we've discussed in these guides:

### What determines the base size of an item?

- Is `flex-basis` set to `auto`, and does the item have a width set? If so, the size will be based on that width.
- Is `flex-basis` set to `auto`, but the item doesn't have a width set? If so, the size will be based on the item's content size.
- Is `flex-basis` a length or a percentage, but not zero? If so, this will be the size of the item (floored at `min-content`).
- Is `flex-basis` set to `0`? If so, the item's size will not be taken into consideration for the space-sharing calculation.

### Is there available space?

Items can grow only if there is positive free space, and they won't shrink unless there is negative free space.

- If we add up the widths of all the items (or heights if working in a column), is that total **less** than the total width (or height) of the container? If so, there will be positive free space, and `flex-grow` will come into play.
- If we add up the widths of all the items (or heights if working in a column), is that total **more** than the total width (or height) of the container? If so, there will be negative free space, and `flex-shrink` will come into play.

### What are the other ways to distribute space?

If you do not want space added to the items, remember that you can manage free space between or around items using the alignment properties described in the guide for aligning items in a flex container. The `justify-content` property will enable the distribution of free space between or around items. You can also use auto margins on flex items to absorb space and create gaps between items.

With all these flex properties available to you, you will find that most layout tasks are possible, although it might take a little bit of experimentation at first.

---
title: "Mastering wrapping of flex items (part 2 of 2)"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/guides/flexible_box_layout/wrapping_items/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Mastering wrapping of flex items (part 2 of 2)

## Collapsed items

The flexbox specification details what should happen if a flex item is collapsed by setting `visibility: collapse` on an item. See the MDN documentation for the `visibility` property. The specification describes the behavior as follows:

> "Specifying `visibility: collapse` on a flex item causes it to become a _collapsed flex item_, producing an effect similar to `visibility: collapse` on a table-row or table-column: the collapsed flex item is removed from rendering entirely, but leaves behind a "strut" that keeps the flex line's cross-size stable. Thus, if a flex container has only one flex line, dynamically collapsing or uncollapsing items may change the flex container's main size, but is guaranteed to have no effect on its cross size and won't cause the rest of the page's layout to "wobble". Flex line wrapping _is_ re-done after collapsing, however, so the cross-size of a flex container with multiple lines might or might not change." - Collapsed items

This behavior is useful if you want to target flex items using JavaScript to show and hide content for example. The example in the specification demonstrates one such pattern.

In the following live example, the non-wrapping flex container contains a row with three flex items that are set to flex to equal sizes. The third item has multiple lines of content, growing the container. The default for `align-items` is `normal`; for flex items, `normal` behaves as `stretch`, so all the items stretch by default, filling the container's cross-size height.

The item creating the cross-size is set to `visibility: collapse`, which collapses or hides the flex item, depending on the browser. In either case, the flex container retains a _strut_ of the cross-size even though it is not visible. This way, if the item is made visible, the cross-size of the single-line flex container will not change. If you remove `visibility: collapse` from the CSS or change the value to `visible`, you will see the item appear, and the main-size space is redistributed between non-collapsed items, while the cross-size remains unchanged.

> **Note:**
> Use Firefox for the example below as other common browsers treat `collapse` as `hidden`.

```html
<p>
  <label><input type="checkbox" /> Toggle <code>visibility</code> value</label>
</p>
```

```html
<div class="box">
  <div>One</div>
  <div>Two</div>
  <div class="collapse">Three <br />has <br />extra <br />text</div>
</div>
```

```css
.box {
  border: 2px dotted rgb(96 139 168);
  display: flex;
  width: 600px;
}
.box > * {
  flex: 1 1 200px;
  border: 2px solid rgb(96 139 168);
  border-radius: 5px;
  background-color: rgb(96 139 168 / 0.2);
}
.collapse {
  visibility: collapse;
}
```

```css
p:has(:checked) + div .collapse {
  visibility: visible;
}
```

The above was a single-line, non-wrapping flex container with a set size of `600px` so whether the item is visible or collapsed, the width is the same. It is important to understand that while the container retains a strut of the collapsed item's cross-size, the main size is not preserved. Multi-line flex containers rewrap their items after removing collapsed items from rendering. The new space that a collapsed item leaves in the main direction may cause non-collapsed items to be placed in a different line than if the item were not collapsed. Because each line is laid out like an independent single-line flex container and its composition may change after collapsing, its cross-axis size may change too.

The following example shows this behavior. The third flex item is collapsed, so it occupies zero space along the main axis (the inline-size is `0`). When collapsed, its strut is on the first row after the fourth item, with the first row being tall enough to fit the three lines of text that the third item would have had. Then, if you uncollapse the item (e.g., by removing the `collapse` class), there is no longer enough horizontal space for the fifth item on the first row, and it moves to the second. This causes the second row to grow to fit the two lines of text of its new member, and the last flex item is pushed onto a new row. With a taller second line and a new third line, the flex container is much taller than it was before.

> **Note:**
> Use Firefox for the example below as other common browsers treat `collapse` as `hidden`.

```html
<p>
  <label><input type="checkbox" /> Toggle <code>visibility</code> value</label>
</p>
```

```html
<div class="box">
  <div>One</div>
  <div>Two is the width of this sentence.</div>
  <div class="collapse">Three <br />is <br />five <br />lines <br />tall.</div>
  <div>Four</div>
  <div>Five<br />Five</div>
  <div>Six</div>
  <div>Seven</div>
  <div>Eight</div>
  <div>Nine</div>
  <div>Ten</div>
  <div>Eleven is longer</div>
</div>
```

```css
.box {
  border: 2px dotted rgb(96 139 168);
  width: 500px;
  display: flex;
  flex-wrap: wrap;
}
.box > * {
  padding: 10px;
  border: 2px solid rgb(96 139 168);
  border-radius: 5px;
  background-color: rgb(96 139 168 / 0.2);
  flex: 1 1 auto;
  min-width: 50px;
}
.collapse {
  visibility: collapse;
}
```

```css
p:has(:checked) + div .collapse {
  visibility: visible;
}
```

If this causes a problem for your layout, it may require a rethinking of the structure, for example, putting each row into a separate flex container so that they can't shift rows.

### Using `visibility: hidden` and `display: none`

In the previous live examples, try using `visibility: hidden` or `display: none` instead of `visibility: collapse`. Using `visibility: hidden`, the item is made invisible, but the box is kept in the formatting structure, so it still behaves as if it were part of the layout.
When you use `display: none`, the item is completely removed from the formatting structure. Not only is it invisible but the structure is removed as well. This means counters ignore it and things like transitions do not run.

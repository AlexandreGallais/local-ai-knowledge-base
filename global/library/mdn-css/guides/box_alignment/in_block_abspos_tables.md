---
title: "Box alignment for block, absolutely positioned, and table layouts"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/guides/box_alignment/in_block_abspos_tables/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Box alignment for block, absolutely positioned, and table layouts

The CSS box alignment module details how alignment works in various layout methods. In this guide, we explore how box alignment works in the context of block layout, including floated, positioned, and table elements. As this guide aims to detail things which are specific to block layout and box alignment, it should be read in conjunction with the box alignment guide, which details the common features of box alignment across layout methods.

## align-content and justify-content

The `justify-content` property does not apply to block containers or table cells.

The `align-content` property applies to the block axis in order to align the contents of the box within its container. If a content distribution method such as `space-between`, `space-around` or `space-evenly` is requested then the fallback alignment will be used, as the content is treated as a single alignment subject.

## justify-self

The `justify-self` property is used to align an item inside its containing block on the inline axis.

This property does not apply to floated elements or table cells.

## align-self

The `align-self` property does not apply to block-level boxes (including floats), because there is more than one item in the block axis. It also does not apply to table cells.

### Absolutely positioned elements

The alignment container is the positioned block, accounting for the offset values of top, left, bottom, and right. The normal keyword resolves to `stretch`, unless the positioned item is a replaced element, in which case it resolves to `start`.

## Aligning in these layout methods today

As we do not currently have browser support for box alignment in block layout, your options for alignment are either to use one of the existing alignment methods or, to make even a single item inside a container a flex item in order to use the alignment properties as specified in flexbox.

Alignment of blocks horizontally prior to flexbox was typically achieved by way of setting auto margins on the block. A `margin` of `auto` will absorb all available space in that dimension, therefore setting a left and right margin of auto, you can push a block into the center:

```css
.container {
  width: 20em;
  margin-left: auto;
  margin-right: auto;
}
```

In table layout, you have access to the `vertical-align` property to align the contents of a cell inside that cell.

For many use cases, turning the block container into a flex item will give you the alignment capability that you are looking for. In the example below, a container with a single item inside has been turned into a flex container for the purpose of being able to use the alignment properties.

```html
<div class="box">
  <div></div>
</div>
```

```css
.box {
  height: 300px;
  border: 2px dotted rgb(96 139 168);
}

.box > * {
  border: 2px solid rgb(96 139 168);
  border-radius: 5px;
  background-color: rgb(96 139 168 / 0.2);
}
.box {
  display: flex;
  align-items: center;
  justify-content: center;
}

.box div {
  width: 100px;
  height: 100px;
}
```

## See also

- CSS box alignment module
- Box alignment overview
- Box alignment in flexbox
- Box alignment in CSS grid layout
- Box alignment in multiple-column layout

---
title: "Box alignment in multi-column layout"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/guides/box_alignment/in_multi-column_layout/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Box alignment in multi-column layout

The CSS box alignment module details how alignment works in various layout methods; in this guide, we explore how box alignment works in the context of multi-column layout. As this guide aims to detail things that are specific to both modules, it should be read in conjunction with the box alignment overview guide, which details the common features of box alignment across layout methods.

In multi-column layout, the alignment container is the content box of the multicol container. The alignment subject is the column box. The properties which apply to multi-column layouts are detailed below.

## align-content and justify-content

The `align-content` property applies to the block axis and `justify-content` to the inline axis. Any spacing added to the columns due to use of space distribution will be added to the gap between the columns, therefore making the gap larger than might be specified by the `column-gap` (or `gap` shorthand) property.

Using a value of `justify-content` other than `normal` or `stretch` will cause column boxes to display at the `column-width` specified on the multicol container, and the remaining space distributed according to the value of `justify-content`.

## column-gap

The `column-gap` property was originally specified in the multiple-column layout specification and then later unified with the gap properties for other layout methods in box alignment. While other layout methods treat the initial value of `column-gap` as `0`, multi-column layout treats it as `1em` — you generally want a gap between columns.

## See also

- CSS box alignment module
- Box alignment overview
- Box alignment in flexbox
- Box alignment in grid layout
- Box alignment for block, absolutely positioned, and table layouts

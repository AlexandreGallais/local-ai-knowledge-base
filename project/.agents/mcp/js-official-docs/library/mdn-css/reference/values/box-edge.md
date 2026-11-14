---
title: "`<box-edge>` CSS type"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/values/box-edge/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `<box-edge>` CSS type

The **`<box-edge>`** value types represent a box edge keyword, such as `content-box` and `border-box`. The box-edge keywords are used to define different aspects of an element's box model and how elements are positioned and rendered on screen.

The box-edge keywords are the components of, but not limited to, the data types `<visual-box>`, `<layout-box>`, `<paint-box>`, `<coord-box>`, and `<geometry-box>`. These types are applied to properties such as `transform-box` and `background-clip`.

## Syntax

```plain
<visual-box> = content-box | padding-box | border-box /* the three <box> values */
<layout-box> or <shape-box> = <visual-box> | margin-box
<paint-box> = <visual-box> | fill-box | stroke-box
<coord-box> = <paint-box> | fill-box | stroke-box | view-box
<geometry-box> = <shape-box> | fill-box | stroke-box | view-box
```

### Values

A `<box-edge>` can be of the type `<visual-box>`, `<layout-box>`, `<paint-box>`, `<coord-box>`, or `<geometry-box>`.

- `<visual-box>`
    Refers to the rectangular box generated for an element as seen by a user on a web page. It includes the element's content, padding, and border. Also referred to as `<box>`, this value excludes the margin area. This value type is used for the `background-clip` and `overflow-clip-margin` properties.

- `<layout-box>`
    Refers to the space occupied by an element, including its content, padding, border, and margin. This value type is used for layout and positioning purposes. Also referred to as `<shape-box>`, this value type is used for the `shape-outside` property.

- `<paint-box>`
    Refers to the area within the layout box that is used to visually render the content. This includes the area where the element's background and borders are painted. As an element's paintable area does not include its margins, this value excludes `margin-box`.

- `<coord-box>`
    Refers to the coordinate box used for positioning and sizing an element within its parent container. It is used to control how content flows around the edges of the box. It excludes the margin area. This value type is used for the `offset-path` property.

- `<geometry-box>`
    Defines the reference box for a basic shape, or if specified by itself, causes the edges of the specified box, including any corner shaping (such as a `border-radius`), to be the clipping path. This value type is used for the `clip-path`, `mask-clip`, and `mask-origin` properties and the SVG `clip-path` attribute; it is also used as part of the `border-shape` property values.

### Keywords

The `<box-edge>` keywords are defined as follows:

- `content-box`
    Refers to the outer edge of the box's content area. The content box is the innermost box. The content area contains the actual content, such as text, images, or other HTML elements. In SVG, this value is treated as `fill-box`.

- `padding-box`
    Refers to the outer edge of the padding of the box. If there is no padding on a side, then the value is the same as `content-box`. In SVG, `padding-box` is treated as `fill-box`. The padding area surrounds the content area, starting at the outer edge of the content box.

- `border-box`
    Refers to the outer edge of the border of the box. If there is no border on a side, then the value is the same as `padding-box`. In SVG, `border-box` is treated as `stroke-box`. The border area surrounds the padding area, starting at the outer edge of the padding box.

- `half-border-box`
    Refers to a box shape that traverses the center of the border region; the inner half of the border region is inside the shape, and the outer half of the border region is outside the shape.

- `margin-box`
    Refers to the outer edge of the margin of the box. If there is no margin on a side, then the value is the same as `border-box`. In SVG, `margin-box` is treated as `stroke-box`.

- `fill-box`
    Refers to the object bounding box in SVG. In CSS, `fill-box` is treated as `content-box`. It is used to wrap the content around the edges defined by the `coord-box` values.

- `stroke-box`
    Refers to the stroke bounding box in SVG. In CSS, `stroke-box` is treated as `border-box`. It is used to define the shape of the element when strokes are applied.

- `view-box`
    Refers to the nearest SVG viewport element's origin box. The origin box is a rectangle with the width and height of the initial SVG user coordinate system established by the `viewBox` attribute for that element. The origin box is positioned such that its top left corner is anchored at the coordinate system origin. In CSS, `view-box` is treated as `border-box`.
    > **Note:**
    > When the SVG viewport is not anchored at the origin, the origin box does not correspond to the SVG viewport.

## See also

- CSS box model module

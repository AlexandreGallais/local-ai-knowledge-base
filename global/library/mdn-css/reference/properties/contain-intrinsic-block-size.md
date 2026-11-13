---
title: "`contain-intrinsic-block-size` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/contain-intrinsic-block-size/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `contain-intrinsic-block-size` CSS property

The **`contain-intrinsic-block-size`** CSS logical property defines the block size of an element that a browser can use for layout when the element is subject to size containment.

Block size is the size of an element in the dimension perpendicular to the flow of text within a line. In a horizontal writing mode like standard English, block size is the vertical dimension (height); in a vertical writing mode, block size is the horizontal dimension.

## Syntax

```css
/* Keyword value */
contain-intrinsic-block-size: none;

/* <length> values */
contain-intrinsic-block-size: 1000px;
contain-intrinsic-block-size: 10rem;

/* auto <length> */
contain-intrinsic-block-size: auto 300px;

/* Global values */
contain-intrinsic-block-size: inherit;
contain-intrinsic-block-size: initial;
contain-intrinsic-block-size: revert;
contain-intrinsic-block-size: revert-layer;
contain-intrinsic-block-size: unset;
```

### Values

The following values can be specified for the intrinsic block size of an element:

- `none`
    The element has no intrinsic block size.
- `<length>`
    The element has the specified block size, expressed using the (`<length>`) data type.
- `auto <length>`
    When the element is in size containment and skipping its contents (for example, when it is offscreen and `content-visibility: auto` is set) the block size is remembered from the actual size of the element when it was last able to render its child elements.
    If the element has never rendered its child elements and hence has no remembered value for the normally rendered element size, or if it is not skipping its contents, the block size is the specified `<length>`.

## Description

The property is commonly applied alongside elements that can trigger size containment, such as `contain: size` and `content-visibility`.

Size containment allows a user agent to lay out an element as though it had a fixed size.
This prevents unnecessary reflows by avoiding the re-rendering of child elements to determine the actual size (thereby improving user experience).
By default, size containment treats elements as though they had no contents and may collapse the layout in the same way as if the contents had no width or height.
The `contain-intrinsic-block-size` property allows authors to specify an appropriate value to be used as the block-size for layout.

The `auto <length>` value allows the block-size of an element to be stored if the element is ever "normally rendered" (with its child elements) and then used instead of the specified value when the element does not have any content.
This allows offscreen elements with `content-visibility: auto` to benefit from size containment without developers having to be precise in their estimates of element size.
The remembered value is not used if the child elements are being rendered; if size containment is enabled, the `<length>` value will be used.

## Examples

### Setting the intrinsic block size

The HTML below defines an element "contained_element" that will be subject to size constraint, and which contains a child element.

```html
<div id="contained_element">
  <div class="child_element"></div>
</div>
```

The CSS below sets the `content-visibility` of `contained_element` to `auto`, so if the element is hidden it will be size constrained.
The intrinsic block size and inline size that are used when it is size constrained are set at the same time using `contain-intrinsic-block-size` and `contain-intrinsic-inline-size`, respectively.

```css
#contained_element {
  border: 2px solid green;
  inline-size: 151px;
  content-visibility: auto;
  contain-intrinsic-inline-size: 152px;
  contain-intrinsic-block-size: 52px;
}
.child_element {
  border: 1px solid red;
  background: blue;
  block-size: 50px;
  inline-size: 150px;
}
```

## See also

- content-visibility: the new CSS property that boosts your rendering performance (web.dev)
- `contain-intrinsic-inline-size`
- `contain-intrinsic-size`
- `contain-intrinsic-width`
- `contain-intrinsic-height`

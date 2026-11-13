---
title: "`contain-intrinsic-width` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/contain-intrinsic-width/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `contain-intrinsic-width` CSS property

The **`contain-intrinsic-width`** CSS property sets the width of an element that a browser will use for layout when the element is subject to size containment.

## Syntax

```css
/* Keyword value */
contain-intrinsic-width: none;

/* <length> values */
contain-intrinsic-width: 1000px;
contain-intrinsic-width: 10rem;

/* auto <length> */
contain-intrinsic-width: auto 300px;

/* Global values */
contain-intrinsic-width: inherit;
contain-intrinsic-width: initial;
contain-intrinsic-width: revert;
contain-intrinsic-width: revert-layer;
contain-intrinsic-width: unset;
```

### Values

The following values may be specified for an element.

- `none`
    The element has no intrinsic width.
- `<length>`
    The element has the specified width (`<length>`).
- `auto <length>`
    A remembered value of the "normally rendered" element width if one exists and the element is skipping its contents (for example, when it is offscreen); otherwise the specified `<length>`.

## Description

The property is commonly applied alongside elements that can trigger size containment, such as `contain: size` and `content-visibility`, and may also be set using the `contain-intrinsic-size` shorthand property.

Size containment allows a user agent to lay out an element as though it had a fixed size, preventing unnecessary reflows by avoiding the re-rendering of child elements to determine the actual size (thereby improving user experience).
By default, size containment treats elements as though they had no contents, and may collapse the layout in the same way as if the contents had no width or height.
The `contain-intrinsic-width` property allows authors to specify an appropriate value to be used as the width for layout.

The `auto <length>` value allows the width of the element to be stored if the element is ever "normally rendered" (with its child elements), and then used instead of the specified width when the element is skipping its contents.
This allows offscreen elements with `content-visibility: auto` to benefit from size containment without developers having to be as precise in their estimates of element size.
The remembered value is not used if the child elements are being rendered (if size containment is enabled, the `<length>` will be used).

## Examples

In addition to the example below, the `contain-intrinsic-size` page contains a live example that demonstrates the effect of modifying the intrinsic width and height.

### Setting the intrinsic width

The HTML below defines an element "contained_element" that will be subject to size constraint, and which contains a child element.

```html
<div id="contained_element">
  <div class="child_element"></div>
</div>
```

The CSS below sets the `content-visibility` of `contained_element` to `auto`, so if the element is hidden it will be size constrained.
The width and height that are used when it is size constrained are set at the same time using `contain-intrinsic-width` and `contain-intrinsic-height`, respectively.

```css
#contained_element {
  border: 2px solid green;
  width: 151px;
  content-visibility: auto;
  contain-intrinsic-width: 152px;
  contain-intrinsic-height: 52px;
}
.child_element {
  border: 1px solid red;
  background: blue;
  height: 50px;
  width: 150px;
}
```

## See also

- content-visibility: the new CSS property that boosts your rendering performance (web.dev)
- `contain-intrinsic-size`
- `contain-intrinsic-height`
- `contain-intrinsic-block-size`
- `contain-intrinsic-inline-size`

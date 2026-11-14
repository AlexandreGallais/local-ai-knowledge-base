---
title: "display"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/svg/reference/attribute/display/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# display

The **`display`** attribute lets you control the rendering of graphical or container elements.

A value of `display="none"` indicates that the given element and its children will not be rendered. Any value other than `none` or `inherit` indicates that the given element will be rendered by the browser.

When applied to a container element, setting `display` to `none` causes the container and all of its children to be invisible; thus, it acts on groups of elements as a group. This means that any child of an element with `display="none"` will never be rendered even if the child has a value for `display` other than `none`.

When the `display` attribute is set to `none`, then the given element does not become part of the rendering tree. It has implications for the `<tspan>` elements, event processing, for bounding box calculations and for calculation of clipping paths:

- If `display` is set to `none` on a `<tspan>` element, then the text string is ignored for the purposes of text layout.
- Regarding events, if `display` is set to `none`, the element receives no events.
- The geometry of a graphics element with `display` set to `none` is not included in bounding box and clipping paths calculations.

The `display` attribute only affects the direct rendering of a given element, whereas it does not prevent elements from being referenced by other elements. For example, setting it to `none` on a `` element will prevent that element from getting rendered directly onto the canvas, but the `` element can still be referenced by a `<textPath>` element; furthermore, its geometry will be used in text-on-a-path processing even if the `` has a `display` value of `none`.

This attribute also affects direct rendering into offscreen canvases, such as occurs with masks or clip paths. Thus, setting `display="none"` on a child of a `<mask>` will prevent the given child element from being rendered as part of the mask. Similarly, setting `display="none"` on a child of a `<clipPath>` element will prevent the given child element from contributing to the clipping path.

> **Note:**
> As a presentation attribute, `display` also has a CSS property counterpart: `display`. When both are specified, the CSS property takes priority.

You can use this attribute with any SVG element.

## Example

```css
html,
body,
svg {
  height: 100%;
}
```

```html
<svg viewBox="0 0 220 100" xmlns="http://www.w3.org/2000/svg">
  <!-- Here the yellow rectangle is displayed -->
  <rect x="0" y="0" width="100" height="100" fill="skyblue"></rect>
  <rect x="20" y="20" width="60" height="60" fill="yellow"></rect>

  <!-- Here the yellow rectangle is not displayed -->
  <rect x="120" y="0" width="100" height="100" fill="skyblue"></rect>
  <rect
    x="140"
    y="20"
    width="60"
    height="60"
    fill="yellow"
    display="none"></rect>
</svg>
```

## Usage notes

       | Default value
       | `inline`

       | Value
       | See `display`

       | Animatable
       | Yes

For a description of the values, please refer to the CSS `display` property.

## See also

- `visibility` attribute
- CSS `display` property

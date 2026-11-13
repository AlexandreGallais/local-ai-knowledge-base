---
title: "text-overflow"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/svg/reference/attribute/text-overflow/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# text-overflow

The SVG **`text-overflow`** attribute specifies how text content block elements render when text overflows line boxes. This can happen, for example, when the `white-space` attribute or CSS `white-space` property has the value `nowrap`. The property does not apply to pre-formatted text or text situated on a path.

In SVG, `text-overflow` has an effect if there is a validly specified wrapping area, regardless of the computed value of the `overflow` property on the text content block element. The effect is purely visual: clipped text is not removed from the DOM, and any ellipsis, if presented, does not itself become part of the DOM. For all the DOM methods, it is as if `text-overflow` was not applied, and as if the wrapping area did not constrain the text.

> **Note:**
> As a presentation attribute, `text-overflow` also has a CSS property counterpart: `text-overflow`. When both are specified, the CSS property takes priority.

## Usage notes

       | Value
       | `clip` | `ellipses`

       | Default value
       | `clip`

       | Animatable
       | No

- `clip`
    Any text that overflows the wrapping area is clipped. Characters may be partially rendered. This is the default value.
- `ellipsis`
    If the text to be rendered overflows the wrapping area, the text is clipped and an ellipsis is rendered such that it fits within the given area.

For more information, refer to the CSS `text-overflow` property.

## See also

- CSS `text-overflow` property

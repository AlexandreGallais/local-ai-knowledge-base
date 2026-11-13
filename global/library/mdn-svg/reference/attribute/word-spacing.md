---
title: "word-spacing"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/svg/reference/attribute/word-spacing/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# word-spacing

The **`word-spacing`** attribute specifies spacing behavior between words.

If a `length` is provided without a unit identifier (e.g., an unqualified number such as 128), the browser processes the \<length> as a width value in the current user coordinate system.

If a \<length> is provided with one of the unit identifiers (e.g., .25em or 1%), then the browser converts the \<length> into a corresponding value in the current user coordinate system.

> **Note:**
> As a presentation attribute, `word-spacing` also has a CSS property counterpart: `word-spacing`. When both are specified, the CSS property takes priority.

## Elements

You can use this attribute with the following SVG elements:

- `<text>`
- `<textPath>`
- `<tspan>`

## Examples

This example includes two `<text>` elements with different `word-spacing` values.

```css
html,
body,
svg {
  height: 100%;
}
```

```html
<svg viewBox="0 0 250 50" xmlns="http://www.w3.org/2000/svg">
  <text y="20" word-spacing="4">Bigger spacing between words</text>
  <text x="0" y="40" word-spacing="-0.5">Smaller spacing between words</text>
</svg>
```

## Usage notes

       | Value
       | `normal` | `length`

       | Animatable
       | Yes

       | Default values
       | `normal`

For a description of the values, please refer to the CSS `letter-spacing` property.

## See also

- CSS `word-spacing` property

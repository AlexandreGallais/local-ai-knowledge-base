---
title: "<desc>"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/svg/reference/element/desc/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# <desc>

The **`<desc>`** SVG element provides an accessible, long-text description of any SVG container element or graphics element.

Text in a `<desc>` element is not rendered as part of the graphic. If the element can be described by visible text, it is possible to reference that text with the `aria-describedby` attribute. If `aria-describedby` is used, it will take precedence over `<desc>`.

The hidden text of a `<desc>` element can also be concatenated with the visible text of other elements using multiple IDs in an `aria-describedby` value. In that case, the `<desc>` element must provide an ID for reference.

## Attributes

This element only includes global attributes.

## DOM Interface

This element implements the `SVGDescElement` interface.

## Example

```css
html,
body,
svg {
  height: 100%;
}
```

```html
<svg viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg">
  <circle cx="5" cy="5" r="4">
    <desc>
      I'm a circle and that description is here to demonstrate how I can be
      described, but is it really necessary to describe a simple circle like me?
    </desc>
  </circle>
</svg>
```

## See also

- `<title>`

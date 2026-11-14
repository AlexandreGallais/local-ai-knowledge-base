---
title: "<title> — the SVG accessible name element"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/svg/reference/element/title/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# <title> — the SVG accessible name element

The **`<title>`** SVG element provides an accessible, short-text description of any SVG container element or graphics element.

Text in a `<title>` element is not rendered as part of the graphic, but browsers usually display it as a tooltip. If an element can be described by visible text, it is recommended to reference that text with an `aria-labelledby` attribute rather than using the `<title>` element.

> **Note:**
> For backward compatibility with SVG 1.1, `<title>` elements should be the first child element of their parent.

## Attributes

This element only includes global attributes.

## DOM Interface

This element implements the `SVGTitleElement` interface.

## Example

```css
html,
body,
svg {
  height: 100%;
}
```

```html
<svg viewBox="0 0 20 10" xmlns="http://www.w3.org/2000/svg">
  <circle cx="5" cy="5" r="4">
    <title>I'm a circle</title>
  </circle>

  <rect x="11" y="1" width="8" height="8">
    <title>I'm a square</title>
  </rect>
</svg>
```

## See also

- `<desc>`

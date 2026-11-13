---
title: "`<font>` HTML font element"
tool: "mdn-html"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/html/reference/elements/font/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `<font>` HTML font element

The **``** HTML element defines the font size, color and face for its content.

> **Warning:**
> Do not use this element. Use the CSS Fonts properties to style text.

## Attributes

Like all other HTML elements, this element supports the global attributes.

- `color` (deprecated) (non-standard)
    This attribute sets the text color using either a named color or a color specified in the hexadecimal #RRGGBB format.
- `face` (deprecated) (non-standard)
    This attribute contains a comma-separated list of one or more font names. The document text in the default style is rendered in the first font face that the client's browser supports. If no font listed is installed on the local system, the browser typically defaults to the proportional or fixed-width font for that system.
- `size` (deprecated) (non-standard)
    This attribute specifies the font size as either a numeric or relative value. Numeric values range from `1` to `7` with `1` being the smallest and `3` the default. It can be defined using a relative value, like `+2` or `-3`, which sets it relative to `3`, the default value.

## DOM interface

This element implements the `HTMLFontElement` interface.

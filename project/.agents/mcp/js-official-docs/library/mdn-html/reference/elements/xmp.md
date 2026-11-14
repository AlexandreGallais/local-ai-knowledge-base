---
title: "`<xmp>` HTML plain text rendering element"
tool: "mdn-html"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/html/reference/elements/xmp/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `<xmp>` HTML plain text rendering element

## Summary

The **`<xmp>`** HTML element renders text between the start and end tags without interpreting the HTML in between and using a monospaced font. The HTML2 specification recommended that it should be rendered wide enough to allow 80 characters per line.

> **Note:**
> Do not use this element.
>
> - It has been deprecated since HTML3.2 and was not implemented in a consistent way. It was completely removed from current HTML.
> - Use the `<pre>` element or, if semantically adequate, the `<code>` element instead. Note that you will need to escape the `<` character as `<` and the `&` character as `&` to make sure they are not interpreted as markup.
> - A monospaced font can also be obtained on any element, by applying an adequate CSS style using `monospace` as the generic-font value for the `font-family` property.

## Attributes

This element has no other attributes than the global attributes, common to all elements.

## DOM interface

This element implements the `HTMLElement` interface.

## See also

- The `<pre>` and `<code>` elements to be used instead.
- The `<plaintext>` element, similar to `<xmp>` but also obsolete.

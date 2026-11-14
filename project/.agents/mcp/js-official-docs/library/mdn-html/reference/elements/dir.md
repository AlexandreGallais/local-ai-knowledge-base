---
title: "`<dir>` HTML directory element"
tool: "mdn-html"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/html/reference/elements/dir/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `<dir>` HTML directory element

The **`<dir>`** HTML element is used as a container for a directory of files and/or folders, potentially with styles and icons applied by the user agent. Do not use this obsolete element; instead, you should use the `` element for lists, including lists of files.

> **Warning:**
> Do not use this element. Though present in early HTML specifications, it has been deprecated in HTML 4, and has since been removed entirely.

## DOM interface

This element implements the `HTMLDirectoryElement` interface.

## Attributes

Like all other HTML elements, this element supports the global attributes.

- `compact` (deprecated) (non-standard)
    This Boolean attribute hints that the list should be rendered in a compact style. The interpretation of this attribute depends on the user agent and it doesn't work in all browsers.

## See also

- Other list-related HTML Elements: ``, ``, ``, and `<menu>`;
- CSS properties that may be specially useful to style the `<dir>` element:
  - The `list-style` property, useful to choose the way the ordinal is displayed.
  - CSS counters, useful to handle complex nested lists.
  - The `line-height` property, useful to simulate the deprecated `compact` attribute.
  - The `margin` property, useful to control the indent of the list.

---
title: "CSS paged media"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/guides/paged_media/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSS paged media

The **CSS paged media** module defines the properties that control the presentation of content for print or any other media that splits content into discrete pages. It allows you to set page breaks, control printable areas, and style left and right pages differently.

The CSS paged media module specifies how pages are generated and laid out to hold fragmented content in a paged presentation, including content that is printed or represented as a print preview. The module defines functionality for controlling page margins, size, orientation, and headers and footers. It extends generated content to provide functionality for generating page numbers and running headers and footers.

The process of paginating content into generated pages and controlling breaks inside elements is covered in the CSS fragmentation module.

## Reference

### Properties

- `page`

### At-rules and descriptors

- `@page`
  - `page-orientation` descriptor
  - `size` descriptor
  - Margin descriptors
- Margin at-rules

The CSS paged media module also introduces the `bleeds` and `marks` descriptors of the `@page` at-rule. Currently, no browsers support these features.

### Selectors

- `:blank`
- `:first`
- `:left`
- `:right`

## Guides

- Printing
    Tips and techniques for helping improve web content printer output.

## Related concepts

- CSS fragmentation module
  - `break-after` property
  - `break-before` property
  - `break-inside` property
  - `orphans` property
  - `widows` property

## See also

- CSS fragmentation module
- CSS media queries module

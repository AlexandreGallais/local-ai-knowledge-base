---
title: "CSSOM view"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/guides/cssom_view/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSSOM view

The **CSSOM view** module lets you manipulate the visual view of a document, including getting the position of element layout boxes, obtaining the width or height of the viewport through script, and also scrolling an element.

## Reference

### Events

- `Window` events:
  - `resize`
- `VisualViewport` events:
  - `resize`
  - `scroll`
  - `scrollend`
- `Document` events
  - `scroll`
  - `scrollend`
- `Element` events
  - `scroll`
  - `scrollend`
- `MediaQueryList` events
  - `change`

### Glossary terms

- Viewport
- Layout viewport
- Visual viewport

### API

For the JavaScript API defined by this module, see the CSSOM view API documentation.

## Guides

- Coordinate systems
    The coordinate systems used to specify a position in a display context such as a window on a monitor, a viewport on a mobile device, or a position on a sheet of paper when printing.
- Viewport concepts
    The concept of the viewport — what it is, its impact in terms of CSS, SVG, and mobile devices — and the difference between the visual viewport and the layout viewport.

## Related concepts

- `zoom`
- `<meta>`

### Glossary terms

- CSS object model (CSSOM)
- CSS pixel
- Scroll container

## See also

- CSS Object Model (CSSOM) API
- CSSOM view API
- CSS viewport module
- CSS overflow module
- CSS overscroll behavior module
- CSS scroll snap module

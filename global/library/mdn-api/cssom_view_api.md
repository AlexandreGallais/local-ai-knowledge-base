---
title: "CSSOM view API"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/cssom_view_api/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSSOM view API

The **CSSOM view API** lets you manipulate the visual view of a document, including getting the position of element layout boxes, obtaining the width or height of the viewport through script, and also scrolling an element.

## Guides

- Coordinate systems
    The coordinate systems used to specify a position in a display context such as a window on a monitor, a viewport on a mobile device, or a position on a sheet of paper when printing.
- Viewport concepts
    The concept of the viewport — what it is, its impact in terms of CSS, SVG, and mobile devices — and the difference between the visual viewport and the layout viewport.

## Interfaces

- `MediaQueryList`
- `MediaQueryListEvent`
- `Screen`
- `CaretPosition`
- `VisualViewport`

## Extensions to other interfaces

This module adds properties, methods, and events to interfaces defined in other specifications.

### Extensions to Window

- `devicePixelRatio`
- `innerHeight`
- `innerWidth`
- `matchMedia()`
- `moveBy()`
- `moveTo()`
- `outerHeight`
- `outerWidth`
- `pageXOffset` (see `scrollX`)
- `pageYOffset` (see `scrollY`)
- `resizeBy()`
- `resizeTo()`
- `screen`
- `screenLeft`
- `screenTop`
- `screenX`
- `screenY`
- `visualViewport`
- `scroll()`
- `scrollBy()`
- `scrollTo()`
- `scrollX`
- `scrollY`
- `resize` event

### Extensions to Document

- `elementFromPoint()`
- `caretPositionFromPoint()`
- `scrollingElement`
- `scroll` event
- `scrollend` event

### Extensions to Element

- `checkVisibility()`
- `clientHeight`
- `clientLeft`
- `clientTop`
- `clientWidth`
- `currentCSSZoom`
- `getBoundingClientRect()`
- `getClientRects()`
- `scroll()`
- `scrollBy()`
- `scrollHeight`
- `scrollIntoView()`
- `scrollLeft`
- `scrollTo()`
- `scrollTop`
- `scrollWidth`
- `scroll` event
- `scrollend` event

### Extensions to HTMLElement

- `offsetHeight`
- `offsetLeft`
- `offsetParent`
- `offsetTop`
- `offsetWidth`

### Extensions to HTMLImageElement

- `x`
- `y`

### Extensions to Range

- `getBoundingClientRect()`
- `getClientRects()`

### Extensions to MouseEvent

- `clientX`
- `clientY`
- `offsetX`
- `offsetY`
- `pageX`
- `pageY`
- `screenY`
- `x`
- `y`

This module defines geometric utility methods that apply to the `Text`, `Element`, `CSSPseudoElement`, and `Document` interfaces. These `GeometryUtils` features are not yet implemented in any browser.

## See also

- CSS Object Model (CSSOM) API
- CSSOM view module
- CSS overflow module
- CSS overscroll behavior module
- CSS scroll snap module
- Viewport
- Layout viewport
- Visual viewport
- `zoom`
- CSSOM
- CSS pixel
- Scroll container
- `<meta>`

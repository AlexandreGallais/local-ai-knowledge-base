---
title: "CSS viewport"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/guides/viewport/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSS viewport

The **CSS viewport** module enables specifying the size, zoom factor, and orientation of the user-agent's initial containing block, or _viewport_.

Content designed for large viewports may exhibit a variety of bugs when viewed in smaller viewports, including unintended wrapping, clipped content, and incorrectly sized scroll containers. HTML provides a viewport meta tag, `<meta name="viewport">`, to provide hints about the initial size of the viewport. If the site isn't designed to work well on small viewports and this tag is omitted, some mobile browsers render the site using a fixed initial containing block width, typically `980px`. The content is then scaled down, making the CSS pixel size smaller than an actual pixel. The resulting page fits into the available screen space but is illegible, requiring the user to zoom and pan to view the content.

The viewport initial containing block for continuous media has the dimensions of the viewport. Since the viewport is generally no larger than the display, devices with smaller displays, such as phones or tablets, typically present a smaller viewport than larger devices like desktops or laptops.

## Reference

### Properties

- `zoom`

### Interfaces

- `Window.Viewport`
- `Viewport`
  - `Viewport.segments`

### Glossary terms and definitions

- Viewport
- Actual viewport
- Initial viewport

## Guides

- Viewport concepts
    The concept of the viewport — what it is, its impact in terms of CSS, SVG, and mobile devices — and the difference between the visual viewport and the layout viewport.

- Using environment variables
    An overview of what environment variables are, browser-defined environment variables, and how to use the `env()` function.

- Using the Viewport Segments API
    Create responsive designs optimized for different viewport segment sizes and arrangements with the API and environment variables.

## Related concepts

- CSS media queries module
  - `@media`
  - `horizontal-viewport-segments` descriptor
  - `vertical-viewport-segments` descriptor

- CSS environment variables
  - `env()`
  - `<environment-variable-name>`

- Device Posture API

## See also

- CSSOM view module

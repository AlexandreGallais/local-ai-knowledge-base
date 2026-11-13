---
title: "CSS media queries"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/guides/media_queries/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSS media queries

The **CSS media queries** module enables testing and querying of viewport values and browser or device features, to conditionally apply CSS styles based on the current user environment. Media queries are used in the CSS `@media` rule and other contexts and languages such as HTML and JavaScript.

Media queries are a key <example-value> of responsive design. They enable conditional setting of CSS styles depending on the presence or value of device characteristics. It's common to use a media query based on viewport size to set appropriate layouts on devices with different screen sizes — for example three columns on a wide screen or a single column on a narrow screen.

Other common examples include increasing the font size and hiding navigation menus when printing a page, adjusting the padding between paragraphs when a page is viewed in portrait or landscape mode, or increasing the size of buttons to provide a larger hit area on touchscreens.

In CSS, use the `@media` at-rule to conditionally apply part of a style sheet based on the result of a media query. To conditionally apply an entire style sheet, use `@import`.

When designing reusable HTML components, you may also use container queries, which allow you to apply styles based on the size of a containing element rather than the viewport or other device characteristics.

## Reference

### At-rules and descriptors

- `@import`
- `@custom-media`
- `@media`
  - `any-hover`
  - `any-pointer`
  - `aspect-ratio`
  - `color`
  - `color-gamut`
  - `color-index`
  - `device-aspect-ratio`
  - `device-height`
  - `device-width`
  - `display-mode`
  - `dynamic-range`
  - `forced-colors`
  - `grid`
  - `height`
  - `horizontal-viewport-segments`
  - `hover`
  - `inverted-colors`
  - `monochrome`
  - `orientation`
  - `overflow-block`
  - `overflow-inline`
  - `pointer`
  - `prefers-color-scheme`
  - `prefers-contrast`
  - `prefers-reduced-data`
  - `prefers-reduced-motion`
  - `prefers-reduced-transparency`
  - `resolution`
  - `scan`
  - `scripting`
  - `update`
  - `vertical-viewport-segments`
  - `video-dynamic-range`
  - `width`

The CSS media queries level 5 module also introduces the `environment-blending`, `nav-controls`, and `video-color-gamut` `@media` descriptors. Currently, no browsers support these features.

> **Note:**
> CSS media queries level 4 deprecated three `@media` descriptors: `device-aspect-ratio`, `device-height`, and `device-width`.

### Data types and operators

- `<media-types>`
- `<media-features>`
- `resolution`
- Logical operators

### Glossary terms

- media
- media query

## Guides

- Using media queries
    Introduces media queries, their syntax, and the operators and media features used to construct media query expressions.

- Learn: Media query fundamentals
    Introduction to media queries and approaches for using them to create responsive designs.

- Testing media queries
    Describes how to use media queries in your JavaScript code to determine the state of a device, and to set up listeners that notify your code when the results of media queries change (such as when the user rotates the screen or resizes the browser).

- Using media queries for accessibility
    Learn how media queries can help users understand your website better.

- Printing
    Tips and techniques for helping improve web content printer output.

- Responsive images
    Learn how to use media queries with `sizes` to implement responsive image solutions on websites.

## Related concepts

- CSS containment module
  - `@container` at-rule
  - Using container queries
  - Using size and style container queries
- CSS conditional rules module
  - `@supports` at-rule
  - Using feature queries
- CSS environment variables
  - `env()` function
- CSS paged media module
  - `@page` at-rule
- CSS object model module
  - `MediaQueryList` interface
    - `matches` property
    - `media` property
    - `change` event
  - `MediaList` interface
    - `mediaText` property
  - `MediaQueryListEvent` object
- Device Posture API
  - `device-posture` descriptor
- HTML
  - `sizes` attribute for ``, `<link>`, and `` for ``
  - `media` attribute for `<link>`, ``, and `<style>` HTML
  - `<meta name="viewport">`
- SVG `media` attribute

## See also

- Container queries
- Using the `srcset` and `sizes` attributes
- CSS paged media
- Use `@supports` to apply styles that depend on browser support for various CSS technologies.

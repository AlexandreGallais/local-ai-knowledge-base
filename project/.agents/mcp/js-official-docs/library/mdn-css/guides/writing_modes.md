---
title: "CSS writing modes"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/guides/writing_modes/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSS writing modes

The **CSS writing modes** module defines support for various international writing modes and their combinations, including left-to-right and right-to-left text ordering as well as horizontal and vertical orientations.

A _writing mode_ in CSS is determined by the `writing-mode`, `direction`, and `text-orientation` properties defined in this module. It is defined primarily in terms of its inline base direction and block flow direction.

Some horizontal languages are left-to-right, including Latin and Indic scripts. Other horizontal languages are written right-to-left, including Hebrew and Arabic scripts. Sometimes text needs to be bidirectional, such as when mixing left-to-right and right-to-left scripts. Some languages can be written with a vertical orientation, for example, Chinese, Japanese, and Korean (CJK) scripts.

The CSS writing modes module addresses the orientations of all writing modes. Other modules, such as the CSS ruby layout module, provide rendering models and formatting controls related to the display text annotations.

## Reference

### Properties

- `direction`
- `glyph-orientation-vertical`
- `text-combine-upright`
- `text-orientation`
- `unicode-bidi`
- `writing-mode`

### Glossary and terms

- Baseline
- Internationalization
- Localization
- Leading

## Guides

- Creating vertical form controls
    The article explains how to use the CSS `writing-mode` and `direction` properties to create and configure vertical form controls.
- Introduction to writing mode systems
    A brief overview of writing mode systems and their directionalities.

## Related concepts

CSS text module

- `hanging-punctuation`
- `hyphens`
- `letter-spacing`
- `line-break`
- `overflow-wrap`
- `text-align`
- `text-align-last`
- `text-indent`
- `text-justify`
- `word-break`
- `word-spacing`

CSS inline layout module

- `alignment-baseline`
- `dominant-baseline`
- `line-height`
- `text-box-edge`
- `text-box-trim`
- `text-box` shorthand
- `text-edge`

CSS logical properties and values module

- Flow relative values
- Inset properties
- Logical properties
- Physical properties

CSS display module

- `display`

- `<display-internal>`
- Visual formatting model

CSS generated content

- `quotes`

SVG

- `glyph-orientation-horizontal` (deprecated)
- `glyph-orientation-vertical` (deprecated)
- `writing-mode`

HTML

- `<bdo>`
- ``
- `<q>`
- `<ruby>`
- ``
- ``
- `dir` attribute
- `lang` attribute

JavaScript

- Internationalization guide
- `Intl` object

## See also

- CSS fonts module
- CSS ruby layout module
- CSS text decoration module
- CSS counter styles module
- CSS lists module
- CSS containment module: `contain-intrinsic-block-size` and `contain-intrinsic-inline-size`
- CSS overflow module: `overflow-block` and `overflow-inline`
- CSS overscroll behavior module: `overscroll-behavior-block` and `overscroll-behavior-inline`

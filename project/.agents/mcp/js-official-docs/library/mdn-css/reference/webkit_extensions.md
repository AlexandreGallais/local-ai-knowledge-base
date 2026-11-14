---
title: "WebKit (-webkit-) vendor-prefixed CSS extensions"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/webkit_extensions/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebKit (-webkit-) vendor-prefixed CSS extensions

A vendor prefix is used to indicate that a feature is specific to a certain browser.
User agents based on WebKit or Blink (such as Safari and Chrome) support several extensions to CSS, which are prefixed with `-webkit-`.

## -webkit-prefixed properties without standard equivalents

> **Note:**
> These properties work in WebKit- or Blink-based browsers except where support notes say otherwise.
> You should avoid using them on production websites.

### A-C

- `-webkit-app-region` (deprecated): No longer supported in Safari.
- `-webkit-border-horizontal-spacing`
- `-webkit-border-vertical-spacing`
- `-webkit-box-reflect`: Supported with `-webkit-` by every browser, for compatibility reasons.
- `-webkit-column-axis`: Not supported in Chrome.
- `-webkit-column-progression`: Not supported in Chrome.
- `-webkit-cursor-visibility`: Not supported in Chrome.

### D-L

- `-webkit-font-smoothing`: See `font-smooth`.
- `-webkit-hyphenate-limit-after`: Not supported in Chrome.
- `-webkit-hyphenate-limit-before`: Not supported in Chrome.
- `-webkit-hyphenate-limit-lines`: Not supported in Chrome.
- `-webkit-line-align`: Not supported in Chrome.
- `-webkit-line-box-contain`: Not supported in Chrome.
- `-webkit-line-grid`: Not supported in Chrome.
- `-webkit-line-snap`: Not supported in Chrome.
- `-webkit-locale`
- `-webkit-logical-height`
- `-webkit-logical-width`

### M

- `-webkit-mask-box-image`: See `mask-border` and `border-image`.
- `-webkit-mask-box-image-outset`: See `mask-border` and `border-image`.
- `-webkit-mask-box-image-repeat`: See `mask-border` and `border-image`.
- `-webkit-mask-box-image-slice`: See `mask-border` and `border-image`.
- `-webkit-mask-box-image-source`: See `mask-border` and `border-image`.
- `-webkit-mask-box-image-width`: See `mask-border` and `border-image`.
- `-webkit-mask-composite`: See `mask-border` and `border-image`.
- `-webkit-mask-position-x`: Supported with `-webkit-` by every browser for compatibility reasons.
- `-webkit-mask-position-y`: Supported with `-webkit-` by every browser for compatibility reasons.
- `-webkit-mask-repeat-x` (deprecated): No longer supported; see `mask-repeat`.
- `-webkit-mask-repeat-y` (deprecated): No longer supported; see `mask-repeat`.
- `-webkit-mask-source-type`: Not supported in Chrome.
- `-webkit-max-logical-height`
- `-webkit-max-logical-width`
- `-webkit-min-logical-height`
- `-webkit-min-logical-width`

### N-Z

- `-webkit-nbsp-mode`: Not supported in Chrome.
- `-webkit-perspective-origin-x`
- `-webkit-perspective-origin-y`
- `-webkit-rtl-ordering`
- `-webkit-tap-highlight-color`: Only supported in Safari on iOS.
- `-webkit-text-decoration-skip`: Not supported in Chrome.
- `-webkit-text-decorations-in-effect`
- `-webkit-text-fill-color`
- `-webkit-text-security`
- `-webkit-text-stroke`
- `-webkit-text-stroke-color`
- `-webkit-text-stroke-width`
- `-webkit-text-zoom`: Not supported in Chrome.
- `-webkit-touch-callout` (deprecated): Only supported in Safari on iOS.
- `-webkit-transform-origin-x`
- `-webkit-transform-origin-y`
- `-webkit-transform-origin-z`
- `-webkit-user-drag`
- `-webkit-user-modify`

## -webkit-prefixed properties with standard equivalents

Several `-webkit-` prefixed properties have standard equivalents.
Even if the name and syntax may be different, they shouldn't be used any more.
For each of the properties below, use the standard equivalents.

### A-B

- `-webkit-border-after`: Use `border-block-end`.
- `-webkit-border-after-color`: Use `border-block-end-color`.
- `-webkit-border-after-style`: Use `border-block-end-style`.
- `-webkit-border-after-width`: Use `border-block-end-width`.
- `-webkit-border-before`: Use `border-block-start`.
- `-webkit-border-before-color`: Use `border-block-start-color`.
- `-webkit-border-before-style`: Use `border-block-start-style`.
- `-webkit-border-before-width`: Use `border-block-start-width`.
- `-webkit-border-end`: Use `border-inline-end`.
- `-webkit-border-end-color`: Use `border-inline-end-color`.
- `-webkit-border-end-style`: Use `border-inline-end-style`.
- `-webkit-border-end-width`: Use `border-inline-end-width`.
- `-webkit-border-start`: Use `border-inline-start`.
- `-webkit-border-start-color`: Use `border-inline-start-color`
- `-webkit-border-start-style`: Use `border-inline-start-style`.
- `-webkit-border-start-width`: Use `border-inline-start-width`.
- `-webkit-box-align`: Use CSS flexbox with `align-items`.
- `-webkit-box-direction`: Use CSS flexbox with `flex-direction`.
- `-webkit-box-flex-group`: Use CSS flexbox with `flex-basis`, `flex-grow`, and `flex-shrink`.
- `-webkit-box-flex`: Use CSS flexbox with `flex-grow`.
- `-webkit-box-lines`: Use CSS flexbox with `flex-flow`.
- `-webkit-box-ordinal-group`: Use CSS flexbox with `order`.
- `-webkit-box-orient`: Use CSS flexbox with `flex-direction`.
- `-webkit-box-pack`: Use CSS flexbox with `justify-content`.
- `-webkit-box-reflect`: Use the CSS `element()` function.

### C-I

- `-webkit-column-break-after`: Use CSS multicolumn layout with `break-after`.
- `-webkit-column-break-before`: Use CSS multicolumn layout with `break-before`.
- `-webkit-column-break-inside`: Use CSS multicolumn layout with `break-inside`.
- `-webkit-font-feature-settings`: Use `font-feature-settings` (the prefixed version not supported in Safari).
- `-webkit-hyphenate-character`: Use `hyphenate-character`.
- `-webkit-initial-letter`: Use `initial-letter`.

### J-Z

- `-webkit-line-clamp`: Use `line-clamp`.
- `-webkit-margin-after`: Use `margin-block-end`.
- `-webkit-margin-before`: Use `margin-block-start`.
- `-webkit-margin-end`: Use `margin-inline-end`.
- `-webkit-margin-start`: Use `margin-inline-start`.
- `-webkit-padding-after`: Use `padding-block-end`.
- `-webkit-padding-before`: Use `padding-block-start`.
- `-webkit-padding-end`: Use `padding-inline-end`.
- `-webkit-padding-start`: Use `padding-inline-start`.

## -webkit-prefixed property values

- `-webkit-fill-available`
    Used with sizing properties like `width` and `height`, to allow elements to take up all available space within their parent container.
    The `stretch` value provides a standard replacement, but `-webkit-fill-available` is supported as an alias by browsers for backwards-compatibility reasons.

## Pseudo-classes

> **Note:**
> If there is an invalid pseudo-class within in a chain or group of selectors, the whole selector list is invalid.

- `:-webkit-any()`: Use `:is`
- `:-webkit-any-link`: Use `:any-link`
- `:-webkit-autofill`: Use `:autofill`
- `:-webkit-autofill-strong-password`: Use `:autofill`
- `:-webkit-drag`
- `:-webkit-full-page-media`: Use `:fullscreen`
- `:-webkit-full-screen`: Use `:fullscreen`
- `:-webkit-full-screen-ancestor`: Use `:fullscreen`
- `:-webkit-full-screen-document`: Use `:fullscreen`
- `:-webkit-full-screen-controls-hidden`: Use `:fullscreen`

## Pseudo-elements

For web-compatibility reasons, Blink, WebKit, and Gecko browsers treat all pseudo-elements starting with `::-webkit-` as valid.
If there is an invalid pseudo-element or pseudo-class within in a chain or group of selectors, the whole selector list is invalid.
If a pseudo-element (but not pseudo-class) has a `-webkit-` prefix, Blink, WebKit and Gecko browsers assume it is valid, not invalidating the selector list.

- `::-webkit-file-upload-button`: Use `::file-selector-button`
- `::-webkit-inner-spin-button`
- `::-webkit-input-placeholder`: Use `::placeholder`
- `::-webkit-meter-bar` (deprecated)
- `::-webkit-meter-even-less-good-value`
- `::-webkit-meter-inner-element`
- `::-webkit-meter-optimum-value`
- `::-webkit-meter-suboptimum-value`
- `::-webkit-progress-bar`
- `::-webkit-progress-inner-element`
- `::-webkit-progress-value`
- `::-webkit-search-cancel-button`
- `::-webkit-search-results-button`
- `::-webkit-slider-runnable-track`
- `::-webkit-slider-thumb`

## Media features

- `@media/-webkit-animation` (deprecated)
- `@media/-webkit-device-pixel-ratio`: Supported cross-browser
- `@media/-webkit-transform-2d` (deprecated)
- `@media/-webkit-transform-3d`: Supported cross-browser
- `@media/-webkit-transition` (deprecated)

## See also

- Mozilla (-moz-) vendor-prefixed CSS extensions
- Vendor Prefix glossary entry

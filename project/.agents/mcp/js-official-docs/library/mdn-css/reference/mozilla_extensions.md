---
title: "Firefox (-moz-) vendor-prefixed CSS extensions"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/mozilla_extensions/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Firefox (-moz-) vendor-prefixed CSS extensions

A vendor prefix is used to indicate that a feature is specific to a certain browser.
Firefox supports several extensions to CSS, which are prefixed with `-moz-`.

## -moz-prefixed properties without standard equivalents

> **Note:**
> These extensions are mostly experimental or deprecated but kept for backward compatibility.
> You should avoid using them on production websites.

- `-moz-float-edge` (deprecated)
- `-moz-force-broken-image-icon` (deprecated): Use `alt` text instead.
- `-moz-orient`
- `-moz-osx-font-smoothing`: A similar `font-smooth` equivalent exists.
- `-moz-user-focus` (deprecated)
- `-moz-user-input` (deprecated)
- `-moz-user-modify`: A non-prefixed `user-modify` equivalent exists, but the HTML `contenteditable` attribute is recommended instead.

## -moz-prefixed properties with standard equivalents

The following properties were implemented first using the `-moz-` vendor prefix, but are now supported in Firefox using the standard (non-prefixed) syntax.
Support for the prefixed version is typically dropped eventually, so use the standard property instead.

### A

- `-moz-animation` (deprecated): Prefixed version still supported.
- `-moz-animation-delay` (deprecated): Prefixed version still supported.
- `-moz-animation-direction` (deprecated): Prefixed version still supported.
- `-moz-animation-duration` (deprecated): Prefixed version still supported.
- `-moz-animation-fill-mode` (deprecated): Prefixed version still supported.
- `-moz-animation-iteration-count` (deprecated): Prefixed version still supported.
- `-moz-animation-name` (deprecated): Prefixed version still supported.
- `-moz-animation-play-state` (deprecated): Prefixed version still supported.
- `-moz-animation-timing-function` (deprecated): Prefixed version still supported.
- `-moz-appearance`: The prefixed version of `appearance` is still supported.

### B

- `-moz-backface-visibility` (deprecated): Prefixed version still supported.
- `-moz-background-clip` (deprecated): Not supported; use `background-clip`.
- `-moz-background-origin` (deprecated): Not supported; use `background-origin`.
- `-moz-box-align` (deprecated): Use CSS flexbox with `align-items`.
- `-moz-background-inline-policy` (deprecated): Not supported; use `box-decoration-break`.
- `-moz-box-direction` (deprecated): Use CSS flexbox with `flex-direction`.
- `-moz-box-flex` (deprecated): Use CSS flexbox with `flex-grow`.
- `-moz-box-ordinal-group` (deprecated): Use CSS flexbox with `order`.
- `-moz-box-orient` (deprecated): Use CSS flexbox with `flex-direction`.
- `-moz-box-pack` (deprecated): Use CSS flexbox with `justify-content`.
- `-moz-background-size` (deprecated): Not supported; use `background-size`.
- `-moz-border-end` (deprecated): Not supported; use `border-inline-end`.
- `-moz-border-end-color` (deprecated): Not supported; use `border-inline-end-color`.
- `-moz-border-end-style` (deprecated): Not supported; use `border-inline-end-style`.
- `-moz-border-end-width` (deprecated): Not supported; use `border-inline-end-width`.
- `-moz-border-image` (deprecated): Not supported; use `border-inline-end-width`.
- `-moz-border-start` (deprecated): Not supported; use `border-inline-start`.
- `-moz-border-start-color` (deprecated): Not supported; use `border-inline-start-color`.
- `-moz-border-start-style` (deprecated): Not supported; use `border-inline-start-style`.
- `-moz-border-start-width` (deprecated): Not supported; use `border-inline-start-width`.
- `-moz-box-sizing` (deprecated): Prefixed version still supported.

### C

- `-moz-column-count` (deprecated): Not supported; use `column-count`.
- `-moz-column-fill` (deprecated): Not supported; use `column-fill`.
- `-moz-column-gap` (deprecated): Not supported; use `column-gap`.
- `-moz-column-width` (deprecated): Not supported; use `column-width`.
- `-moz-column-rule` (deprecated): Not supported; use `column-rule`.
- `-moz-column-rule-width` (deprecated): Not supported; use `column-rule-width`.
- `-moz-column-rule-style` (deprecated): Not supported; use `column-rule-style`.
- `-moz-column-rule-color` (deprecated): Not supported; use `column-rule-color`.

### F–M

- `-moz-font-feature-settings` (deprecated): Prefixed version still supported.
- `-moz-font-language-override` (deprecated): Prefixed version still supported.
- `-moz-hyphens` (deprecated): Prefixed version still supported.
- `-moz-margin-end` (deprecated): Not supported; use `margin-inline-end`.
- `-moz-margin-start` (deprecated): Not supported; use `margin-inline-start`.

### O-P

- `-moz-opacity` (deprecated): Not supported; use `opacity`.
- `-moz-outline` (deprecated): Not supported; use `outline`.
- `-moz-outline-color` (deprecated): Not supported; use `outline-color`.
- `-moz-outline-offset` (deprecated): Not supported; use `outline-offset`.
- `-moz-outline-style` (deprecated): Not supported; use `outline-style`.
- `-moz-outline-width` (deprecated): Not supported; use `outline-width`.
- `-moz-padding-end` (deprecated): Not supported; use `padding-inline-end`.
- `-moz-padding-start` (deprecated): Not supported; use `padding-inline-start`.
- `-moz-perspective` (deprecated): Prefixed version still supported.
- `-moz-perspective-origin` (deprecated): Prefixed version still supported.

### T–Z

- `-moz-tab-size`: Use `tab-size`
- `-moz-text-align-last` (deprecated): Not supported; use `text-align-last`.
- `-moz-text-decoration-color` (deprecated): Not supported; use `text-decoration-color`.
- `-moz-text-decoration-line` (deprecated): Not supported; use `text-decoration-line`.
- `-moz-text-decoration-style` (deprecated): Not supported; use `text-decoration-style`.
- `-moz-text-size-adjust`: See `text-size-adjust` (experimental).
- `-moz-transform` (deprecated): Prefixed version still supported.
- `-moz-transform-origin` (deprecated): Prefixed version still supported.
- `-moz-transform-style` (deprecated): Prefixed version still supported.
- `-moz-transition` (deprecated): Not supported; use `transition`.
- `-moz-transition-delay` (deprecated): Not supported; use `transition-delay`.
- `-moz-transition-duration` (deprecated): Not supported; use `transition-duration`.
- `-moz-transition-property` (deprecated): Not supported; use `transition-property`.
- `-moz-transition-timing-function` (deprecated): Not supported; use `transition-timing-function`.
- `-moz-user-select`: Use `user-select`.

## -moz-prefixed property values

### Global values

- `-moz-initial`: See `initial`.

### background-image

**Property:** `background-image`

- `-moz-linear-gradient` (deprecated): Use `gradient/linear-gradient`.
- `-moz-radial-gradient` (deprecated): Use `gradient/radial-gradient`.
- `-moz-element` (deprecated): Use `element`.
- `-moz-image-rect` (deprecated)

### border-style and outline-style

**Properties:** `border-style` and `outline-style`.

- `-moz-bg-inset` (deprecated)
- `-moz-bg-outset` (deprecated)
- `-moz-bg-solid` (deprecated)

### <color> keywords

**Type:** `<color>`

- `-moz-activehyperlinktext`
- `-moz-hyperlinktext`
- `-moz-visitedhyperlinktext`
- `-moz-buttonhoverface`
- `-moz-buttonhovertext`
- `-moz-default-background-color`
- `-moz-default-color`
- `-moz-cellhighlight`
- `-moz-cellhighlighttext`
- `-moz-field`
- `-moz-fieldtext`
- `-moz-dialog`
- `-moz-dialogtext`
- `-moz-menuhover`
- `-moz-menuhovertext`

### empty-cells

**Property:** `empty-cells`

- `-moz-show-background` (default value in quirks mode)

### font-family

**Property:** `font-family`

- `-moz-fixed`

### image-rendering

**Property:** `image-rendering`

- `-moz-crisp-edges` (deprecated): Use `crisp-edges`.

### <length>

**Type:** `<length>`

- `-moz-calc`(deprecated): Use `calc`.

### list-style-type

**Property:** `list-style-type`

Several vendor-prefixed values for `list-style-type` are now supported as standard values without a `-moz-` prefix, except for those in the following list.
See Browser Compatibility for details.

- `-moz-ethiopic-halehame`
- `-moz-ethiopic-halehame-am`
- `-moz-ethiopic-halehame-ti-er`
- `-moz-ethiopic-halehame-ti-et`
- `-moz-hangul`
- `-moz-hangul-consonant`
- `-moz-urdu`

### text-align

**Property:** `text-align`

- `-moz-center` (deprecated): Use `text-align: center`.
- `-moz-left` (deprecated): Use `text-align: left`.
- `-moz-right` (deprecated): Use `text-align: right`.

### width, min-width, and max-width

**Properties:** `width`, `min-width`, and `max-width`

- `-moz-min-content`: See `min-content`.
- `-moz-fit-content`: See `fit-content`.
- `-moz-max-content`: See `max-content`.
- `-moz-available`: See `stretch`.

## Pseudo-classes

- `:-moz-any` (deprecated): Use `:is`.
- `:-moz-any-link` (deprecated): Use `:any-link`.
- `:-moz-broken` (deprecated)
- `:-moz-drag-over`
- `:-moz-first-node`
- `:-moz-full-screen` (deprecated): Not supported; use `:fullscreen`.
- `:-moz-full-screen-ancestor` (deprecated): Not supported; use `:fullscreen`.
- `:-moz-handler-blocked`
- `:-moz-handler-crashed`
- `:-moz-handler-disabled`
- `:-moz-last-node`
- `:-moz-loading`
- `:-moz-locale-dir(ltr)`
- `:-moz-locale-dir(rtl)`
- `:-moz-native-anonymous`
- `:-moz-placeholder` (deprecated): Use `:placeholder-shown`.
- `:-moz-only-whitespace`
- `:-moz-read-only` (deprecated): Use `:read-only`.
- `:-moz-read-write` (deprecated): Use `:read-write`.
- `:-moz-submit-invalid`: See `:invalid`.
- `:-moz-suppressed`
- `:-moz-ui-invalid` (deprecated): Use `:user-invalid`.
- `:-moz-ui-valid` (deprecated): Use `:user-valid`.
- `:-moz-user-disabled`
- `:-moz-window-inactive`

## Pseudo-elements

- `::-moz-canvas`
- `::-moz-cell-content`
- `::-moz-color-swatch`
- `::-moz-focus-inner`
- `::-moz-focus-outer`
- `::-moz-inline-table`
- `::-moz-list-bullet`
- `::-moz-list-number`
- `::-moz-meter-bar`
- `::-moz-pagebreak`
- `::-moz-pagecontent`
- `::-moz-placeholder` (deprecated): Use `::placeholder`.
- `::-moz-progress-bar`
- `::-moz-range-progress`
- `::-moz-range-thumb`
- `::-moz-range-track`
- `::-moz-scrolled-canvas`
- `::-moz-scrolled-content`
- `::-moz-selection` (deprecated): Use `::selection`.
- `::-moz-svg-foreign-content`
- `::-moz-table`
- `::-moz-table-cell`
- `::-moz-table-column`
- `::-moz-table-column-group`
- `::-moz-table-outer`
- `::-moz-table-row`
- `::-moz-table-row-group`
- `::-moz-viewport`
- `::-moz-viewport-scroll`

## At-rules

- `@-moz-document`

## Media features

- `-moz-device-pixel-ratio` (deprecated)
- `-moz-platform`
- `-moz-windows-glass`

## Other

- `-moz-alt-content`: See Firefox bug 11011

## See also

- WebKit (-webkit-) vendor-prefixed CSS extensions
- Vendor Prefix glossary entry

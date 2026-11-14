---
title: "CSS ruby layout"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/guides/ruby_layout/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSS ruby layout

The **CSS ruby layout** module provides the rendering model and formatting controls related to the display of ruby annotations. Ruby annotations are a form of interlinear annotation, consisting of short runs of text alongside the base text. They are typically used in East Asian documents to indicate pronunciation or define meaning.

## Reference

### Properties

- `ruby-align`
- `ruby-position`

The CSS ruby layout module also introduces the `ruby-merge` and `ruby-overhang` properties. Currently, no browsers support these features.

### Display values

The CSS ruby layout module adds the following values to the `display` property:

- `ruby`
- `ruby-base`
- `ruby-text`
- `ruby-base-container`
- `ruby-text-container`

### Glossary terms

- Ruby

## Related concepts

- CSS display module
  - `display`
  - `<display-internal>`
- CSS text decoration module
  - `text-emphasis-color`
  - `text-emphasis-position`
  - `text-emphasis-style`
  - `text-emphasis` shorthand
- HTML elements
  - `<rb>`
  - `<rp>`
  - `<rt>`
  - `<rtc>`
  - `<ruby>`

## See also

- `direction`
- `unicode-bidi`
- `font-variant-east-asian`
- `:lang()`
- HTML `lang` attribute

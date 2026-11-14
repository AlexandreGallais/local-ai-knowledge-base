---
title: "`font-variation-settings` CSS at-rule descriptor"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/at-rules/@font-face/font-variation-settings/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `font-variation-settings` CSS at-rule descriptor

The **`font-variation-settings`** CSS descriptor allows authors to specify low-level OpenType or TrueType font variations in the `@font-face` at-rule. The values for this descriptor are the same as the `font-variation-settings` property, except for the global keyword values.

Since this descriptor sets variation values on the font object in the `@font-face` at-rule and not on an entire element, only some glyphs in an element may be rendered using this descriptor.

## Syntax

```css
/* Use the default settings */
font-variation-settings: normal;

/* Set values for OpenType axis names */
font-variation-settings: "xhgt" 0.7;
```

### Values

- `normal`
    Text is laid out using default settings.
- `<string> <number>`
    When rendering text, the list of OpenType axis names is passed to the text layout engine to enable or disable font features. Each setting is always a `<string>` of 4 ASCII characters, followed by a `number` indicating the axis value. If the `<string>` has more or fewer characters or contains characters outside the U+20 - U+7E code point range, the whole property is invalid. The `<number>` can be fractional or negative.

## Examples

### Setting font weight and stretch in a @font-face rule

```css
@font-face {
  font-family: "OpenTypeFont";
  src: url("open_type_font.woff2") format("woff2");
  font-weight: normal;
  font-style: normal;
  font-variation-settings:
    "wght" 400,
    "wdth" 300;
}
```

## See also

- Other `@font-face` descriptors: `font-display`, `font-family`, `font-feature-settings`, `font-stretch`, `font-style`, `font-weight`, `src`, `unicode-range`
- Related font properties: `font-feature-settings`, `font-variation-settings`

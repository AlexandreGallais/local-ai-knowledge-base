---
title: "`font` CSS property (part 1 of 2)"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/font/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `font` CSS property

The **`font`** CSS shorthand property sets all the different properties of an element's font. Alternatively, it sets an element's font to a system font.

```css
font:
  1.2rem "Fira Sans",
  sans-serif;
```

```css
font:
  italic 1.2rem "Fira Sans",
  serif;
```

```css
font: italic small-caps bold 16px/2 cursive;
```

```css
font: small-caps bold 24px/1 sans-serif;
```

```css
font: caption;
```

```html
<section id="default-example">
  <q id="example-element">
    Prejudices, it is well known, are most difficult to eradicate from the heart
    whose soil has never been loosened or fertilized by education: they grow
    there, firm as weeds among stones.
  </q>
</section>
```

```css
@font-face {
  font-family: "Fira Sans";
  src:
    local("FiraSans-Regular"),
    url("/shared-assets/fonts/FiraSans-Regular.woff2") format("woff2");
  font-weight: normal;
  font-style: normal;
}

@font-face {
  font-family: "Fira Sans";
  src:
    local("FiraSans-Italic"),
    url("/shared-assets/fonts/FiraSans-Italic.woff2") format("woff2");
  font-weight: normal;
  font-style: italic;
}

section {
  margin-top: 10px;
  font-size: 1.1em;
}
```

## Constituent properties

This property is a shorthand for the following CSS properties:

- `font-family`
- `font-size`
- `font-width`
- `font-style`
- `font-variant`
- `font-weight`
- `line-height`

### Reset-only sub-properties

This property resets the following CSS properties to their initial values:

- `font-feature-settings`
- `font-kerning`
- `font-language-override`
- `font-optical-sizing`
- `font-size-adjust`
- `font-variant-alternates`
- `font-variant-caps`
- `font-variant-east-asian`
- `font-variant-emoji`
- `font-variant-ligatures`
- `font-variant-numeric`
- `font-variant-position`
- `font-variation-settings`

## Syntax

```css
/* font-size font-family */
font: 1.2em sans-serif;

/* font-size/line-height font-family */
font: 1.2em/2 "Fira Sans", sans-serif;

/* font-style font-weight font-size font-family */
font: italic bold 1.2em monospace;

/* font-width font-variant font-size font-family */
font: ultra-condensed small-caps 1.2em Montserrat, Helvetica, sans-serif;

/* system font */
font: caption;
```

### Values

The value is either a shorthand specifying the various font-related properties or a single `<system-font-family-name>` keyword:

- `<'font-style'>` (optional)
    See the `font-style` CSS property. Defaults to `normal`.
- `` (optional)
    Either the `normal` or `small-caps` value of the `font-variant` property. Defaults to `normal`.
- `<'font-weight'>` (optional)
    See the `font-weight` CSS property. Defaults to `normal`.
- `` (optional)
    The keywords supported by the `font-width` CSS property. Defaults to `normal`.
- `<'font-size'>`
    See the `font-size` CSS property.
- `<'line-height'>` (optional)
    See the `line-height` CSS property. Defaults to `normal`.
- `<'font-family'>`
    See the `font-family` CSS property. Must be the last value.

- `<system-font-family-name>`
    A single keyword representing a system font, including:
    - `caption`
        The system font used for captioned controls (buttons, drop-downs, etc.).
    - `icon`
        The system font used to label icons.
    - `menu`
        The system font used in menus (e.g., dropdown menus and menu lists).
    - `message-box`
        The system font used in dialog boxes.
    - `small-caption`
        The system font used for labeling small controls.
    - `status-bar`
        The system font used in window status bars.

    There are several non-standard values implemented with prefixes.

## Description

The `font` property value is either a single keyword representing a system-font-family-name or multiple longhand property values used to set all the different properties of an element's font.

### System font declarations

If `font` is specified as a `<system-font-family-name>` keyword, the full property value must be set to that single, case-insensitive keyword. Valid values include `caption`, `icon`, `menu`, `message-box`, `small-caption`, or `status-bar`.

Browsers also support non-standard prefixed values:

- Chromium implements `-webkit-control`, `-webkit-small-control`, and `-webkit-mini-control`.
- Webkit includes the Chromium values, and adds `-webkit-body`, `-webkit-pictograph`, and `-webkit-ruby-text`, along with several `-apple-system-*` prefixed system font names.
- Gecko implements `-moz-window`, `-moz-document`, `-moz-desktop`, `-moz-info`, `-moz-dialog`, `-moz-button`, `-moz-pull-down-menu`, `-moz-list`, and `-moz-field`.

The system font, or `<system-font-family-name>`, can only be set with the `font` property. Defining a single keyword value, such as `font: icon`, sets the font's family, size, weight, style, etc., to the values the browser defines for the named system font. These values can all be changed with longhand declarations placed _after_ the `font` declaration.

Including any `font` longhand components after the `<system-font-family-name>` keyword within a `font` property value invalidates the declaration. For example, `font: icon small` is invalid.

If a `<system-font-family-name>` keyword appears anywhere in the value other than as the first component, the keyword is treated as an `ident` representing a standard `font-family` name. For example, the declaration `font: small icon` sets the `font-family` to a font named `icon`, a non-system font which may or may not exist. This declaration also sets the `font-size` to `small` and resets all the other shorthand component properties to their initial values.

### Shorthand font declarations

If `font` is specified as a shorthand for several font-related properties, then:

- it must include values for:
  - `font-size`
  - `font-family`

- it may optionally include values for:
  - `font-style`
  - `font-variant`
  - `font-weight`
  - `font-width`
  - `line-height`

As with any shorthand property, any of the longhand component properties not specified are set to their initial values, possibly overriding values previously set using non-shorthand properties. In addition, the shorthand resets the following properties to their initial values. The shorthand cannot explicitly set them:

- `font-feature-settings`
- `font-kerning`
- `font-language-override`
- `font-optical-sizing`
- `font-size-adjust`
- `font-variant-alternates`
- `font-variant-caps`
- `font-variant-east-asian`
- `font-variant-emoji`
- `font-variant-ligatures`
- `font-variant-numeric`
- `font-variant-position`
- `font-variation-settings`

### Shorthand property order

The order of some of the longhand values within the shorthand `font` declaration must follow a few rules:

- Both the `font-size` and `font-family` components are required (except for system font declarations).
- The `font-style`, `font-variant` and `font-weight` components must precede the `font-size` value.
- A `line-height` can only be included if `font-size` is included. If present, the `line-height` must immediately follow the `font-size`, with the two values separated by a forward slash (`/`), for example: `16px / 3`.
- The `font-family` must be the last value specified.

### Components with limited values

For backward compatibility, the valid values of the `font-variant` and `font-width` components do not include all the valid values or the longhand equivalents.

The valid values for the `font-variant` component are limited to `normal` or `small-caps`. While no other values are supported, the shorthand `font` declaration resets all the `font-variant-*` longhand properties to `normal`, including `font-variation-settings`, `font-variant-position`, `font-variant-emoji`, `font-variant-caps`, `font-variant-ligatures`, `font-variant-numeric`, `font-variant-east-asian`, and `font-variant-alternates`.

The valid values for the `font-width` component are limited to keyword values: `normal`, `ultra-condensed`, `extra-condensed`, `condensed`, `semi-condensed`, `semi-expanded`, `expanded`, `extra-expanded`, `ultra-expanded`. The `font-width` longhand property also supports `percentage` values, but they are not valid within the shorthand.

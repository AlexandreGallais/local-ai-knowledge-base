---
title: "CSS colors"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/guides/colors/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSS colors

The **CSS colors** module defines colors, color types, color blending, opacity, and how you can apply these colors and effects to HTML content.

While this module has only two CSS properties, `color` and `opacity`, over 20 CSS and SVG properties, CSS images, at-rules, and @media rules depend on these two properties.

## Colors in action

The color syntax converter below shows the values of the currently selected color in red-green-blue (RGB), hexadecimal (HEX), hue, saturation, and lightness (HSL), and hue, whiteness, and blackness (HWB) CSS color formats. All the RGB, HEX, HSL, and HWB color values here, while written differently, represent the same color value.

Selecting a color via the color picker and an opacity via the slider updates the RGB, HEX, HSL, and HWB values. When you choose a new color or opacity value, the color of the background and the slider update via the CSS properties `background-color` and `accent-color`, respectively.

To see the code for this color syntax converter, view the source on GitHub.

## Reference

### Properties

- `color`
- `opacity`

### At-rules and descriptors

The CSS colors module also introduces the `@color-profile` at-rule, along with its `components`, `rendering-intent` and `src` descriptors. Currently, no browsers support these features.

### Functions

- Color functions:
  - `rgb()`
  - `hsl()`
  - `hwb()`
  - `lab()`
  - `lch()`
  - `oklab()`
  - `oklch()`
  - `color()`
- `alpha()`
- `color-mix()`
- `contrast-color()`
- `light-dark()`

The CSS color modules also introduce the `device-cmyk()` function. Currently, no browsers support this feature.

### Data types

- `<color>`
- `<color-function>`
- `hex-color`
- `named-color`
- `alpha-value`
- `hue`
- `system-color`
- `<colorspace-params>`

### Glossary terms and keywords

- Color space
- `currentColor`
- Interpolation
- RGB
- `transparent`

### Interfaces

The CSS color module also introduces the `CSSColorProfileRule` interface. Currently, no browsers support this feature.

## Guides

- Applying color to HTML elements using CSS
    A guide to using CSS to apply color to a variety of types of content, including all CSS properties that accept `<color>` as a value.
- CSS color values
    An overview of color spaces and the different `<color>` functional notations available in CSS.
- Using color wisely
    Color theory and resources, including finding the right colors to create an accessible color palette, contrast, and printing in color.
- Using relative colors
    This article explains relative CSS color syntax, shows what the different options are, and looks at some illustrative examples.
- Understanding color and luminance
    Color perception and using colors with color insensitive (color blind) users, reduced vision users and users with vestibular disorders or other neurological disorders in mind.
- WCAG 1.4.1: Color contrast
    Explanation of contrast requirements between background and foreground content to ensure legibility.
- CSS value serialization
    How CSSOM APIs serialize color and other values into standardized string representations.

## Related concepts

- CSS properties that are part of other specifications:
  - `accent-color`
  - `background-color`
  - `background-image`
  - `border-color`
  - `box-shadow`
  - `caret-color`
  - `color`
  - `color-scheme`
  - `column-rule-color`
  - `dynamic-range-limit`
  - `outline-color`
  - `scrollbar-color`
  - `text-decoration-color`
  - `text-emphasis-color`
  - `text-shadow`
  - `-webkit-tap-highlight-color`
- `dynamic-range-limit-mix()` function
- SVG color properties that are part of other specifications:
  - `fill`
  - `flood-color`
  - `lighting-color`
  - `stop-color`
  - `stroke`
- SVG `color` attribute
- Color wheel glossary term
- Interpolation glossary term
- The `@font-palette-values` at-rule `override-colors` descriptor
- The `@color-profile` at-rule
- The `color-gamut` @media feature
- The `forced-colors` @media feature

## See also

- CSS color adjustment module and `print-color-adjust`
- `gradient` defined in CSS images module
- The `VideoColorSpace` interface
- `<feColorMatrix>` SVG element
- Canvas API: applying styles and colors
- Tools:
  - Color format converter
  - Color mixer

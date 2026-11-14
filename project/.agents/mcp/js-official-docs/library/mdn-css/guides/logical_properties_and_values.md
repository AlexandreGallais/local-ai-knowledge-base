---
title: "CSS logical properties and values"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/guides/logical_properties_and_values/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSS logical properties and values

The **CSS logical properties and values** module defines logical properties and values that can control layout through logical rather than physical direction and dimension mappings. Logical properties define direction‐relative equivalents to their corresponding physical properties.

The start of a line is not always the left side of a line. Different writing systems operate in various directions. For example:

- English and Portuguese are written from left to right with new lines added below the previous ones.
- Hebrew and Arabic are right-to-left languages with new lines again being added below the previous ones.
- In some writing modes, the text lines are vertical, written from top to bottom. Chinese, Vietnamese, Korean, and Japanese are traditionally written vertically, from top to bottom, with each new vertical line added to the left of the previous one.
- Traditional Mongolian is also a top-to-bottom language, but new lines are to the right of previous ones.

The logical properties defined in this module enable defining properties relative to the content's writing direction, rather than a physical direction. This means content translated into languages with different writing modes will be rendered as intended.

Logical properties and values use the abstract terms _block_ and _inline_ to describe the direction in which they flow. The physical meaning of these terms depends on the writing mode.

The **block dimension** is perpendicular to the flow of text within a line, i.e., the vertical dimension in horizontal writing modes, and the horizontal dimension in vertical writing modes. For standard English text, it is the vertical dimension.

The **inline dimension** is parallel to the flow of text within a line, i.e., the horizontal dimension in horizontal writing modes, and the vertical dimension in vertical writing modes. For standard English text, it is the horizontal dimension.

CSS was initially designed with only physical coordinates. The logical properties and values module defines flow–relative equivalents for many values and properties. Properties that once only accepted physical values (`top`, `bottom`, `left`, `right`) now also accept flow-relative logical values (`block-start`, `block-end`, `inline-start`, `inline-end`).

## Reference

### Properties

- `block-size`
- `border-block`
- `border-block-color`
- `border-block-end`
- `border-block-end-color`
- `border-block-end-style`
- `border-block-end-width`
- `border-block-start`
- `border-block-start-color`
- `border-block-start-style`
- `border-block-start-width`
- `border-block-style`
- `border-block-width`
- `border-end-end-radius`
- `border-end-start-radius`
- `border-inline`
- `border-inline-color`
- `border-inline-end`
- `border-inline-end-color`
- `border-inline-end-style`
- `border-inline-end-width`
- `border-inline-start`
- `border-inline-start-color`
- `border-inline-start-style`
- `border-inline-start-width`
- `border-inline-style`
- `border-inline-width`
- `border-start-end-radius`
- `border-start-start-radius`
- `inline-size`
- `inset`
- `inset-block`
- `inset-block-end`
- `inset-block-start`
- `inset-inline`
- `inset-inline-end`
- `inset-inline-start`
- `margin-block`
- `margin-block-end`
- `margin-block-start`
- `margin-inline`
- `margin-inline-end`
- `margin-inline-start`
- `max-block-size`
- `max-inline-size`
- `min-block-size`
- `min-inline-size`
- `padding-block`
- `padding-block-end`
- `padding-block-start`
- `padding-inline`
- `padding-inline-end`
- `padding-inline-start`

### Data types and values

Flow relative values:

- `block-start`
- `block-end`
- `inline-start`
- `inline-end`
- `start`
- `end`

### Glossary terms

- Flow relative values
- Inset properties
- Logical properties
- Physical properties

## Guides

- Basic <example-value> of logical properties and values
    Overview of flow relative properties and values.

- Logical properties for sizing
    Flow-relative mappings between physical properties and logical properties used for sizing elements on the page.

- Logical properties for margins, borders, and padding
    Flow-relative mappings for the various margin, border, and padding properties and their shorthands.

- Logical properties for floating and positioning
    Details mappings between the physical and logical values for `float` and `clear`, inset properties, and `resize`.

## Related concepts

- `caption-side`
- `clear`
- `float`
- `resize`
- `text-align`

CSS box model

- `margin` shorthand
- `padding` shorthand

CSS box sizing

- `max-height`
- `max-width`
- `min-height`
- `min-width`

CSS backgrounds and borders

- `border-color`
- `border-style`
- `border-width`
- `border` shorthand
- `border-radius`

CSS positioned layout

- `top`
- `right`
- `bottom`
- `left`

CSS writing modes

- `direction`
- `text-orientation`
- `writing-mode`

CSS containment

- `contain-intrinsic-block-size`
- `contain-intrinsic-inline-size`

CSS overflow

- `overflow-block`
- `overflow-inline`

CSS overscroll behavior

- `overscroll-behavior-block`
- `overscroll-behavior-inline`

## See also

- Flow layout and writing modes
- CSS flexible box layout module
- CSS grid layout module

---
title: "font-variant"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/svg/reference/attribute/font-variant/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# font-variant

The **`font-variant`** attribute indicates whether the text is to be rendered using variations of the font's glyphs.

> **Note:**
> As a presentation attribute, `font-variant` also has a CSS property counterpart: `font-variant`. When both are specified, the CSS property takes priority.

You can use this attribute with the following SVG elements:

- `<text>`
- `<textPath>`
- `<tspan>`

## Examples

### Controlling SVG font variations

```html
<svg viewBox="0 0 250 30" xmlns="http://www.w3.org/2000/svg">
  <text y="20" font-variant="normal">Normal text</text>
  <text x="100" y="20" font-variant="small-caps">Small-caps text</text>
</svg>
```

## Usage notes

       | Value
       |

          `normal` | `none` | [
          `&#x3C;common-lig-values>` ||
          `&#x3C;discretionary-lig-values>` ||
          `&#x3C;historical-lig-values>` ||
          `&#x3C;contextual-alt-values>` ||
          `stylistic( &#x3C;feature-value-name> )` ||
          `historical-forms` ||
          `styleset( &#x3C;feature-value-name># )` ||
          `character-variant( &#x3C;feature-value-name># )` ||
          `swash( &#x3C;feature-value-name> )` ||
          `ornaments( &#x3C;feature-value-name> )` ||
          `annotation( &#x3C;feature-value-name> )` || [
          `small-caps` | `all-small-caps` |
          `petite-caps` | `all-petite-caps` |
          `unicase` | `titling-caps` ] ||
          `&#x3C;numeric-figure-values>` ||
          `&#x3C;numeric-spacing-values>` ||
          `&#x3C;numeric-fraction-values>` || `ordinal` ||
          `slashed-zero` ||
          `&#x3C;east-asian-variant-values>` ||
          `&#x3C;east-asian-width-values>` || `ruby` ]

       | Default value
       | `normal`

       | Animatable
       | Yes

For a description of the values, please refer to the CSS `font-variant` property.

## See also

- CSS `font-variant` property

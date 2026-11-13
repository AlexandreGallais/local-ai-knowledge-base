---
title: "<text>"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/svg/reference/element/text/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# <text>

The **`<text>`** SVG element draws a graphics element consisting of text. It's possible to apply a gradient, pattern, clipping path, mask, or filter to `<text>`, like any other SVG graphics element.

If text is included in SVG not inside of a `<text>` element, it is not rendered. This is different than being hidden by default, as setting the `display` property won't show the text.

> **Note:**
> The `<text>` element does not wrap by default, to make this happen it needs to be styled with the `white-space` CSS property.

## Attributes

- `x`
    The x coordinate of the starting point of the text baseline, or the x coordinate of each individual glyph if a list of values is provided.
    _Value type_: List of (**\<length>** | **\<percentage>**); _Default value_: `0`; _Animatable_: **yes**
- `y`
    The y coordinate of the starting point of the text baseline, or the y coordinate of each individual glyph if a list of values is provided.
    _Value type_: List of (**\<length>** | **\<percentage>**); _Default value_: `0`; _Animatable_: **yes**
- `dx`
    Shifts the text position horizontally from a previous text element, or shifts the position of each individual glyph if a list of values is provided.
    _Value type_: List of (**\<length>** | **\<percentage>**); _Default value_: _none_; _Animatable_: **yes**
- `dy`
    Shifts the text position vertically from a previous text element, or shifts the position of each individual glyph if a list of values is provided.
    _Value type_: List of (**\<length>** | **\<percentage>**); _Default value_: _none_; _Animatable_: **yes**
- `rotate`
    Rotates orientation of each individual glyph. Can rotate glyphs individually.
    _Value type_: **\<list-of-number>**; _Default value_: none; _Animatable_: **yes**
- `lengthAdjust`
    How the text is stretched or compressed to fit the width defined by the `textLength` attribute.
    _Value type_: `spacing` | `spacingAndGlyphs`; _Default value_: `spacing`; _Animatable_: **yes**
- `textLength`
    A width that the text should be scaled to fit.
    _Value type_: **\<length>** | **\<percentage>**; _Default value_: _none_; _Animatable_: **yes**

## DOM Interface

This element implements the `SVGTextElement` interface.

## Example

```css
html,
body,
svg {
  height: 100%;
}
```

```html
<svg viewBox="0 0 240 80" xmlns="http://www.w3.org/2000/svg">
  <style>
    .small {
      font: italic 13px sans-serif;
    }
    .heavy {
      font: bold 30px sans-serif;
    }

    /* Note that the color of the text is set with the    *
     * fill property, the color property is for HTML only */
    .Rrrrr {
      font: italic 40px serif;
      fill: red;
    }
  </style>

  <text x="20" y="35" class="small">My</text>
  <text x="40" y="35" class="heavy">cat</text>
  <text x="55" y="55" class="small">is</text>
  <text x="65" y="55" class="Rrrrr">Grumpy!</text>
</svg>
```

## See also

- `white-space`
- `<tspan>`

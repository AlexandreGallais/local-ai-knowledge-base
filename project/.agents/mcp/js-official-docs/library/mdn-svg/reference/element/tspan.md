---
title: "<tspan>"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/svg/reference/element/tspan/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# <tspan>

The **`<tspan>`** SVG element defines a subtext within a `<text>` element or another `<tspan>` element. It allows for adjustment of the style and/or position of that subtext as needed.

> **Note:**
> The `<tspan>` element does not wrap by default, to make this happen it needs to be styled with the `white-space` CSS property.

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

This element implements the `SVGTSpanElement` interface.

## Example

```css
html,
body,
svg {
  height: 100%;
}
```

```html
<svg viewBox="0 0 240 40" xmlns="http://www.w3.org/2000/svg">
  <style>
    text {
      font: italic 12px serif;
    }
    tspan {
      font: bold 10px sans-serif;
      fill: red;
    }
  </style>

  <text x="10" y="30" class="small">
    You are
    <tspan>not</tspan>
    a banana!
  </text>
</svg>
```

## See also

- `white-space`

---
title: "`text-anchor` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/text-anchor/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `text-anchor` CSS property

The **`text-anchor`** CSS property aligns a box containing a string of text where the wrapping area is determined from the `inline-size` property, and the text is then placed relative to the anchor point of the element, which is defined using the `x` and `y` (or `dx` and `dy`) attributes. If present, the value of the CSS property overrides any value of the element's `text-anchor` attribute.

Each individual text fragment within an element is aligned independently; thus, a multi-line `<text>` element will have each line of text aligned as per the value of `text-anchor`. `text-anchor` values only have an effect on the `<text>`, `<textPath>`, and `<tspan>` SVG elements. `text-anchor` does not apply to automatically wrapped text; for that, see `text-align`.

## Syntax

```css
text-anchor: start;
text-anchor: middle;
text-anchor: end;

/* Global values */
text-anchor: inherit;
text-anchor: initial;
text-anchor: revert;
text-anchor: revert-layer;
text-anchor: unset;
```

### Values

This property is specified as one of the following keyword values:

- `start`
    Aligns the text such that the inline start of the text string is aligned with the anchor point. This alignment is relative to the writing direction of the text; thus, for example, in right-to-left top-to-bottom writing, the text will be placed to the left of the anchor point. If the text's inline direction is vertical, as with many Asian languages, the top edge of the text is aligned with the anchor point.

- `middle`
    Aligns the text such that the center (middle) of the text string's inline box is aligned with the anchor point.

- `end`
    Aligns the text such that the inline end of the text string is aligned with the anchor point. This alignment is relative to the writing direction of the text; thus, for example, in right-to-left top-to-bottom writing, the text will be placed to the right of the anchor point. If the text's inline direction is vertical, as with many Asian languages, the bottom edge of the text is aligned with the anchor point.

## Example

Three `<text>` elements are given the same `x` position, but different values for `text-anchor`. A dashed red line is included to mark the x-axis position of all three anchor points.

```html
<svg
  viewBox="0 0 200 150"
  height="150"
  width="200"
  xmlns="http://www.w3.org/2000/svg">
  <line
    x1="100"
    y1="0"
    x2="100"
    y2="150"
    stroke="red"
    stroke-dasharray="10,5" />
  <text x="100" y="40">Anchored</text>
  <text x="100" y="80">Anchored</text>
  <text x="100" y="120">Anchored</text>
</svg>
```

```css
text {
  font-size: 24px;
}
```

```css
text:nth-of-type(1) {
  text-anchor: start;
}
text:nth-of-type(2) {
  text-anchor: middle;
}
text:nth-of-type(3) {
  text-anchor: end;
}
```

## See also

- `dominant-baseline`
- SVG `<text>` element
- SVG `text-anchor` attribute

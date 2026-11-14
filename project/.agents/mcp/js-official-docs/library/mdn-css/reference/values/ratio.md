---
title: "`<ratio>` CSS type"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/values/ratio/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `<ratio>` CSS type

The **`<ratio>`** CSS data type describes the proportional relationship between two values. It mostly represents the aspect ratio, which relates width to height. For example, the `<ratio>` is used as a value for the `aspect-ratio` media feature in `@media` media queries, the `aspect-ratio` size feature in `@container` container queries, and as a value for the CSS `aspect-ratio` property.

## Syntax

The `<ratio>` data type is a `<number>` followed by a forward slash ('/', Unicode `U+002F SOLIDUS`) and a second `<number>`. Both numbers must be positive. Spaces before and after the slash are optional. The first number represents the width, while the second represents the height. In addition a single `<number>` as a value is allowable.

Two ratios are compared using the quotients' numeric values. For example, 16/16 is less than 16/9 because it resolves to 1 while the second resolves to 1.7. This means a tall screen's aspect ratio is smaller than a wide screen's, and portrait images have smaller aspect ratios than landscape images.

### Common aspect ratios

| Ratio                 |                                                                              | Usage                                           |
| --------------------- | ---------------------------------------------------------------------------- | ----------------------------------------------- |
| `4/3` or `1.33333`    |     | Traditional TV format in the twentieth century. |
| `16/9` or `1.7777778` |  | Modern "widescreen" TV format.                  |
| `185/100` or `1.85`   |       | The most common movie format since the 1960s.   |
| `239/100` or `2.39`   |       | "Widescreen," anamorphic movie format.          |

## Examples

### Use in a media query

```css
@media screen and (aspect-ratio >= 16/9) {
  /* … */
}
```

### Use in a @container size query

```css
@container (aspect-ratio > 1) and (width < 20em) {
  /* … */
}
```

### Use as a CSS property value

```css
.square {
  aspect-ratio: 1 / 1;
}
.circle {
  aspect-ratio: 1;
  border-radius: 50%;
}
.portrait {
  aspect-ratio: 5 / 7;
}
```

## See also

- `aspect-ratio` media descriptor
- Understanding aspect ratios
- CSS container queries guide
- Using container size and style queries guide
- CSS media queries module
- CSS containment module
- CSS box sizing module
- CSS values and units module

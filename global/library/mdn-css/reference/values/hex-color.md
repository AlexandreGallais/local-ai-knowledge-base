---
title: "`<hex-color>` CSS type"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/values/hex-color/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `<hex-color>` CSS type

The **`<hex-color>`** CSS data type is a notation for describing the _hexadecimal color syntax_ of an sRGB color using its primary color components (red, green, blue) written as hexadecimal numbers, as well as its transparency.

A `<hex-color>` value can be used everywhere where a `<color>` can be used.

## Syntax

```plain
#RGB        // The three-value syntax
#RGBA       // The four-value syntax
#RRGGBB     // The six-value syntax
#RRGGBBAA   // The eight-value syntax
```

### Value

- `R` or `RR`
    The _red_ component of the color, as a case-insensitive hexadecimal number between `0` and `ff` (255). If there is only one number, it is duplicated: `1` means `11`.
- `G` or `GG`
    The _green_ component of the color, as a case-insensitive hexadecimal number between `0` and `ff` (255). If there is only one number, it is duplicated: `c` means `cc`.
- `B` or `BB`
    The _blue_ component of the color, as a case-insensitive hexadecimal number between `0` and `ff` (255). If there is only one number, it is duplicated: `9` means `99`.
- `A` or `AA` (optional)
    The _alpha_ component of the color, indicating its transparency, as a case-insensitive hexadecimal number between `0` and `ff` (255). If there is only one number, it is duplicated: `e` means `ee`. `0`, or `00`, represents a fully transparent color, and `f`, or `ff`, a fully opaque one.

> **Note:**
> The syntax is case-insensitive: `#00ff00` is the same as `#00FF00`.

## Examples

### Hexadecimal hot pink

This example includes four hot pink squares, with fully opaque or semi-transparent backgrounds created using four different-length case-insensitive hex-color syntaxes.

#### HTML

```html
<div>
  #F09
  <div class="c1"></div>
</div>
<div>
  #f09a
  <div class="c2"></div>
</div>
<div>
  #ff0099
  <div class="c3"></div>
</div>
<div>
  #FF0099AA
  <div class="c4"></div>
</div>
```

#### CSS

The hot pink background colors are created using the three-, four-, six-, and eight-value hex notations, using both uppercase and lowercase letters.

```css
body {
  display: flex;
  justify-content: space-evenly;
  font-family: monospace;
}
div {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
```

```css
[class] {
  width: 40px;
  height: 40px;
}
.c1 {
  background: #f09;
}
.c2 {
  background: #f09a;
}
.c3 {
  background: #ff0099;
}
.c4 {
  background: #ff0099aa;
}
```

#### Result

## See also

- `<color>` data type
- `named-color` data-type
- `rgb()` color function
- CSS color module

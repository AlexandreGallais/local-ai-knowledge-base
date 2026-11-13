---
title: "`font-variant-east-asian` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/font-variant-east-asian/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `font-variant-east-asian` CSS property

The **`font-variant-east-asian`** CSS property controls the use of alternate glyphs for East Asian scripts, like Japanese and Chinese.

```css
font-variant-east-asian: normal;
```

```css
font-variant-east-asian: ruby;
```

```css
font-variant-east-asian: jis78;
```

```css
font-variant-east-asian: proportional-width;
```

```html
<section id="default-example">
  <div id="example-element">
    <p>
      JIS78とJIS83以降では、檜と桧、籠と篭など、一部の文字の入れ替えが行われている。また、「唖然」や「躯体」などの書体が変更されている。
    </p>
  </div>
</section>
```

```css
section {
  font-family:
    "YuGothic Medium", "YuGothic", "Yu Gothic Medium", "Yu Gothic", sans-serif;
  margin-top: 10px;
  font-size: 1.5em;
}
```

## Syntax

```css
font-variant-east-asian: normal;
font-variant-east-asian: ruby;
font-variant-east-asian: jis78; /* <east-asian-variant-values> */
font-variant-east-asian: jis83; /* <east-asian-variant-values> */
font-variant-east-asian: jis90; /* <east-asian-variant-values> */
font-variant-east-asian: jis04; /* <east-asian-variant-values> */
font-variant-east-asian: simplified; /* <east-asian-variant-values> */
font-variant-east-asian: traditional; /* <east-asian-variant-values> */
font-variant-east-asian: full-width; /* <east-asian-width-values> */
font-variant-east-asian: proportional-width; /* <east-asian-width-values> */
font-variant-east-asian: ruby full-width jis83;

/* Global values */
font-variant-east-asian: inherit;
font-variant-east-asian: initial;
font-variant-east-asian: revert;
font-variant-east-asian: revert-layer;
font-variant-east-asian: unset;
```

### Values

This property is specified either as `normal` or `ruby` or as a space-separated list of the following values:

- `normal`
    This keyword leads to the deactivation of the use of such alternate glyphs.
- `ruby`
    This keyword forces the use of special glyphs for ruby characters. As these are usually smaller, font creators often designs specific forms, usually slightly bolder to improve the contrast. This keyword corresponds to the OpenType values `ruby`.
- `<east-asian-variant-values>`
    These values specify a set of logographic glyph variants which should be used for display. Possible values are:

    | Keyword       | Standard defining the glyphs                                                | OpenType equivalent |
    | ------------- | --------------------------------------------------------------------------- | ------------------- |
    | `jis78`       | JIS X 0208:1978  | `jp78`              |
    | `jis83`       | JIS X 0208:1983 | `jp83`              |
    | `jis90`       | JIS X 0208:1990  | `jp90`              |
    | `jis04`       | JIS X 0213:2004                 | `jp04`              |
    | `simplified`  | None, use the simplified Chinese glyphs                                     | `smpl`              |
    | `traditional` | None, use the traditional Chinese glyphs                                    | `trad`              |

- `<east-asian-width-values>`
    These values control the sizing of figures used for East Asian characters. Two values are possible:
    - `proportional-width` activating the set of East Asian characters which vary in width. It corresponds to the OpenType values `pwid`.
    - `full-width` activating the set of East Asian characters which are all of the same, roughly square, width metric. It corresponds to the OpenType values `fwid`.

## Examples

### Setting East Asian glyph variants

This example require font "Yu Gothic" installed in your OS, other fonts may not support OpenType features.

#### HTML

```html
<table>
  <thead></thead>
  <tbody>
    <tr>
      <th>normal/jis78:</th>
      <td>麹町</td>
      <td class="jis78">麹町</td>
    </tr>
    <tr>
      <th>normal/ruby:</th>
      <td>しんかんせん</td>
      <td class="ruby">しんかんせん</td>
    </tr>
    <tr>
      <th>normal/traditional:</th>
      <td>大学</td>
      <td class="traditional">大学</td>
    </tr>
  </tbody>
</table>
```

#### CSS

```css
tbody {
  border: 0;
}

td {
  font-family: "Yu Gothic", fantasy;
  font-size: 20px;
}
th {
  color: grey;
  padding-right: 10px;
}

.ruby {
  font-variant-east-asian: ruby;
}

.jis78 {
  font-variant-east-asian: jis78;
}

.traditional {
  font-variant-east-asian: traditional;
}
```

#### Result

## See also

- `font-variant`
- `font-variant-alternates`
- `font-variant-caps`
- `font-variant-emoji`
- `font-variant-ligatures`
- `font-variant-numeric`
- `font-variant-position`

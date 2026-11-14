---
title: "`ruby-position` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/ruby-position/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `ruby-position` CSS property

The **`ruby-position`** CSS property defines the position of a ruby element relative to its base element. It can be positioned over the element (`over`), under it (`under`), or to the right (`inter-character`).

```css
ruby-position: over;
```

```css
ruby-position: under;
```

```html
<section id="default-example">
  <ruby id="example-element"> 明日 <rp>(</rp><rt>Ashita</rt><rp>)</rp> </ruby>
</section>
```

```css
#example-element {
  font-size: 2em;
}
```

## Syntax

```css
/* Keyword values */
ruby-position: over;
ruby-position: under;
ruby-position: alternate;
ruby-position: alternate over;
ruby-position: alternate under;
ruby-position: inter-character;

/* Global values */
ruby-position: inherit;
ruby-position: initial;
ruby-position: revert;
ruby-position: revert-layer;
ruby-position: unset;
```

### Values

This property is specified as one of the following keyword values:

- `over`

    Is a keyword indicating that the ruby has to be placed over the main text for horizontal scripts and right to it for vertical scripts.
- `under`

    Is a keyword indicating that the ruby has to be placed under the main text for horizontal scripts and left to it for vertical scripts.
- `alternate`
    Is a keyword indicating that the ruby alternates between over and under, when there are multiple levels of annotation.
- `inter-character`
    Is a keyword indicating that the ruby annotation is placed to the right of the base text characters. This value is intended for bopomofo (zhuyin fuhao) ruby.

## Examples

### Ruby positioned over the text

#### HTML

```html
<ruby>
  <rb>超電磁砲</rb>
  <rp>（</rp><rt>レールガン</rt><rp>）</rp>
</ruby>
```

#### CSS

```css
ruby {
  ruby-position: over;
}
```

#### Result

### Ruby positioned under the text

#### HTML

```html
<ruby>
  <rb>超電磁砲</rb>
  <rp>（</rp><rt>レールガン</rt><rp>）</rp>
</ruby>
```

#### CSS

```css
ruby {
  ruby-position: under;
}
```

#### Result

### Ruby alternate

#### HTML

```html
<ruby>
  <rb>A</rb><rb>B</rb><rb>C</rb>
  <rtc>Above</rtc>
  <rtc>Below</rtc>
</ruby>
```

#### CSS

```css
ruby {
  ruby-position: alternate; /* this is also the initial value */
}
```

#### Result

## See also

- `<ruby>`, `<rt>`, `<rp>`, and `<rtc>` HTML elements
- `ruby-align`
- CSS ruby layout module

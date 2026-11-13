---
title: "`ruby-align` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/ruby-align/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `ruby-align` CSS property

The **`ruby-align`** CSS property defines the distribution of the different ruby elements over the base.

## Syntax

```css
/* Keyword values */
ruby-align: start;
ruby-align: center;
ruby-align: space-between;
ruby-align: space-around;

/* Global values */
ruby-align: inherit;
ruby-align: initial;
ruby-align: revert;
ruby-align: revert-layer;
ruby-align: unset;
```

### Values

This property is specified as one of the following keyword values:

- `start`
    Is a keyword indicating that the ruby will be aligned with the start of the base text.
- `center`
    Is a keyword indicating that the ruby will be aligned at the middle of the base text.
- `space-between`
    Is a keyword indicating that the extra space will be distributed between the elements of the ruby.
- `space-around`
    Is a keyword indicating that the extra space will be distributed between the elements of the ruby, and around it.

## Examples

### Ruby aligned at the start of the base text

#### HTML

```html
<ruby>
  <rb>This is a long text to check</rb>
  <rp>（</rp><rt>short ruby</rt><rp>）</rp>
</ruby>
```

#### CSS

```css
ruby {
  ruby-align: start;
}
```

#### Result

### Ruby aligned at the center of the base text

#### HTML

```html
<ruby>
  <rb>This is a long text to check</rb>
  <rp>（</rp><rt>short ruby</rt><rp>）</rp>
</ruby>
```

#### CSS

```css
ruby {
  ruby-align: center;
}
```

#### Result

### Extra space distributed between ruby elements

#### HTML

```html
<ruby>
  <rb>This is a long text to check</rb>
  <rp>（</rp><rt>short ruby</rt><rp>）</rp>
</ruby>
```

#### CSS

```css
ruby {
  ruby-align: space-between;
}
```

#### Result

### Extra space distributed between and around ruby elements

#### HTML

```html
<ruby>
  <rb>This is a long text to check</rb>
  <rp>（</rp><rt>short ruby</rt><rp>）</rp>
</ruby>
```

#### CSS

```css
ruby {
  ruby-align: space-around;
}
```

#### Result

## See also

- `ruby-position`
- CSS ruby layout module
- HTML Ruby elements: `<ruby>`, `<rt>`, `<rp>`, and `<rtc>`

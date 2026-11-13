---
title: "`text-emphasis-style` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/text-emphasis-style/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `text-emphasis-style` CSS property

The **`text-emphasis-style`** CSS property sets the appearance of emphasis marks. It can also be set, and reset, using the `text-emphasis` shorthand.

```css
text-emphasis-style: none;
```

```css
text-emphasis-style: triangle;
```

```css
text-emphasis-style: "x";
```

```css
text-emphasis-style: filled double-circle;
```

```html
<section id="default-example">
  <p>
    I'd far rather be
    <span class="transition-all" id="example-element">happy than right</span>
    any day.
  </p>
</section>
```

```css
p {
  font: 1.5em sans-serif;
}
```

## Syntax

```css
/* Initial value */
text-emphasis-style: none; /* No emphasis marks */

/* <string> values */
text-emphasis-style: "x";
text-emphasis-style: "\25B2";
text-emphasis-style: "*";

/* Keyword values */
text-emphasis-style: filled;
text-emphasis-style: open;
text-emphasis-style: dot;
text-emphasis-style: circle;
text-emphasis-style: double-circle;
text-emphasis-style: triangle;
text-emphasis-style: filled sesame;
text-emphasis-style: open sesame;

/* Global values */
text-emphasis-style: inherit;
text-emphasis-style: initial;
text-emphasis-style: revert;
text-emphasis-style: revert-layer;
text-emphasis-style: unset;
```

### Values

- `none`
    No emphasis marks.
- `filled`
    The shape is filled with solid color. If neither `filled` nor `open` is present, this is the default.
- `open`
    The shape is hollow.
- `dot`
    Display small circles as marks. The filled dot is `'•'` (`U+2022`), and the open dot is `'◦'` (`U+25E6`).
- `circle`
    Display large circles as marks. The filled circle is `'●'` (`U+25CF`), and the open circle is `'○'` (`U+25CB`).
- `double-circle`
    Display double circles as marks. The filled double-circle is `'◉'` (`U+25C9`), and the open double-circle is `'◎'` (`U+25CE`).
- `triangle`
    Display triangles as marks. The filled triangle is `'▲'` (`U+25B2`), and the open triangle is `'△'` (`U+25B3`).
- `sesame`
    Display sesames as marks. The filled sesame is `'﹅'` (`U+FE45`), and the open sesame is `'﹆'` (`U+FE46`).
- `<string>`
    Display the given string as marks. Authors should not specify more than one _character_ in `<string>`. The UA may truncate or ignore strings consisting of more than one grapheme cluster.

## Examples

### Basic <example-value>

```css
h2 {
  -webkit-text-emphasis-style: sesame;
  text-emphasis-style: sesame;
}
```

## See also

- The related properties `text-emphasis-color`, `text-emphasis`.
- The `text-emphasis-position` property allowing you to define the position of the emphasis marks.

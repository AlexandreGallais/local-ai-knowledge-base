---
title: "`text-emphasis` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/text-emphasis/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `text-emphasis` CSS property

The **`text-emphasis`** CSS shorthand property applies emphasis marks to text (except spaces and control characters).

```css
text-emphasis: none;
```

```css
text-emphasis: filled red;
```

```css
text-emphasis: "x";
```

```css
text-emphasis: filled double-circle #ffb703;
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

The `text-emphasis` property is quite different from `text-decoration`. The `text-decoration` property does not inherit, and the decoration specified is applied across the whole element. However, text-emphasis does inherit, which means it is possible to change emphasis marks for descendants.

The size of the emphasis symbol, like ruby symbols, is about 50% of the size of the font, and `text-emphasis` may affect line height when the current leading is not enough for the marks.

> **Note:**
> `text-emphasis` doesn't reset the value of `text-emphasis-position`. This is because if the style and the color of emphasis marks may vary in a text, it is extremely unlikely that their position will. In the very rare cases when this is needed, use the property `text-emphasis-position`.

## Constituent properties

This property is a shorthand for the following CSS properties:

- `text-emphasis-color`
- `text-emphasis-style`

## Syntax

```css
/* Initial value */
text-emphasis: none; /* No emphasis marks */

/* <string> value */
text-emphasis: "x";
text-emphasis: "点";
text-emphasis: "\25B2";
text-emphasis: "*" #555555;
text-emphasis: "foo"; /* Should NOT use. It may be computed to or rendered as 'f' only */

/* Keywords value */
text-emphasis: filled;
text-emphasis: open;
text-emphasis: filled sesame;
text-emphasis: open sesame;

/* Keywords value combined with a color */
text-emphasis: filled sesame #555555;

/* Global values */
text-emphasis: inherit;
text-emphasis: initial;
text-emphasis: revert;
text-emphasis: revert-layer;
text-emphasis: unset;
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
    Display large circles as marks. The filled circle is `'●'` (`U+25CF`), and the open circle is `'○'` (`U+25CB`). This is the default shape in horizontal writing modes when no other shape is given.
- `double-circle`
    Display double circles as marks. The filled double-circle is `'◉'` (`U+25C9`), and the open double-circle is `'◎'` (`U+25CE`).
- `triangle`
    Display triangles as marks. The filled triangle is `'▲'` (`U+25B2`), and the open triangle is `'△'` (`U+25B3`).
- `sesame`
    Display sesames as marks. The filled sesame is `'﹅'` (`U+FE45`), and the open sesame is `'﹆'` (`U+FE46`). This is the default shape in vertical writing modes when no other shape is given.
- `<string>`
    Display the given string as marks. Authors should not specify more than one _character_ in `<string>`. The UA may truncate or ignore strings consisting of more than one grapheme cluster.
- `<color>`
    Defines the color of the mark. If no color is present, it defaults to `currentColor`.

## Examples

### A heading with emphasis shape and color

This example draws a heading with triangles used to emphasize each character.

#### HTML

```html
<h2>This is important!</h2>
```

#### CSS

```css
h2 {
  text-emphasis: triangle #dd5555;
}
```

#### Result

## See also

- The longhand properties `text-emphasis-style`, `text-emphasis-color`.
- The `text-emphasis-position` property allowing you to define the position of the emphasis marks.

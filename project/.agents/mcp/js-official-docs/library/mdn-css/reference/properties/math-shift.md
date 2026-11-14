---
title: "`math-shift` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/math-shift/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `math-shift` CSS property

The `math-shift` property indicates whether superscripts inside MathML formulas should be raised by a normal or compact shift.

## Syntax

```css
/* Keyword values */
math-shift: normal;
math-shift: compact;

/* Global values */
math-shift: inherit;
math-shift: initial;
math-shift: revert;
math-shift: revert-layer;
math-shift: unset;
```

### Values

This property is specified as one of the following keyword values:

- `normal`
    The initial value, indicates normal rendering. Superscripts in MathML formulas use the superscriptShiftUp parameter from the OpenType MATH table.
- `compact`
    Indicates compact rendering. Superscripts in MathML formulas use the superscriptShiftUpCramped parameter from the OpenType MATH table, which is generally smaller.

## Examples

### Normal and compact shift

The following MathML displays two versions of "x squared" using a font with an OpenType MATH table.
The `math-shift` property is used to raise the superscripts using the `normal` and `compact` shift.

#### CSS

```css
math {
  font-size: 64pt;
  math-shift: normal;
}

.compact-shift {
  math-shift: compact;
}
```

#### MathML

```html
<math>
  <msup>
    <mi>x</mi>
    <mn>2</mn>
  </msup>
  <msup class="compact-shift">
    <mi>x</mi>
    <mn>2</mn>
  </msup>
</math>
```

#### Results

Note that the second "2" has a more compact (lower) shift.

## See also

- `math-depth`
- `font-size`

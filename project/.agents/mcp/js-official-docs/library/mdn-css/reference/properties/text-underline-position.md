---
title: "`text-underline-position` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/text-underline-position/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `text-underline-position` CSS property

The **`text-underline-position`** CSS property specifies the position of the underline which is set using the `text-decoration` property's `underline` value.

```css
text-underline-position: auto;
```

```css
text-underline-position: under;
```

```html
<section id="default-example">
  <p>
    <span class="transition-all" id="example-element"
      >C<sub>8</sub>H<sub>10</sub>N<sub>4</sub>O<sub>2</sub></span
    >
    is the chemical formula for caffeine.
  </p>
</section>
```

```css
p {
  font: 1.5em sans-serif;
}

#example-element {
  text-decoration-line: underline;
}
```

## Syntax

```css
/* Single keyword */
text-underline-position: auto;
text-underline-position: under;
text-underline-position: left;
text-underline-position: right;

/* Multiple keywords */
text-underline-position: under left;
text-underline-position: right under;

/* Global values */
text-underline-position: inherit;
text-underline-position: initial;
text-underline-position: revert;
text-underline-position: revert-layer;
text-underline-position: unset;
```

### Values

This property is specified as one of the following keyword values:

- `auto`
    The user agent uses its own algorithm to place the line at or under the alphabetic baseline.
- `from-font`
    If the font file includes information about a preferred position, use that value. If the font file doesn't include this information, behave as if `auto` was set, with the browser choosing an appropriate position.
- `under`
    Forces the line to be set below the alphabetic baseline, at a position where it won't cross any descenders. This is useful for ensuring legibility with chemical and mathematical formulas, which make a large use of subscripts.
- `left`
    In vertical writing-modes, this keyword forces the line to be placed on the _left_ side of the text. In horizontal writing-modes, it is a synonym of `auto`.
- `right`
    In vertical writing-modes, this keyword forces the line to be placed on the _right_ side of the text. In horizontal writing-modes, it is a synonym of `auto`.

## Examples

### A basic <example-value>

We create two example paragraphs:

```html
<p class="horizontal">
  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam consectetur ac
  turpis vel laoreet. Nullam volutpat pharetra lorem, sit amet feugiat tortor
  volutpat quis. Nam eget sodales quam. Aliquam accumsan tellus ac erat posuere.
</p>

<p class="vertical">
  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam consectetur ac
  turpis vel laoreet. Nullam volutpat pharetra lorem, sit amet feugiat tortor
  volutpat quis. Nam eget sodales quam. Aliquam accumsan tellus ac erat posuere.
</p>
```

Our CSS looks like this:

```css
p {
  font-size: 1.5rem;
  text-transform: capitalize;
  text-decoration: underline;
  text-decoration-thickness: 2px;
}

.horizontal {
  text-underline-position: under;
}

.vertical {
  writing-mode: vertical-rl;
  text-underline-position: left;
}
```

In this example we set both the paragraphs to have a thick underline. In the horizontal text we use `text-underline-position: under;` to put the underline below all the descenders.

In the text with a vertical `writing-mode` set, we can then use values of `left` or `right` to make the underline appear on the left or right of the text as required.

The live example looks like this:

### Setting text-underline-position globally

Because the `text-underline-position` property inherits and is not reset by the `text-decoration` shorthand property, it may be appropriate to set its value at a global level. For example, the `under` value may be appropriate for a document with lots of chemical and mathematical formulas, which make a large use of subscripts.

```css
:root {
  text-underline-position: under;
}
```

## See also

- The `text-decoration` property is a shorthand for setting most text-decoration properties, including `text-decoration-line`, `text-decoration-color`, and `text-decoration-style`. However, it does not set `text-underline-position`.

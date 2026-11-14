---
title: "`text-decoration-inset` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/text-decoration-inset/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `text-decoration-inset` CSS property

The **`text-decoration-inset`** CSS property enables adjusting the start and end points of an element's text decoration so it can be shortened, lengthened, or have its position shifted with respect to the rendered text.

```css
text-decoration-inset: 20px;
```

```css
text-decoration-inset: -0.5em;
```

```css
text-decoration-inset: 20px 1em;
```

```css
text-decoration-inset: -0.5rem -1.5rem;
```

```css
text-decoration-inset: -2ex 10vw;
```

```html
<section id="default-example">
  <p id="example-element">Karmadrome</p>
</section>
```

```css
#example-element {
  font: 2.5em sans-serif;
  text-decoration: underline 0.3em limegreen;
}
```

## Syntax

```css
/* auto keyword */
text-decoration-inset: auto;

/* One <length> value */
text-decoration-inset: 20px;
text-decoration-inset: -2rem;
text-decoration-inset: 5%;

/* Two <length> values */
text-decoration-inset: 20px 1em;
text-decoration-inset: -0.5rem -1.5rem;
text-decoration-inset: -2ex 1vw;
text-decoration-inset: -5% -5%;

/* Global values */
text-decoration-inset: inherit;
text-decoration-inset: initial;
text-decoration-inset: revert;
text-decoration-inset: revert-layer;
text-decoration-inset: unset;
```

### Values

This property is specified as one or two of the following value or the keyword `auto`:

- `length-percentage`
    Specifies the amount to adjust the text decoration position by. Positive values inset the text decoration (make it shorter) while negative values outset the text decoration (make it longer). If one value is specified, it applies to both the text decoration start and end points. If two values are specified, the first one applies to the text decoration start point and the second one applies to the text decoration end point. Percentage values either refer to the total inline size of the decorating box if `box-decoration-break` is set to `slice`, or to the inline size of each individual box fragment, if it is set to `clone`.
- `auto`
    The browser chooses a start and end inset amount to ensure that, if two decorated text boxes appear side-by-side, the appearance of a gap is created between their text decorations so they do not appear to have a single text decoration.

## Description

By default, an element's text decoration, as set by the `text-decoration` shorthand and associated longhand properties, is the same size as the rendered text.

The `text-decoration-inset` property allows you to adjust the start and/or end points of a text container's text decoration. This is useful for creating effects where you want the text decoration to be inset or outset from the text itself, or shifted in position. See Basic use cases for an example of each.

A single `<length-percentage>` value will set the inset (if positive) or outset (if negative) on the start and end positions of the text decoration. To set the start and end positions separately, you can use two `<length-percentage>` values — the first one applies to the start position of the text decoration and the second one applies to the end.

> **Note:**
> A percentage value depends on the value of `box-decoration-break`, if it is set to `slice` (the initial value) it refers to the inline size of the decorating box or if it is set to `clone` it refers to each individual box fragment.

The `text-decoration-inset` property can also take the `auto` keyword. This causes the browser to inset the text decoration start and end points to ensure that, if two decorated text boxes appear side-by-side, they do not appear to have a single text decoration. The `auto` value is particularly important when rendering Chinese text, where underlining is used to punctuate proper nouns, and adjacent proper nouns should have separate underlines. See Effect of the `auto` value for an example.

The `auto` value does not have the same effect as the initial value `0`. Setting `text-decoration-inset` to `0` causes there to be no space between decorations.

The `text-decoration-inset` property is not inherited, and it is not a constituent property of the `text-decoration` shorthand.

## Examples

### Basic use cases

In this example, we demonstrate the outset, inset, and "shifted" use cases.

#### HTML

We define an unordered list with three list items, each with a separate `id`.

```html
<ul>
  <li id="one">Outset decoration</li>
  <li id="two">Inset decoration</li>
  <li id="three">Shifted decoration</li>
</ul>
```

#### CSS

We give each list item a different `text-decoration` and `text-decoration-inset`:

- The first one has a thick lime green underline, which is outset equally by `10px` on both sides.
- The second one has a medium thickness white strike-through, which is inset equally by `0.5em` on both sides.
- The third one has a thin wavy blue underline, which is moved to the right by `1em`.

```css
li {
  font-family: sans-serif;
  font-size: 2em;
  margin-bottom: 20px;
}

@supports not (text-decoration-inset: auto) {
  body::before {
    content: "Your browser doesn't support the text-decoration-inset property.";
    background-color: wheat;
    display: block;
    text-align: center;
    padding: 1rem 0;
  }
}
```

```css
#one {
  text-decoration: underline 0.3em limegreen;
  text-decoration-inset: -10px;
}

#two {
  text-decoration: line-through 5px white;
  text-decoration-inset: 0.5em;
}

#three {
  text-decoration: underline wavy 2px blue;
  text-decoration-inset: 1em -1em;
}
```

#### Result

This renders like so:

### Effect of the `auto` value

This example demonstrates the effect of the `text-decoration-inset: auto` value.

#### HTML

We define two groups of side-by-side `` elements:

```html
<p lang="zh" id="one"><u>石井</u><u>艾俐俐</u></p>

<p lang="zh" id="two"><u>石井</u><u>艾俐俐</u></p>
```

#### CSS

Each `` element has a `red` color and `3px` thickness set on its underline. The first group of `` elements has a `text-decoration-inset` value of `auto` set on them, while the second set has the initial `text-decoration-inset` value of `0` explicitly set on them, for comparison purposes:

```css
u {
  font-family: sans-serif;
  font-size: 2em;
}

@supports not (text-decoration-inset: auto) {
  body::before {
    content: "Your browser doesn't support the text-decoration-inset property.";
    background-color: wheat;
    display: block;
    text-align: center;
    padding: 1rem 0;
  }
}
```

```css
u {
  text-decoration-color: red;
  text-decoration-thickness: 3px;
}

#one u {
  text-decoration-inset: auto;
}

#two u {
  text-decoration-inset: 0;
}
```

#### Result

This renders like so:

Note how the `auto` value insets the text decoration subtly on both sides, creating a gap in between the underlines of the two elements (no space is added between the two elements themselves). The `0` value results in no gap.

## See also

- `text-decoration`
- The CSS text decoration module

---
title: "`<sub>` HTML subscript element"
tool: "mdn-html"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/html/reference/elements/sub/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `<sub>` HTML subscript element

The **``** HTML element specifies inline text which should be displayed as subscript for solely typographical reasons. Subscripts are typically rendered with a lowered baseline using smaller text.

```html
<p>
  Almost every developer's favorite molecule is
  C<sub>8</sub>H<sub>10</sub>N<sub>4</sub>O<sub>2</sub>, also known as
  "caffeine."
</p>
```

```css
p {
  font:
    1rem "Fira Sans",
    sans-serif;
}
```

## Attributes

This element only includes the global attributes.

## Usage notes

The `` element should be used only for typographical reasons—that is, to change the position of the text to comply with typographical conventions or standards, rather than solely for presentation or appearance purposes.

For example, using `` to style the name of a company which uses altered baselines in their wordmark would not be appropriate; instead, CSS should be used. For example, you could use the `vertical-align` property with a declaration like `vertical-align: sub` or, to more precisely control the baseline shift, `vertical-align: -25%`.

Appropriate use cases for `` include (but aren't necessarily limited to):

- Marking up footnote numbers. See Footnote numbers for an example.
- Marking up the subscript in mathematical variable numbers (although you may also consider using a MathML formula for this). See Variable subscripts.
- Denoting the number of atoms of a given element within a chemical formula (such as every developer's best friend, C8H10N4O2, otherwise known as "caffeine"). See Chemical formulas.

## Examples

### Footnote numbers

Traditional footnotes are denoted using numbers which are rendered in subscript. This is a common use case for ``:

```html
<p>
  According to the computations by Nakamura, Johnson, and Mason<sub>1</sub> this
  will result in the complete annihilation of both particles.
</p>
```

#### Result

### Variable subscripts

In mathematics, families of variables related to the same concept (such as distances along the same axis) are represented using the same variable name with a subscript following. For example:

```html
<p>
  The horizontal coordinates' positions along the X-axis are represented as
  <var>x<sub>1</sub></var> … <var>x<sub>n</sub></var>.
</p>
```

#### Result

### Chemical formulas

When writing a chemical formula, such as H2O, the number of atoms of a given element within the described molecule is represented using a subscripted number; in the case of water, the subscripted "2" indicates that there are two atoms of hydrogen in the molecule.

Another example:

```html
<p>
  Almost every developer's favorite molecule is
  C<sub>8</sub>H<sub>10</sub>N<sub>4</sub>O<sub>2</sub>, which is commonly known
  as "caffeine."
</p>
```

#### Result

## Technical summary

       |
        Content categories

       |
        Flow content,
        phrasing content, palpable content.

       | Permitted content
       |
        Phrasing content.

       | Tag omission
       | None, both the starting and ending tag are mandatory.

       | Permitted parents
       |
        Any element that accepts
        phrasing content.

       | Implicit ARIA role
       |
        <code
          >subscript</code
        >

       | Permitted ARIA roles
       | Any

       | DOM interface
       | `HTMLElement`

## See also

- The `` HTML element that produces superscript. Note that you cannot use `sup` and `sub` both at the same time: you need to use MathML to produce both a superscript directly above a subscript next to the chemical symbol of an element, representing its atomic number and its nuclear number.
- The `<msub>`, `<msup>`, and `<msubsup>` MathML elements.
- The CSS `vertical-align` property.

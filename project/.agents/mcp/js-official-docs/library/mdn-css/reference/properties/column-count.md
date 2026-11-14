---
title: "`column-count` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/column-count/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `column-count` CSS property

The **`column-count`** CSS property breaks an element's content into the specified number of columns.

```css
column-count: 2;
```

```css
column-count: 3;
```

```css
column-count: 4;
```

```css
column-count: auto;
column-width: 8rem;
```

```html
<section id="default-example">
  <p id="example-element">
    London. Michaelmas term lately over, and the Lord Chancellor sitting in
    Lincoln's Inn Hall. Implacable November weather. As much mud in the streets
    as if the waters had but newly retired from the face of the earth, and it
    would not be wonderful to meet a Megalosaurus, forty feet long or so,
    waddling like an elephantine lizard up Holborn Hill.
  </p>
</section>
```

```css
#example-element {
  width: 100%;
  text-align: left;
}
```

## Syntax

```css
/* Keyword value */
column-count: auto;

/* <integer> value */
column-count: 3;

/* Global values */
column-count: inherit;
column-count: initial;
column-count: revert;
column-count: revert-layer;
column-count: unset;
```

### Values

This property is specified as a single value from the following list:

- `auto`
    The number of columns is determined by other CSS properties, such as `column-width`.
- `<integer>`
    Is a strictly positive `<integer>` describing the ideal number of columns into which the content of the element will be flowed. If the `column-width` is also set to a non-`auto` value, it merely indicates the maximum allowed number of columns.

## Description

Setting the `column-count` to a value greater than `1` creates a multi-column layout. The element's content will be evenly distributed between the specified number of columns.

The `column-count` property, along with the `column-height` and `column-width` properties, can also be set by using the `columns` shorthand.

## Examples

### Splitting a paragraph across three columns

#### HTML

```html
<p class="content-box">
  This is a bunch of text split into three columns using the CSS
  <code>column-count</code>
  property. The text is equally distributed over the columns.
</p>
```

#### CSS

```css
.content-box {
  column-count: 3;
}
```

#### Result

## See also

- `column-height`
- `column-width`
- `columns` shorthand
- `column-rule-color`, `column-rule-style`, `column-rule-width`, `column-rule` shorthand
- Learn: Multiple-column Layout (Learn Layout)
- Basic <example-value> of Multicol

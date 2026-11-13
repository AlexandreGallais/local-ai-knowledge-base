---
title: "`column-width` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/column-width/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `column-width` CSS property

The **`column-width`** CSS property sets the ideal column width in a multi-column layout.

```css
column-width: auto;
```

```css
column-width: 6rem;
```

```css
column-width: 120px;
```

```css
column-width: 18ch;
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
  columns: auto;
  text-align: left;
}
```

## Syntax

```css
/* Keyword value */
column-width: auto;

/* <length> values */
column-width: 60px;
column-width: 15.5em;
column-width: 3.3vw;

/* Global values */
column-width: inherit;
column-width: initial;
column-width: revert;
column-width: revert-layer;
column-width: unset;
```

### Values

This property is specified as one of the following values:

- `<length>`
    Indicates the optimal column width. The actual column width may differ from the specified value: it may be wider when necessary to fill available space, and narrower when the available space is too small. The value must be strictly positive or the declaration is invalid. Percentage values are also invalid.
- `auto`
    The width of the column is determined by other CSS properties, such as `column-count`.

## Description

The `column-width` property specifies the preferred column width in a multi-column layout. The container will have as many columns as can fit without any of them having a width less than the `column-width` value. If the width of the container is narrower than the specified value, the single column's width will be smaller than the declared column width.

This property can help you create responsive designs that fit different screen sizes. Especially in the presence of the `column-count` property (which has precedence), you must specify all related length values to achieve an exact column width. In horizontal text, these are `width`, `column-width`, `column-gap`, and `column-rule-width`.

The `column-width` property, along with the `column-height` and `column-count` properties, can also be set by using the `columns` shorthand.

## Examples

### Setting column width in pixels

#### HTML

```html
<p class="content-box">
  Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy
  nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi
  enim ad minim veniam, quis nostrud exercitation ullamcorper suscipit lobortis
  nisl ut aliquip ex ea commodo consequat.
</p>
```

#### CSS

```css
.content-box {
  column-width: 100px;
}
```

#### Result

## See also

- `column-count`
- `column-height`
- `columns` shorthand
- Learn: Multiple-column Layout (Learn Layout)
- Basic <example-value> of Multicol

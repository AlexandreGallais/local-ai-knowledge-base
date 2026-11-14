---
title: "`column-gap` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/column-gap/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `column-gap` CSS property

The **`column-gap`** CSS property sets the size of the gap (gutter) between an element's columns in multi-column, flexible box, and grid layouts.

```css
column-gap: 0;
```

```css
column-gap: 10%;
```

```css
column-gap: 1em;
```

```css
column-gap: 20px;
```

```html
<section class="default-example" id="default-example">
  <div class="example-container">
    <div class="transition-all" id="example-element">
      <div>One</div>
      <div>Two</div>
      <div>Three</div>
      <div>Four</div>
      <div>Five</div>
    </div>
  </div>
</section>
```

```css
#example-element {
  border: 1px solid #c5c5c5;
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 200px;
}

#example-element > div {
  background-color: rgb(0 0 255 / 0.2);
  border: 3px solid blue;
}
```

## Syntax

```css
/* Keyword value */
column-gap: normal;

/* <length-percentage> value */
column-gap: 3px;
column-gap: 2.5em;
column-gap: 3%;
column-gap: calc(3% - 6px);

/* <line-width> keyword value */
column-gap: thin;
column-gap: medium;
column-gap: thick;

/* Global values */
column-gap: inherit;
column-gap: initial;
column-gap: revert;
column-gap: revert-layer;
column-gap: unset;
```

### Values

This property is specified as a single value from the following list:

- `normal`
    For multi-column layout, sets the gap to `1em`; otherwise `0`. This is the default value.
- `<line-width>`
    Sets the size of the gap using the keywords `thin`, `medium`, or `thick`, or a positive `length` value.
- `length-percentage`
    Sets a non-negative `<length>` or `<percentage>` value. Percentages are relative to the inline-size of the content box.

## Description

The `column-gap` property sets the size of the gap between an element's columns. The property specifies a fixed-length gutter between items in a container, separating boxes in the container's inline axis. Negative values are invalid. Column gaps in multi-col containers are `1em` wide by default, while no gap is added between grid columns or flex items or rows. See Defining CSS gaps for more information about gaps by layout type.

Percentages are calculated against the content box size of the container element's inline axis when this size is definite, against `0` otherwise, except in grid layout, for which cyclic percentage sizes resolve against zero for determining intrinsic size contributions but resolve against the element's content box when laying out the contents. See Specifying gap values as percentages for more information.

The column gap may contain a visible separator as a gap decoration. To draw a rule between the columns, use the `column-rule` or the `rule` shorthand. The rule appears in the middle of the gap but has no effect on the size of the gap between the columns.

The `column-gap` property, along with the `row-gap` property, can also be set by using the `gap` shorthand, which sets both `row-gap` and `column-gap` in one declaration, in that order.

The `column-gap` property replaced the `grid-column-gap` property, which was initially defined in CSS grid layout for creating gaps between grid columns. `grid-column-gap` is now an alias for `column-gap`.

## Examples

### Flex layout

This example demonstrates using the `column-gap` property to create horizontal space between adjacent flex items.

#### HTML

We include six items in a container element:

```html
<div class="flexbox">
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
</div>
```

#### CSS

We set the `display` property to `flex` and the `flex-flow` property to `row wrap` to create a flex container with rows of items. This allows the items to flow onto new lines if needed. The flex items are each given a flex basis of either `200px` or `300px`.

We define a column rule with the `column-rule` property. The `column-gap` value is set to `20px` on the flex container, creating a `20px` gap between the adjacent flex items in each row. The column rule is drawn in the middle of the gap.

```css
.flexbox {
  display: flex;
  flex-flow: row wrap;
  column-rule: 1px solid magenta;

  column-gap: 20px;
}

.flexbox > div {
  border: 1px solid green;
  background-color: lime;
  height: 35px;
  flex: 200px;
}
div:nth-of-type(3n) {
  flex: 300px;
}
```

#### Result

To set vertical space between flex rows, specify a non-zero value for the `row-gap` property, optionally setting both `row-gap` and `column-gap` by using the `gap` shorthand.

### Grid layout

This example demonstrates using the `column-gap` property with a `<percentage>` value in a grid layout. It also demonstrates how the `column-gap` size is not affected by the size of the column rule.

#### HTML

We include seven items in a container element:

```html
<div id="grid">
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
</div>
```

#### CSS

We set the `display` to `grid`, the `width` to `400px` and the `grid-template-columns` to `repeat(3, 1fr)` to create a 400px-wide grid container with three columns and as many rows as needed. Each row is `100px` tall, as defined by the `grid-auto-rows` property. Every odd grid item has a `lime` background color and the even grid items are semi-opaque.

We've also set a very wide, semi-opaque `column-rule` to demonstrate how the rule is painted behind the content, with the width of the rule having no impact on the size of the gap. The `column-gap` is set to `5%`, which creates a gap that is `20px` wide.

```css
#grid {
  display: grid;
  width: 400px;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: 100px;
  column-rule: 30px solid #ff00ff33;

  column-gap: 5%;
}

#grid > div {
  outline: 1px solid green;
  background-color: lime;
}
#grid > div:nth-of-type(even) {
  background-color: #00ff0033;
}
```

```css
@layer no-support {
  @supports not (column-gap: 5%) {
    body::before {
      content: "Your browser doesn't support percent values";
      background-color: wheat;
      display: block;
      text-align: center;
      padding: 1rem 0;
    }
  }
}
```

#### Result

The column rule is wider than the column gap, and is visible only where the items drawn on top are semi-transparent.

### Multi-column layout

This example demonstrates using the `column-gap` property with a `<line-width>` keyword value in a multi-col layout.

#### HTML

```html
<p class="content-box">
  This is some multi-column text with a thin column gap created with the CSS
  `column-gap` property. The `normal` default value for the `column-gap`
  property in multi-col layout is 1em.
</p>
```

#### CSS

```css
.content-box {
  column-count: 3;
  column-gap: thin;
}
```

```css
@layer no-support {
  @supports not (column-gap: thick) {
    body::before {
      content: "Your browser doesn't support the <line-width> keyword values";
      background-color: wheat;
      display: block;
      text-align: center;
      padding: 1rem 0;
    }
  }
}
```

#### Result

## See also

- `row-gap`
- `gap`
- `column-rule`
- `rule`
- Defining CSS gaps
- Basic <example-value> of grid layout: gutters
- Styling Columns
- CSS gaps module

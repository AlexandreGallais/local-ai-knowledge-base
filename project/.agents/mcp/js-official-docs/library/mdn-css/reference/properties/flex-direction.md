---
title: "`flex-direction` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/flex-direction/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `flex-direction` CSS property

The **`flex-direction`** CSS property sets how flex items are placed in the flex container defining the main axis and the direction (normal or reversed).

```css
flex-direction: row;
```

```css
flex-direction: row-reverse;
```

```css
flex-direction: column;
```

```css
flex-direction: column-reverse;
```

```html
<section class="default-example" id="default-example">
  <div class="transition-all" id="example-element">
    <div>Item One</div>
    <div>Item Two</div>
    <div>Item Three</div>
  </div>
</section>
```

```css
#example-element {
  border: 1px solid #c5c5c5;
  width: 80%;
  display: flex;
}

#example-element > div {
  background-color: rgb(0 0 255 / 0.2);
  border: 3px solid blue;
  width: 60px;
  margin: 10px;
}
```

## Syntax

```css
/* Keyword values */
flex-direction: row;
flex-direction: row-reverse;
flex-direction: column;
flex-direction: column-reverse;

/* Global values */
flex-direction: inherit;
flex-direction: initial;
flex-direction: revert;
flex-direction: revert-layer;
flex-direction: unset;
```

### Values

This property is specified as one of the following keyword values:

- `row`
    Specifies the flex container's main-axis to be the same as the text direction. This is the default value.
- `row-reverse`
    Behaves the same as `row` but specifies the content direction to be inverted, with the first item placed at the inline-end edge.
- `column`
    Specifies the flex container's main-axis to be the same as the block-axis.
- `column-reverse`
    Behaves the same as `column` but specifies the content direction to be inverted, with the first item placed at the block-end edge.

## Description

The `flex-direction` property enables you to define how flex items are placed in a flex container by setting the container's main axis and the direction of the flex items. This property is relevant only on container elements that have their `display` property set to `flex` or `inline-flex`. The `flex-direction` property, along with the `flex-wrap` property, should be set using the `flex-flow` shorthand.

When set on a flex container, the `flex-direction` property defines whether the flex items are laid out in the same direction or perpendicular to the text direction, and whether the items are laid out normally or reversed.

The default value is `row`. By default, or when `row` is explicitly set, the flex container's main-axis is defined to be the same as the text direction. The first flex item in the DOM order is placed at the inline-start and block start edges. Additional items are placed at the previous item's inline-end edge. Additional rows, if the container is set to wrap with `flex-wrap: wrap`, are added on the block-end edge. The **main-start** and **main-end** points are the same as the content direction, with main-start being the inline-start edge and the main-end being the inline-end edge, and cross-start and cross-end being the block-start and block-end edges, respectively.

The `row-reverse` value is used to change the inline-direction, behaving like `row`, but reversed. The first item is placed at the inline-end and block-start edges, with subsequent flex items being placed at the previous item's inline-start edge, and additional rows added on the block-end edge. The main-start and main-end points are the same as the inline-end and inline-start ends of the writing-mode, respectively, and cross-start and cross-end are the block-start and block-end edges, respectively.

When `flex-direction` is set to `column`, the main axis is the block axis. As with `row`, the first item is placed at the inline-start and block-start edges, but additional items are placed at the previous item's block-end edge rather than the inline edge. If set to be able to wrap, additional columns are added on the inline-end edge. The **main-start** and **main-end** points are based on the block direction of the writing mode, with main-start being the block-start edge and the main-end being the block-end edge, and cross-start and cross-end being the inline-start and inline-end edges, respectively.

With `column-reverse`, the main axis is the block axis, but starting at the block-end edge. The first item is placed at the inline-start and block-end edges, with subsequent items placed at the previous item's block-start edge. If set to be able to wrap, additional columns are added on the inline-end edge. The **main-start** and **main-end** points are based on the block direction of the writing mode, with main-start being the block-end edge and the main-end being the block-start edge, and cross-start and cross-end being the inline-start and inline-end edges, respectively.

The values `row` and `row-reverse` are affected by the directionality of the flex container. If its `dir` attribute is `ltr`, `row` represents the horizontal axis oriented from the left to the right, and `row-reverse` from the right to the left; if the `dir` attribute is `rtl`, `row` represents the axis oriented from the right to the left, and `row-reverse` from the left to the right.

## Accessibility

Using the `flex-direction` property with values of `row-reverse` or `column-reverse` will create a disconnect between the visual presentation of content and DOM order. This will adversely affect the experience of users with low vision navigating the page with the aid of assistive technology such as a screen reader. If the visual (CSS) order is important, then screen reader users will not have access to the correct reading order.

- Source Order Matters by Adrian Roselli (2015)
- Flexbox & the keyboard navigation disconnect by Léonie Watson (2016)
- Understanding SC 1.3.2: Meaningful Sequence via WCAG 2.2 (2023)

## Examples

### Reversing flex container columns and rows

#### HTML

```html
<h4>This is a Column-Reverse</h4>
<div id="col-rev" class="content">
  <div class="box red">A</div>
  <div class="box lightblue">B</div>
  <div class="box yellow">C</div>
</div>
<h4>This is a Row-Reverse</h4>
<div id="row-rev" class="content">
  <div class="box red">A</div>
  <div class="box lightblue">B</div>
  <div class="box yellow">C</div>
</div>
```

#### CSS

```css
.content {
  width: 200px;
  height: 200px;
  border: 1px solid #c3c3c3;
  display: flex;
}

.box {
  width: 50px;
  height: 50px;
}

#col-rev {
  flex-direction: column-reverse;
}

#row-rev {
  flex-direction: row-reverse;
}

.red {
  background-color: red;
}

.lightblue {
  background-color: lightblue;
}

.yellow {
  background-color: yellow;
}
```

#### Result

## See also

- `flex-flow` shorthand
- `flex-wrap`
- `gap`
- Basic <example-value> of flexbox
- Ordering flex items
- CSS flexible box layout module

---
title: "Flow layout and writing modes"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/guides/display/flow_layout_and_writing_modes/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Flow layout and writing modes

The CSS 2.1 specification, which details how normal flow behaves, assumes a horizontal writing mode. Layout properties should work in the same way in vertical writing modes. In this guide, we look at how flow layout behaves when used with different document writing modes.

This is not a comprehensive guide to the use of writing modes in CSS, the aim here is to document the areas where flow layout interacts with writing modes in possibly unanticipated ways. The See also section provides links to more writing modes resources.

## Writing modes specification

The CSS Writing Modes Level 3 Specification defines the impact a change the document writing mode has on flow layout. In the writing modes introduction, the specification says,

> "A writing mode in CSS is determined by the `writing-mode`, `direction`, and `text-orientation` properties. It is defined primarily in terms of its inline base direction and block flow direction."

The specification defines the _inline base direction_ as the direction in which content is ordered on a line. This defines the start and end of the inline direction. The start is where sentences start and the end is where a line of text ends before it would begin to wrap onto a new line.

The _block flow direction_ is the direction in which boxes, for example paragraphs, stack in that writing mode. The CSS `writing-mode` property controls the block flow direction. If you want to change your page, or part of your page, to `vertical-lr` then you can set `writing-mode: vertical-lr` on the element and this will change the direction of the blocks and therefore the inline direction as well.

While certain languages will use a particular writing mode or text direction, we can also use these properties for creative effect, such as running a heading vertically.

```html
<div class="box">
  <h1>A heading</h1>
  <p>
    One November night in the year 1782, so the story runs, two brothers sat
    over their winter fire in the little French town of Annonay, watching the
    grey smoke-wreaths from the hearth curl up the wide chimney. Their names
    were Stephen and Joseph Montgolfier, they were papermakers by trade, and
    were noted as possessing thoughtful minds and a deep interest in all
    scientific knowledge and new discovery.
  </p>
</div>
```

```css
body {
  font: 1.2em sans-serif;
}
h1 {
  writing-mode: vertical-lr;
  float: left;
}
```

## Block flow direction

The `writing-mode` property accepts the values `horizontal-tb`, `vertical-rl` and `vertical-lr`. These values control the direction that blocks flow on the page. The initial value is `horizontal-tb`, which is a top to bottom block flow direction with a horizontal inline direction. Left to right languages, such as English, and Right to left languages, such as Arabic, are all `horizontal-tb`.

The following example shows blocks using the initial `horizontal-tb` value explicitly:

```html
<div class="box">
  <p>
    One November night in the year 1782, so the story runs, two brothers sat
    over their winter fire in the little French town of Annonay, watching the
    grey smoke-wreaths from the hearth curl up the wide chimney. Their names
    were Stephen and Joseph Montgolfier, they were papermakers by trade, and
    were noted as possessing thoughtful minds and a deep interest in all
    scientific knowledge and new discovery.
  </p>
  <p>
    Before that night—a memorable night, as it was to prove—hundreds of millions
    of people had watched the rising smoke-wreaths of their fires without
    drawing any special inspiration from the fact.
  </p>
</div>
```

```css
body {
  font: 1.2em sans-serif;
}
.box {
  writing-mode: horizontal-tb;
}
```

Compare this with the value `vertical-rl`, which gives you a right-to-left block flow direction with a vertical inline direction, as shown in the next example.

```html
<div class="box">
  <p>
    One November night in the year 1782, so the story runs, two brothers sat
    over their winter fire in the little French town of Annonay, watching the
    grey smoke-wreaths from the hearth curl up the wide chimney. Their names
    were Stephen and Joseph Montgolfier, they were papermakers by trade, and
    were noted as possessing thoughtful minds and a deep interest in all
    scientific knowledge and new discovery.
  </p>
  <p>
    Before that night—a memorable night, as it was to prove—hundreds of millions
    of people had watched the rising smoke-wreaths of their fires without
    drawing any special inspiration from the fact.
  </p>
</div>
```

```css
body {
  font: 1.2em sans-serif;
}
.box {
  writing-mode: vertical-rl;
}
```

The final example demonstrates the third possible value for `writing-mode` — `vertical-lr`. This gives you a left-to-right block flow direction and a vertical inline direction.

```html
<div class="box">
  <p>
    One November night in the year 1782, so the story runs, two brothers sat
    over their winter fire in the little French town of Annonay, watching the
    grey smoke-wreaths from the hearth curl up the wide chimney. Their names
    were Stephen and Joseph Montgolfier, they were papermakers by trade, and
    were noted as possessing thoughtful minds and a deep interest in all
    scientific knowledge and new discovery.
  </p>
  <p>
    Before that night—a memorable night, as it was to prove—hundreds of millions
    of people had watched the rising smoke-wreaths of their fires without
    drawing any special inspiration from the fact.
  </p>
</div>
```

```css
body {
  font: 1.2em sans-serif;
}
.box {
  writing-mode: vertical-lr;
}
```

## Nested writing modes

When a nested box is assigned a different writing mode to its parent, then an inline level box will display as if it has `display: inline-block`.

```html
<div class="box">
  <p>
    One <span>November</span> night in the year 1782, so the story runs, two
    brothers sat over their winter fire in the little French town of Annonay,
    watching the grey smoke-wreaths from the hearth curl up the wide chimney.
    Their names were Stephen and Joseph Montgolfier, they were papermakers by
    trade, and were noted as possessing thoughtful minds and a deep interest in
    all scientific knowledge and new discovery.
  </p>
</div>
```

```css
body {
  font: 1.2em sans-serif;
}
.box {
  writing-mode: vertical-rl;
}
.box span {
  writing-mode: horizontal-tb;
  padding: 10px;
  border: 1px solid rebeccapurple;
}
```

A block-level box will establish a new block formatting context (BFC), meaning that if its inner display type would be `flow`, it will get a computed display type of `flow-root`. This is shown in the next example where the box which displays as `horizontal-tb` contains a float which is contained due to its parent establishing a new BFC.

```html
<div class="box">
  <p>
    One November night in the year 1782, so the story runs, two brothers sat
    over their winter fire in the little French town of Annonay, watching the
    grey smoke-wreaths from the hearth curl up the wide chimney.
  </p>

  <div>
    <div class="float"></div>
    This box should establish a new BFC.
  </div>

  <p>
    Their names were Stephen and Joseph Montgolfier, they were papermakers by
    trade, and were noted as possessing thoughtful minds and a deep interest in
    all scientific knowledge and new discovery.
  </p>
</div>
```

```css
body {
  font: 1.2em sans-serif;
}
.box {
  writing-mode: vertical-rl;
}
.box > div {
  writing-mode: horizontal-tb;
  padding: 10px;
  border: 1px solid rebeccapurple;
}
.float {
  width: 100px;
  height: 150px;
  background-color: rebeccapurple;
  float: left;
}
```

## Replaced elements

Replaced elements such as images will not change their orientation based on the `writing-mode` property. However, replaced elements such as form controls which include text, should match the writing mode in use.

```html
<div class="box">
  <p>
    One November night in the year 1782, so the story runs, two brothers sat
    over their winter fire in the little French town of Annonay, watching the
    grey smoke-wreaths from the hearth curl up the wide chimney.
  </p>

  <img
    alt="a colorful hot air balloon against a clear sky"
    src="https://mdn.github.io/shared-assets/images/examples/balloon.jpg" />

  <p>
    Their names were Stephen and Joseph Montgolfier, they were papermakers by
    trade, and were noted as possessing thoughtful minds and a deep interest in
    all scientific knowledge and new discovery.
  </p>
</div>
```

```css
body {
  font: 1.2em sans-serif;
}
.box {
  writing-mode: vertical-rl;
}
```

## Logical properties and values

Once you are working in writing modes other than `horizontal-tb` many of the properties and values that are mapped to the physical dimensions of the screen seem strange. For example, if you give a box a width of 100px, in `horizontal-tb` that would control the size in the inline direction. In `vertical-lr` it controls the size in the block direction because it does not rotate with the text.

```html
<div class="box">
  <div class="box1">Box 1</div>
  <div class="box2">Box 2</div>
</div>
```

```css
body {
  font: 1.2em sans-serif;
}
.box1 {
  writing-mode: horizontal-tb;
  border: 5px solid rebeccapurple;
  width: 100px;
  margin: 10px;
}
.box2 {
  writing-mode: vertical-lr;
  border: 5px solid rebeccapurple;
  width: 100px;
  margin: 10px;
}
```

Therefore, we have the `block-size` and `inline-size` properties. If we give our block an `inline-size` of 100px, it doesn't matter whether we are in a horizontal or vertical writing mode; `inline-size` will always mean the size in the inline direction.

```html
<div class="box">
  <div class="box1">Box 1</div>
  <div class="box2">Box 2</div>
</div>
```

```css
body {
  font: 1.2em sans-serif;
}
.box1 {
  writing-mode: horizontal-tb;
  border: 5px solid rebeccapurple;
  inline-size: 100px;
  margin: 10px;
}
.box2 {
  writing-mode: vertical-lr;
  border: 5px solid rebeccapurple;
  inline-size: 100px;
  margin: 10px;
}
```

The CSS logical properties and values module includes logical versions of the properties that control margins, padding and borders as well as other mappings for things that we have typically used physical directions to specify.

## Summary

In most cases, flow layout works as expected when changing the writing mode of whole documents or individual sections. This can be used to properly typeset vertical languages or for creative reasons. With CSS logical properties and values, vertical writing mode sizing can be based on an element's inline and block size. This is useful for creating components that work in different writing modes.

## See also

- Writing Modes
- Writing modes and CSS layout on Smashing Magazine (2019)
- CSS writing modes on 24ways.org (2016)

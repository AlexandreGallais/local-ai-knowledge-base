---
title: "Inline formatting context"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/guides/inline_layout/inline_formatting_context/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Inline formatting context

This guide explains the inline formatting context.

## Core concepts

The inline formatting context is part of the visual rendering of a web page. Inline boxes are laid out one after the other, in the direction sentences run in the writing mode in use:

- In a horizontal writing mode, boxes are laid out horizontally, starting on the left.
- In a vertical writing mode they would be laid out vertically starting at the top.

In the example below, the two `` elements with the black borders are part of a block formatting context, while inside each box, the words participate in an inline formatting context. The words in the horizontal writing mode run horizontally, while words in the vertical writing mode run vertically.

```html
<div class="example horizontal">One Two Three</div>
<div class="example vertical">Four Five Six</div>
```

```css
body {
  font: 1.2em sans-serif;
}
.example {
  border: 5px solid black;
  margin: 20px;
}

.horizontal {
  writing-mode: horizontal-tb;
}
.vertical {
  writing-mode: vertical-rl;
}
```

Boxes forming a line are contained by a rectangular area called a line box. This box will be large enough to contain all of the inline boxes in that line; when there is no more room in the inline direction another line will be created. Therefore, a paragraph is a set of inline line boxes, stacked in the block direction.

When an inline box is split, margins, borders, and padding have no visual effect where the split occurs. In the next example there is a `` element wrapping a set of words wrapping onto two lines. The border on the `` breaks at the wrapping point.

```html
<div class="example">
  Before that night—
  <span
    >a memorable night, as it was to prove— hundreds of millions of people</span
  >
  had watched the rising smoke-wreaths of their fires without drawing any
  special inspiration from the fact.
</div>
```

```css
body {
  font: 1.2em sans-serif;
}
.example {
  border: 5px solid black;
  margin: 20px;
}

span {
  border: 5px solid rebeccapurple;
}
```

Margins, borders, and padding in the inline direction are respected. In the example below you can see how the margin, border, and padding on the inline `` element are added.

```html
<div class="example horizontal">One <span>Two</span> Three</div>
<div class="example vertical">Four <span>Five</span> Six</div>
```

```css
body {
  font: 1.2em sans-serif;
}

.example {
  border: 5px solid black;
  margin: 20px;
}

span {
  border: 5px solid rebeccapurple;
  padding-inline-start: 20px;
  padding-inline-end: 40px;
  margin-inline-start: 30px;
  margin-inline-end: 10px;
}
.horizontal {
  writing-mode: horizontal-tb;
}

.vertical {
  writing-mode: vertical-rl;
}
```

> **Note:**
> I am using the logical, flow-relative properties — `padding-inline-start` rather than `padding-left` — so that they work in the inline dimension whether the text is horizontal or vertical. Read more about these properties in Logical Properties and Values.

## Alignment in the block direction

Inline boxes may be aligned in the block direction in different ways, using the `vertical-align` property, which will align on the block axis in vertical writing modes (therefore not vertically at all!). In the example below the large text is making the line box of the first sentence larger, therefore the `vertical-align` property can be used to align the inline boxes either side of it. I have used the value `top`, try changing it to `middle`, `bottom`, or `baseline`.

```html
<div class="example horizontal">
  Before that night—<span>a memorable night</span>, as it was to prove—hundreds
  of millions of people had watched the rising smoke-wreaths of their fires
  without drawing any special inspiration from the fact.
</div>

<div class="example vertical">
  Before that night—<span>a memorable night</span>, as it was to prove—hundreds
  of millions of people had watched the rising smoke-wreaths of their fires
  without drawing any special inspiration from the fact.
</div>
```

```css
body {
  font: 1.2em sans-serif;
}

span {
  font-size: 200%;
  vertical-align: top;
}

.example {
  border: 5px solid black;
  margin: 20px;
  inline-size: 400px;
}

.horizontal {
  writing-mode: horizontal-tb;
}

.vertical {
  writing-mode: vertical-rl;
}
```

## Alignment in the inline direction

If there is additional space in the inline direction, the `text-align` property can be used to align the inline boxes within their line box. Try changing the value of `text-align` below to `end`.

```html
<div class="example horizontal">One Two Three</div>
<div class="example vertical">Four Five Six</div>
```

```css
body {
  font: 1.2em sans-serif;
}

.example {
  border: 5px solid black;
  margin: 20px;
}

.horizontal {
  writing-mode: horizontal-tb;
}

.vertical {
  writing-mode: vertical-rl;
}
```

```css
.example {
  text-align: center;
  inline-size: 250px;
}
```

## Effect of floats

Line boxes usually have the same size in the inline direction, therefore the same width if working in a horizontal writing mode, or height if working in a vertical writing mode. If there is a `float` within the same block formatting context however, the float will cause the line boxes that wrap the float to become shorter.

```html
<div class="box">
  <div class="float">I am a floated box!</div>
  <p>I am content inside the container.</p>
</div>
```

```css
body {
  font: 1.2em sans-serif;
}

.box {
  background-color: rgb(224 206 247);
  border: 5px solid rebeccapurple;
}

.float {
  float: left;
  width: 250px;
  height: 150px;
  background-color: white;
  border: 1px solid black;
  padding: 10px;
}
```

## See also

- Block formatting context
- Visual formatting model

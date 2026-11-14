---
title: "Flow layout and overflow"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/guides/display/flow_layout_and_overflow/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Flow layout and overflow

When there is more content than can fit into a container, an overflow situation occurs. Understanding how overflow behaves is important in dealing with any element with a constrained size in CSS. This guide explains how overflow works when working with normal flow.
The HTML is the same in each example, so it's visible in the first section, and hidden in others for brevity.

## What is overflow?

Giving an element a fixed height and width, then adding significant content to the box, creates a basic <example-value> example:

```html
<div class="box">
  <p>
    One November night in the year 1782, so the story runs, two brothers sat
    over their winter fire in the little French town of Annonay, watching the
    grey smoke-wreaths from the hearth curl up the wide chimney.
  </p>
</div>
<p>
  Their names were Stephen and Joseph Montgolfier. They were papermakers by
  trade, and were noted as possessing thoughtful minds and a deep interest in
  all scientific knowledge and new discovery.
</p>
<p>
  Before that night—a memorable night, as it was to prove—hundreds of millions
  of people had watched the rising smoke-wreaths of their fires without drawing
  any special inspiration from the fact.
</p>
```

```css
body {
  font: 1.2em / 1.5 sans-serif;
}

.box {
  width: 300px;
  height: 100px;
  border: 5px solid rebeccapurple;
  padding: 10px;
}
```

The content goes into the box. Once it fills the box, it continues to overflow in a visible way, displaying content outside the box, potentially displaying under subsequent content. The property that controls how overflow behaves is the `overflow` property which has an initial value of `visible`. This is why we can see the overflow content.

## Controlling overflow

There are other values that control how overflow content behaves. To hide overflowing content use a value of `hidden`. This may cause some of your content to not be visible.

```html
<div class="box">
  <p>
    One November night in the year 1782, so the story runs, two brothers sat
    over their winter fire in the little French town of Annonay, watching the
    grey smoke-wreaths from the hearth curl up the wide chimney.
  </p>
</div>
<p>
  Their names were Stephen and Joseph Montgolfier. They were papermakers by
  trade, and were noted as possessing thoughtful minds and a deep interest in
  all scientific knowledge and new discovery.
</p>
<p>
  Before that night—a memorable night, as it was to prove—hundreds of millions
  of people had watched the rising smoke-wreaths of their fires without drawing
  any special inspiration from the fact.
</p>
```

```css
body {
  font: 1.2em / 1.5 sans-serif;
}
.box {
  width: 300px;
  height: 100px;
  border: 5px solid rebeccapurple;
  padding: 10px;
  overflow: hidden;
}
```

Using a value of `scroll` contains the content in its box and add scrollbars to enable viewing it. Scrollbars will be added even if the content fits in the box.

```html
<div class="box">
  <p>
    One November night in the year 1782, so the story runs, two brothers sat
    over their winter fire in the little French town of Annonay, watching the
    grey smoke-wreaths from the hearth curl up the wide chimney.
  </p>
</div>
<p>
  Their names were Stephen and Joseph Montgolfier; they were papermakers by
  trade and were noted as possessing thoughtful minds and a deep interest in all
  scientific knowledge and new discoveries.
</p>
<p>
  Before that night—a memorable night, as it was to prove—hundreds of millions
  of people had watched the rising smoke-wreaths of their fires without drawing
  any special inspiration from the fact.
</p>
```

```css
body {
  font: 1.2em / 1.5 sans-serif;
}
.box {
  width: 300px;
  height: 100px;
  border: 5px solid rebeccapurple;
  padding: 10px;
  overflow: scroll;
}
```

Using a value of `auto` will display the content with no scrollbars if the content fits inside the box. If it doesn't fit then scrollbars will be added. Comparing the next example, you should see `overflow: scroll` example above has horizontal and vertical scrollbars even though it only needs vertical scrolling. The `auto` example below only adds the scrollbar in the direction we need to scroll.

```html
<div class="box">
  <p>
    One November night in the year 1782, so the story runs, two brothers sat
    over their winter fire in the little French town of Annonay, watching the
    grey smoke-wreaths from the hearth curl up the wide chimney.
  </p>
</div>
<p>
  Their names were Stephen and Joseph Montgolfier, they were papermakers by
  trade, and were noted as possessing thoughtful minds and a deep interest in
  all scientific knowledge and new discovery.
</p>
<p>
  Before that night—a memorable night, as it was to prove—hundreds of millions
  of people had watched the rising smoke-wreaths of their fires without drawing
  any special inspiration from the fact.
</p>
```

```css
body {
  font: 1.2em / 1.5 sans-serif;
}
.box {
  width: 300px;
  height: 100px;
  border: 5px solid rebeccapurple;
  padding: 10px;
  overflow: auto;
}
```

As we have already learned, using any of these values, other than the default of `visible`, will create a new block formatting context.

`overflow: clip` acts like `overflow: hidden`, but it does not allow programmatic scrolling; the box becomes non-scrollable. It also does not create a block formatting context.

The overflow property is in reality a shorthand for the `overflow-x` and `overflow-y` properties. If you specify only one value for overflow, this value is used for both axes. However, you can specify both values in which case the first is used for `overflow-x` and therefore the horizontal direction, and the second for `overflow-y` and the vertical direction. In the below example, I have only specified `overflow-y: scroll` so we do not get the unwanted horizontal scrollbar.

```html
<div class="box">
  <p>
    One November night in the year 1782, so the story runs, two brothers sat
    over their winter fire in the little French town of Annonay, watching the
    grey smoke-wreaths from the hearth curl up the wide chimney.
  </p>
</div>
<p>
  Their names were Stephen and Joseph Montgolfier, they were papermakers by
  trade, and were noted as possessing thoughtful minds and a deep interest in
  all scientific knowledge and new discovery.
</p>
<p>
  Before that night—a memorable night, as it was to prove—hundreds of millions
  of people had watched the rising smoke-wreaths of their fires without drawing
  any special inspiration from the fact.
</p>
```

```css
body {
  font: 1.2em / 1.5 sans-serif;
}
.box {
  width: 300px;
  height: 100px;
  border: 5px solid rebeccapurple;
  padding: 10px;
  overflow-y: scroll;
}
```

## Flow Relative Properties

In the guide to Writing Modes and Flow Layout, we looked at the `block-size` and `inline-size` properties, which make more sense when working with different writing modes than tying our layout to the physical dimensions of the screen. The CSS overflow module also includes flow relative properties for overflow - `overflow-block` and `overflow-inline`. These correspond to `overflow-x` and `overflow-y` but the mapping depends on the writing mode of the document.

## Indicating Overflow

In the CSS overflow module, there are some properties that can help improve the way content looks in an overflow situation.

### Inline-Axis Overflow

The `text-overflow` property deals with text overflowing in the inline direction. It takes one of two values `clip`, in which case content is clipped when it overflows, this is the initial value and therefore the default behavior. We also have `ellipsis` which renders an ellipsis, which may be replaced with a better character for the language or writing mode in use.

```html
<div class="box">
  <p>
    One November night in the year 1782, so the story runs, two brothers sat
    over their winter fire in the little French town of Annonay, watching the
    grey smoke-wreaths from the hearth curl up the wide chimney.
  </p>

  <p>
    Their names were Stephen and Joseph Montgolfier, they were papermakers by
    trade, and were noted as possessing thoughtful minds and a deep interest in
    all scientific knowledge and new discovery.
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
  font: 1.2em / 1.5 sans-serif;
}
.box {
  width: 300px;
  border: 5px solid rebeccapurple;
  padding: 10px;
}

.box p {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
```

### Block-Axis Overflow

The Overflow Module Level 4 specification adds a `block-ellipsis` property (previously called `block-overflow`). This property enables adding an ellipsis (or custom strings) when text overflows in the block dimension, although there is no browser support for this at the time of writing.

This is useful in the situation where you have a listing of articles, for example, and you display the listings in fixed height boxes which only take a limited amount of text. It may not be obvious to the reader that there is more content to click through to when clicking the box or the title. An ellipsis indicates clearly the fact there is more content. The specification would allow a string of content or a regular ellipsis to be inserted.

## Summary

Whether you are in continuous media on the web or in a Paged Media format such as print or EPUB, understanding how content overflows is useful when dealing with any layout method. Understanding how overflow works in normal flow enables a greater understanding of the implications of overflow content in layout methods such as grid and flexbox.

## See also

- Overflowing content guide
- CSS overflow module
- CSS containment module

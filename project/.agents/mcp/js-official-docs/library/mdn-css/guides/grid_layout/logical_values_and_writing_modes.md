---
title: "Grids, logical values, and writing modes (part 1 of 2)"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/guides/grid_layout/logical_values_and_writing_modes/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Grids, logical values, and writing modes

One of the most important features of CSS grid layout is the support for different writing modes built into the specification. In this guide, we look at this feature of CSS grid layout and other modern layout methods, learning a little about writing modes and logical vs. physical properties as we do so.

## Logical and physical properties and values

CSS is full of **physical** positioning properties and keywords – `left` and `right`, `top` and `bottom`. In the code snippet below, we position an item using absolute positioning and use the physical inset properties as offset values to push the item around. The item is placed 20 pixels from the top and 30 pixels from the left of the container:

```css
.container {
  position: relative;
}
.item {
  position: absolute;
  top: 20px;
  left: 30px;
}
```

```html
<div class="container">
  <div class="item">Item</div>
</div>
```

This example uses the `left` and `right` properties; these are just two of the many **physical properties** in CSS. We can also add margins, padding, and borders using physical properties, for example `margin-left` and `padding-left`. You might also see physical keywords in use, such as when using `text-align: right` to align text to the right.

We call these keywords and properties _physical_ because they relate to the screen you are looking at. Left is always left, no matter what direction your text is running.

### Issues with physical properties

Physical properties can cause issues when developing a site that has to work in multiple languages, including languages where the text flows from right to left, or top to bottom. Browsers are designed to correctly display content regardless of the language. Some CSS features can override browser defaults and cause content to display less than optimally.

In this example, the `direction` property has been set to rtl, which switches the writing mode from the default for an English language document of `ltr`. We have two paragraphs. These should both flow from right to left because of the `direction` value set on an ancestor element (`<body>`). The first paragraph has `text-align` set to `left`, so it aligns with the left of its container. The second paragraph aligns with the right and flows from right to left.

```html
<p class="left">
  I have my text set to <code>text-align: left</code> I will always align left
  even if the direction of the text in this document is rtl.
</p>

<p>I have no alignment set and use the direction set in the document.</p>
```

```css
body {
  direction: rtl;
}
.left {
  text-align: left;
}
```

```css
p {
  border: 2px solid #ffa94d;
  border-radius: 5px;
  background-color: #ffd8a8;
  padding: 1em;
  margin: 1em;
  color: #d9480f;
}
```

This is a basic <example-value> of the problems that can arise when using physical values and properties in CSS. If we write CSS using physical properties and keywords, we tell the browser our assumption as to how the text will flow and prevent it from handling alternative writing modes.

### Logical properties and values

**Logical properties and values** do not assume a text direction. This is why we use the keyword `start` in CSS grid layout to align something with the start of a container. When working with English content, `start` will be on the left, however, it doesn't have to be. The word `start` infers no physical location, which enables websites to start the content on the right when right-to-left languages, such as Arabic, are used.

## Block and Inline

When using logical rather than physical properties, we don't see the world as left to right, and top to bottom. We have a different reference point. This is where understanding the _block_ and _inline_ axes, introduced in the grid alignment guide, becomes very useful. If you think about layout in terms of block and inline, the way things work in CSS grid layout makes a lot of sense.

## CSS writing modes

The CSS writing modes module specifies how writing modes work in CSS. These features are not just for supporting languages with a different writing mode to English; they can also be used for creative purposes. The examples in this section make use of the `writing-mode` property to make changes to the writing mode applied to our grid, demonstrating how logical values work in the process.

### `writing-mode`

Writing modes are more than just left to right and right to left text, and the `writing-mode` property helps us display text running in other directions. The `writing-mode` property can have values of:

- `horizontal-tb`
- `vertical-rl`
- `vertical-lr`
- `sideways-rl`
- `sideways-lr`

The value `horizontal-tb`, which stands for "horizontal, top to bottom", is the default for text on the web. It is the direction in which you are reading this guide. The other values change how text flows in our document, matching the different writing modes found worldwide.

As an example, we have two paragraphs below. The first uses the default `horizontal-tb` value, and the second uses `vertical-rl`. In the second writing mode, text still runs left to right, however the direction of the text is vertical — inline text now runs down the page, from top to bottom.

```css
.wrapper > p {
  border: 2px solid #ffa94d;
  border-radius: 5px;
  background-color: #ffd8a8;
  padding: 1em;
  margin: 1em;
  color: #d9480f;
  max-width: 300px;
}
```

```html
<div class="wrapper">
  <p class="horizontal-tb">
    I have writing mode set to the default <code>horizontal-tb</code>
  </p>
  <p class="vertical-rl">I have writing mode set to <code>vertical-rl</code></p>
</div>
```

```css
.horizontal-tb {
  writing-mode: horizontal-tb;
}
.vertical-rl {
  writing-mode: vertical-rl;
}
```

## Writing modes in grid layouts

Applying this to a grid layout example, we can see how changing the writing mode means changing our idea of where the block and inline axes are.

### Default writing mode

In this example, the grid has three columns and two row tracks. This means there are three tracks running down the block axis. In default writing mode, grid auto-places items starting at the top left, moving along to the right, filling up the three cells on the inline axis. It then moves to the next line, creating a new row track, and fills in more items:

```css
* {
  box-sizing: border-box;
}

.wrapper {
  border: 2px solid #f76707;
  border-radius: 5px;
  background-color: #fff4e6;
}

.wrapper > div {
  border: 2px solid #ffa94d;
  border-radius: 5px;
  background-color: #ffd8a8;
  padding: 1em;
  color: #d9480f;
}
```

```css
.wrapper {
  display: grid;
  grid-template-columns: repeat(3, 100px);
  grid-template-rows: repeat(2, 100px);
  gap: 10px;
}
```

```html
<div class="wrapper">
  <div class="item1">Item 1</div>
  <div class="item2">Item 2</div>
  <div class="item3">Item 3</div>
  <div class="item4">Item 4</div>
  <div class="item5">Item 5</div>
</div>
```

### Setting writing mode

If we add `writing-mode: vertical-lr` to the grid container in the previous example, we can see that the block and inline axes now run in a different direction. The block or _column_ axis now runs across the page from left to right, while the inline axis runs down the page, creating rows from top to bottom.

```css
* {
  box-sizing: border-box;
}

.wrapper {
  border: 2px solid #f76707;
  border-radius: 5px;
  background-color: #fff4e6;
}

.wrapper > div {
  border: 2px solid #ffa94d;
  border-radius: 5px;
  background-color: #ffd8a8;
  padding: 1em;
  color: #d9480f;
}
.wrapper {
  display: grid;
  grid-template-columns: repeat(3, 100px);
  grid-template-rows: repeat(2, 100px);
  gap: 10px;
}
```

```css
.wrapper {
  writing-mode: vertical-lr;
}
```

```html
<div class="wrapper">
  <div class="item1">Item 1</div>
  <div class="item2">Item 2</div>
  <div class="item3">Item 3</div>
  <div class="item4">Item 4</div>
  <div class="item5">Item 5</div>
</div>
```

## Logical values for alignment

With the block and inline axis able to change direction, the logical values for the alignment properties start to make more sense.

In this example, we use alignment (the `align-self` and `justify-self` properties) to align items inside a grid that is set to `writing-mode: vertical-lr`. The `start` and `end` properties work in exactly the same way that they do in the default writing mode, and remain logical in a way that using left and right, top and bottom to align items would not do. This occurs once we've flipped the grid onto the side, like this:

```css
* {
  box-sizing: border-box;
}

.wrapper {
  border: 2px solid #f76707;
  border-radius: 5px;
  background-color: #fff4e6;
}

.wrapper > div {
  border: 2px solid #ffa94d;
  border-radius: 5px;
  background-color: #ffd8a8;
  padding: 1em;
  color: #d9480f;
}
```

```css
.wrapper {
  writing-mode: vertical-lr;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 100px);
  gap: 10px;
}

.item1 {
  grid-column: 1 / 4;
  align-self: start;
}

.item2 {
  grid-column: 1 / 3;
  grid-row: 2 / 4;
  align-self: start;
}

.item3 {
  grid-column: 3;
  grid-row: 2 / 4;
  align-self: end;
  justify-self: end;
}
```

```html
<div class="wrapper">
  <div class="item1">Item 1</div>
  <div class="item2">Item 2</div>
  <div class="item3">Item 3</div>
</div>
```

If you want to see how these work, with a right to left as well as top to bottom writing mode, switch `vertical-lr` to `vertical-rl`, which is a vertical writing mode running from right to left.

## Auto-placement and writing modes

As we've seen in the previous examples, writing mode can change the visual direction in which items place themselves onto the grid. Items will, by default, place themselves along the inline axis, adding new rows in the block direction. We've now seen that the inline axis does not always run from left to right, and the block axis does not always run from top to bottom.

## Line-based placement and Writing Modes

The key thing to remember when placing items by line number, is that line 1 is the start line and line -1 is the end line, no matter which writing mode you are in.

### Line-based placement with left to right text

In this example, we have a grid laid out in the default `ltr` direction, with three items positioned using line-based placement.

- Item 1 starts at column line 1, spanning one track.
- Item 2 starts at column line -1, spanning to -3.
- Item 3 starts at column line 1, spanning to column line 3.

```css
* {
  box-sizing: border-box;
}

.wrapper {
  border: 2px solid #f76707;
  border-radius: 5px;
  background-color: #fff4e6;
}

.wrapper > div {
  border: 2px solid #ffa94d;
  border-radius: 5px;
  background-color: #ffd8a8;
  padding: 1em;
  color: #d9480f;
}
```

```css
.wrapper {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 100px);
  gap: 10px;
}
.item1 {
  grid-column: 1;
}
.item2 {
  grid-column: -1 / -3;
}
.item3 {
  grid-column: 1 / 3;
  grid-row: 2;
}
```

```html
<div class="wrapper">
  <div class="item1">Item 1</div>
  <div class="item2">Item 2</div>
  <div class="item3">Item 3</div>
</div>
```

### Line-based placement with right to left text

If we add the `direction` property with a value of `rtl` to the grid container in the previous example, line 1 is placed on the right-hand side of the grid, and line -1 on the left.

```css
* {
  box-sizing: border-box;
}

.wrapper {
  border: 2px solid #f76707;
  border-radius: 5px;
  background-color: #fff4e6;
}

.wrapper > div {
  border: 2px solid #ffa94d;
  border-radius: 5px;
  background-color: #ffd8a8;
  padding: 1em;
  color: #d9480f;
}

.wrapper {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 100px);
  gap: 10px;
}

.item1 {
  grid-column: 1;
}

.item2 {
  grid-column: -1 / -3;
}

.item3 {
  grid-column: 1 / 3;
  grid-row: 2;
}
```

```css
.wrapper {
  direction: rtl;
}
```

```html
<div class="wrapper">
  <div class="item1">Item 1</div>
  <div class="item2">Item 2</div>
  <div class="item3">Item 3</div>
</div>
```

If you are switching the direction of your text, either for entire pages or for parts of pages, and are using lines, you may want to name your lines to avoid the layout completely switching direction. For some things, for example, where a grid contains text content, this switching may be exactly what you want. For other uses it may not.

### The strange order of values in the `grid-area` property

You can use the `grid-area` property to specify all four lines of a grid area as one value. When people first encounter this, they are often surprised that the values do not follow the same order as the shorthand for `margin` – which runs clockwise: top, right, bottom, left.

The order of `grid-area` values is:

- `grid-row-start`
- `grid-column-start`
- `grid-row-end`
- `grid-column-end`

Which for English, in left-to-right means the order is:

- `top`
- `left`
- `bottom`
- `right`

This is counter-clockwise! It's the reverse of what we do for margins and padding. If we remember that `grid-area` sees the world as "block and inline", you'll notice we are setting the two starts, then the two ends, which is much more logical once you know!

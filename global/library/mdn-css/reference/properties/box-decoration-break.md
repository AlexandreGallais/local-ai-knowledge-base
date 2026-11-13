---
title: "`box-decoration-break` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/box-decoration-break/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `box-decoration-break` CSS property

The **`box-decoration-break`** CSS property specifies how an element's fragments should be rendered when broken across multiple lines, columns, or pages.

```css
-webkit-box-decoration-break: slice;
box-decoration-break: slice;
```

```css
-webkit-box-decoration-break: clone;
box-decoration-break: clone;
```

```html
<section id="default-example">
  <div id="example-container">
    <span id="example-element">This text breaks across multiple lines.</span>
  </div>
</section>
```

```css
#example-container {
  width: 14rem;
}

#example-element {
  background: linear-gradient(to bottom right, #6f6f6f, black);
  color: white;
  box-shadow:
    8px 8px 10px 0 #ff1492,
    -5px -5px 5px 0 blue,
    5px 5px 15px 0 yellow;
  padding: 0 1em;
  border-radius: 16px;
  border-style: solid;
  margin-left: 10px;
  font: 24px sans-serif;
  line-height: 2;
}
```

## Syntax

```css
/* Keyword values */
box-decoration-break: slice;
box-decoration-break: clone;

/* Global values */
box-decoration-break: inherit;
box-decoration-break: initial;
box-decoration-break: revert;
box-decoration-break: revert-layer;
box-decoration-break: unset;
```

### Values

This property is specified as one of the following keyword values:

- `slice`
    The element is initially rendered as if its box were not fragmented, after which the rendering for this hypothetical box is sliced into pieces for each line/column/page. Note that the hypothetical box can be different for each fragment since it uses its own height if the break occurs in the inline direction, and its own width if the break occurs in the block direction. See the CSS specification for details.
- `clone`
    Each box fragment is rendered independently with the specified border, padding, and margin wrapping each fragment. The `border-radius`, `border-image`, and `box-shadow` are applied to each fragment independently. The background is also drawn independently for each fragment, which means that a background image with `background-repeat: no-repeat` may nevertheless repeat multiple times.

## Description

The specified value will impact the appearance of the following properties:

- `background`
- `border`
- `border-image`
- `box-shadow`
- `clip-path`
- `margin`
- `padding`

## Examples

### Inline box fragments

An inline element with a box decoration may have unexpected appearance when it contains line breaks due to the initial `slice` value.
The following example shows the effect of adding `box-decoration-break: clone` to a `` that contains `` tags:

```css
body {
  display: flex;
  background-color: grey;
  justify-content: space-around;
}

span {
  padding: 0em 1em;
  border-radius: 1rem;
  border-style: solid;
  margin: 1rem;
  font: 22px sans-serif;
  line-height: 2;
}
```

```css
span {
  background: linear-gradient(to bottom right, yellow, green);
  box-shadow:
    8px 8px 10px 0px deeppink,
    -5px -5px 5px 0px blue,
    5px 5px 15px 0px yellow;
}

#clone {
  -webkit-box-decoration-break: clone;
  box-decoration-break: clone;
}
```

```html
<p>
  <span>The<br />quick<br />orange fox</span>
</p>
<p>
  <span id="clone">The<br />quick<br />orange fox</span>
</p>
```

### Block box fragments

The following example shows how block elements with box decoration look when they contain line breaks in a multi-column layout.
Notice how the result of `box-decoration-break: slice` would be the equivalent of the first `` if stacked vertically.

```css
body {
  background-color: grey;
}
span {
  padding: 0em 2em;
  border-radius: 250px;
  border-style: solid;
  margin-left: 1em;
  font: 20px sans-serif;
  line-height: 1.5;
}
```

```css
span {
  display: block;
  background: linear-gradient(to bottom right, yellow, green);
  box-shadow:
    inset 8px 8px 10px 0px deeppink,
    inset -5px -5px 5px 0px blue,
    inset 5px 5px 15px 0px yellow;
}
#base {
  width: 33%;
}
.columns {
  columns: 3;
}

.clone {
  -webkit-box-decoration-break: clone;
  box-decoration-break: clone;
}
```

```html
<div id="base">
  <span>The<br />quick<br />orange fox</span>
</div>
<br />

<h2>'box-decoration-break: slice'</h2>
<div class="columns">
  <span>The<br />quick<br />orange fox</span>
</div>

<h2>'box-decoration-break: clone'</h2>
<div class="columns">
  <span class="clone">The<br />quick<br />orange fox</span>
</div>
```

## See also

- `break-after`, `break-before`, `break-inside`

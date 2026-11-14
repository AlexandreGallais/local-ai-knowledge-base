---
title: "`margin-bottom` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/margin-bottom/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `margin-bottom` CSS property

The **`margin-bottom`** CSS property sets the margin area on the bottom of an element. A positive value places it farther from its neighbors, while a negative value places it closer.

```css
margin-bottom: 1em;
```

```css
margin-bottom: 10%;
```

```css
margin-bottom: 10px;
```

```css
margin-bottom: 0;
```

```html
<section id="default-example">
  <div id="container">
    <div class="row"></div>
    <div class="row transition-all" id="example-element"></div>
    <div class="row"></div>
  </div>
</section>
```

```css
#container {
  width: 300px;
  height: 200px;
  display: flex;
  align-content: flex-start;
  flex-direction: column;
  justify-content: flex-start;
}

.row {
  height: 33.33%;
  display: inline-block;
  border: solid #ce7777 10px;
  background-color: #2b3a55;
  flex-shrink: 0;
}

#example-element {
  border: solid 10px #ffbf00;
  background-color: #2b3a55;
}
```

This property has no effect on _non-replaced_ inline elements, such as `` or `<code>`.

## Syntax

```css
/* <length> values */
margin-bottom: 10px; /* An absolute length */
margin-bottom: 1em; /* relative to the text size */
margin-bottom: 5%; /* relative to the nearest block container's width */
margin-bottom: anchor-size(width);
margin-bottom: calc(anchor-size(--my-anchor self-block, 20px) / 3);

/* Keyword value */
margin-bottom: auto;

/* Global values */
margin-bottom: inherit;
margin-bottom: initial;
margin-bottom: revert;
margin-bottom: revert-layer;
margin-bottom: unset;
```

The `margin-bottom` property is specified as the keyword `auto`, or a `<length>`, or a `<percentage>`. Its value can be positive, zero, or negative.

### Values

- `<length>`
    The size of the margin as a fixed value.
    - For _anchor-positioned elements_, the `anchor-size()` function resolves to a `<length>` value relative to the associated _anchor element_'s width or height (see Setting element margin based on anchor size).

- `<percentage>`
    The size of the margin as a percentage, relative to the inline size (_width_ in a horizontal language, defined by `writing-mode`) of the containing block.
- `auto`
    The browser selects a suitable value to use. See `margin`.

## Examples

### Setting positive and negative bottom margins

#### HTML

```html
<div class="container">
  <div class="box0">Box 0</div>
  <div class="box1">Box 1</div>
  <div class="box2">Box one's negative margin pulls me up</div>
</div>
```

#### CSS

CSS for divs to set margin-bottom and height

```css
.box0 {
  margin-bottom: 1em;
  height: 3em;
}
.box1 {
  margin-bottom: -1.5em;
  height: 4em;
}
.box2 {
  border: 1px dashed black;
  border-width: 1px 0;
  margin-bottom: 2em;
}
```

Some definitions for container and divs so margins' effects can be seen more clearly

```css
.container {
  background-color: orange;
  width: 320px;
  border: 1px solid black;
}
div {
  width: 320px;
  background-color: gold;
}
```

#### Result

## See also

- `margin-top`, `margin-right`, and `margin-left`
- `margin` shorthand
- `margin-block-start`, `margin-block-end`, `margin-inline-start`, and `margin-inline-end`
- `margin-block` and `margin-inline` shorthands
- CSS box model module

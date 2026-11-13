---
title: "`backdrop-filter` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/backdrop-filter/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `backdrop-filter` CSS property

The **`backdrop-filter`** CSS property lets you apply graphical effects such as blurring or color shifting to the area behind an element. Because it applies to everything _behind_ the element, to see the effect the element or its background needs to be transparent or partially transparent.

```css
backdrop-filter: blur(10px);
```

```css
backdrop-filter: invert(80%);
```

```css
backdrop-filter: sepia(90%);
```

```html
<section class="default-example" id="default-example">
  <div class="example-container">
    <div id="example-element">Example</div>
  </div>
</section>
```

```css
.example-container {
  background-image: url("/shared-assets/images/examples/balloon.jpg");
  background-size: cover;
  width: 200px;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: black;
}

#example-element {
  font-weight: bold;
  flex: 1;
  text-align: center;
  padding: 20px 10px;
  background-color: rgb(255 255 255 / 0.2);
}
```

## Syntax

```css
/* Keyword value */
backdrop-filter: none;

/* URL to SVG filter */
backdrop-filter: url("common-filters.svg#filter");

/* <filter-function> values */
backdrop-filter: blur(2px);
backdrop-filter: brightness(60%);
backdrop-filter: contrast(40%);
backdrop-filter: drop-shadow(4px 4px 10px blue);
backdrop-filter: grayscale(30%);
backdrop-filter: hue-rotate(120deg);
backdrop-filter: invert(70%);
backdrop-filter: opacity(20%);
backdrop-filter: sepia(90%);
backdrop-filter: saturate(80%);

/* Multiple filters */
backdrop-filter: url("filters.svg#filter") blur(4px) saturate(150%);

/* Global values */
backdrop-filter: inherit;
backdrop-filter: initial;
backdrop-filter: revert;
backdrop-filter: revert-layer;
backdrop-filter: unset;
```

### Values

- `none`
    No filter is applied to the backdrop.
- `<filter-value-list>`
    A space-separated list of `filter-function`s or an SVG filter that will be applied to the backdrop. CSS `<filter-function>`s include `blur()`, `brightness()`, `contrast()`, `drop-shadow()`, `grayscale()`, `hue-rotate()`, `invert()`, `opacity()`, `saturate()`, and `sepia()`.

## Description

The `backdrop-filter` property applies filter effects to the pixels painted _behind_ an element, up to the nearest ancestor that is a **backdrop root**. Content above the backdrop root is not affected.

### Backdrop root

A backdrop root is an element that establishes a boundary for `backdrop-filter` effects. The following elements are backdrop roots:

- The root element (`<html>`)
- An element with a `filter` value other than `none`
- An element with an `opacity` value less than `1`
- An element with a `mask`, `mask-image`, `mask-border`, or `clip-path` value other than `none`
- An element with a `backdrop-filter` value other than `none`
- An element with a `mix-blend-mode` value other than `normal`
- An element with `will-change` set to any of the above properties

This means that if a parent element has `opacity: 0.9`, it becomes a backdrop root and any child's `backdrop-filter` will only blur the content between that parent and the child - not the content behind the parent. This is a common source of confusion when `backdrop-filter` appears to have no visible effect despite being correctly applied.

The following example demonstrates how backdrop roots affect `backdrop-filter`. The first container has `will-change: opacity`, making it a backdrop root - notice that the blur circle only affects the text and square inside the container, not the checkered background behind it. The second container is not a backdrop root, so its blur circle affects everything behind it, including the page background.

```html
<div class="parent backdrop-root">
  <div class="text">Text</div>
  <div class="square"></div>
  <div class="overlay"></div>
</div>
<div class="parent">
  <div class="text">Text</div>
  <div class="square"></div>
  <div class="overlay"></div>
</div>
```

```css
body {
  display: flex;
  column-gap: 16px;
  padding: 16px;
  background-image: conic-gradient(
    gray 90deg,
    silver 90deg 180deg,
    gray 180deg 270deg,
    silver 270deg
  );
  background-size: 32px 32px;
}

.parent {
  position: relative;
  width: 256px;
  height: 256px;
}

.backdrop-root {
  outline: 2px solid crimson;
  will-change: opacity;
}

.square {
  position: absolute;
  top: 35px;
  left: 40%;
  width: 25%;
  height: 25%;
  border: 10px solid white;
}

.text {
  position: absolute;
  left: 40%;
  color: white;
  font-size: 32px;
  font-weight: 500;
  text-align: center;
  line-height: 256px;
  filter: blur(1px);
}

.overlay {
  position: absolute;
  top: 25%;
  left: 50%;
  width: 50%;
  height: 50%;
  outline: 3px solid gainsboro;
  border-radius: 9999px;
  backdrop-filter: blur(10px);
}
```

## Examples

### HTML

```html
<div class="container">
  <div class="box">
    <p>backdrop-filter: blur(10px)</p>
  </div>
</div>
```

### CSS

```css
.box {
  background-color: rgb(255 255 255 / 30%);
  backdrop-filter: blur(10px);
}

body {
  background-image: url("anemones.jpg");
}
```

```css
html,
body {
  height: 100%;
  width: 100%;
}

.container {
  background-size: cover;
  align-items: center;
  display: flex;
  justify-content: center;
  height: 100%;
  width: 100%;
}
.box {
  border-radius: 5px;
  font-family: sans-serif;
  text-align: center;
  max-width: 50%;
  max-height: 50%;
  padding: 20px 40px;
}
```

## See also

- `filter`
- `filter-function`
- `background-blend-mode`, `mix-blend-mode`
- CSS filter effects
- CSS compositing and blending

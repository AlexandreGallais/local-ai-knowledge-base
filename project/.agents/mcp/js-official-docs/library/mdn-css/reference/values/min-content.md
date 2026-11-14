---
title: "`min-content` CSS keyword"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/values/min-content/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `min-content` CSS keyword

The `min-content` sizing keyword represents the minimum intrinsic size of an element.
The keyword shrinks the element to the smallest possible size without causing avoidable overflow of its content.
For text content, this keyword causes the content to wrap at every opportunity (such as spaces between words), and the element will be only as wide as the longest word.

The `interpolate-size` property and `calc-size()` function can be used to enable animations to and from `min-content`.

## Syntax

```css
/* Used as a length value */
width: min-content;
inline-size: min-content;
height: min-content;
block-size: min-content;

/* Used in grid tracks */
grid-template-columns: 200px 1fr min-content;
```

## Examples

### Sizing boxes with min-content

#### HTML

```html
<div class="item">Item</div>
<div class="item">Item with more text in it.</div>
```

#### CSS

```css
.item {
  width: min-content;
  background-color: #8ca0ff;
  padding: 5px;
  margin-bottom: 1em;
}
```

#### Result

### Sizing grid columns with min-content

#### HTML

```html
<div id="container">
  <div>Item</div>
  <div>Item with more text in it.</div>
  <div>Flexible item</div>
</div>
```

#### CSS

```css
#container {
  display: grid;
  grid-template-columns: min-content min-content 1fr;
  grid-gap: 5px;
  box-sizing: border-box;
  height: 200px;
  width: 100%;
  background-color: #8cffa0;
  padding: 10px;
}

#container > div {
  background-color: #8ca0ff;
  padding: 5px;
}
```

#### Result

## See also

- Related sizing keywords: `max-content`, `fit-content`
- CSS box sizing module

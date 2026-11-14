---
title: "`fit-content()` CSS function"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/values/fit-content_function/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `fit-content()` CSS function

The **`fit-content()`** CSS function clamps a given size to an available size according to the formula `min(maximum size, max(minimum size, argument))`.

It is distinct from the `fit-content` keyword, which takes no argument and sizes a box based on its content within the available space.
Only `fit-content()` is valid in grid track sizing properties such as `grid-template-columns`.

```css
grid-template-columns: fit-content(8ch) fit-content(8ch) 1fr;
```

```css
grid-template-columns: fit-content(100px) fit-content(100px) 1fr;
```

```css
grid-template-columns: fit-content(40%) fit-content(40%) 1fr;
```

```html
<section class="default-example" id="default-example">
  <div class="example-container">
    <div class="transition-all" id="example-element">
      <div>One. This column has more text in it.</div>
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
  grid-gap: 10px;
  width: 250px;
}

#example-element > div {
  background-color: rgb(0 0 255 / 0.2);
  border: 3px solid blue;
  text-align: left;
}
```

The function can be used as a track size in CSS grid properties, where the maximum size is defined by `max-content` and the minimum size by `auto`, which is calculated similar to `auto` (i.e., `minmax(auto, max-content)`), except that the track size is clamped at _argument_ if it is greater than the `auto` minimum.

See the `grid-template-columns` page for more information on the `max-content` and `auto` keywords.

The `fit-content()` function can also be used as laid out box size for `width`, `height`, `min-width`, `min-height`, `max-width` and `max-height`, where the maximum and minimum sizes refer to the content size.

## Syntax

```css
/* <length> values */
fit-content(200px)
fit-content(5cm)
fit-content(30vw)
fit-content(100ch)

/* <percentage> value */
fit-content(40%)
```

### Values

- `<length>`
    An absolute length.
- `<percentage>`
    A percentage relative to the available space in the given axis.

    In grid properties it is relative to the inline size of the grid container in column tracks and to the block size of the grid container for row tracks. Otherwise it is relative to the available inline size or block size of the laid out box depending on the writing mode.

## Examples

### Sizing grid columns with fit-content

#### HTML

```html
<div id="container">
  <div>Item as wide as the content.</div>
  <div>
    Item with more text in it. Because the contents of it are wider than the
    maximum width, it is clamped at 300 pixels.
  </div>
  <div>Flexible item</div>
</div>
```

#### CSS

```css
#container {
  display: grid;
  grid-template-columns: fit-content(300px) fit-content(300px) 1fr;
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

- `min-content` keyterm
- `max-content` keyterm
- CSS box sizing module
- `grid-template`
- `grid-template-rows`
- `grid-template-columns`
- `grid-template-areas`
- `grid-auto-columns`
- `grid-auto-rows`
- `grid-auto-flow`
- `fit-content` keyterm
- Line-based placement with CSS grid
- Grid template areas: grid definition shorthands

---
title: "`fit-content` CSS keyword"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/values/fit-content/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `fit-content` CSS keyword

The `fit-content` sizing keyword represents an element size that adapts to its content while staying within the limits of its container.
The keyword ensures that the element is never smaller than its minimum intrinsic size (`min-content`) or larger than its maximum intrinsic size (`max-content`).

> **Note:**
> This keyword is different from the `fit-content()` function. The function is used for grid track sizing (for example in `grid-template-columns` and `grid-auto-rows`) and for laid-out box sizing for properties such as `width`, `height`, `min-width`, and `max-height`.

## Syntax

```css
/* Used in sizing properties */
width: fit-content;
height: fit-content;
inline-size: fit-content;
block-size: fit-content;
```

## Description

This keyword is used with sizing properties such as `width`, `height`, `block-size`, `inline-size`, `min-width`, and `max-width`. When used on these properties, the calculated size refers to the element's content box.

When `fit-content` is set, the element grows or shrinks to fit its content, but stops expanding after the relevant dimension reaches the size limit of its container.

The `fit-content` size is calculated using the following formula:

```plain
min(max-content, max(min-content, stretch))
```

where, `stretch` matches the element's margin box to the width of its containing block. The keyword is essentially equivalent to `fit-content(stretch)`.

You can enable animations to and from `fit-content` using the `interpolate-size` property and the `calc-size()` function.

## Examples

### Sizing boxes with fit-content

#### HTML

```html
<div class="container">
  <div class="item">Item</div>
  <div class="item">Item with more text in it.</div>
  <div class="item">
    Item with more text in it, hopefully we have added enough text so the text
    will start to wrap.
  </div>
</div>
```

#### CSS

```css
.container {
  border: 2px solid #cccccc;
  padding: 10px;
  width: 20em;
}

.item {
  width: fit-content;
  background-color: #8ca0ff;
  padding: 5px;
  margin-bottom: 1em;
}
```

#### Result

## See also

- Related sizing keywords: `min-content`, `max-content`
- CSS box sizing module

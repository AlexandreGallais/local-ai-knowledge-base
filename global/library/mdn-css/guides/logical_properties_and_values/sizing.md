---
title: "Logical properties for sizing"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/guides/logical_properties_and_values/sizing/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Logical properties for sizing

In this guide, we will explain the flow-relative mappings between physical dimension properties and logical properties used for sizing elements on our pages.

When specifying the size of an item, the CSS logical properties and values module gives you the ability to indicate sizing as it relates to the flow of text (inline and block) rather than physical sizing which relates to the physical dimensions of horizontal and vertical (e.g., left and right). While these flow relative mappings may well become the default for many of us, in a design you may well use both physical and logical sizing. You might want some features to always relate to the physical dimensions whatever the writing mode.

## Mappings for dimensions

The table below provides mappings between logical and physical properties. These mappings assume that you are in a `horizontal-tb` writing mode, such as English or Arabic, in which case `width` would be mapped to `inline-size`.

If you were in a vertical writing mode then `inline-size` would be mapped to `height`.

| Logical Property               | Physical Property         |
| ------------------------------ | ------------------------- |
| `inline-size`     | `width`      |
| `block-size`      | `height`     |
| `min-inline-size` | `min-width`  |
| `min-block-size`  | `min-height` |
| `max-inline-size` | `max-width`  |
| `max-block-size`  | `max-height` |

## Width and height example

The logical mappings for `width` and `height` are `inline-size`, which sets the length in the inline dimension and `block-size`, which sets the length in the block dimension. When working in English, replacing `width` with `inline-size` and `height` with `block-size` will give the same layout.

In the live example below, the `writing-mode` is set to `horizontal-tb`. Change it to `vertical-rl` and you will see that the first example — which uses `width` and `height` — remains the same size in each dimension, despite the text becoming vertical. The second example — which uses `inline-size` and `block-size` — will follow the text direction as if the entire block has rotated.

```html
<div class="container">
  <div class="physical box">I have a width of 200px and a height of 100px.</div>

  <div class="logical box">
    I have an inline-size of 200px and a block-size of 100px.
  </div>
</div>
```

```css
body {
  font: 1.2em / 1.5 sans-serif;
}
.container {
  display: flex;
}
.box {
  border: 2px solid rgb(96 139 168);
  border-radius: 5px;
  background-color: rgb(96 139 168 / 0.2);
  padding: 10px;
  margin: 10px;
}
```

```css
.box {
  writing-mode: horizontal-tb;
}

.physical {
  width: 200px;
  height: 100px;
}

.logical {
  inline-size: 200px;
  block-size: 100px;
}
```

## Min-width and min-height example

There are also mappings for `min-width` and `min-height` — these are `min-inline-size` and `min-block-size`. These work in the same way as the `inline-size` and `block-size` properties, but setting a minimum rather than a fixed size.

Try changing the example below to `vertical-rl`, as with the first example, to see the effect it has. I am using `min-height` in the first example and `min-block-size` in the second.

```html
<div class="container">
  <div class="physical box">
    I have a width of 200px and a min-height of 5em.
  </div>

  <div class="logical box">
    I have an inline-size of 200px and a min-block-size of 5em.
  </div>
</div>
```

```css
body {
  font: 1.2em / 1.5 sans-serif;
}
.container {
  display: flex;
}
.box {
  border: 2px solid rgb(96 139 168);
  border-radius: 5px;
  background-color: rgb(96 139 168 / 0.2);
  padding: 10px;
  margin: 10px;
}
```

```css
.box {
  writing-mode: horizontal-tb;
}

.physical {
  width: 200px;
  min-height: 5em;
}

.logical {
  inline-size: 200px;
  min-block-size: 5em;
}
```

## Max-width and max-height example

Finally you can use `max-inline-size` and `max-block-size` as logical replacements for `max-width` and `max-height`. Try playing with the below example in the same way as before.

```html
<div class="container">
  <div class="physical box">I have a max-width of 200px.</div>

  <div class="logical box">I have a max-inline-size of 200px.</div>
</div>
```

```css
body {
  font: 1.2em / 1.5 sans-serif;
}
.container {
  display: flex;
}
.box {
  border: 2px solid rgb(96 139 168);
  border-radius: 5px;
  background-color: rgb(96 139 168 / 0.2);
  padding: 10px;
  margin: 10px;
}
```

```css
.box {
  writing-mode: horizontal-tb;
}

.physical {
  max-width: 200px;
}

.logical {
  max-inline-size: 200px;
}
```

## Logical keywords for resize

The `resize` property sets whether or not an item can be resized and has physical values of `horizontal` and `vertical`. The `resize` property also has logical keyword values. Using `resize: inline` allows resizing in the inline dimension and `resize: block` allow resizing in the block dimension.

The keyword value of `both` for the resize property works whether you are thinking physically or logically. It sets both dimensions at once. Try playing with the below example.

```html
<div class="container">
  <div class="physical box">
    I have a width of 200px and a height of 100px. I can be resized
    horizontally.
  </div>

  <div class="logical box">
    I have an inline-size of 200px and a block-size of 100px. I can be resized
    in the inline direction.
  </div>
</div>
```

```css
body {
  font: 1.2em / 1.5 sans-serif;
}
.container {
  display: flex;
}
.box {
  border: 2px solid rgb(96 139 168);
  border-radius: 5px;
  background-color: rgb(96 139 168 / 0.2);
  padding: 10px;
  margin: 10px;
}
```

```css
.box {
  writing-mode: horizontal-tb;
  overflow: scroll;
}

.physical {
  width: 200px;
  height: 100px;
  resize: horizontal;
}

.logical {
  inline-size: 200px;
  block-size: 100px;
  resize: inline;
}
```

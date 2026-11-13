---
title: "`min-inline-size` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/min-inline-size/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `min-inline-size` CSS property

The **`min-inline-size`** CSS property defines the horizontal or vertical minimal size of an element's block, depending on its writing mode. It corresponds to either the `min-width` or the `min-height` property, depending on the value of `writing-mode`.

```css
min-inline-size: 200px;
writing-mode: horizontal-tb;
```

```css
min-inline-size: 200px;
writing-mode: vertical-rl;
```

```css
min-inline-size: 20px;
writing-mode: horizontal-tb;
```

```css
min-inline-size: 75%;
writing-mode: vertical-lr;
```

```html
<section class="default-example" id="default-example">
  <div class="transition-all" id="example-element">Change min-inline-size</div>
</section>
```

```css
#example-element {
  display: flex;
  flex-direction: column;
  background-color: #5b6dcd;
  height: 80%;
  justify-content: center;
  color: white;
}
```

## Syntax

```css
/* <length> values */
min-inline-size: 100px;
min-inline-size: 5em;
min-inline-size: anchor-size(width);

/* <percentage> values */
min-inline-size: 10%;

/* Keyword values */
min-inline-size: max-content;
min-inline-size: min-content;
min-inline-size: fit-content;
min-inline-size: fit-content(20em);

/* Global values */
min-inline-size: inherit;
min-inline-size: initial;
min-inline-size: revert;
min-inline-size: revert-layer;
min-inline-size: unset;
```

If the writing mode is vertically oriented, the value of `min-inline-size` relates to the minimum height of the element; otherwise, it relates to the minimum width of the element. A related property is `min-block-size`, which defines the other dimension of the element.

### Values

The `min-inline-size` property takes the same values as the `min-width` and `min-height` properties.

## Examples

### Setting minimum inline size for vertical text

#### HTML

```html
<p class="exampleText">Example text</p>
```

#### CSS

```css
.exampleText {
  writing-mode: vertical-rl;
  background-color: yellow;
  block-size: 5%;
  min-inline-size: 200px;
}
```

#### Result

## See also

- The mapped physical properties: `min-width` and `min-height`
- `writing-mode`

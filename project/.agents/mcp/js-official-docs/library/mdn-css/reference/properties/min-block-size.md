---
title: "`min-block-size` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/min-block-size/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `min-block-size` CSS property

The **`min-block-size`** CSS property defines the minimum horizontal or vertical size of an element's block, depending on its writing mode. It corresponds to either the `min-width` or the `min-height` property, depending on the value of `writing-mode`.

If the writing mode is vertically oriented, the value of `min-block-size` relates to the minimum width of the element; otherwise, it relates to the minimum height of the element. A related property is `min-inline-size`, which defines the other dimension of the element.

```css
min-block-size: 150px;
writing-mode: horizontal-tb;
```

```css
min-block-size: 150px;
writing-mode: vertical-rl;
```

```css
min-block-size: 20px;
writing-mode: horizontal-tb;
```

```css
min-block-size: 15em;
writing-mode: vertical-lr;
```

```html
<section class="default-example" id="default-example">
  <div class="transition-all" id="example-element">
    This is a box where you can change the minimum block size. <br />If there is
    more content than the minimum the box will grow in the block dimension as
    needed by the content.
  </div>
</section>
```

```css
#example-element {
  display: flex;
  flex-direction: column;
  background-color: #5b6dcd;
  justify-content: center;
  color: white;
}
```

## Syntax

```css
/* <length> values */
min-block-size: 100px;
min-block-size: 5em;
min-block-size: anchor-size(self-inline);

/* <percentage> values */
min-block-size: 10%;

/* Keyword values */
min-block-size: max-content;
min-block-size: min-content;
min-block-size: fit-content;
min-block-size: fit-content(20em);

/* Global values */
min-block-size: inherit;
min-block-size: initial;
min-block-size: revert;
min-block-size: revert-layer;
min-block-size: unset;
```

### Values

The `min-block-size` property takes the same values as the `min-width` and `min-height` properties.

## Examples

### Setting minimum block size for vertical text

#### HTML

```html
<p class="exampleText">Example text</p>
```

#### CSS

```css
.exampleText {
  writing-mode: vertical-rl;
  background-color: yellow;
  min-block-size: 200px;
}
```

#### Result

## See also

- The mapped physical properties: `min-width` and `min-height`
- `writing-mode`

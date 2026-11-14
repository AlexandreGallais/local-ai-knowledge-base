---
title: "`block-size` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/block-size/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `block-size` CSS property

The **`block-size`** CSS property defines the size of an element's block along the block axis. If the `writing-mode` is horizontal, it corresponds to the `height`; if the writing mode is vertical, it corresponds to the `width`. A related property is `inline-size`, which defines the other dimension of the element.

```css
block-size: 150px;
writing-mode: horizontal-tb;
```

```css
block-size: 150px;
writing-mode: vertical-rl;
```

```css
block-size: auto;
writing-mode: horizontal-tb;
```

```css
block-size: auto;
writing-mode: vertical-lr;
```

```html
<section class="default-example" id="default-example">
  <div class="transition-all" id="example-element">
    This is a box where you can change the block-size.
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
block-size: 300px;
block-size: 25em;
block-size: anchor-size(height);
block-size: calc(anchor-size(--my-anchor block) * 0.75);

/* <percentage> values */
block-size: 75%;

/* Keyword values */
block-size: max-content;
block-size: min-content;
block-size: fit-content;
block-size: fit-content(20em);
block-size: auto;

/* Global values */
block-size: inherit;
block-size: initial;
block-size: revert;
block-size: revert-layer;
block-size: unset;
```

### Values

The `block-size` property takes the same values as the `width` and `height` properties.

## Examples

### Block size with vertical text

#### HTML

```html
<p class="exampleText">Example text</p>
```

#### CSS

```css
.exampleText {
  writing-mode: vertical-rl;
  background-color: yellow;
  block-size: 200px;
}
```

#### Result

## See also

- The mapped physical properties: `width` and `height`
- `writing-mode`

---
title: "`border-inline-start-style` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/border-inline-start-style/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `border-inline-start-style` CSS property

The **`border-inline-start-style`** CSS property defines the style of the logical inline start border of an element, which maps to a physical border style depending on the element's writing mode, directionality, and text orientation. It corresponds to the `border-top-style`, `border-right-style`, `border-bottom-style`, or `border-left-style` property depending on the values defined for `writing-mode`, `direction`, and `text-orientation`.

```css
border-inline-start-style: dotted;
writing-mode: horizontal-tb;
```

```css
border-inline-start-style: dotted;
writing-mode: vertical-rl;
```

```css
border-inline-start-style: groove;
writing-mode: horizontal-tb;
direction: rtl;
```

```html
<section class="default-example" id="default-example">
  <div class="transition-all" id="example-element">
    This is a box with a border around it.
  </div>
</section>
```

```css
#example-element {
  background-color: #eeeeee;
  color: black;
  border: 0.75em solid;
  padding: 0.75em;
  width: 80%;
  height: 100px;
  unicode-bidi: bidi-override;
}
```

## Syntax

```css
/* Keyword values */
border-inline-start-style: dashed;
border-inline-start-style: dotted;
border-inline-start-style: groove;

/* Global values */
border-inline-start-style: inherit;
border-inline-start-style: initial;
border-inline-start-style: revert;
border-inline-start-style: revert-layer;
border-inline-start-style: unset;
```

Related properties are `border-block-start-style`, `border-block-end-style`, and `border-inline-end-style`, which define the other border styles of the element.

### Values

- `<line-style>`
    The line style of the border. See `border-style`.

## Examples

### HTML

```html
<div>
  <p class="exampleText">Example text</p>
</div>
```

### CSS

```css
div {
  background-color: yellow;
  width: 120px;
  height: 120px;
}

.exampleText {
  writing-mode: vertical-lr;
  border: 5px solid blue;
  border-inline-start-style: dashed;
}
```

## See also

- CSS Logical Properties and Values
- This property maps to one of the physical border properties: `border-top-style`, `border-right-style`, `border-bottom-style`, or `border-left-style`.
- `writing-mode`, `direction`, `text-orientation`

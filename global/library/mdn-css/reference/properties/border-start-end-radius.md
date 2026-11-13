---
title: "`border-start-end-radius` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/border-start-end-radius/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `border-start-end-radius` CSS property

The **`border-start-end-radius`** CSS property defines a logical border radius on an element, which maps to a physical border radius depending on the element's `writing-mode`, `direction`, and `text-orientation`. This is useful when building styles to work regardless of the text orientation and writing mode.

This property affects the corner between the block-start and the inline-end sides of the element. For instance, in a `horizontal-tb` writing mode with `ltr` direction, it corresponds to the `border-top-right-radius` property.

```css
border-start-end-radius: 80px 80px;
```

```css
border-start-end-radius: 250px 100px;
direction: rtl;
```

```css
border-start-end-radius: 50%;
writing-mode: vertical-lr;
```

```css
border-start-end-radius: 50%;
writing-mode: vertical-rl;
```

```html
<section class="default-example" id="default-example">
  <div class="transition-all" id="example-element">
    This is a box with a top right rounded corner.
  </div>
</section>
```

```css
#example-element {
  width: 80%;
  height: 80%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  background-color: #5b6dcd;
  color: white;
  padding: 10px;
}
```

## Syntax

```css
/* <length> values */
/* With one value the corner will be a circle */
border-start-end-radius: 10px;
border-start-end-radius: 1em;

/* With two values the corner will be an ellipse */
border-start-end-radius: 1em 2em;

/* Global values */
border-start-end-radius: inherit;
border-start-end-radius: initial;
border-start-end-radius: revert;
border-start-end-radius: revert-layer;
border-start-end-radius: unset;
```

### Values

- `<length-percentage>`
    Denotes the size of the circle radius or the semi-major and semi-minor axes of the ellipse. As absolute length it can be expressed in any unit allowed by the CSS `<length>` data type. Percentages for the horizontal axis refer to the width of the box, percentages for the vertical axis refer to the height of the box. Negative values are invalid.

## Examples

### Border radius with vertical text

#### HTML

```html
<div>
  <p class="exampleText">Example</p>
</div>
```

#### CSS

```css
div {
  background-color: rebeccapurple;
  width: 120px;
  height: 120px;
  border-start-end-radius: 10px;
}

.exampleText {
  writing-mode: vertical-rl;
  padding: 10px;
  background-color: white;
  border-start-end-radius: 10px;
}
```

#### Results

## See also

- CSS Logical Properties and Values
- The mapped physical property: `border-bottom-left-radius`
- `writing-mode`, `direction`, `text-orientation`

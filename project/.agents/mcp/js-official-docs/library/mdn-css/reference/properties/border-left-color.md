---
title: "`border-left-color` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/border-left-color/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `border-left-color` CSS property

The **`border-left-color`** CSS property sets the color of an element's left border. It can also be set with the shorthand CSS properties `border-color` or `border-left`.

```css
border-left-color: red;
```

```css
border-left-color: #32a1ce;
```

```css
border-left-color: rgb(170 50 220 / 0.6);
```

```css
border-left-color: hsl(60 90% 50% / 0.8);
```

```css
border-left-color: transparent;
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
}
```

## Syntax

```css
/* <color> values */
border-left-color: red;
border-left-color: #ffbb00;
border-left-color: rgb(255 0 0);
border-left-color: hsl(100deg 50% 25% / 75%);
border-left-color: currentColor;
border-left-color: transparent;

/* Global values */
border-left-color: inherit;
border-left-color: initial;
border-left-color: revert;
border-left-color: revert-layer;
border-left-color: unset;
```

### Values

This property is specified as one value:

- `<color>`
    The color of the left border.

## Examples

### A div with a border

#### HTML

```html
<div class="my-box">
  <p>
    This is a box with a border around it. Note which side of the box is
    <span class="red-text">red</span>.
  </p>
</div>
```

#### CSS

```css
.my-box {
  border: solid 0.3em gold;
  border-left-color: red;
  width: auto;
}

.red-text {
  color: red;
}
```

#### Result

## See also

- The border-related CSS shorthand properties: `border`, `border-left`, and `border-color`.
- The color-related CSS properties for the other borders: `border-right-color`, `border-bottom-color`, and `border-top-color`.
- The other border-related CSS properties applying to the same border: `border-left-style` and `border-left-width`.
- The default `currentColor` color value.

---
title: "`border-right-color` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/border-right-color/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `border-right-color` CSS property

The **`border-right-color`** CSS property sets the color of an element's right border. It can also be set with the shorthand CSS properties `border-color` or `border-right`.

```css
border-right-color: red;
```

```css
border-right-color: #32a1ce;
```

```css
border-right-color: rgb(170 50 220 / 0.6);
```

```css
border-right-color: hsl(60 90% 50% / 0.8);
```

```css
border-right-color: transparent;
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
border-right-color: red;
border-right-color: #ffbb00;
border-right-color: rgb(255 0 0);
border-right-color: hsl(100deg 50% 25% / 75%);
border-right-color: currentColor;
border-right-color: transparent;

/* Global values */
border-right-color: inherit;
border-right-color: initial;
border-right-color: revert;
border-right-color: revert-layer;
border-right-color: unset;
```

### Values

This property is specified as one value:

- `<color>`
    The color of the right border.

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
  border-right-color: red;
  width: auto;
}

.red-text {
  color: red;
}
```

#### Result

## See also

- The border-related CSS shorthand properties: `border`, `border-right`, and `border-color`.
- The color-related CSS properties for the other borders: `border-left-color`, `border-bottom-color`, and `border-top-color`.
- The other border-related CSS properties applying to the same border: `border-right-style` and `border-right-width`.
- The default `currentColor` color value.

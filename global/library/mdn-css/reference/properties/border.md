---
title: "`border` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/border/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `border` CSS property

The **`border`** CSS shorthand property sets an element's border. It sets the values of `border-width`, `border-style`, and `border-color`.

```css
border: solid;
```

```css
border: dashed red;
```

```css
border: 1rem solid;
```

```css
border: thick double #32a1ce;
```

```css
border: 4mm ridge rgb(211 220 50 / 0.6);
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
  color: darkmagenta;
  padding: 0.75em;
  width: 80%;
  height: 100px;
}
```

## Constituent properties

This property is a shorthand for the following CSS properties:

- `border-width`
- `border-style`
- `border-color`

### Reset-only sub-properties

This property resets the following CSS properties to their initial values:

- `border-image-outset`
- `border-image-repeat`
- `border-image-slice`
- `border-image-source`
- `border-image-width`

## Syntax

```css
/* style */
border: solid;

/* width | style */
border: 2px dotted;

/* style | color */
border: outset #ff3333;

/* width | style | color */
border: medium dashed green;

/* Global values */
border: inherit;
border: initial;
border: revert;
border: revert-layer;
border: unset;
```

### Values

This property is specified as a space-separated list of one to three of the following values:

- `<line-width>`
    Sets the thickness of the border. Defaults to `medium` if absent. See `border-width`.
- `<line-style>`
    Sets the style of the border. Defaults to `none` if absent. See `border-style`.
- `<color>`
    Sets the color of the border. Defaults to `currentColor` if absent. See `border-color`.

## Description

The `border` shorthand property sets the width, style, and color of all four sides of an element's border. It is specified using one, two, or all three of the component property values, in any order.

Any omitted sub-values are set to their initial value. For a border to be displayed, the `<line-style>` component must be set because the style defaults to `none`.

Importantly, `border` cannot be used to specify a custom value for `border-image`, but instead sets it to its initial value, i.e., `none`.

The `border` shorthand is especially useful when you want all four borders to be the same. To make them different from each other, however, you can use the longhand `border-width`, `border-style`, and `border-color` properties, which accept different values for each side. Alternatively, you can target one border at a time with the physical (e.g., `border-top` ) and logical (e.g., `border-block-start`) border properties.

### Borders vs. outlines

Borders and outlines are very similar. However, outlines differ from borders in the following ways:

- Outlines never take up space, as they are drawn outside of an element's content.
- According to the spec, outlines don't have to be rectangular, although they usually are.

## Examples

### Setting a pink outset border

#### HTML

```html
<div>I have a border, an outline, and a box shadow! Amazing, isn't it?</div>
```

#### CSS

```css
div {
  border: 0.5rem outset pink;
  outline: 0.5rem solid khaki;
  box-shadow: 0 0 0 2rem skyblue;
  border-radius: 12px;
  font: bold 1rem sans-serif;
  margin: 2rem;
  padding: 1rem;
  outline-offset: 0.5rem;
}
```

#### Result

## See also

- `border-width`
- `border-style`
- `border-color`
- `outline`
- Backgrounds and borders
- Learn CSS: Backgrounds and borders

---
title: "`border-top` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/border-top/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `border-top` CSS property

The **`border-top`** CSS shorthand property sets all the properties of an element's top border.

```css
border-top: solid;
```

```css
border-top: dashed red;
```

```css
border-top: 1rem solid;
```

```css
border-top: thick double #32a1ce;
```

```css
border-top: 4mm ridge rgb(211 220 50 / 0.6);
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

- `border-top-color`
- `border-top-style`
- `border-top-width`

## Syntax

```css
border-top: 1px;
border-top: 2px dotted;
border-top: medium dashed green;

/* Global values */
border-top: inherit;
border-top: initial;
border-top: revert;
border-top: revert-layer;
border-top: unset;
```

The three values of the shorthand property can be specified in any order, and one or two of them may be omitted.

### Values

- `<br-width>`
    See `border-top-width`.
- `<br-style>`
    See `border-top-style`.
- `<color>`
    See `border-top-color`.

## Description

As with all shorthand properties, `border-top` always sets the values of all of the properties that it can set, even if they are not specified. It sets those that are not specified to their default values. Consider the following code:

```css
border-top-style: dotted;
border-top: thick green;
```

It is actually the same as this one:

```css
border-top-style: dotted;
border-top: none thick green;
```

The value of `border-top-style` given before `border-top` is ignored. Since the default value of `border-top-style` is `none`, not specifying the `border-style` part results in no border.

## Examples

### Applying a top border

#### HTML

```html
<div>This box has a border on the top side.</div>
```

#### CSS

```css
div {
  border-top: 4px dashed blue;
  background-color: gold;
  height: 100px;
  width: 100px;
  font-weight: bold;
  text-align: center;
}
```

#### Results

## See also

- `border`
- `border-block`
- `outline`

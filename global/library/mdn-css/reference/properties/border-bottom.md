---
title: "`border-bottom` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/border-bottom/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `border-bottom` CSS property

The **`border-bottom`** CSS shorthand property sets an element's bottom border. It sets the values of `border-bottom-width`, `border-bottom-style` and `border-bottom-color`.

```css
border-bottom: solid;
```

```css
border-bottom: dashed red;
```

```css
border-bottom: 1rem solid;
```

```css
border-bottom: thick double #32a1ce;
```

```css
border-bottom: 4mm ridge rgb(211 220 50 / 0.6);
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

- `border-bottom-color`
- `border-bottom-style`
- `border-bottom-width`

## Syntax

```css
border-bottom: 1px;
border-bottom: 2px dotted;
border-bottom: medium dashed blue;

/* Global values */
border-bottom: inherit;
border-bottom: initial;
border-bottom: revert;
border-bottom: revert-layer;
border-bottom: unset;
```

The three values of the shorthand property can be specified in any order, and one or two of them may be omitted.

### Values

- `<br-width>`
    See `border-bottom-width`.
- `<br-style>`
    See `border-bottom-style`.
- `<color>`
    See `border-bottom-color`.

## Description

As with all shorthand properties, `border-bottom` always sets the values of all of the properties that it can set, even if they are not specified. It sets those that are not specified to their default values. Consider the following code:

```css
border-bottom-style: dotted;
border-bottom: thick green;
```

It is actually the same as this one:

```css
border-bottom-style: dotted;
border-bottom: none thick green;
```

The value of `border-bottom-style` given before `border-bottom` is ignored. Since the default value of `border-bottom-style` is `none`, not specifying the `border-style` part results in no border.

## Examples

### Applying a bottom border

#### HTML

```html
<div>This box has a border on the bottom side.</div>
```

#### CSS

```css
div {
  border-bottom: 4px dashed blue;
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

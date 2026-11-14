---
title: "`border-left` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/border-left/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `border-left` CSS property

The **`border-left`** CSS shorthand property sets all the properties of an element's left border.

```css
border-left: solid;
```

```css
border-left: dashed red;
```

```css
border-left: 1rem solid;
```

```css
border-left: thick double #32a1ce;
```

```css
border-left: 4mm ridge rgb(211 220 50 / 0.6);
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

- `border-left-color`
- `border-left-style`
- `border-left-width`

## Syntax

```css
border-left: 1px;
border-left: 2px dotted;
border-left: medium dashed blue;

/* Global values */
border-left: inherit;
border-left: initial;
border-left: revert;
border-left: revert-layer;
border-left: unset;
```

The three values of the shorthand property can be specified in any order, and one or two of them may be omitted.

### Values

- `<br-width>`
    See `border-left-width`.
- `<br-style>`
    See `border-left-style`.
- `<color>`
    See `border-left-color`.

## Description

As with all shorthand properties, `border-left` always sets the values of all of the properties that it can set, even if they are not specified. It sets those that are not specified to their default values. Consider the following code:

```css
border-left-style: dotted;
border-left: thick green;
```

It is actually the same as this one:

```css
border-left-style: dotted;
border-left: none thick green;
```

The value of `border-left-style` given before `border-left` is ignored. Since the default value of `border-left-style` is `none`, not specifying the `border-style` part results in no border.

## Examples

### Applying a left border

#### HTML

```html
<div>This box has a border on the left side.</div>
```

#### CSS

```css
div {
  border-left: 4px dashed blue;
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
- Backgrounds and borders
- Learn CSS: Backgrounds and borders

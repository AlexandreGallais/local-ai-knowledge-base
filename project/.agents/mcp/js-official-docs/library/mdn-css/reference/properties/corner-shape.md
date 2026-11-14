---
title: "`corner-shape` CSS property (part 1 of 2)"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/corner-shape/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `corner-shape` CSS property

The **`corner-shape`** CSS shorthand property specifies the shape of a box's corners, within the area specified by its `border-radius` property value.

## Constituent properties

This property is a shorthand for the following physical properties:

- `corner-top-left-shape`
- `corner-top-right-shape`
- `corner-bottom-left-shape`
- `corner-bottom-right-shape`

## Syntax

```css
/* Single value set for all four corners */
corner-shape: bevel;

/* top-left and bottom-right, top-right and bottom-left */
corner-shape: notch superellipse(0.6);

/* top-left, top-right and bottom-left, bottom-right */
corner-shape: superellipse(-1.2) square squircle;

/* top-left, top-right, bottom-right, bottom-left */
corner-shape: scoop superellipse(-1.6) superellipse(-2.2) round;

/* Global values */
corner-shape: inherit;
corner-shape: initial;
corner-shape: revert;
corner-shape: revert-layer;
corner-shape: unset;
```

The `corner-shape` property may be specified using one, two, three, or four `<corner-shape-value>` values:

- If **one** value is used, it specifies the shape of **all four corners**.
- If **two** values are used, the first shape applies to the **top-left and bottom-right** corners, and the second to the **top-right and bottom-left corners**.
- If **three** values are used, the first shape specifies the shape of the **top-left corner**, the second to the **top-right and bottom-left corners**, and the third to the **bottom-right corner**.
- If four values are used, they specify the shape of the **top-left**, **top-right**, **bottom-right**, and **bottom-left** corners, in that order (clockwise).

### Values

- `corner-shape-value`
    A `superellipse()` or keyword equivalent describing the shape of the corner.

## Description

The `corner-shape` property is used to modify the shape of rounded corners created by the `border-radius` property and its associated longhands. Already-rounded corners can be further customized in terms of the degree of rounding applied to them, allowing the creation of, for example, beveled, notched, and squircle corners. Borders, outlines, shadows, and background effects applied to the container will follow the defined corner shape.

If a `border-radius` is not applied to a container, or the `border-radius` resolves to `0`, `corner-shape` will have no effect.

The `corner-shape` shorthand property and its associated `corner-*-shape` shorthands and longhands accept one to four `<corner-shape-value>` values. Each is specified directly as a `superellipse()` function or a keyword describing a common shape. Each keyword is equivalent to a specific `superellipse()` value.

The default (initial) value of `corner-shape` is `round`, which gives the same effect as using `border-radius` on its own, without `corner-shape`. There is also a keyword value `square`, which gives the same effect as default square corners, effectively removing any `border-radius` applied. The `bevel` value has the effect of drawing a straight line between the two ends of a `border-radius`.

Different `corner-shape` values can be smoothly animated between, as the `superellipse()` equivalents of the keyword values are used as interpolation values.

The `corner-shape` shorthand is especially useful when you want all four borders to be the same, or you want to set different values using a single declaration. To set only one or two corner shapes at a time, use the `corner-*-shape` shorthands and longhands.

### `corner-*-shape` shorthands and longhands

The `corner-shape` shorthand defines the shapes of all four corners in one declaration.

To set only one corner shape at a time, use the corner shape longhands:

- Physical longhand corner shape properties:
  - `corner-bottom-left-shape`
  - `corner-bottom-right-shape`
  - `corner-top-left-shape`
  - `corner-top-right-shape`
- Logical longhand corner shape properties:
  - `corner-start-start-shape`
  - `corner-start-end-shape`
  - `corner-end-start-shape`
  - `corner-end-end-shape`

To set two corner shapes at a time, use the side shorthands:

- Physical side shorthand properties:
  - `corner-top-shape`
  - `corner-right-shape`
  - `corner-bottom-shape`
  - `corner-left-shape`
- Logical side shorthand properties:
  - `corner-block-start-shape`
  - `corner-block-end-shape`
  - `corner-inline-start-shape`
  - `corner-inline-end-shape`

### Constraining opposite corner shape radii

When opposite corners have `border-radius` and `corner-shape` values set that would cause the shapes to overlap, the browser constrains the values to prevent the overlap.

For example, the following values would cause the top-left and bottom-right corners to overlap, therefore the browser adjusts the first `border-radius` component to a value that avoids this.

```css
div {
  width: 480px;
  height: 200px;
  background-color: goldenrod;
  border-radius: 80% 20px;
  corner-shape: scoop;
}
```

### Properties that follow `corner-shape`

The following properties all follow the shape of the corner when set on the container:

- `background-color`
- `background-image`
- `border`
- `outline`
- `box-shadow`
- `overflow`
- `backdrop-filter`

See Demonstration of properties that follow the `corner-shape` for some examples.

### Interaction with `border-shape`

The `corner-shape` property has no effect when the `border-shape` property is set on an element. This is because `border-shape` is incompatible with `border-radius`: when `border-shape` is set, any specified `border-radius` is ignored; `corner-shape` depends on `border-radius` and therefore has no effect either.

If you want to use shaped corners in a `border-shape`, you will have to draw them directly as part of the shape.

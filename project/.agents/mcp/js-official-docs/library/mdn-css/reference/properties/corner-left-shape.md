---
title: "`corner-left-shape` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/corner-left-shape/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `corner-left-shape` CSS property

The **`corner-left-shape`** CSS property specifies the shape of both the corners on a box's left-hand edge, within their `border-radius` area.

For a full description of corner shape behavior and multiple examples, see the `corner-shape` shorthand property page.

## Constituent properties

This property is a shorthand for the following physical properties:

- `corner-top-left-shape`
- `corner-bottom-left-shape`

## Syntax

```css
/* Single keyword value set for both corners */
corner-left-shape: round;
corner-left-shape: bevel;

/* Single superellipse() value set for both corners */
corner-left-shape: superellipse(1.2);
corner-left-shape: superellipse(-2.5);

/* Top corner, bottom corner */
corner-left-shape: round bevel;
corner-left-shape: bevel superellipse(1.2);

/* Global values */
corner-left-shape: inherit;
corner-left-shape: initial;
corner-left-shape: revert;
corner-left-shape: revert-layer;
corner-left-shape: unset;
```

### Values

The `corner-left-shape` property is specified using one or two `<corner-shape-value>` values:

- If **one value** is used, it specifies the shape of **both left-hand corners**.
- If **two values** are used, the first one specifies the shape of the **top-left** corner, and the second one specifies the shape of the **bottom-left** corner.

## Examples

You can find other related examples on the `corner-shape` reference page.

### Basic `corner-left-shape` usage

#### HTML

The markup for this example contains a single `` element.

```html
<div></div>
```

#### CSS

We give the box some basic <example-value>, which we've hidden for brevity. We also apply a `box-shadow`, a `border-radius` of `20px 40px / 60px 80px`, and a `corner-left-shape` of `notch bevel`.

```css
body {
  font-family: "Helvetica", "Arial", sans-serif;
  width: 240px;
  margin: 20px auto;
}

div {
  width: 100%;
  height: 180px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: green;
  background-image: linear-gradient(
    to bottom,
    rgb(255 255 255 / 0),
    rgb(255 255 255 / 0.5)
  );
}
```

```css
div {
  box-shadow: 1px 1px 3px gray;
  border-radius: 20px 40px / 60px 80px;
  corner-left-shape: notch bevel;
}
```

#### Result

The rendered result looks like this:

## See also

- `corner-shape` shorthand property
- `corner-top-shape`, `corner-bottom-shape`, and `corner-right-shape`
- `corner-block-start-shape`, `corner-block-end-shape`, `corner-inline-start-shape`, and `corner-inline-end-shape`
- `border-radius` shorthand property
- `border-top-left-radius` and `border-bottom-left-radius`
- CSS borders and box decorations module
- CSS backgrounds and borders module

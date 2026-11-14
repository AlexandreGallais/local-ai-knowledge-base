---
title: "`corner-bottom-shape` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/corner-bottom-shape/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `corner-bottom-shape` CSS property

The **`corner-bottom-shape`** CSS property specifies the shape of both the corners on a box's bottom edge, within their `border-radius` area.

For a full description of corner shape behavior and multiple examples, see the `corner-shape` shorthand property page.

## Constituent properties

This property is a shorthand for the following physical properties:

- `corner-bottom-left-shape`
- `corner-bottom-right-shape`

## Syntax

```css
/* Single keyword value set for both corners */
corner-bottom-shape: scoop;
corner-bottom-shape: square;

/* Single superellipse() value set for both corners */
corner-bottom-shape: superellipse(0.7);
corner-bottom-shape: superellipse(-2.8);

/* Left-hand corner, right-hand corner */
corner-bottom-shape: scoop square;
corner-bottom-shape: scoop superellipse(0.7);

/* Global values */
corner-bottom-shape: inherit;
corner-bottom-shape: initial;
corner-bottom-shape: revert;
corner-bottom-shape: revert-layer;
corner-bottom-shape: unset;
```

### Values

The `corner-bottom-shape` property is specified using one or two `<corner-shape-value>` values:

- If **one value** is used, it specifies the shape of **both bottom corners**.
- If **two values** are used, the first one specifies the shape of the **bottom-left** corner, and the second one specifies the shape of the **bottom-right** corner.

## Examples

You can find other related examples on the `corner-shape` reference page.

### Basic `corner-bottom-shape` usage

#### HTML

The markup for this example contains a single `` element.

```html
<div></div>
```

#### CSS

We give the box some basic <example-value>, which we've hidden for brevity. We also apply a `box-shadow`, a `border-radius` of `60px 30px 20% 40%`, and a `corner-bottom-shape` of `square squircle`.

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
  background-color: orange;
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
  border-radius: 60px 30px 20% 40%;
  corner-bottom-shape: square squircle;
}
```

#### Result

The rendered result looks like this:

## See also

- `corner-shape` shorthand property
- `corner-top-shape`, `corner-left-shape`, and `corner-right-shape`
- `corner-block-start-shape`, `corner-block-end-shape`, `corner-inline-start-shape`, and `corner-inline-end-shape`
- `border-radius` shorthand property
- `border-bottom-left-radius` and `border-bottom-right-radius`
- CSS borders and box decorations module
- CSS backgrounds and borders module

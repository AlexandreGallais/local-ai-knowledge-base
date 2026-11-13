---
title: "`corner-top-shape` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/corner-top-shape/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `corner-top-shape` CSS property

The **`corner-top-shape`** CSS property specifies the shape of both the corners on a box's top edge, within their `border-radius` area.

For a full description of corner shape behavior and multiple examples, see the `corner-shape` shorthand property page.

## Constituent properties

This property is a shorthand for the following physical properties:

- `corner-top-left-shape`
- `corner-top-right-shape`

## Syntax

```css
/* Single keyword value set for both corners */
corner-top-shape: notch;
corner-top-shape: squircle;

/* Single superellipse() value set for both corners */
corner-top-shape: superellipse(3);
corner-top-shape: superellipse(-1.5);

/* Left-hand corner, right-hand corner */
corner-top-shape: notch squircle;
corner-top-shape: notch superellipse(-1.5);

/* Global values */
corner-top-shape: inherit;
corner-top-shape: initial;
corner-top-shape: revert;
corner-top-shape: revert-layer;
corner-top-shape: unset;
```

### Values

The `corner-top-shape` property is specified using one or two `<corner-shape-value>` values:

- If **one value** is used, it specifies the shape of **both top corners**.
- If **two values** are used, the first one specifies the shape of the **top-left** corner, and the second one specifies the shape of the **top-right** corner.

## Examples

You can find other related examples on the `corner-shape` reference page.

### Basic `corner-top-shape` usage

#### HTML

The markup for this example contains a single `` element.

```html
<div></div>
```

#### CSS

We give the box some basic <example-value>, which we've hidden for brevity. We also apply a `box-shadow`, a `border-radius` of 60 pixels, and a `corner-top-shape` of `scoop notch`.

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
  background-color: goldenrod;
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
  border-radius: 60px;
  corner-top-shape: scoop notch;
}
```

#### Result

The rendered result looks like this:

## See also

- `corner-shape` shorthand property
- `corner-bottom-shape`, `corner-left-shape`, and `corner-right-shape`
- `corner-block-start-shape`, `corner-block-end-shape`, `corner-inline-start-shape`, and `corner-inline-end-shape`
- `border-radius` shorthand property
- `border-top-left-radius` and `border-top-right-radius`
- CSS borders and box decorations module
- CSS backgrounds and borders module

---
title: "`corner-inline-start-shape` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/corner-inline-start-shape/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `corner-inline-start-shape` CSS property

The **`corner-inline-start-shape`** CSS property specifies the shape of both the corners on a box's inline-start edge, within their `border-radius` area.

For a full description of corner shape behavior and multiple examples, see the `corner-shape` shorthand property page.

## Constituent properties

This property is a shorthand for the following logical properties:

- `corner-start-start-shape`
- `corner-end-start-shape`

## Syntax

```css
/* Single keyword value set for both corners */
corner-inline-start-shape: round;
corner-inline-start-shape: bevel;

/* Single superellipse() value set for both corners */
corner-inline-start-shape: superellipse(0.5);
corner-inline-start-shape: superellipse(-3);

/* Block-start/inline-start corner, block-end/inline-start corner */
corner-inline-start-shape: round bevel;
corner-inline-start-shape: round superellipse(0.5);

/* Global values */
corner-inline-start-shape: inherit;
corner-inline-start-shape: initial;
corner-inline-start-shape: revert;
corner-inline-start-shape: revert-layer;
corner-inline-start-shape: unset;
```

### Values

The `corner-inline-start-shape` property is specified using one or two `<corner-shape-value>` values:

- If **one value** is used, it specifies the shape of **both inline-start** corners.
- If **two values** are used, the first one specifies the shape of the **block-start/inline-start** corner, and the second one specifies the shape of the **block-end/inline-start** corner.

## Examples

You can find other related examples on the `corner-shape` reference page.

### Basic `corner-inline-start-shape` usage

#### HTML

The markup for this example contains a single `` element.

```html
<div></div>
```

#### CSS

We give the box some basic <example-value>, which we've hidden for brevity. We also apply a `box-shadow`, a `border-radius` of 60 pixels, and a `corner-inline-start-shape` of `square bevel`.

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
  border-radius: 60px;
  corner-inline-start-shape: square bevel;
}
```

#### Result

The rendered result looks like this:

## See also

- `corner-shape` shorthand property
- `corner-block-start-shape`, `corner-block-end-shape`, and `corner-inline-end-shape`
- `corner-top-shape`, `corner-bottom-shape`, `corner-left-shape`, and `corner-right-shape`
- `border-radius` shorthand property
- `border-start-start-radius` and `border-end-start-radius`
- CSS borders and box decorations module
- CSS backgrounds and borders module

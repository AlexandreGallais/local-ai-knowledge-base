---
title: "`corner-block-end-shape` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/corner-block-end-shape/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `corner-block-end-shape` CSS property

The **`corner-block-end-shape`** CSS property specifies the shape of both the corners on a box's block-end edge, within their `border-radius` area.

For a full description of corner shape behavior and multiple examples, see the `corner-shape` shorthand property page.

## Constituent properties

This property is a shorthand for the following logical properties:

- `corner-end-start-shape`
- `corner-end-end-shape`

## Syntax

```css
/* Single keyword value set for both corners */
corner-block-end-shape: square;
corner-block-end-shape: scoop;

/* Single superellipse() value set for both corners */
corner-block-end-shape: superellipse(3.5);
corner-block-end-shape: superellipse(-1.9);

/* Block-end/inline-start corner, block-end/inline-end corner */
corner-block-end-shape: square scoop;
corner-block-end-shape: square superellipse(-1.9);

/* Global values */
corner-block-end-shape: inherit;
corner-block-end-shape: initial;
corner-block-end-shape: revert;
corner-block-end-shape: revert-layer;
corner-block-end-shape: unset;
```

### Values

The `corner-block-end-shape` property is specified using one or two `<corner-shape-value>` values:

- If **one value** is used, it specifies the shape of **both block-end** corners.
- If **two values** are used, the first one specifies the shape of the **block-end/inline-start** corner, and the second one specifies the shape of the **block-end/inline-end** corner.

## Examples

You can find other related examples on the `corner-shape` reference page.

### Basic `corner-block-end-shape` usage

#### HTML

The markup for this example contains a single `` element.

```html
<div></div>
```

#### CSS

We give the box some basic <example-value>, which we've hidden for brevity. We also apply a `box-shadow`, a `border-radius` of `80px / 40px`, and a `corner-block-end-shape` of `notch square`.

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
  background-color: cyan;
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
  border-radius: 80px / 40px;
  corner-block-end-shape: notch square;
}
```

#### Result

The rendered result looks like this:

## See also

- `corner-shape` shorthand property
- `corner-block-start-shape`, `corner-inline-start-shape`, and `corner-inline-end-shape`
- `corner-top-shape`, `corner-bottom-shape`, `corner-left-shape`, and `corner-right-shape`
- `border-radius` shorthand property
- `border-end-start-radius` and `border-end-end-radius`
- CSS borders and box decorations module
- CSS backgrounds and borders module

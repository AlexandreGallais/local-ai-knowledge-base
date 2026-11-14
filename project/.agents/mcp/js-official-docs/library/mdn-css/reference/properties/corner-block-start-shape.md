---
title: "`corner-block-start-shape` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/corner-block-start-shape/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `corner-block-start-shape` CSS property

The **`corner-block-start-shape`** CSS property specifies the shape of both the corners on a box's block-start edge, within their `border-radius` area.

For a full description of corner shape behavior and multiple examples, see the `corner-shape` shorthand property page.

## Constituent properties

This property is a shorthand for the following logical properties:

- `corner-start-start-shape`
- `corner-start-end-shape`

## Syntax

```css
/* Single keyword value set for both corners */
corner-block-start-shape: notch;
corner-block-start-shape: squircle;

/* Single superellipse() value set for both corners */
corner-block-start-shape: superellipse(2.7);
corner-block-start-shape: superellipse(-2.5);

/* Block-start/inline-start corner, block-start/inline-end corner */
corner-block-start-shape: notch squircle;
corner-block-start-shape: notch superellipse(-2.5);

/* Global values */
corner-block-start-shape: inherit;
corner-block-start-shape: initial;
corner-block-start-shape: revert;
corner-block-start-shape: revert-layer;
corner-block-start-shape: unset;
```

### Values

The `corner-block-start-shape` property is specified using one or two `<corner-shape-value>` values:

- If **one value** is used, it specifies the shape of both **block-start** corners.
- If **two values** are used, the first one specifies the shape of the **block-start/inline-start** corner, and the second one specifies the shape of the **block-start/inline-end** corner.

## Examples

You can find other related examples on the `corner-shape` reference page.

### Basic `corner-block-start-shape` usage

#### HTML

The markup for this example contains a single `` element.

```html
<div></div>
```

#### CSS

We give the box some basic <example-value>, which we've hidden for brevity. We also apply a `box-shadow`, a `border-radius` of `40px 60px`, and a `corner-block-start-shape` of `scoop notch`.

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
  border-radius: 40px 60px;
  corner-block-start-shape: scoop notch;
}
```

#### Result

The rendered result looks like this:

## See also

- `corner-shape` shorthand property
- `corner-block-end-shape`, `corner-inline-start-shape`, and `corner-inline-end-shape`
- `corner-top-shape`, `corner-bottom-shape`, `corner-left-shape`, and `corner-right-shape`
- `border-radius` shorthand property
- `border-start-start-radius` and `border-start-end-radius`
- CSS borders and box decorations module
- CSS backgrounds and borders module

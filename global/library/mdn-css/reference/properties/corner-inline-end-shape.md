---
title: "`corner-inline-end-shape` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/corner-inline-end-shape/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `corner-inline-end-shape` CSS property

The **`corner-inline-end-shape`** CSS property specifies the shape of both the corners on a box's inline-end edge, within their `border-radius` area.

For a full description of corner shape behavior and multiple examples, see the `corner-shape` shorthand property page.

## Constituent properties

This property is a shorthand for the following logical properties:

- `corner-start-end-shape`
- `corner-end-end-shape`

## Syntax

```css
/* Single keyword value set for both corners */
corner-inline-end-shape: squircle;
corner-inline-end-shape: scoop;

/* Single superellipse() value set for both corners */
corner-inline-end-shape: superellipse(1.5);
corner-inline-end-shape: superellipse(-0.8);

/* Block-start/inline-end corner, block-end/inline-end corner */
corner-inline-end-shape: squircle scoop;
corner-inline-end-shape: squircle superellipse(-0.8);

/* Global values */
corner-inline-end-shape: inherit;
corner-inline-end-shape: initial;
corner-inline-end-shape: revert;
corner-inline-end-shape: revert-layer;
corner-inline-end-shape: unset;
```

### Values

The `corner-inline-end-shape` property is specified using one or two `<corner-shape-value>` values:

- If **one value** is used, it specifies the shape of **both inline-end** corners.
- If **two values** are used, the first one specifies the shape of the **block-start/inline-end** corner, and the second one specifies the shape of the **block-end/inline-end** corner.

## Examples

You can find other related examples on the `corner-shape` reference page.

### Basic `corner-inline-end-shape` usage

#### HTML

The markup for this example contains a single `` element.

```html
<div></div>
```

#### CSS

We give the box some basic <example-value>, which we've hidden for brevity. We also apply a `box-shadow`, a `border-radius` of `15% 30%`, and a `corner-inline-end-shape` of `bevel squircle`.

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
  border-radius: 15% 30%;
  corner-inline-end-shape: bevel squircle;
}
```

#### Result

The rendered result looks like this:

## See also

- `corner-shape` shorthand property
- `corner-block-start-shape`, `corner-block-end-shape`, and `corner-inline-start-shape`
- `corner-top-shape`, `corner-bottom-shape`, `corner-left-shape`, and `corner-right-shape`
- `border-radius` shorthand property
- `border-start-end-radius` and `border-end-end-radius`
- CSS borders and box decorations module
- CSS backgrounds and borders module

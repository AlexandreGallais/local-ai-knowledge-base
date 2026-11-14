---
title: "`corner-right-shape` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/corner-right-shape/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `corner-right-shape` CSS property

The **`corner-right-shape`** CSS property specifies the shape of both the corners on a box's right-hand edge, within their `border-radius` area.

For a full description of corner shape behavior and multiple examples, see the `corner-shape` shorthand property page.

## Constituent properties

This property is a shorthand for the following physical properties:

- `corner-top-right-shape`
- `corner-bottom-right-shape`

## Syntax

```css
/* Single keyword value set for both corners */
corner-right-shape: bevel;
corner-right-shape: notch;

/* Single superellipse() value set for both corners */
corner-right-shape: superellipse(4);
corner-right-shape: superellipse(-0.9);

/* Top corner, bottom corner */
corner-right-shape: bevel notch;
corner-right-shape: notch superellipse(-0.9);

/* Global values */
corner-right-shape: inherit;
corner-right-shape: initial;
corner-right-shape: revert;
corner-right-shape: revert-layer;
corner-right-shape: unset;
```

### Values

The `corner-right-shape` property is specified using one or two `<corner-shape-value>` values:

- If **one value** is used, it specifies the shape of **both right-hand corners**.
- If **two values** are used, the first one specifies the shape of the **top-right** corner, and the second one specifies the shape of the **bottom-right** corner.

## Examples

You can find other related examples on the `corner-shape` reference page.

### Basic `corner-right-shape` usage

#### HTML

The markup for this example contains a single `` element.

```html
<div></div>
```

#### CSS

We give the box some basic <example-value>, which we've hidden for brevity. We also apply a `box-shadow`, a `border-radius` of `20% 30% / 50% 40%`, and a `corner-right-shape` of `square scoop`.

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
  border-radius: 20% 30% / 50% 40%;
  corner-right-shape: square scoop;
}
```

#### Result

The rendered result looks like this:

## See also

- `corner-shape` shorthand property
- `corner-top-shape`, `corner-bottom-shape`, and `corner-left-shape`
- `corner-block-start-shape`, `corner-block-end-shape`, `corner-inline-start-shape`, and `corner-inline-end-shape`
- `border-radius` shorthand property
- `border-top-right-radius` and `border-bottom-right-radius`
- CSS borders and box decorations module
- CSS backgrounds and borders module

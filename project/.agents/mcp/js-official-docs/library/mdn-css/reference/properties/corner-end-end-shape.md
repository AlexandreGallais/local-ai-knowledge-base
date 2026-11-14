---
title: "`corner-end-end-shape` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/corner-end-end-shape/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `corner-end-end-shape` CSS property

The **`corner-end-end-shape`** CSS property specifies the shape of a box's block-end and inline-end corner, within its `border-radius` area.

For a full description of corner shape behavior and multiple examples, see the `corner-shape` shorthand property page.

## Syntax

```css
/* Keyword values */
corner-end-end-shape: scoop;
corner-end-end-shape: notch;

/* superellipse() function values */
corner-end-end-shape: superellipse(4);
corner-end-end-shape: superellipse(-0.5);

/* Global values */
corner-end-end-shape: inherit;
corner-end-end-shape: initial;
corner-end-end-shape: revert;
corner-end-end-shape: revert-layer;
corner-end-end-shape: unset;
```

### Values

The `corner-end-end-shape` property is specified using a `<corner-shape-value>` value.

## Examples

You can find other related examples on the `corner-shape` reference page.

### Basic `corner-end-end-shape` usage

#### HTML

The markup for this example contains a single `` element.

```html
<div></div>
```

#### CSS

We give the box some basic <example-value>, which we've hidden for brevity. We also apply a `box-shadow`, a `border-radius` of 60 pixels, and a `corner-end-end-shape` of `squircle`.

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
  border-radius: 60px;
  corner-end-end-shape: squircle;
}
```

#### Result

The rendered result looks like this:

## See also

- `corner-shape` shorthand property
- `corner-start-start-shape`, `corner-start-end-shape`, and `corner-end-start-shape`
- `corner-top-left-shape`, `corner-top-right-shape`, `corner-bottom-left-shape`, and `corner-bottom-right-shape`
- `border-radius` shorthand property
- `border-end-end-radius`
- CSS borders and box decorations module
- CSS backgrounds and borders module

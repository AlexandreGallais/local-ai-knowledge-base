---
title: "`corner-top-right-shape` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/corner-top-right-shape/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `corner-top-right-shape` CSS property

The **`corner-top-right-shape`** CSS property specifies the shape of a box's top-right corner, within its `border-radius` area.

For a full description of corner shape behavior and multiple examples, see the `corner-shape` shorthand property page.

## Syntax

```css
/* Keyword values */
corner-top-right-shape: scoop;
corner-top-right-shape: square;

/* superellipse() function values */
corner-top-right-shape: superellipse(2.2);
corner-top-right-shape: superellipse(-2.5);

/* Global values */
corner-top-right-shape: inherit;
corner-top-right-shape: initial;
corner-top-right-shape: revert;
corner-top-right-shape: revert-layer;
corner-top-right-shape: unset;
```

### Values

The `corner-top-right-shape` property is specified using a `<corner-shape-value>` value.

## Examples

You can find other related examples on the `corner-shape` reference page.

### Basic `corner-top-right-shape` usage

#### HTML

The markup for this example contains a single `` element.

```html
<div></div>
```

#### CSS

We give the box some basic <example-value>, which we've hidden for brevity. We also apply a `box-shadow`, a `border-radius` of 60 pixels, and a `corner-top-right-shape` of `bevel`.

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
  corner-top-right-shape: bevel;
}
```

#### Result

The rendered result looks like this:

## See also

- `corner-shape` shorthand property
- `corner-top-left-shape`, `corner-bottom-left-shape`, and `corner-bottom-right-shape`
- `corner-start-start-shape`, `corner-start-end-shape`, `corner-end-start-shape`, and `corner-end-end-shape`
- `border-radius` shorthand property
- `border-top-right-radius`
- CSS borders and box decorations module
- CSS backgrounds and borders module

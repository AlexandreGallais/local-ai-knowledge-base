---
title: "`corner-bottom-left-shape` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/corner-bottom-left-shape/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `corner-bottom-left-shape` CSS property

The **`corner-bottom-left-shape`** CSS property specifies the shape of a box's bottom-left corner, within its `border-radius` area.

For a full description of corner shape behavior and multiple examples, see the `corner-shape` shorthand property page.

## Syntax

```css
/* Keyword values */
corner-bottom-left-shape: bevel;
corner-bottom-left-shape: round;

/* superellipse() function values */
corner-bottom-left-shape: superellipse(0.7);
corner-bottom-left-shape: superellipse(-1.9);

/* Global values */
corner-bottom-left-shape: inherit;
corner-bottom-left-shape: initial;
corner-bottom-left-shape: revert;
corner-bottom-left-shape: revert-layer;
corner-bottom-left-shape: unset;
```

### Values

The `corner-bottom-left-shape` property is specified using a `<corner-shape-value>` value.

## Examples

You can find other related examples on the `corner-shape` reference page.

### Basic `corner-bottom-left-shape` usage

#### HTML

The markup for this example contains a single `` element.

```html
<div></div>
```

#### CSS

We give the box some basic <example-value>, which we've hidden for brevity. We also apply a `box-shadow`, a `border-radius` of `80px 40% 60px 20%`, and a `corner-bottom-left-shape` of `squircle`.

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
  border-radius: 80px 40% 60px 20%;
  corner-bottom-left-shape: squircle;
}
```

#### Result

The rendered result looks like this:

## See also

- `corner-shape` shorthand property
- `corner-top-left-shape`, `corner-top-right-shape`, and `corner-bottom-right-shape`
- `corner-start-start-shape`, `corner-start-end-shape`, `corner-end-start-shape`, and `corner-end-end-shape`
- `border-radius` shorthand property
- `border-bottom-left-radius`
- CSS borders and box decorations module
- CSS backgrounds and borders module

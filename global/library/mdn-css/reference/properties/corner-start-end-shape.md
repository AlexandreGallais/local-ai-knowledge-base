---
title: "`corner-start-end-shape` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/corner-start-end-shape/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `corner-start-end-shape` CSS property

The **`corner-start-end-shape`** CSS property specifies the shape of a box's block-start and inline-end corner, within its `border-radius` area.

For a full description of corner shape behavior and multiple examples, see the `corner-shape` shorthand property page.

## Syntax

```css
/* Keyword values */
corner-start-end-shape: square;
corner-start-end-shape: bevel;

/* superellipse() function values */
corner-start-end-shape: superellipse(1.5);
corner-start-end-shape: superellipse(-2.2);

/* Global values */
corner-start-end-shape: inherit;
corner-start-end-shape: initial;
corner-start-end-shape: revert;
corner-start-end-shape: revert-layer;
corner-start-end-shape: unset;
```

### Values

The `corner-start-end-shape` property is specified using a `<corner-shape-value>` value.

## Examples

You can find other related examples on the `corner-shape` reference page.

### Basic `corner-start-end-shape` usage

#### HTML

The markup for this example contains a single `` element.

```html
<div></div>
```

#### CSS

We give the box some basic <example-value>, which we've hidden for brevity. We also apply a `box-shadow`, a `border-radius` of `20px 40px 60px 80px`, and a `corner-start-end-shape` of `notch`.

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
  border-radius: 20px 40px 60px 80px;
  corner-start-end-shape: notch;
}
```

#### Result

The rendered result looks like this:

## See also

- `corner-shape` shorthand property
- `corner-start-start-shape`, `corner-end-start-shape`, and `corner-end-end-shape`
- `corner-top-left-shape`, `corner-top-right-shape`, `corner-bottom-left-shape`, and `corner-bottom-right-shape`
- `border-radius` shorthand property
- `border-start-end-radius`
- CSS borders and box decorations module
- CSS backgrounds and borders module

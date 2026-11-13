---
title: "`corner-start-start-shape` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/corner-start-start-shape/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `corner-start-start-shape` CSS property

The **`corner-start-start-shape`** CSS property specifies the shape of a box's block-start and inline-start corner, within its `border-radius` area.

For a full description of corner shape behavior and multiple examples, see the `corner-shape` shorthand property page.

## Syntax

```css
/* Keyword values */
corner-start-start-shape: notch;
corner-start-start-shape: squircle;

/* superellipse() function values */
corner-start-start-shape: superellipse(3);
corner-start-start-shape: superellipse(-1.5);

/* Global values */
corner-start-start-shape: inherit;
corner-start-start-shape: initial;
corner-start-start-shape: revert;
corner-start-start-shape: revert-layer;
corner-start-start-shape: unset;
```

### Values

The `corner-start-start-shape` property is specified using a `<corner-shape-value>` value.

## Examples

You can find other related examples on the `corner-shape` reference page.

### Basic `corner-start-start-shape` usage

#### HTML

The markup for this example contains a single `` element.

```html
<div></div>
```

#### CSS

We give the box some basic <example-value>, which we've hidden for brevity. We also apply a `box-shadow`, a `border-radius` of `40% 10px 10px`, and a `corner-start-start-shape` of `scoop`.

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
  border-radius: 40% 10px 10px;
  corner-start-start-shape: scoop;
}
```

#### Result

The rendered result looks like this:

## See also

- `corner-shape` shorthand property
- `corner-start-end-shape`, `corner-end-start-shape`, and `corner-end-end-shape`
- `corner-top-left-shape`, `corner-top-right-shape`, `corner-bottom-left-shape`, and `corner-bottom-right-shape`
- `border-radius` shorthand property
- `border-start-start-radius`
- CSS borders and box decorations module
- CSS backgrounds and borders module

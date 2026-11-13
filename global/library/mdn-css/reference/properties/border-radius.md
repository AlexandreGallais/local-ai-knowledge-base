---
title: "`border-radius` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/border-radius/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `border-radius` CSS property

The **`border-radius`** CSS shorthand property rounds the corners of an element's outer border edge. You can set a single radius to make circular corners, or two radii to make elliptical corners.

```css
border-radius: 30px;
```

```css
border-radius: 25% 10%;
```

```css
border-radius: 10% 30% 50% 70%;
```

```css
border-radius: 10% / 50%;
```

```css
border-radius: 10px 100px / 120px;
```

```css
border-radius: 50% 20% / 10% 40%;
```

```html
<section class="default-example" id="default-example">
  <div class="transition-all" id="example-element">
    This is a box with rounded corners.
  </div>
</section>
```

```css
#example-element {
  width: 80%;
  height: 80%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  background-color: #5b6dcd;
  color: white;
  padding: 10px;
}
```

## Constituent properties

This property is a shorthand for the following CSS properties:

- `border-top-left-radius`
- `border-top-right-radius`
- `border-bottom-right-radius`
- `border-bottom-left-radius`

## Syntax

```css
/* The syntax of the first radius allows one to four values */
/* Radius is set for all 4 sides */
border-radius: 10px;

/* top-left-and-bottom-right | top-right-and-bottom-left */
border-radius: 10px 5%;

/* top-left | top-right-and-bottom-left | bottom-right */
border-radius: 2px 4px 2px;

/* top-left | top-right | bottom-right | bottom-left */
border-radius: 1px 0 3px 4px;

/* The syntax of the second radius allows one to four values */
/* (first radius values) / radius */
border-radius: 10px / 20px;

/* (first radius values) / top-left-and-bottom-right | top-right-and-bottom-left */
border-radius: 10px 5% / 20px 30px;

/* (first radius values) / top-left | top-right-and-bottom-left | bottom-right */
border-radius: 10px 5px 2em / 20px 25px 30%;

/* (first radius values) / top-left | top-right | bottom-right | bottom-left */
border-radius: 10px 5% / 20px 25em 30px 35em;

/* Global values */
border-radius: inherit;
border-radius: initial;
border-radius: revert;
border-radius: revert-layer;
border-radius: unset;
```

The `border-radius` property is specified as:

- one, two, three, or four `<length>` or `<percentage>` values. This is used to set a single radius for the corners.
- followed optionally by "/" and one, two, three, or four `<length>` or `<percentage>` values. This is used to set an additional radius, so you can have elliptical corners.

### Values

       | radius
       |
       |
        Is a `<length>` or a
        `<percentage>` denoting a radius to use
        for the border in each corner of the border. It is used only in the
        one-value syntax.

       | top-left-and-bottom-right
       |

       |
        Is a `<length>` or a
        `<percentage>` denoting a radius to use
        for the border in the top-left and bottom-right corners of the element's
        box. It is used only in the two-value syntax.

       | top-right-and-bottom-left
       |

       |
        Is a `<length>` or a
        `<percentage>` denoting a radius to use
        for the border in the top-right and bottom-left corners of the element's
        box. It is used only in the two- and three-value syntaxes.

       | top-left
       |
       |
        Is a `<length>` or a
        `<percentage>` denoting a radius to use
        for the border in the top-left corner of the element's box. It is used
        only in the three- and four-value syntaxes.

       | top-right
       |
       |
        Is a `<length>` or a
        `<percentage>` denoting a radius to use
        for the border in the top-right corner of the element's box. It is used
        only in the four-value syntax.

       | bottom-right
       |
       |
        Is a `<length>` or a
        `<percentage>` denoting a radius to use
        for the border in the bottom-right corner of the element's box. It is
        used only in the three- and four-value syntaxes.

       | bottom-left
       |
       |
        Is a `<length>` or a
        `<percentage>` denoting a radius to use
        for the border in the bottom-left corner of the element's box. It is
        used only in the four-value syntax.

- `<length>`
    Denotes the size of the circle radius, or the semi-major and semi-minor axes of the ellipse, using length values. Negative values are invalid.
- `<percentage>`
    Denotes the size of the circle radius, or the semi-major and semi-minor axes of the ellipse, using percentage values. Percentages for the horizontal axis refer to the width of the box; percentages for the vertical axis refer to the height of the box. Negative values are invalid.

For example:

```css
border-radius: 1em / 5em;

/* It is equivalent to: */
border-top-left-radius: 1em 5em;
border-top-right-radius: 1em 5em;
border-bottom-right-radius: 1em 5em;
border-bottom-left-radius: 1em 5em;
```

```css
border-radius: 4px 3px 6px / 2px 4px;

/* It is equivalent to: */
border-top-left-radius: 4px 2px;
border-top-right-radius: 3px 4px;
border-bottom-right-radius: 6px 2px;
border-bottom-left-radius: 3px 4px;
```

## Description

The radius applies to the whole `background`, even if the element has no border; the exact position of the clipping is defined by the `background-clip` property.

The `border-radius` property does not apply to table elements when `border-collapse` is `collapse`.

> **Note:**
> As with any shorthand property, individual sub-properties cannot inherit, such as in `border-radius:0 0 inherit inherit`, which would partially override existing definitions. Instead, the individual longhand properties have to be used.

## Examples

### Comparing border styles

The following example has seven `<pre>` elements, each of which demonstrates combinations of `border` and `border-radius` styles.
The styles applied to each `<pre>` element are included as the element's contents, so you can see the CSS declarations necessary to create the associated border style:

```html
<pre id="example-1">
  border: solid 10px;
  border-radius: 10px 40px 40px 10px;
</pre>

<pre id="example-2">
  border: groove 1em red;
  border-radius: 2em;
</pre>

<pre id="example-3">
  background: gold;
  border: ridge gold;
  border-radius: 13em / 3em;
</pre>

<pre id="example-4">
  border: none;
  border-radius: 40px 10px;
  background: gold;
</pre>

<pre id="example-5">
  border: none;
  border-radius: 50%;
  background: burlywood;
</pre>

<pre id="example-6">
  border: dotted;
  border-width: 10px 4px;
  border-radius: 10px 40px;
</pre>

<pre id="example-7">
  border: dashed;
  border-width: 2px 4px;
  border-radius: 40px;
</pre>
```

```css
pre {
  margin: 20px;
  padding: 20px;
  width: 80%;
  height: 50px;
}

pre#example-1 {
  border: solid 10px;
  border-radius: 10px 40px 40px 10px;
}

pre#example-2 {
  border: groove 1em red;
  border-radius: 2em;
}

pre#example-3 {
  background: gold;
  border: ridge gold;
  border-radius: 13em / 3em;
}

pre#example-4 {
  border: none;
  border-radius: 40px 10px;
  background: gold;
}

pre#example-5 {
  border: none;
  border-radius: 50%;
  background: burlywood;
}

pre#example-6 {
  border: dotted;
  border-width: 10px 4px;
  border-radius: 10px 40px;
}

pre#example-7 {
  border: dashed;
  border-width: 2px 4px;
  border-radius: 40px;
}
```

### Using `corner-shape` with `border-radius`

When a non-`0` `border-radius` value is applied to a box corner, you can use the `corner-shape` property (or one of its longhands and shorthands) to apply custom shapes to that corner, such as a bevel, notch, or squircle. This example demonstrates `corner-shape` usage.

#### HTML

The markup for this example contains a single `` element.

```html
<div></div>
```

#### CSS

We give the box some basic <example-value>, which we've hidden for brevity. We also apply a `box-shadow`, a `border-radius` of `0 20% 50px 30%`, and a `corner-shape` of `superellipse(0.5) bevel notch squircle`.

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
  border-radius: 0 20% 50px 30%;
  corner-shape: superellipse(0.5) bevel notch squircle;
}
```

#### Result

The rendered result looks like this:

Note how no corner shape is applied to the top-left corner, because it has a `border-radius` of `0` set.

## See also

- Border-radius-related CSS properties: `border-top-left-radius`, `border-top-right-radius`, `border-bottom-right-radius`, `border-bottom-left-radius`, `border-start-start-radius`, `border-start-end-radius`, `border-end-start-radius`, `border-end-end-radius`

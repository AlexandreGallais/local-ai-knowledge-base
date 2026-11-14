---
title: "`d` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/d/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `d` CSS property

The **`d`** CSS property defines a path to be drawn by the SVG `` element. If present, it overrides the element's `d` attribute.

> **Note:**
> The `d` property only applies to `` elements nested in an ``. It doesn't apply to other SVG elements nor to HTML elements or pseudo-elements.

## Syntax

```css
/* Default */
d: none;

/* Basic usage */
d: path("m 5,5 h 35 L 20,30 z");
d: path("M 0,25 l 50,150 l 200,50 z");
d: path("M 10,5 l 90,0 -80,80 0,-60 80,80 -90,0 z");

/* Global values */
d: inherit;
d: initial;
d: revert;
d: revert-layer;
d: unset;
```

### Values

The value is either a `path()` function with a single `<string>` parameter or the keyword `none`:

- `none`
    No path is drawn.
- `path(<string>)`
    A `path()` function with a quoted data string parameter. The data string defines an SVG path. The SVG path data string contains path commands that implicitly use pixel units. An empty path is considered invalid.

## Examples

### Specifying path data

This example demonstrates the basic use case of `d`, and how the CSS `d` property takes precedence over the `d` attribute.

#### HTML

We include two identical `` elements in an SVG; their `d` attribute values are `"m 5,5 h 90 v 90 h -90 v -90 z"`, which creates a `90px` square.

```html
<svg>
  <path d="m 5,5 h 90 v 90 h -90 v -90 z" />
  <path d="m 5,5 h 90 v 90 h -90 v -90 z" />
</svg>
```

#### CSS

With CSS, we style both paths, providing a black `stroke` and semi-opaque red `fill`. We then use the `d` property to override the value of the SVG `d` attribute for the last path only. The browser renders SVG images as `300px` wide and `150px` tall by default.

```css
svg {
  border: 1px solid;
}

path {
  fill: #ff333388;
  stroke: black;
}

path:last-of-type {
  d: path(
    "M10,30 A20,20 0,0,1 50,30 A20,20 0,0,1 90,30 Q90,60 50,90 Q10,60 10,30 z"
  );
}
```

#### Results

The second `` is a heart, as defined in the CSS `d` property's `path()` function value. The unstyled ``'s path remained a square, as defined in its SVG `d` attribute value.

### Animating data paths

This example demonstrates animating the `d` attribute value.

#### HTML

We create a `` containing a single `` element.

```html
<svg>
  <path />
</svg>
```

#### CSS

We use the `d` attribute to define a heart with a line through it. We use CSS to define the `fill`, `stroke`, and `stroke-width` of that path, and add a two-second `transition`. We add a `:hover` style that contains a slightly different `path()` function; the path has the same number of data points as the default state, making the path animatable.

```css
svg {
  border: 1px solid;
}

path {
  d: path(
    "M10,30 A20,20 0,0,1 50,30 A20,20 0,0,1 90,30 Q90,60 50,90 Q10,60 10,30 z M90,5 L5,90"
  );
  transition: all 2s;
  fill: none;
  stroke: red;
  stroke-width: 3px;
}

svg:hover path {
  d: path(
    "M10,30 A20,20 0,0,1 50,30 A20,20 0,0,1 90,30 Q90,60 50,90 Q10,60 10,30 z M5,5 L90,90"
  );
  stroke: black;
}
```

#### Results

To view the animation, hover over the SVG.

## See also

- SVG `d` attribute
- `fill`
- `stroke`
- `path()` function
- `basic-shape` data type
- Overview of CSS shapes
- CSS shapes module

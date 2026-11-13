---
title: "`lighting-color` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/lighting-color/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `lighting-color` CSS property

The **`lighting-color`** CSS property defines the color of the light source for the `<feDiffuseLighting>` and `<feSpecularLighting>` SVG lighting filter primitives within an SVG `<filter>`. If present, it overrides the element's `lighting-color` attribute.

> **Note:**
> The `lighting-color` property only applies to `<feDiffuseLighting>` and `<feSpecularLighting>` elements nested in an ``. It doesn't apply to other SVG, HTML, or pseudo-elements.

## Syntax

```css
/* <color> values */
lighting-color: red;
lighting-color: hsl(120deg 75% 25% / 60%);
lighting-color: currentColor;

/* Global values */
lighting-color: inherit;
lighting-color: initial;
lighting-color: revert;
lighting-color: revert-layer;
lighting-color: unset;
```

### Values

This property is specified as one `<color>` value:

- `<color>`
    The lighting's color. This can be any valid CSS `<color>` value.

## Examples

### Defining the color of filter lighting

This example demonstrates the basic use case of `lighting-color`, and how the CSS `lighting-color` property takes precedence over the `lighting-color` attribute.

#### HTML

We have an SVG with two `<filter>` elements, one with a `<feDiffuseLighting>` and one with a `<feSpecularLighting>` child. Each includes the SVG `lighting-color` attribute defining the lighting color as `red`. Both of these children have a `<fePointLight>`, the required child that sets the light source. We included two `<rect>` elements with a filter attribute; this is where the filters will be displayed.

```html
<svg viewBox="0 0 420 120" xmlns="http://www.w3.org/2000/svg">
  <filter id="flood1">
    <feDiffuseLighting lighting-color="red">
      <fePointLight x="75" y="30" z="10" />
    </feDiffuseLighting>
  </filter>
  <filter id="flood2">
    <feSpecularLighting specularExponent="5" lighting-color="red">
      <fePointLight x="225" y="75" z="5" />
    </feSpecularLighting>
  </filter>

  <rect id="r1" filter="url(#flood1)" />
  <rect id="r2" filter="url(#flood2)" />
</svg>
```

#### CSS

We define the size and position of our `<rect>` using the CSS `height`, `width`, `x`, and `y` properties. We also add a background image to the SVG to make any color alpha transparency more apparent:

```css
svg {
  background-image: repeating-linear-gradient(
    45deg,
    transparent 0 9px,
    #cccccc 0px 10px
  );
}

rect {
  width: 100px;
  height: 100px;
  x: 10px;
  y: 10px;
}

#r2 {
  x: 150px;
}
```

We then apply different lighting color values to the filter's child elements using the CSS `lighting-color` property. We use a named color and a 3-digit hexadecimal color, but we can use any valid CSS color syntax:

```css
feDiffuseLighting {
  lighting-color: blue;
}

feSpecularLighting {
  lighting-color: #ff0099;
}
```

#### Results

The attributes defined the color of both light filters as `red`, but these values were overridden by the CSS `lighting-color` values.

## See also

- `color`
- `fill`
- `flood-color`
- `stop-color`
- `stroke`
- `flood-opacity`
- `background-color`
- `<color>`
- `filter-function`
- SVG `lighting-color` attribute

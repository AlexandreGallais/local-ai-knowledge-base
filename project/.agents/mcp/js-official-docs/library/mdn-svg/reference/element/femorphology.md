---
title: "<feMorphology>"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/svg/reference/element/femorphology/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# <feMorphology>

The **`<feMorphology>`** SVG filter primitive is used to erode or dilate the input image. Its usefulness lies especially in fattening or thinning effects.

Like other filter primitives, it handles color components in the `linearRGB` color space by default. You can use `color-interpolation-filters` to use `sRGB` instead.

## Attributes

- `in`
- `operator`
- `radius`
- Filter primitive attributes: `x`, `y`, `width`, `height`, `result`

## DOM Interface

This element implements the `SVGFEMorphologyElement` interface.

## Examples

### Filtering SVG content

#### SVG

```html
<svg xmlns="http://www.w3.org/2000/svg" width="300" height="180">
  <filter id="erode">
    <feMorphology operator="erode" radius="1" />
  </filter>
  <filter id="dilate">
    <feMorphology operator="dilate" radius="2" />
  </filter>
  <text y="1em">Normal text</text>
  <text id="thin" y="2em">Thinned text</text>
  <text id="thick" y="3em">Fattened text</text>
</svg>
```

#### CSS

```css
text {
  font-family: "Helvetica", "Arial", sans-serif;
  font-size: 3em;
}

#thin {
  filter: url("#erode");
}

#thick {
  filter: url("#dilate");
}
```

### Filtering HTML content

#### SVG

```html
<svg xmlns="http://www.w3.org/2000/svg" width="0" height="0">
  <filter id="erode">
    <feMorphology operator="erode" radius="1" />
  </filter>
  <filter id="dilate">
    <feMorphology operator="dilate" radius="2" />
  </filter>
</svg>

<p>Normal text</p>
<p id="thin">Thinned text</p>
<p id="thick">Fattened text</p>
```

#### CSS

```css
p {
  margin: 0;
  font-family: "Helvetica", "Arial", sans-serif;
  font-size: 3em;
}

#thin {
  filter: url("#erode");
}

#thick {
  filter: url("#dilate");
}
```

## See also

- `<filter>`
- `<animate>`
- `<set>`
- `<feBlend>`
- `<feColorMatrix>`
- `<feComponentTransfer>`
- `<feComposite>`
- `<feConvolveMatrix>`
- `<feDiffuseLighting>`
- `<feDisplacementMap>`
- `<feFlood>`
- `<feGaussianBlur>`
- `<feImage>`
- `<feMerge>`
- `<feOffset>`
- `<feSpecularLighting>`
- `<feTile>`
- `<feTurbulence>`
- SVG tutorial: Filter effects

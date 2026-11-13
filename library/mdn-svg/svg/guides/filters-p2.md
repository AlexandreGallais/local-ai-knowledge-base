---
title: "Applying effects with SVG filters (part 2 of 2)"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/svg/guides/filters/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# Applying effects with SVG filters (part 2 of 2)

## Filters on HTML content

The CSS `filter` property can also apply an SVG filter to any HTML element. For this purpose, you can define an `` element in the document which only holds the `<filter>` and is completely transparent to the layout. You need to set its `width` and `height` to `0` so it doesn't cover the page content, its `position` to `fixed` to remove it from the flow, and `aria-hidden` to keep it out of the accessibility tree.

In the following example, the text is displaced by the noise the filter generates for itself, which no CSS filter function can do:

```html
<svg class="filter-host" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
  <filter id="wobble" x="-20%" y="-20%" width="140%" height="140%">
    <feTurbulence
      type="fractalNoise"
      baseFrequency="0.05"
      numOctaves="2"
      result="noise" />
    <feDisplacementMap
      in="SourceGraphic"
      in2="noise"
      scale="8"
      xChannelSelector="R"
      yChannelSelector="G" />
  </filter>
</svg>

<p class="wobble">Filtered HTML text</p>
```

```css
.filter-host {
  position: fixed;
  width: 0;
  height: 0;
}

.wobble {
  font: bold 2rem sans-serif;
  filter: url("#wobble");
}
```

See Applying SVG effects to HTML content for more on combining the two languages.

## SVG filters and CSS filter functions

The CSS `filter` property accepts both a `url()` reference to an SVG filter and a list of filter functions such as `blur()`, `drop-shadow()`, and `grayscale()`. The filter functions are shorthands for exactly these primitives, so:

- Use a filter function where one exists for the effect you need. It is shorter, it can be animated and interpolated by CSS, and it operates in `sRGB` with no surprises. However, note that filter functions may not apply to SVG elements, in which case you must use an SVG filter.
- Use an SVG filter for more complex effects without an existing filter function: several operations chained together, two inputs composited, generated noise or lighting, or fine control over the color space and filter region.

The choice isn't exclusive: the property takes a space-separated list, so `filter: url("#wobble") grayscale(1)` runs the SVG filter and then the function, in that order. Listing two `<filter>` references is also the way to combine steps that need different `primitiveUnits`, since that attribute applies to a whole filter rather than to one primitive.

## See also

- `<filter>`: the element that defines a filter
- `in`, `result`, `color-interpolation-filters`: the attributes that wire a pipeline together
- Filter primitive elements: reference for the `fe*` elements
- `filter`: the CSS property that applies a filter to SVG or HTML
- Using filter effects: CSS guide to the filter functions
- Filter effects: filters chapter of the SVG tutorial
- Applying SVG effects to HTML content: filters, clipping, and masking on HTML content
- SVG filters guide: getting started with the basics on blog.master.dev (2026)
- SVG filter text effects: letterpress, ink gain, wood type on carmenansio.com (2026)

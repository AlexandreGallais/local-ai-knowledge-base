---
title: "in"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/svg/reference/attribute/in/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# in

The **`in`** attribute identifies input for the given filter primitive.

The value can be either one of the six keywords defined below, or a string which matches a previous `result` attribute value within the same `<filter>` element. If no value is provided and this is the first filter primitive, then this filter primitive will use `SourceGraphic` as its input. If no value is provided and this is a subsequent filter primitive, then this filter primitive will use the result from the previous filter primitive as its input.

If the value for `result` appears multiple times within a given `<filter>` element, then a reference to that result will use the closest preceding filter primitive with the given value for attribute `result`.

You can use this attribute with the following SVG elements:

- `<feBlend>`
- `<feColorMatrix>`
- `<feComponentTransfer>`
- `<feComposite>`
- `<feConvolveMatrix>`
- `<feDiffuseLighting>`
- `<feDisplacementMap>`
- `<feDropShadow>`
- `<feGaussianBlur>`
- `<feMergeNode>`
- `<feMorphology>`
- `<feOffset>`
- `<feSpecularLighting>`
- `<feTile>`

## Usage notes

       | Value
       |
        `SourceGraphic` | `SourceAlpha` |
        `BackgroundImage` | `BackgroundAlpha` |
        `FillPaint` | `StrokePaint` |
        `&#x3C;filter-primitive-reference>`

       | Default value
       |
        `SourceGraphic` for first filter primitive, otherwise result
        of previous filter primitive

       | Animatable
       | Yes

- `SourceGraphic`
    This keyword represents the graphics elements that were the original input into the `<filter>` element.
- `SourceAlpha`
    This keyword represents the graphics elements that were the original input into the `<filter>` element. `SourceAlpha` has all of the same rules as `SourceGraphic` except that only the alpha channel is used.
- `BackgroundImage`
    This keyword represents an image snapshot of the SVG document under the filter region at the time that the `<filter>` element was invoked.
- `BackgroundAlpha`
    Same as `BackgroundImage` except only the alpha channel is used.
- `FillPaint`
    This keyword represents the value of the `fill` property on the target element for the filter effect. In many cases, the `FillPaint` is opaque everywhere, but that might not be the case if a shape is painted with a gradient or pattern which itself includes transparent or semi-transparent parts.
- `StrokePaint`
    This keyword represents the value of the `stroke` property on the target element for the filter effect. In many cases, the `StrokePaint` is opaque everywhere, but that might not be the case if a shape is painted with a gradient or pattern which itself includes transparent or semi-transparent parts.
- `<filter-primitive-reference>`
    This value is an assigned name for the filter primitive in the form of a `custom-ident`. If supplied, then graphics that result from processing this filter primitive can be referenced by an in attribute on a subsequent filter primitive within the same filter element. If no value is provided, the output will only be available for re-use as the implicit input into the next filter primitive if that filter primitive provides no value for its in attribute.

## Workaround for BackgroundImage

`BackgroundImage` is not supported as a filter source in modern browsers (see the feComposite compatibility table). We therefore need to import one of the images to blend inside the filter itself, using an `<feImage>` element.

> **Note:**
> Firefox Bug 455986 means that `feImage` cannot load partial images, including circles, rectangles, paths or other fragments defined in the document. So that this example works on more browsers, a full external image of the logo is loaded.

### HTML

```html
<svg
  xmlns="http://www.w3.org/2000/svg"
  xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <filter id="backgroundMultiply">
      <!-- This will not work. -->
      <feBlend in="BackgroundImage" in2="SourceGraphic" mode="multiply" />
    </filter>
  </defs>
  <image
    href="mdn_logo_only_color.png"
    x="10%"
    y="10%"
    width="80%"
    height="80%" />
  <circle
    cx="50%"
    cy="40%"
    r="40%"
    fill="#cc0000"
    filter="url(#backgroundMultiply)" />
</svg>

<svg
  xmlns="http://www.w3.org/2000/svg"
  xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <filter id="imageMultiply">
      <!-- This is a workaround. -->
      <feImage
        href="mdn_logo_only_color.png"
        x="10%"
        y="10%"
        width="80%"
        height="80%" />
      <feBlend in2="SourceGraphic" mode="multiply" />
    </filter>
  </defs>
  <circle
    cx="50%"
    cy="40%"
    r="40%"
    fill="#cc0000"
    filter="url(#imageMultiply)" />
</svg>
```

```css
svg {
  width: 200px;
  height: 200px;
  display: inline;
}
```

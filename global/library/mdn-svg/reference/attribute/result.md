---
title: "result"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/svg/reference/attribute/result/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# result

The **`result`** attribute defines the assigned name for this filter primitive. If supplied, then graphics that result from processing this filter primitive can be referenced by an `in` attribute on a subsequent filter primitive within the same `<filter>` element. If no value is provided, the output will only be available for re-use as the implicit input into the next filter primitive if that filter primitive provides no value for its `in` attribute.

You can use this attribute with the following SVG elements:

- `<feBlend>`
- `<feColorMatrix>`
- `<feComponentTransfer>`
- `<feComposite>`
- `<feConvolveMatrix>`
- `<feDiffuseLighting>`
- `<feDisplacementMap>`
- `<feDropShadow>`
- `<feFlood>`
- `<feGaussianBlur>`
- `<feImage>`
- `<feMerge>`
- `<feMorphology>`
- `<feOffset>`
- `<feSpecularLighting>`
- `<feTile>`
- `<feTurbulence>`

## Example

```css
html,
body,
svg {
  height: 100%;
}
```

```html
<svg viewBox="0 0 220 220" xmlns="http://www.w3.org/2000/svg">
  <filter id="displacementFilter">
    <feTurbulence
      type="turbulence"
      baseFrequency="0.05"
      numOctaves="2"
      result="turbulence" />
    <feDisplacementMap
      in2="turbulence"
      in="SourceGraphic"
      scale="50"
      xChannelSelector="R"
      yChannelSelector="G" />
  </filter>

  <circle cx="100" cy="100" r="100" filter="url(#displacementFilter)" />
</svg>
```

## Usage notes

       | Value
       | `&#x3C;filter-primitive-reference>`

       | Default value
       | None

       | Animatable
       | Yes

- `<filter-primitive-reference>`
    This value is a `custom-ident` and defines the name for the filter primitive. It is only meaningful within a given `<filter>` element and thus has only local scope. It is legal for the same `<filter-primitive-reference>` to appear multiple times within the same `<filter>` element. When referenced, this value will use the closest preceding filter primitive with the given result.

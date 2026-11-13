---
title: "clip-rule"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/svg/reference/attribute/clip-rule/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# clip-rule

The `clip-rule` attribute only applies to graphics elements that are contained within a `<clipPath>` element. The `clip-rule` attribute basically works as the `fill-rule` attribute, except that it applies to `<clipPath>` definitions.

> **Note:**
> As a presentation attribute, `clip-rule` also has a CSS property counterpart: `clip-rule`. When both are specified, the CSS property takes priority.

The following fragment of code will cause an evenodd clipping rule to be applied to the clipping path because `clip-rule` is specified on the `` element that defines the clipping shape:

```html
<g>
  <clipPath id="MyClip">
    <path d="..." clip-rule="evenodd" />
  </clipPath>
  <rect clip-path="url(#MyClip)" ... />
</g>
```

whereas the following fragment of code will not cause an evenodd clipping rule to be applied because the `clip-rule` is specified on the referencing element, not on the object defining the clipping shape:

```html
<g>
  <clipPath id="MyClip">
    <path d="..." />
  </clipPath>
  <rect clip-path="url(#MyClip)" clip-rule="evenodd" ... />
</g>
```

## Elements

The following elements can use the `clip-rule` attribute, but only if they are inside a `<clipPath>` element.

- Graphics elements

## Example

```html
<svg width="100" viewBox="0 0 100 90" xmlns="http://www.w3.org/2000/svg">
  <!-- Define star path -->
  <defs>
    <path d="M50,0 21,90 98,35 2,35 79,90z" id="star" />
  </defs>

  <!-- Left: evenodd -->
  <clipPath id="emptyStar">
    <use href="#star" clip-rule="evenodd" />
  </clipPath>
  <rect clip-path="url(#emptyStar)" width="50" height="90" fill="blue" />

  <!-- Right: nonzero -->
  <clipPath id="filledStar">
    <use href="#star" clip-rule="nonzero" />
  </clipPath>
  <rect clip-path="url(#filledStar)" width="50" height="90" x="50" fill="red" />
</svg>
```

## Usage notes

       | Value
       | nonzero | evenodd | inherit

       | Default value
       | nonzero

       | Animatable
       | Yes

- nonzero
    See description of `fill-rule` property.
- evenodd
    See description of `fill-rule` property.

## See also

- `<clipPath>`
- CSS `clip-rule` property

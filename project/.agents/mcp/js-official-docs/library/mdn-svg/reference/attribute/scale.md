---
title: "scale"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/svg/reference/attribute/scale/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# scale

The **`scale`** attribute defines the displacement scale factor to be used on a `<feDisplacementMap>` filter primitive. The amount is expressed in the coordinate system established by the `primitiveUnits` attribute on the `<filter>` element.

You can use this attribute with the following SVG elements:

- `<feDisplacementMap>`

## Example

```css
html,
body,
svg {
  height: 100%;
}
```

```html
<svg viewBox="0 0 480 220" xmlns="http://www.w3.org/2000/svg">
  <filter id="displacementFilter" x="-20%" y="-20%" width="140%" height="140%">
    <feTurbulence
      type="turbulence"
      baseFrequency="0.05"
      numOctaves="2"
      result="turbulence" />
    <feDisplacementMap in2="turbulence" in="SourceGraphic" scale="5" />
  </filter>
  <filter id="displacementFilter2" x="-20%" y="-20%" width="140%" height="140%">
    <feTurbulence
      type="turbulence"
      baseFrequency="0.05"
      numOctaves="2"
      result="turbulence" />
    <feDisplacementMap in2="turbulence" in="SourceGraphic" scale="50" />
  </filter>

  <circle cx="100" cy="100" r="80" filter="url(#displacementFilter)" />
  <circle cx="340" cy="100" r="80" filter="url(#displacementFilter2)" />
</svg>
```

## Usage notes

       | Value
       | `number`

       | Default value
       | None

       | Animatable
       | Yes

- `<number>`
    This value defines the scale factor for the displacement.

    When the value of this attribute is `0`, this operation has no effect on the source image.

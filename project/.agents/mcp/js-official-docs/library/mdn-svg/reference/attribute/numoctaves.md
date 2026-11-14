---
title: "numOctaves"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/svg/reference/attribute/numoctaves/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# numOctaves

The **`numOctaves`** attribute defines the number of octaves for the noise function of the `<feTurbulence>` primitive.

An octave is a noise function defined by its frequency and amplitude. A turbulence is built by accumulating several octaves with increasing frequencies and decreasing amplitudes.
The higher the number of octaves, the more natural the noise looks. Though more octaves also require more calculations, resulting in a negative impact on performance.

You can use this attribute with the following SVG elements:

- `<feTurbulence>`

## Example

### Example 1

```css
html,
body,
svg {
  height: 100%;
}
```

```html
<svg viewBox="0 0 420 200" xmlns="http://www.w3.org/2000/svg">
  <filter id="noise1" x="0" y="0" width="100%" height="100%">
    <feTurbulence baseFrequency="0.025" numOctaves="1" />
  </filter>
  <filter id="noise2" x="0" y="0" width="100%" height="100%">
    <feTurbulence baseFrequency="0.025" numOctaves="3" />
  </filter>

  <rect x="0" y="0" width="200" height="200" filter="url(#noise1)" />
  <rect x="220" y="0" width="200" height="200" filter="url(#noise2)" />
</svg>
```

### Example 2

```html
<svg
  width="200"
  height="200"
  viewBox="0 0 220 220"
  xmlns="http://www.w3.org/2000/svg">
  <filter id="displacementFilter">
    <feTurbulence baseFrequency="0.05" numOctaves="3" result="turbulence" />
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
       | `integer`

       | Default value
       | `1`

       | Animatable
       | Yes

- `<integer>`
    Defines the number of octaves. Negative values are forbidden.

## See also

- Understanding Perlin Noise
- `baseFrequency`

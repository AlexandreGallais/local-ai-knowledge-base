---
title: "offset"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/svg/reference/attribute/offset/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# offset

The **`offset`** attribute defines where a gradient stop is placed along a gradient vector, or the offset value used in a component transfer function.

- On a `<stop>` element, it indicates the position of a gradient color along a linear gradient vector, or a fractional vector of the distance between the edge of a smaller/innermost circular shape and the edge of a larger/outermost circular shape.
- On component transfer function elements (`<feFuncR>`, `<feFuncG>`, `<feFuncB>`, and `<feFuncA>`), it defines a constant added to the result of the `gamma` transfer function, while having no effect for other `type` values.

## Example

### Gradient stop offset

```css
html,
body,
svg {
  height: 100%;
}
```

```html
<svg viewBox="0 0 20 10" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="linear-gradient">
      <stop offset="6%" stop-color="black" />
      <stop offset="70%" stop-color="grey" />
    </linearGradient>
    <radialGradient id="radial-gradient">
      <stop offset="0%" stop-color="gold" />
      <stop offset="95%" stop-color="grey" />
    </radialGradient>
  </defs>
  <circle cx="5" cy="5" r="4" fill="url('#linear-gradient')" />
  <circle cx="15" cy="5" r="4" fill="url('#radial-gradient')" />
</svg>
```

### Component transfer offset

```html
<svg viewBox="0 0 200 40" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <filter id="gamma-filter">
      <feComponentTransfer>
        <feFuncR type="gamma" amplitude="2" exponent="3" offset="0.2" />
        <feFuncG type="gamma" amplitude="2" exponent="3" offset="0.3" />
        <feFuncB type="gamma" amplitude="2" exponent="3" offset="0.5" />
      </feComponentTransfer>
    </filter>
  </defs>
  <text x="60" y="25" filter="url(#gamma-filter)">GammaFunc</text>
</svg>
```

## Usage notes

### Stop

       | Value
       |
        `number` | `percentage`

       | Default value
       | `0`

       | Animatable
       | Yes

### Component transfer functions

> **Note:**
> Only applies when `type` is set to `gamma`, ignored for `identity`, `table`, `discrete`, and `linear`.

       | Value
       |
        `number`

       | Default value
       | `0`

       | Animatable
       | Yes

## See also

- `<stop>`
- `<feComponentTransfer>`
- `<feFuncR>`
- `<feFuncG>`
- `<feFuncB>`
- `<feFuncA>`

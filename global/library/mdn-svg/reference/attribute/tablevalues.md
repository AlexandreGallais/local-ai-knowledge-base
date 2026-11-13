---
title: "tableValues"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/svg/reference/attribute/tablevalues/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# tableValues

The **`tableValues`** attribute defines a list of numbers defining a lookup table of values for a color component transfer function.

You can use this attribute with the following SVG elements:

- `<feFuncA>`
- `<feFuncB>`
- `<feFuncG>`
- `<feFuncR>`

## Example

```css
html,
body,
svg {
  height: 100%;
}
```

```html
<svg viewBox="0 0 420 200" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient
      id="gradient"
      gradientUnits="userSpaceOnUse"
      x1="0"
      y1="0"
      x2="200"
      y2="0">
      <stop offset="0" stop-color="red" />
      <stop offset="0.5" stop-color="lime" />
      <stop offset="1" stop-color="blue" />
    </linearGradient>
  </defs>

  <filter id="componentTransfer1" x="0" y="0" width="100%" height="100%">
    <feComponentTransfer>
      <feFuncR type="table" tableValues="0 1" />
      <feFuncG type="table" tableValues="0 1" />
      <feFuncB type="table" tableValues="0 1" />
    </feComponentTransfer>
  </filter>
  <filter id="componentTransfer2" x="0" y="0" width="100%" height="100%">
    <feComponentTransfer>
      <feFuncR type="table" tableValues="1 0" />
      <feFuncG type="table" tableValues="1 0" />
      <feFuncB type="table" tableValues="1 0" />
    </feComponentTransfer>
  </filter>

  <rect
    x="0"
    y="0"
    width="200"
    height="200"
    fill="url(#gradient)"
    filter="url(#componentTransfer1)" />
  <rect
    x="220"
    y="0"
    width="200"
    height="200"
    fill="url(#gradient)"
    filter="url(#componentTransfer2)" />
</svg>
```

## Usage notes

       | Value
       |
        <code
          >&#x3C;list-of-numbers></code
        >

       | Default value
       | Empty list resulting in identity transfer

       | Animatable
       | Yes

- `<list-of-numbers>`
    This value holds a comma- and/or space-separated list of `number`s, which define a lookup table for the color component transfer function. Each number can be between `0` and `1`.

    An empty list results in an identity transfer function.

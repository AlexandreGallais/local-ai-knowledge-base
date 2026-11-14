---
title: "xChannelSelector"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/svg/reference/attribute/xchannelselector/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# xChannelSelector

The **`xChannelSelector`** attribute indicates which color channel from `in2` to use to displace the pixels in `in` along the x-axis.

## Elements

You can use this attribute with the `<feDisplacementMap>` SVG element.

## Examples

```css
html,
body,
svg {
  height: 100%;
}
```

```html
<svg viewBox="0 0 440 160" xmlns="http://www.w3.org/2000/svg">
  <filter id="displacementFilter">
    <feImage
      href="mdn.svg"
      x="0"
      y="0"
      width="100%"
      height="100%"
      result="abc" />
    <feDisplacementMap
      in2="abc"
      in="SourceGraphic"
      scale="30"
      xChannelSelector="R" />
  </filter>
  <filter id="displacementFilter2">
    <feImage
      href="mdn.svg"
      x="0"
      y="0"
      width="100%"
      height="100%"
      result="abc" />
    <feDisplacementMap
      in2="abc"
      in="SourceGraphic"
      scale="30"
      xChannelSelector="B" />
  </filter>

  <text x="10" y="60" font-size="50" filter="url(#displacementFilter)">
    Some displaced text
  </text>
  <text x="10" y="120" font-size="50" filter="url(#displacementFilter2)">
    Some displaced text
  </text>
</svg>
```

## Usage notes

       | Value
       | `R` | `G` | `B` | `A`

       | Default value
       | `A`

       | Animatable
       | Yes

- `R`
    This keyword specifies that the red color channel of the input image defined in `in2` will be used to displace the pixels of the input image defined in `in` along the x-axis.
- `G`
    This keyword specifies that the green color channel of the input image defined in `in2` will be used to displace the pixels of the input image defined in `in` along the x-axis.
- `B`
    This keyword specifies that the blue color channel of the input image defined in `in2` will be used to displace the pixels of the input image defined in `in` along the x-axis.
- `A`
    This keyword specifies that the alpha channel of the input image defined in `in2` will be used to displace the pixels of the input image defined in `in` along the x-axis.

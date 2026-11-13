---
title: "patternTransform"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/svg/reference/attribute/patterntransform/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# patternTransform

The **`patternTransform`** attribute defines a list of transform definitions that are applied to a pattern tile.

You can use this attribute with the following SVG elements:

- `<pattern>`

## Elements

You can use this attribute with the SVG elements described in the sections below.

### `<pattern>`

For `<pattern>`, `patternTransform` defines a list of transform definitions that are applied to a pattern tile.

> **Note:**
> As of SVG2, it is also allowed to use the CSS `transform` property. However, the current state of implementation isn't very good. For backward compatibility reason, it is highly suggested to keep using the `patternTransform` attribute.

       | Value
       |
        &#x3C;transform-list>

       | Default value
       | Identity transform

       | Animatable
       | Yes

## Examples

```css
html,
body,
svg {
  height: 100%;
}
```

```html
<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <!-- Apply a transform on the tile -->
  <pattern
    id="p1"
    width=".25"
    height=".25"
    patternTransform="rotate(20)
                      skewX(30)
                      scale(1 0.5)">
    <circle cx="10" cy="10" r="10" />
  </pattern>

  <!-- Apply the transformed pattern tile -->
  <rect x="10" y="10" width="80" height="80" fill="url(#p1)" />
</svg>
```

## See also

- `transform`

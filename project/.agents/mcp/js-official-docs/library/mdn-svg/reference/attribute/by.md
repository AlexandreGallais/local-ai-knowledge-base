---
title: "by"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/svg/reference/attribute/by/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# by

The **`by`** attribute specifies a relative offset value for an attribute that will be modified during an animation.

The starting value for the attribute is either indicated by specifying it as value for the attribute given in the `attributeName` or the `from` attribute.

You can use this attribute with the following SVG elements:

- `<animate>`
- `<animateMotion>`
- `<animateTransform>`

## Example

```css
html,
body,
svg {
  height: 100%;
}
```

```html
<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  <rect x="10" y="10" width="100" height="100">
    <animate attributeName="width" fill="freeze" by="50" dur="3s" />
  </rect>
</svg>
```

## Usage notes

       | Value
       | See below

       | Default value
       | None

       | Animatable
       | No

The exact value type for this attribute depends on the value of the attribute that will be animated.

When a list of values is defined via the `values` attribute, the `by` attribute is ignored.

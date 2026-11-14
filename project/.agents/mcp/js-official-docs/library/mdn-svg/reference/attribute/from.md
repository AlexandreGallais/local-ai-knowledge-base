---
title: "from"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/svg/reference/attribute/from/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# from

The **`from`** attribute indicates the initial value of the attribute that will be modified during the animation.

When used with the `to` attribute, the animation will change the modified attribute from the `from` value to the `to` value. When used with the `by` attribute, the animation will change the attribute relatively from the `from` value by the value specified in `by`.

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
  <rect x="10" y="10" height="100">
    <animate attributeName="width" fill="freeze" from="100" to="150" dur="3s" />
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

When a list of values is defined via the `values` attribute, the `from` attribute is ignored.

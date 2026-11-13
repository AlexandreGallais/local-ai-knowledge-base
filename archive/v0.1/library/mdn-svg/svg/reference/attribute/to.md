---
title: "to"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/svg/reference/attribute/to/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# to

The **`to`** attribute indicates the final value of the attribute that will be modified during the animation.

The value of the attribute will change between the `from` attribute value and this value.

You can use this attribute with the following SVG elements:

- `<animate>`
- `<animateMotion>`
- `<animateTransform>`
- `<set>`

## animate, animateMotion, animateTransform

For `<animate>`, `<animateMotion>`, and `<animateTransform>`, `to` specifies the ending value of the animation.

       | Value
       | `&#x3C;value>`

       | Default value
       | None

       | Animatable
       | No

The exact value type for this attribute depend on the value of the attribute that will be animated.

If a list of values is defined via the `values` attribute, the `to` attribute is ignored.

## set

For the `<set>` element, `to` specifies the value for the attribute during the duration of the element.

       | Value
       | `&#x3C;value>`

       | Default value
       | None

       | Animatable
       | No

The exact value type for this attribute depend on the value of the attribute that will be animated.

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
    <animate
      attributeType="XML"
      attributeName="width"
      fill="freeze"
      from="100"
      to="150"
      dur="3s" />
  </rect>
</svg>
```

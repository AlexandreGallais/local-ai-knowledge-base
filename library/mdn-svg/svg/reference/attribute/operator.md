---
title: "operator"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/svg/reference/attribute/operator/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# operator

The **`operator`** attribute has two meanings based on the context it's used in. Either it defines the compositing or morphing operation to be performed.

You can use this attribute with the following SVG elements:

- `<feComposite>`
- `<feMorphology>`

## feComposite

For `<feComposite>`, `operator` defines the compositing operation that is to be performed.

       | Value
       |
        `over` | `in` | `out` |
        `atop` | `xor` | `lighter` |
        `arithmetic`

       | Default value
       | `over`

       | Animatable
       | Yes

- `over`
    This value indicates that the source graphic defined in the `in` attribute is placed over the destination graphic defined in the `in2` attribute.
- `in`
    This value indicates that the parts of the source graphic defined in the `in` attribute that overlap the destination graphic defined in the `in2` attribute, replace the destination graphic.
- `out`
    This value indicates that the parts of the source graphic defined in the `in` attribute that fall outside the destination graphic defined in the `in2` attribute, are displayed.
- `atop`
    This value indicates that the parts of the source graphic defined in the `in` attribute, which overlap the destination graphic defined in the `in2` attribute, replace the destination graphic. The parts of the destination graphic that do not overlap with the source graphic stay untouched.
- `xor`
    This value indicates that the non-overlapping regions of the source graphic defined in the `in` attribute and the destination graphic defined in the `in2` attribute are combined.
- `lighter`
    This value indicates that the sum of the source graphic defined in the `in` attribute and the destination graphic defined in the `in2` attribute is displayed.
- `arithmetic`
    This value indicates that the source graphic defined in the `in` attribute and the destination graphic defined in the `in2` attribute are combined using the following formula:

    `result = k1*i1*i2 + k2*i1 + k3*i2 + k4`

    where:
    `i1` and `i2` indicate the corresponding pixel channel values of the input image, which map to `in` and `in2` respectively, and `k1`, `k2`, `k3`, and `k4` indicate the values of the attributes with the same name.

## feMorphology

For `<feMorphology>`, `operator` defines whether to erode (i.e., thin) or dilate (fatten) the source graphic.

       | Value
       | `erode` | `dilate`

       | Default value
       | `erode`

       | Animatable
       | Yes

- `erode`
    This value thins the source graphic defined in the `in` attribute.
- `dilate`
    This value fattens the source graphic defined in the `in` attribute.

## Example

```css
html,
body,
svg {
  height: 100%;
  font:
    20px "Helvetica",
    "Arial",
    sans-serif;
}
```

```html
<svg viewBox="0 0 120 70" xmlns="http://www.w3.org/2000/svg">
  <filter id="erode">
    <feMorphology operator="erode" radius="0.4" />
  </filter>
  <filter id="dilate">
    <feMorphology operator="dilate" radius="0.8" />
  </filter>

  <text x="0" y="15">Normal text</text>
  <text x="0" y="40" filter="url(#erode)">Thin text</text>
  <text x="0" y="65" filter="url(#dilate)">Fat text</text>
</svg>
```

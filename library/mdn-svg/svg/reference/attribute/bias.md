---
title: "bias"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/svg/reference/attribute/bias/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# bias

The **`bias`** attribute shifts the range of the filter. After applying the `kernelMatrix` of the `<feConvolveMatrix>` element to the input image to yield a number and applied the `divisor` attribute, the `bias` attribute is added to each component. This allows representation of values that would otherwise be clamped to 0 or 1.

You can use this attribute with the following SVG elements:

- `<feConvolveMatrix>`

## Usage notes

       | Value
       |
        &#x3C;number>

       | Default value
       | `0`

       | Animatable
       | Yes

One application of bias is when it is desirable to have 0.5 gray value be the zero response of the filter.

---
title: "baseline-shift"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/svg/reference/attribute/baseline-shift/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# baseline-shift

The **`baseline-shift`** attribute allows repositioning of the dominant-baseline relative to the dominant-baseline of the parent text content element. The shifted object might be a sub- or superscript.

> **Note:**
> As a presentation attribute, `baseline-shift` also has a CSS property counterpart: `baseline-shift`. When both are specified, the CSS property takes priority.

> **Note:**
> This property is going to be deprecated and authors are advised to use `vertical-align` instead.

You can use this attribute with the following SVG elements:

- `<textPath>`
- `<tspan>`

## Usage notes

       | Value
       |
        `length-percentage` | `sub` |
        `super`

       | Default value
       | `0`

       | Animatable
       | Yes

- `sub`
    The dominant-baseline is shifted to the default position for subscripts.
- `super`
    The dominant-baseline is shifted to the default position for superscripts.
- `<length-percentage>`
    A length value raises (positive value) or lowers (negative value) the dominant-baseline of the parent text content element by the specified length.

    A percentage value raises (positive value) or lowers (negative value) the dominant-baseline of the parent text content element by the specified percentage of the `line-height`.

---
title: "KeyframeEffect: composite property"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/api/keyframeeffect/composite/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# KeyframeEffect: composite property

The **`composite`** property of a `KeyframeEffect` resolves how an element's animation impacts its underlying property values.

## Value

To understand these values, take the example of a `keyframeEffect` value of `blur(2)` working on an underlying property value of `blur(3)`.

- `replace`
    The `keyframeEffect` **overrides** the underlying value it is combined with: `blur(2)` replaces `blur(3)`.
- `add`
    The `keyframeEffect` is **added** to the underlying value with which it is combined (aka _additive_): `blur(2) blur(3)`.
- `accumulate`
    The keyframeEffect is **accumulated** on to the underlying value: `blur(5)`.

## See also

- Web Animations API
- Property of `KeyframeEffect` objects
- Composite operation

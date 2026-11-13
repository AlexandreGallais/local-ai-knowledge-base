---
title: "KeyframeEffect: iterationComposite property"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/api/keyframeeffect/iterationcomposite/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# KeyframeEffect: iterationComposite property

The **`iterationComposite`** property of a `KeyframeEffect` resolves how the animation's property value changes accumulate or override each other upon each of the animation's iterations.

## Value

One of the following:

- `replace`
    The `keyframeEffect` value produced is independent of the current iteration.
- `accumulate`
    Subsequent iterations of the `keyframeEffect` build on the final value of the previous iteration.

## See also

- Web Animations API
- Property of both `KeyframeEffect` objects.

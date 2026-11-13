---
title: "Animatable CSS properties"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/guides/animations/animatable_properties/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Animatable CSS properties

CSS Animations and Transitions rely on the concept of **animatable** properties, and all CSS properties are animatable unless otherwise specified. Each property's _animation type_ determines how values combine - interpolate, add, or accumulate - for this property. Transitions only involve interpolation, whereas animations may use all three combination methods.

> **Note:**
> The animation type for each CSS property is listed in its "Formal definition" table (E.g., `color`).

> **Note:**
> The interpolation method for each CSS data type is described in its "Interpolation" section (E.g., `<length>`).

## Animation types

There are mainly four animation types as defined in the Web Animations specification:

- Not animatable
    The property is not animatable. It is not processed when listed in an animation keyframe and is unaffected by transitions.

    > **Note:**
    > An animation effect targeting only properties that are not animatable will still exhibit the usual behavior for an animation effect (E.g., firing the `animationstart` event).

- Discrete
    The property's values are not additive, and interpolation swaps from the start value to the end value at `50%`. Specifically, denoting by `p` the progress value:
    - If `p < 0.5`, then `V_result = V_start`;
    - If `p ≥ 0.5`, then `V_result = V_end`.

- By computed value
    Corresponding individual components of the computed values are combined using the indicated procedure for that value type. If the number of components or the types of corresponding components do not match, or if any component value uses discrete animation and the two corresponding values do not match, then the property values combine as discrete.

- Repeatable list
    Same as by computed value except that if the two lists have differing numbers of items, they are first repeated to the least common multiple numbers of items. Each item is then combined by computed value. If a pair of values cannot be combined or any component value uses discrete animation, then the property values combine as discrete.

Some properties have specific interpolation behavior not covered by these four types. In this case, refer to the property's "Interpolation" section (E.g., `visibility`).

## Animating custom properties

For custom properties registered using the `registerProperty()` method, the animation type is by computed value, with the computed value type determined by the property's syntax definition.

For unregistered custom properties, the animation type is discrete.

## See also

- `transition-behavior`
- `@starting-style`
- CSS animations module
- Using CSS Animations
- Using CSS Transitions

---
title: "CSS easing functions"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/guides/easing_functions/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSS easing functions

The **CSS easing functions** module defines easing functions, which provide a means to control the transformation of values. The functions defined include linear, cubic bezier, and step easing functions. These easing functions can be applied to animations and transitions.

Gradually increasing the speed at which an element moves can give the element a sense of weight as it appears to gather momentum. Easing functions enable you to control the rate of change. Cubic bezier easing functions can be used to produce intuitive user interface elements or convincing cartoon props that behave like their physical counterparts.

Alternatively, you may want an animation to move forward in distinct steps, to create robot-like movement, or the effect of a segmented wheel that rotates such that the segments always appear in the same position. For this, step easing functions can be used.

## Reference

### Functions

- `cubic-bezier()`
- `linear()`
- `steps()`

### data types

- `easing-function`
- `<linear-easing-function>`
- `<cubic-bezier-easing-function>`
- `<step-easing-function>`

### Terms and glossary definitions

- Bézier curve
- Interpolation

## Guides

- CSS value functions: easing functions
    The CSS statements that invoke special data processing or calculations to return a CSS value for a CSS property.

## Related concepts

- CSS animations module
  - `animation-timing-function`
  - `animation` shorthand

- CSS transitions module
  - `transition-timing-function`
  - `transition` shorthand

## See also

- CSS value functions
- `will-change` CSS property

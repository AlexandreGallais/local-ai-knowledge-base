---
title: "CSS property value processing (part 2 of 2)"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/guides/cascade/property_value_processing/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSS property value processing (part 2 of 2)

## Rendered values

The rendered value is called the actual value, while the value retrieved via script is called the resolved value.

### Actual value

The **actual value** of a property is the used value of that property after any necessary approximations have been applied. It is the final rendered value as implemented by the browser, including adjustments for rendering quirks or limitations. For example, a user agent that can only render borders with a whole-number pixel width may round the thickness of the border to the nearest integer.

The calculation includes these steps:

1. First, the specified value is determined based on the result of cascading, inheritance, or using the initial value.
2. Next, the computed value is calculated according to the specification (for example, a `span` with `position: absolute` will have its computed `display` changed to `block`).
3. Then, layout is calculated, resulting in the used value.
4. Finally, the used value is transformed according to the limitations of the local environment, resulting in the actual value.

### Resolved value

The **resolved value** of a property is the value after applying active stylesheets and resolving any basic <example-value> those values may contain. The `getComputedStyle()` method returns a live `CSSStyleDeclaration` object containing the resolved values of all CSS properties applied to a specified element. Each resolved value is either the computed value or the used value, depending on the property.

Historically, `getComputedStyle()` returned the computed value of an element or pseudo-element. As CSS evolved, so did the concept of "computed value", but the values returned by `getComputedStyle()` had to remain the same for backward compatibility with deployed scripts. These values are the "resolved values".

For most properties, the resolved value is the computed value, but for a few legacy properties (including `width` and `height`), it is the used value. The CSSOM specification provides per-property details.

CSS 2.0 defined _computed value_ as the last step in a property's calculation. CSS 2.1 introduced the distinct definition of "used value". An element could then explicitly inherit the width/height of its parent, whose computed value is a percentage. For CSS properties that don't depend on layout (e.g., `display`, `font-size`, or `line-height`), the computed values and used values are the same. The following list contains the CSS 2.1 properties that _do_ depend on layout, and therefore have a different computed value and used value (taken from CSS 2.1 Changes: Specified, computed, and actual values):

- `background-position`
- `bottom`, `left`, `right`, `top`
- `height`, `width`
- `margin-bottom`, `margin-left`, `margin-right`, `margin-top`
- `min-height`, `min-width`
- `padding-bottom`, `padding-left`, `padding-right`, `padding-top`
- `text-indent`

## See also

- CSS values for controlling inheritance: `inherit`, `initial`, `revert`, `revert-layer`, and `unset`
- CSS cascading and inheritance module
- CSS syntax module

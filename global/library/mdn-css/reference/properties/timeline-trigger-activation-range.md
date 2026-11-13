---
title: "timeline-trigger-activation-range CSS property (part 1 of 2)"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/timeline-trigger-activation-range/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# timeline-trigger-activation-range CSS property

The **`timeline-trigger-activation-range`** CSS shorthand property specifies the start and end of a scroll-triggered animation trigger's activation range.

## Constituent properties

This property is a shorthand for the following CSS properties:

- `timeline-trigger-activation-range-start`
- `timeline-trigger-activation-range-end`

## Syntax

```css
/* Keyword */
timeline-trigger-activation-range: normal;

/* Range start only */
/* Offset only */
timeline-trigger-activation-range: 40%;
timeline-trigger-activation-range: 200px;
/* Named timeline only */
timeline-trigger-activation-range: contain;
timeline-trigger-activation-range: entry;
/* Named timeline and offset value */
timeline-trigger-activation-range: exit 50%;
timeline-trigger-activation-range: contain 150px;

/* Range start and end */
timeline-trigger-activation-range: 20% 80%;
timeline-trigger-activation-range: entry exit;
timeline-trigger-activation-range: normal 20%;
timeline-trigger-activation-range: 20% normal;
/* Offset on start only */
timeline-trigger-activation-range: entry 10% 90%;
/* Offset on end only */
timeline-trigger-activation-range: 200px exit 300px;
/* Named timeline and offset for both start and end */
timeline-trigger-activation-range: entry 0% exit 50%;
timeline-trigger-activation-range: contain 100px contain 90%;

/* Multiple ranges */
timeline-trigger-activation-range:
  contain,
  entry 0% exit 50%;

/* Global values */
timeline-trigger-activation-range: inherit;
timeline-trigger-activation-range: initial;
timeline-trigger-activation-range: revert;
timeline-trigger-activation-range: revert-layer;
timeline-trigger-activation-range: unset;
```

### Values

This property is specified as a comma-separated list of animation ranges. Each animation range is specified as a `timeline-trigger-activation-range-start` value and, optionally, a `timeline-trigger-activation-range-end` value.

- `<'timeline-trigger-activation-range-start'>`
    The keyword `normal`, a `length-percentage`, a `timeline-range-name`, or a `<timeline-range-name>` followed by a `<length-percentage>`, representing the `timeline-trigger-activation-range-start`. If a `<timeline-range-name>` is set without a `<length-percentage>`, the `<length-percentage>` defaults to `0%`.
- `<'timeline-trigger-activation-range-end'>`
    The keyword `normal`, a `<length-percentage>`, a `<timeline-range-name>`, or a `<timeline-range-name>` followed by a `<length-percentage>`, representing the `timeline-trigger-activation-range-end`. If a `<timeline-range-name>` is set without a `<length-percentage>`, the `<length-percentage>` defaults to `100%`.

Percentages are relative to the length of the named timeline range if one is specified, or the timeline represented by `normal` if not.

## Description

The `timeline-trigger-activation-range` property can be used to explicitly specify the start or start and end of a trigger's activation range. The property sets both the `timeline-trigger-activation-range-start` and `timeline-trigger-activation-range-end` properties in one declaration, with each specified as a timeline range, offset, or both. Start and end offsets are both measured from the start of their ranges. If only the `timeline-trigger-activation-range-start` value is specified, the `timeline-trigger-activation-range-end` value defaults to `normal`, which is either `contain 100%` or `scroll 100%`, depending on the `timeline-trigger-source` value.

A trigger's activation range is the range along the associated scrollport within which a CSS scroll-triggered animation trigger will activate. Activation occurs when the tracked element enters the _activation range_, and deactivation occurs when it leaves the _active range_.

The default value is `normal`, which sets the activation range to the default named range. The default named range depends on the `timeline-trigger-source`: it is equivalent to `cover` for a view progress timeline and `scroll` for a scroll progress timeline. The default offset values are `0%` for activation start and `100%` for activation end. Therefore, `normal` resolves to either `cover 0% cover 100%` or `scroll 0% scroll 100%`.

Other `timeline-trigger-activation-range` values can be used to set:

- Start and end offsets from the `normal` range
    A `<length>` or `<percentage>` value specifies an offset from the beginning of the `normal` timeline, which again defaults to `cover` for a `view()` progress timeline source, and `scroll` for a `scroll()` progress timeline source. Negative values outset the start and end, resulting in a longer activation range. Positive values inset the start and end of the activation range, shortening it.
- Specific named ranges
    If a `<timeline-range-name>` values is set without including an offset, the offset defaults to `0%` for start and `100%` for end values. The named timeline ranges include `cover`, `contain`, `entry`, `exit`, `entry-crossing`, `exit-crossing`, and `scroll`. See Understanding timeline range names.
- Offsets from specific named ranges
    When both a `<timeline-range-name>` and `<length>` or `<percentage>` value are specified for the start or end, the value is specified as a length or percentage offset from the start of the named range. Percentage values are relative to the full length of the named range specified. See Setting insets using percentages.

In each component of a `timeline-trigger-activation-range` value, the `<timeline-range-name>` value must come before the `<length>` or `<percentage>` offset. In the following example, you might think `timeline-trigger-activation-range-start` is set to `contain` and `timeline-trigger-activation-range-end` is set to `50%`, but that is not the case. Instead, `timeline-trigger-activation-range-start` is set to `contain 50%` while `timeline-trigger-activation-range-end` defaults to `normal`:

```css
timeline-trigger-activation-range: contain 50%;
```

To set `timeline-trigger-activation-range-start` to `contain` and `timeline-trigger-activation-range-end` to `50%`, explicitly set `0%`, which is the default start offset:

```css
timeline-trigger-activation-range: contain 0% 50%;
```

By default, the active range is the same as the activation range. To make the active range longer than the activation range, use the `timeline-trigger-active-range-start` and `timeline-trigger-active-range-end` properties, or the `timeline-trigger-active-range` shorthand. Making the active range longer than the activation range is useful when you want to trigger an animation in a small activation range but keep the trigger active over a larger range.

The `timeline-trigger-activation-range` property, along with the `timeline-trigger-name`, `timeline-trigger-source`, and `timeline-trigger-active-range` properties, can also be set using the `timeline-trigger` shorthand.

### Explicit and default values for `timeline-trigger-activation-range`

In terms of explicit and default values, `timeline-trigger-activation-range` works in exactly the same way as the `animation-range` property. See the following for more information:

- Explicitly defining both range start and range end with two values
- Defining range start and defaulting range end

### Specifying multiple ranges

When multiple values are specified in a comma-separated `timeline-trigger-activation-range` declaration, each value applies to a timeline trigger in the order in which the names appear in the `timeline-trigger-name` property. When the number of triggers and `timeline-trigger-activation-range` property values do not match, they are applied in the same way as multiple animation property values:

- If the number of `timeline-trigger-activation-range` values exceeds the number of `timeline-trigger-name` values, the excess range values are discarded.
- If the number of trigger names is greater than the number of ranges, the `timeline-trigger-activation-range` values are cycled until every `timeline-trigger-name` value has a `timeline-trigger-activation-range` value set.
- If multiple `timeline-trigger-name` values are set, but only one `timeline-trigger-activation-range` value is set, the `timeline-trigger-activation-range` will apply to all the `timeline-trigger-name`s.

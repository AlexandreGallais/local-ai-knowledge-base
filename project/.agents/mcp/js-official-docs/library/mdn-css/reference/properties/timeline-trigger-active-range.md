---
title: "timeline-trigger-active-range CSS property (part 1 of 2)"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/timeline-trigger-active-range/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# timeline-trigger-active-range CSS property

The **`timeline-trigger-active-range`** CSS shorthand property specifies a scroll-triggered animation trigger's active range.

## Constituent properties

This property is a shorthand for the following CSS properties:

- `timeline-trigger-active-range-start`
- `timeline-trigger-active-range-end`

## Syntax

```css
/* Keywords */
timeline-trigger-active-range: normal;
timeline-trigger-active-range: auto;

/* Range start only */
/* Offset only */
timeline-trigger-active-range: 10%;
timeline-trigger-active-range: 40px;
/* Named timeline only */
timeline-trigger-active-range: cover;
/* Named timeline and offset value */
timeline-trigger-active-range: exit -10%;
timeline-trigger-active-range: contain 50px;

/* Range start and end */
timeline-trigger-active-range: entry exit;
/* Offset on start only */
timeline-trigger-active-range: 10% normal;
timeline-trigger-active-range: 100px contain;
timeline-trigger-active-range: entry 10% contain;
/* Offset on end only */
timeline-trigger-active-range: normal exit-crossing 90%;
timeline-trigger-active-range: auto 10%;
timeline-trigger-active-range: contain contain 90%;
/* Offset for both start and end */
timeline-trigger-active-range: 5% 95%;
timeline-trigger-active-range: 200px exit 600px;
timeline-trigger-active-range: entry 10% 90%;
/* Named timeline and offset for both start and end */
timeline-trigger-active-range: entry 0% exit 50%;
timeline-trigger-active-range: contain 100px contain 90%;

/* Multiple ranges */
timeline-trigger-active-range:
  cover,
  entry -5% exit 50%;

/* Global values */
timeline-trigger-active-range: inherit;
timeline-trigger-active-range: initial;
timeline-trigger-active-range: revert;
timeline-trigger-active-range: revert-layer;
timeline-trigger-active-range: unset;
```

### Values

This property is specified as a comma-separated list of animation ranges. Each animation range is specified as a `timeline-trigger-active-range-start` value, and, optionally, a `timeline-trigger-active-range-end` value.

- `<'timeline-trigger-active-range-start'>`
    The keyword `normal`, the keyword `auto`, a `length-percentage`, a `timeline-range-name`, or a `<timeline-range-name>` followed by a `<length-percentage>`, representing the `timeline-trigger-active-range-start`. If a `<timeline-range-name>` is set without a `<length-percentage>`, the `<length-percentage>` defaults to `0%`.
- `<'timeline-trigger-active-range-end'>`
    The keyword `normal`, the keyword `auto`, a `<length-percentage>`, a `<timeline-range-name>`, or a `<timeline-range-name>` followed by a `<length-percentage>`, representing the `timeline-trigger-active-range-end`. If a `<timeline-range-name>` is set without a `<length-percentage>`, the `<length-percentage>` defaults to `100%`.

Percentages are relative to the length of the named timeline range if one is specified, or the timeline represented by `normal` if not.

## Description

The `timeline-trigger-active-range` property can be used to explicitly specify the start or both the start and end of a trigger's active range. The property sets both the `timeline-trigger-active-range-start` and `timeline-trigger-active-range-end` properties in one declaration, with each specified as a timeline range, offset, or both. Start and end offsets are both measured from the start of their ranges.

A trigger's _active range_ is the range along the associated scrollport within which a CSS scroll-triggered animation trigger will stay active once activated. Activation occurs when the tracked element enters the _activation range_, and deactivation occurs when it leaves the _active range_. The default value is `auto`, which sets the `timeline-trigger-active-range` value to the same as the `timeline-trigger-activation-range`.

Making the active range longer than the activation range is useful when you want to trigger an animation in a small activation range, but you want the trigger to stay active within a larger range. The trigger will only deactivate when the tracked element leaves the active range.

A value of `normal` sets the active range to the default named range. The default named range depends on the `timeline-trigger-source`: it is equivalent to `cover` for a view progress timeline and `scroll` for a scroll progress timeline. The default offset values are `0%` and `100%`. Therefore, `normal` resolves to either `cover 0% cover 100%` or `scroll 0% scroll 100%`.

The `timeline-trigger-active-range` property can be used to set:

- Start and end offsets from the `normal` range
    A `<length>` or `<percentage>` value specifies an offset from the beginning of the `normal` timeline, which again defaults to `cover` for a view progress timeline source, and `scroll` for a scroll progress timeline source. Negative values outset the start and end, resulting in a longer active range. Positive values inset the start and end of the active range, making it shorter.
- Specific named ranges
    If a `<timeline-range-name>` value is set without including an offset, the offset defaults to `0%` for start and `100%` for the end values. The named timeline ranges include `cover`, `contain`, `entry`, `exit`, `entry-crossing`, `exit-crossing`, and `scroll`. See Understanding timeline range names.
- Offsets from specific named ranges
    When both a `<timeline-range-name>` and `<length>` or `<percentage>` value are specified, the start and end values are offset by the distances along the specified named ranges. Percentage values are relative to the range specified. See Setting insets using percentages.

In each component of a `timeline-trigger-active-range` value, the `<timeline-range-name>` value must come before the `<length>` or `<percentage>` offset. In the following example, you might think `timeline-trigger-active-range-start` is set to `contain`, and `timeline-trigger-active-range-end` is set to `50%`, but this is not the case. Instead, `timeline-trigger-active-range-start` is set to `contain 50%` while `timeline-trigger-active-range-end` defaults to `auto`:

```css
timeline-trigger-active-range: contain 50%;
```

To set `timeline-trigger-active-range-start` to `contain` and `timeline-trigger-active-range-end` to `50%`, explicitly set `0%`, which is the default start offset:

```css
timeline-trigger-active-range: contain 0% 50%;
```

A set active range must be equal to or larger than the activation range. Specifically, the `timeline-trigger-active-range-start` value must come before or at the same position as the `timeline-trigger-activation-range-start` value, and the `timeline-trigger-active-range-end` value must be the same as or come after the `timeline-trigger-activation-range-end` value. If either value is within the activation range, the value will have no effect, and the active range will be equal to the activation range.

The `timeline-trigger-active-range` property, along with the `timeline-trigger-name`, `timeline-trigger-source`, and `timeline-trigger-activation-range` properties, can also be set using the `timeline-trigger` shorthand.

### Explicit and default values of `timeline-trigger-active-range`

In terms of explicit and default values, `timeline-trigger-active-range` works in exactly the same way as the `animation-range` property. See the following for more information:

- Explicitly defining both range start and range end with two values
- Defining range start and defaulting range end

### Specifying multiple ranges

When multiple values are specified in a comma-separated `timeline-trigger-active-range` declaration, each value applies to a timeline trigger in the order in which the names appear in the `timeline-trigger-name` property. When the number of triggers and `timeline-trigger-active-range` property values do not match, they are applied in the same way as multiple animation property values:

- If the number of `timeline-trigger-active-range` values exceeds the number of `timeline-trigger-name` values, the excess range values are discarded.
- If the number of trigger names is greater than the number of ranges, the `timeline-trigger-active-range` values are cycled until every `timeline-trigger-name` value has a `timeline-trigger-active-range` value set.
- If multiple `timeline-trigger-name` values are set, but only one `timeline-trigger-active-range` value is set, the `timeline-trigger-active-range` will apply to all the `timeline-trigger-name`s.

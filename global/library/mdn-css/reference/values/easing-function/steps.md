---
title: "`steps()` CSS function"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/values/easing-function/steps/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `steps()` CSS function

The **`steps()`** CSS function defines a transition that divides the input time into a specified number of intervals that are equal in length. This subclass of step functions are sometimes also called _staircase functions_.

## Syntax

```css
/* Different intervals */
steps(2, end)
steps(4, jump-end)
steps(12, end)

/* Different jump positions */
steps(3, jump-start)
steps(3, jump-end)
steps(3, jump-none)
steps(3, jump-both)
```

### Parameters

The function accepts the following parameters:

- `<integer>`
    Represents the number of equidistant intervals or 'steps'.
    It must be a positive integer greater than `0` unless the second parameter is `jump-none`, in which case, it must be a positive integer greater than `1`.

- `<step-position>`
    Specifies when the jump between values occurs.
    If omitted, it defaults to `end`.
    The possible keyword values include:
    - `jump-start` or `start`
        Indicates that the first step happens when the animation begins.
    - `jump-end` or `end`
        Indicates that the last step happens when the animation ends.
    - `jump-none`
        Indicates neither early nor late jumps happen.
    - `jump-both`
        Indicates both early and late jumps happen.

## Description

The `steps()` function divides the animation duration into equal intervals.
For example, `steps(4, end)` divides the animation into four equal intervals, with values changing at the end of each interval except the last change which occurs at the animation's end.

If an animation contains multiple segments, the specified number of steps applies to each segment. For example, if an animation has three segments and uses `steps(2)`, there will be six steps in total, with two steps per segment.

The following image shows the effect of different `<step-position>` values when the jumps occur:

```css
steps(2, jump-start)  /* Or steps(2, start) */
steps(4, jump-end)    /* Or steps(4, end) */
steps(5, jump-none)
steps(3, jump-both)
```

## Examples

### Using the steps() function

The following `steps()` functions are valid:

```css
/* Five steps with jump at the end */
steps(5, end)

/* Two steps with jump at the start */
steps(2, start)

/* Using default second parameter */
steps(2)
```

The following `steps()` functions are invalid:

```css
/* First parameter must be an <integer>, not a real value */
steps(2.0, jump-end)

/* Number of steps must be positive */
steps(-3, start)

/* Number of steps must be at least 1 */
steps(0, jump-none)
```

## See also

- Other easing functions: `cubic-bezier()` and `linear()`
- CSS easing functions module
- Step function on Wikipedia

---
title: "`step` HTML attribute"
tool: "mdn-html"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/html/reference/attributes/step/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `step` HTML attribute

The **`step`** attribute is a number that specifies the granularity that the value must adhere to or the keyword `any`. It is valid for the numeric input types, including the `<date>`, `<month>`, `<week>`, `<time>`, `<datetime-local>`, `<number>` and `<range>` types.

The `step` sets the _stepping interval_ when clicking up and down spinner buttons, moving a slider left and right on a range, and validating the different date types. If not explicitly included, `step` defaults to 1 for `number` and `range`, and 1 unit type (minute, week, month, day) for the date/time input types. The value must be a positive number - integer or float — or the special value `any`, which means no stepping is implied and any value is allowed (barring other constraints, such as `min` and `max`).

Only values which are a whole number of steps from the step base are valid. The step base is `min` if specified, `value` otherwise, or `0` if neither is provided (except for `week`, which has a default step base of −259,200,000, representing the start of week `1970-W01`).

## Syntax

    Default values for step

       | Input type
       | Value
       | Example

       | `<date>`
       | 1 (day)
       | `&#x3C;input type="date" min="2019-12-25" step="1">`

       | `<month>`
       | 1 (month)
       | `&#x3C;input type="month" min="2019-12" step="12">`

       | `<week>`
       | 1 (week)
       | `&#x3C;input type="week" min="2019-W23" step="2">`

       | `<time>`
       | 60 (seconds)
       | `&#x3C;input type="time" min="09:00" step="900">`

       |
        `<datetime-local>`

       | 60 (seconds)
       |
        <code
          >&#x3C;input type="datetime-local" min="2019-12-25T19:30"
          step="900"></code
        >

       | `<number>`
       | 1
       |
        `&#x3C;input type="number" min="0" step="0.1" max="10">`

       | `<range>`
       | 1
       | `&#x3C;input type="range" min="0" step="2" max="10">`

If `any` is not explicitly set, valid values for the `number`, date/time input types, and `range` input types are equal to the basis for stepping - the `min` value and increments of the step value, up to the `max` value, if specified. The following example results in any even integer, 10 or greater, being valid:

```html
<input type="number" min="10" step="2" />
```

If `step` is omitted, any integer is valid but floats like 4.2 are not valid as `step` defaults to 1. For 4.2 to be valid:

- either `step` would have to be set to `any`, 0.1, or 0.2,
- or the `min` value would have to be a number ending in .2, such as 0.2, 1.2, or -5.2.

## Accessibility concerns

Provide instructions to help users understand how to complete the form and use individual form controls. Indicate any required and optional input, data formats, and other relevant information. When using the `min` attribute, ensure this minimum requirement is understood by the user. Providing instructions within the `` may be sufficient. If providing instructions outside of labels, which allows more flexible positioning and design, consider using `aria-labelledby` or `aria-describedby`.

## Examples

### `min` impact on step

The value of `min` defines valid values, even if the `step` attribute is not included. This is because `step` defaults to `1` for the `number` input type.

In this example, we add a big red border around invalid inputs:

```css
input:invalid {
  border: solid red 3px;
}
```

We then define an input with a minimum value of 1.2 and a step value of 2:

```html
<input id="myNumber" name="myNumber" type="number" step="2" min="1.2" />
```

Valid values include 1.2, 3.2, 5.2, 7.2, 9.2, 11.2, and so on. Only floats with an odd-numbered integer part and a decimal part of .2 are valid. The number spinner, if present, generates valid float values of 1.2 and greater, in increments of 2.

> **Note:**
> When the data entered by the user doesn't adhere to the stepping configuration, the value is considered invalid in constraint validation and will match the `:invalid` and `:out-of-range` pseudoclasses.

See Client-side validation and `stepMismatch` for more information.

## See also

- `max`
- `min`
- Constraint validation
- Form validation
- `validityState.stepMismatch`
- `:out-of-range`
- ``
- `<date>`, `<month>`, `<week>`, `<time>`, `<datetime-local>`, `<number>` and `<range>` types, and the `<meter>`

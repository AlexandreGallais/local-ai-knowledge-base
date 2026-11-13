---
title: "`max` HTML attribute"
tool: "mdn-html"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/html/reference/attributes/max/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `max` HTML attribute

The **`max`** attribute defines the maximum value that is acceptable and valid for the input containing the attribute. If the `value` of the element is greater than this, the element fails validation. This value must be greater than or equal to the value of the `min` attribute. If the `max` attribute is present but is not specified or is invalid, no `max` value is applied. If the `max` attribute is valid and a non-empty value is greater than the maximum allowed by the `max` attribute, constraint validation will prevent form submission.

The max attribute is valid for the numeric input types, including the `<date>`, `<month>`, `<week>`, `<time>`, `<datetime-local>`, `<number>` and `<range>` types, and both the `<progress>` and `<meter>` elements. It is a number that specifies the most positive value a form control to be considered valid.

If the value exceeds the max value allowed, the `validityState.rangeOverflow` will be true, and the control will be matched by the `:out-of-range` and `:invalid` pseudo-classes.

## Syntax

    Syntax for
    `max`
    values by input
    `type`

       | Input type
       | Syntax
       | Example

       | `<date>`
       | `yyyy-mm-dd`
       | `&#x3C;input type="date" max="2019-12-25" step="1">`

       | `<month>`
       | `yyyy-mm`
       | `&#x3C;input type="month" max="2019-12" step="12">`

       | `<week>`
       | `yyyy-W##`
       | `&#x3C;input type="week" max="2019-W23" step="">`

       | `<time>`
       | `HH:mm`
       | `&#x3C;input type="time" max="17:00" step="900">`

       |
        `<datetime-local>`

       | `yyyy-mm-ddTHH:mm`
       |
        `&#x3C;input type="datetime-local" max="2019-12-25T23:59">`

       | `<number>`
       | &#x3C;number>
       |
        `&#x3C;input type="number" min="0" step="5" max="100">`

       | `<range>`
       | &#x3C;number>
       |
        `&#x3C;input type="range" min="60" step="5" max="100">`

> **Note:**
> When the data entered by the user doesn't adhere to the maximum value set, the value is considered invalid in constraint validation and will match the `:invalid` and `:out-of-range` pseudo-classes.

See Client-side validation and `rangeOverflow` for more information.

For the `<progress>` element, the `max` attribute describes how much work the task indicated by the `progress` element requires. If present, must have a value greater than zero and be a valid floating point number. For the `<meter>` element, the `max` attribute defines the upper numeric bound of the measured range. This must be greater than the minimum value (`min` attribute), if specified. In both cases, if omitted, the value defaults to 1.

    Syntax for
    `max`
    values for other elements

       | Input type
       | Syntax
       | Example

       | `<progress>`
       | &#x3C;number>
       |
        <code
          >&#x3C;progress id="file" max="100" value="70"> 70%
          &#x3C;/progress></code
        >

       | `<meter>`
       | &#x3C;number>
       |
        <code
          >&#x3C;meter id="fuel" min="0" max="100" low="33" high="66"
          optimum="80" value="40"> at 40/100&#x3C;/meter></code
        >

## Accessibility concerns

Provide instructions to help users understand how to complete the form and use individual form controls. Indicate any required and optional input, data formats, and other relevant information. When using the `max` attribute, ensure this maximum requirement is understood by the user. Providing instructions within the `` may be sufficient. If providing instructions outside of labels, which allows more flexible positioning and design, consider using `aria-labelledby` or `aria-describedby`.

## See also

- `step`
- `min`
- Constraint validation
- Form validation
- `validityState.rangeOverflow`
- `:out-of-range`
- ``
- `<date>`, `<month>`, `<week>`, `<time>`, `<datetime-local>`, `<number>` and `<range>` types, and the `<meter>`

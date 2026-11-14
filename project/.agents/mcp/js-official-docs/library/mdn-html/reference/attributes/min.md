---
title: "`min` HTML attribute"
tool: "mdn-html"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/html/reference/attributes/min/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `min` HTML attribute

The **`min`** attribute defines the minimum value that is acceptable and valid for the input containing the attribute. If the `value` of the element is less than this, the element fails validation. This value must be less than or equal to the value of the `max` attribute.

Some input types have a default minimum. If the input has no default minimum and a value is specified for `min` that can't be converted to a valid number (or no minimum value is set), the input has no minimum value.

It is valid for the input types including: `<date>`, `<month>`, `<week>`, `<time>`, `<datetime-local>`, `<number>` and `<range>` types, and the `<meter>` element.

## Syntax

    Syntax for
    `min`
    values by input
    `type`

       | Input type
       | Syntax
       | Example

       | `<date>`
       | `yyyy-mm-dd`
       | `&#x3C;input type="date" min="2019-12-25" step="1">`

       | `<month>`
       | `yyyy-mm`
       | `&#x3C;input type="month" min="2019-12" step="12">`

       | `<week>`
       | `yyyy-W##`
       | `&#x3C;input type="week" min="2019-W23" step="">`

       | `<time>`
       | `HH:mm`
       | `&#x3C;input type="time" min="09:00" step="900">`

       |
        `<datetime-local>`

       | `yyyy-mm-ddTHH:mm`
       |
        `&#x3C;input type="datetime-local" min="2019-12-25T19:30">`

       | `<number>`
       | &#x3C;number>
       |
        `&#x3C;input type="number" min="0" step="5" max="100">`

       | `<range>`
       | &#x3C;number>
       |
        `&#x3C;input type="range" min="60" step="5" max="100">`

> **Note:**
> When the data entered by the user doesn't adhere to the min value set, the value is considered invalid in constraint validation and will match the `:invalid` and `:out-of-range` pseudo-classes.

See Client-side validation and `rangeUnderflow` for more information.

For the `<meter>` element, the `min` attribute defines the lower numeric bound of the measured range. This must be less than the maximum value (`max` attribute), if specified. In both cases, if omitted, the value defaults to 1.

    Syntax for
    `min`
    values for other elements

       | Input type
       | Syntax
       | Example

       | `<meter>`
       | &#x3C;number>
       |
        <code
          >&#x3C;meter id="fuel" min="0" max="100" low="33" high="66"
          optimum="80" value="40"> at 40/100&#x3C;/meter></code
        >

### Impact on step

The value of `min` and `step` define what are valid values, even if the `step` attribute is not included, as `step` defaults to `0`.

We add a big red border around invalid inputs:

```css
input:invalid {
  border: solid red 3px;
}
```

Then define an input with a minimum value of 7.2, omitting the step attribute, wherein it defaults to 1.

```html
<input id="myNumber" name="myNumber" type="number" min="7.2" value="8" />
```

Because `step` defaults to 1, valid values include `7.2`, `8.2`, `9.2`, and so on. The value 8 is not valid. As we included an invalid value, supporting browsers will show the value as invalid.

If not explicitly included, `step` defaults to 1 for `number` and `range`, and 1 unit type (second, week, month, day) for the date/time input types.

## Accessibility concerns

Provide instructions to help users understand how to complete the form and use individual form controls. Indicate any required and optional input, data formats, and other relevant information. When using the `min` attribute, ensure this minimum requirement is understood by the user. Providing instructions within the `` may be sufficient. If providing instructions outside of labels, which allows more flexible positioning and design, consider using `aria-labelledby` or `aria-describedby`.

## See also

- `step`
- `max`
- other meter attributes: `low`, `high`, `optimum`
- Constraint validation
- Form validation
- `validityState.rangeUnderflow`
- `:out-of-range`
- ``
- `<date>`, `<month>`, `<week>`, `<time>`, `<datetime-local>`, `<number>` and `<range>` types, and the `<meter>`

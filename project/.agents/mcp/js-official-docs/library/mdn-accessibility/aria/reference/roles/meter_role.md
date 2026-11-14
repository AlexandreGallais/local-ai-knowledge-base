---
title: "ARIA: meter role"
tool: "mdn-accessibility"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/accessibility/aria/reference/roles/meter_role/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ARIA: meter role

The `meter` role is used to identify an element being used as a meter.

> **Note:**
> Where possible, it is recommended that you use a native `<meter>` element rather than the `meter` role, as native elements are more widely supported by user agents and assistive technology.

## Description

A meter is a graphical display of a numeric value within a defined range. For example, showing battery percentage. A meter is not appropriate for values that do not have a meaningful maximum limit. Meters should not be used to indicate progress (for example loading), this should be communicated with the `<progress>` element.

Each element with `role="meter"` must also have one of the following:

- An `aria-label` attribute.
- An `aria-labelledby` attribute pointing to an element with text that describes the meter.

### All descendants are presentational

There are some types of user interface components that, when represented in a platform accessibility API, can only contain text. Accessibility APIs do not have a way of representing semantic elements contained in a `meter`. To deal with this limitation, browsers automatically apply role `presentation` to all descendant elements of any `meter` element as it is a role that does not support semantic children.

For example, consider the following `meter` element, which contains a heading.

```html
<div role="meter"><h3>Title of my meter</h3></div>
```

Because descendants of `meter` are presentational, the following code is equivalent:

```html
<div role="meter"><h3 role="presentation">Title of my meter</h3></div>
```

From the assistive technology user's perspective, the heading does not exist since the previous code snippets are equivalent to the following in the accessibility tree.:

```html
<div role="meter">Title of my meter</div>
```

### Associated ARIA roles, states, and properties

- `aria-valuenow`
    Set to a decimal value between `aria-valuemin` and `aria-valuemax` indicating the current value of the meter.
- `aria-valuetext`
    Assistive technologies often present the value of `aria-valuenow` as a percentage. If this would not be accurate use this property to make the meter value understandable.
- `aria-valuemin`
    Set to a decimal value representing the minimum value, and less than `aria-valuemax`.
- `aria-valuemax`
    Set to a decimal value representing the maximum value, and greater than `aria-valuemin`.

It is recommended to use a native `<meter>` element rather than the `meter` role. User agents provide a stylize widget for the `<meter>` element based on the current `value` as it relates to the `min` and `max` values. When using non-semantic elements, all features of the native semantic element need to be recreated with ARIA attributes, JavaScript and CSS.

## Examples

An example of a meter using `role="meter"`:

```html
<div
  role="meter"
  aria-valuenow="90"
  aria-valuemin="0"
  aria-valuemax="100"
  aria-labelledby="cpu_usage_label">
  <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style="width: 90%">
    <rect x="0" y="0" width="100%" height="100%" fill="currentColor"></rect>
  </svg>
</div>
```

In the above scenario, when the `aria-valuenow` value updates, the width of the SVG also needs to be updated as can be seen in the ARIA Authoring Practices Guide (APG) working meter example.

## See also

- `<meter>`
- `<progress>`

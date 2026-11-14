---
title: "ARIA: aria-valuemax attribute"
tool: "mdn-accessibility"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/accessibility/aria/reference/attributes/aria-valuemax/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ARIA: aria-valuemax attribute

The `aria-valuemax` attribute defines the maximum allowed value for a range widget.

## Description

The `aria-valuemax` attribute defines the maximum value allowed for range widgets. It is similar to the `max` attribute of `<progress>`, `<meter>`, and `` of type `range`, `number` and all the date-time types.

When creating a range type role, including `meter`, `scrollbar`, `slider`, and `spinbutton` on a non-semantic element, the `aria-valuemax` enables defining a maximum that is more than the minimum value and is a required attribute of `slider`, `scrollbar` and `spinbutton`.

Declaring the minimum and maximum values allows assistive technologies to convey the size of the range to users. The minimum value is defined with `aria-valuemin`.

> **Warning:**
> The `range` role itself should **NOT** be used as it is an "abstract". The `aria-valuemax` attribute is used on all of the range roles subtypes.

## Example

The code below shows a slider with a maximum value of 9.

```html
<div id="dimesLabel">Dimes</div>
<div
  role="slider"
  aria-valuenow="0"
  aria-valuemin="0"
  aria-valuemax="9"
  aria-labelledby="dimesLabel"
  id="dimes"></div>
```

## Values

- `<number>`
    An integer or decimal number that is greater than the minimum value.

## Associated interfaces

- `Element.ariaValueMax`
    The `ariaValueMax` property, part of the `Element` interface, reflects the value of the `aria-valuemax` attribute.
- `ElementInternals.ariaValueMax`
    The `ariaValueMax` property, part of the `ElementInternals` interface, reflects the value of the `aria-valuemax` attribute.

## Associated roles

Used in roles:

- `meter`
- `scrollbar` (required)
- `separator`
- `slider` (required)
- `spinbutton` (required)

Inherited into roles:

- `meter`
- `progressbar`
- `scrollbar`
- `slider`
- `spinbutton`

## See also

- `range` role
- `` element `max` attribute
- `aria-valuemin`
- `aria-valuenow`

---
title: "ARIA: aria-valuemin attribute"
tool: "mdn-accessibility"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/accessibility/aria/reference/attributes/aria-valuemin/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ARIA: aria-valuemin attribute

The `aria-valuemin` attribute defines the minimum allowed value for a range widget.

## Description

The `aria-valuemin` attribute defines the minimum value allowed for range widgets. It is similar to the `min` attribute of `<progress>`, `<meter>`, and `` of type `range`, `number` and all the date-time types.

When creating a range type role, including `meter`, `scrollbar`, `slider`, and `spinbutton` on a non-semantic element, the `aria-valuemin` enables defining a minimum that is less than the maximum value and is a required attribute of `slider`, `scrollbar` and `spinbutton`.

Declaring the minimum and maximum values allows assistive technologies to convey the size of the range to users.

The maximum value is defined with `aria-valuemax`.

> **Warning:**
> The `range` role itself should **NOT** be used as it is an "abstract". The `aria-valuemin` attribute is used on all of the range roles subtypes.

## Values

- `<number>`
    A decimal number, below the maximum value.

## Associated interfaces

- `Element.ariaValueMin`
    The `ariaValueMin` property, part of the `Element` interface, reflects the value of the `aria-valuemin` attribute.
- `ElementInternals.ariaValueMin`
    The `ariaValueMin` property, part of the `ElementInternals` interface, reflects the value of the `aria-valuemin` attribute.

## Associated roles

Used in roles:

- `meter`
- `scrollbar`
- `separator`
- `slider`
- `spinbutton`

Inherited into roles:

- `meter`
- `progressbar`
- `scrollbar`
- `slider`
- `spinbutton`

## See also

- `range` role
- `` element `min` attribute
- `aria-valuemax`
- `aria-valuenow`

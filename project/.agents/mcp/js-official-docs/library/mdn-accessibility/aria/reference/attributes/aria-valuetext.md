---
title: "ARIA: aria-valuetext attribute"
tool: "mdn-accessibility"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/accessibility/aria/reference/attributes/aria-valuetext/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ARIA: aria-valuetext attribute

The `aria-valuetext` attribute defines the human-readable text alternative of `aria-valuenow` for a range widget.

## Description

Numbers — even percentages — aren't always user-friendly. Assistive technologies present `aria-valuenow` as numeric values. If a progress bar is at 8%, what does that mean? `aria-valuetext` provides a way of presenting the current value in a more user-friendly, human-understandable way. For example, a battery meter value might be conveyed as `aria-valuetext="8% (34 minutes) remaining"`.

The `aria-valuetext` attribute is used with the `aria-valuenow` attribute, not instead of it, unless that value is not known.

`aria-valuetext` is only needed when the numeric value of `aria-valuenow` is not meaningful. For example, a range's values are numeric but may be used for non-numeric values, such as college class level. The values of `aria-valuenow` for a 4-year college could range from 1 through 4, which indicate the position of each value in the value space. In this case, the `aria-valuetext` could be one of the strings: "first year", "sophomore", "junior", and "senior".

If the numeric value is meaningful, such as a spinner with `aria-valuenow="3"` for how many pizza slices you want to order, `aria-valuetext` is not needed.

When both the `aria-valuetext` and `aria-valuenow` are included, the `aria-valuetext` is announced. When there is no `aria-valuetext` attribute, assistive technologies will announce the `aria-valuenow` attribute for the current value.

## Values

- `<string>`
    A human-readable text alternative of the `aria-valuenow` value.

## Associated interfaces

- `Element.ariaValueText`
    The `ariaValueText` property, part of the `Element` interface, reflects the value of the `aria-valuetext` attribute.
- `ElementInternals.ariaValueText`
    The `ariaValueText` property, part of the `ElementInternals` interface, reflects the value of the `aria-valuetext` attribute.

## Associated roles

Used in roles:

- `range`
- `separator`
- `spinbutton`

Inherited into roles:

- `meter`
- `progressbar`
- `scrollbar`
- `slider`
- `spinbutton`

## See also

- `aria-valuenow`

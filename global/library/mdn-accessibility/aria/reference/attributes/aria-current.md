---
title: "ARIA: aria-current attribute"
tool: "mdn-accessibility"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/accessibility/aria/reference/attributes/aria-current/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ARIA: aria-current attribute

A non-null `aria-current` state on an element indicates that this element represents the current item within a container or set of related elements.

## Description

When you have a group of related elements, such as several links in a breadcrumb or steps in a multi-step flow, with one element in the group styled differently from the others to indicate to the sighted user that this is the current element within its group, the `aria-current` should be used to inform the assistive technology user what has been indicated via styling.

In a breadcrumb list, when a link within a set of pagination links is styled to indicate the user is currently on that page, `aria-current="page"` should be set on that link. In a multi step based process with a step indicator such as a multi-page survey or a multi step checkout or registration process, when the current step icon is visually different to represent that it is the current step, that icon's container should have `aria-current="step"` for assistive technology users who may not be able to "see" the visual difference.

The `aria-current` attribute indicates the element on which it is set, to a value other than `false`, represents the current item within a container or set of related elements. Only mark one element in a set of elements as current with `aria-current`.

The `aria-current` attribute accepts a limited list of values including `page`, `step`, `location`, `date`, `time`, `true`, and `false`. Any non-null string value not included in this list of enumerated values is treated as if `aria-current="true"` were set, not the default `false` value. If the attribute is not present, is an empty string, is present with no value, or is set to `aria-current="false"` it is not exposed to the user.

When something is selected rather than current, such as a `tab` in a `tablist`, use `aria-selected` to indicate the currently-displayed tabpanel.

> **Note:**
> Don't use `aria-current` as a substitute for `aria-selected` in `gridcell`, `option`, `row` or `tab`.

## Example

The breadcrumb for the "current page" should have `aria-current="page"` set on it.

```html
<nav aria-label="Breadcrumb" class="breadcrumb">
  <ol>
    <li>
      <a href="../../../../../">Web technology for developers</a>
    </li>
    <li>
      <a href="../../../../">Accessibility</a>
    </li>
    <li>
      <a href="../../../">ARIA</a>
    </li>
    <li>
      <a href="../../">ARIA States and Properties</a>
    </li>
    <li>
      <a href="./" aria-current="page">ARIA: `aria-current` attribute</a>
    </li>
  </ol>
</nav>
```

If the element representing the current page in the breadcrumb was not a link, the `aria-current` is optional.

## Values

- `page`
    Represents the current page within a set of pages such as the link to the current document in a breadcrumb.
- `step`
    Represents the current step within a process such as the current step in an enumerated multi step checkout flow.
- `location`
    Represents the current location within an environment or context such as the image that is visually highlighted as the current component of a flow chart.
- `date`
    Represents the current date within a collection of dates such as the current date within a calendar.
- `time`
    Represents the current time within a set of times such as the current time within a timetable.
- `true`
    Represents the current item within a set.
- `false` (default)
    Does not represent the current item within a set.

## Associated interfaces

- `Element.ariaCurrent`
    The `ariaCurrent` property, part of the `Element` interface, reflects the value of the `aria-current` attribute.
- `ElementInternals.ariaCurrent`
    The `ariaCurrent` property of the `ElementInternals` interface reflects the value of the `aria-current` attribute.

## Associated roles

Usable in all roles; except for elements with the role of `gridcell`, `option`, `row` and `tab` where `aria-selected` should be used

## See also

- `aria-selected`
- `:local-link`
- Breadcrumb navigation with `aria-current`

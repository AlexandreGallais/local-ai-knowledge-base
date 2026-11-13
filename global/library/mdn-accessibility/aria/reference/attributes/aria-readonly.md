---
title: "ARIA: aria-readonly attribute"
tool: "mdn-accessibility"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/accessibility/aria/reference/attributes/aria-readonly/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ARIA: aria-readonly attribute

The `aria-readonly` attribute indicates that the element is not editable, but is otherwise operable.

## Description

When you want to indicate that an interactive element works but is not editable, set `aria-readonly="true"`. This indicates to the user that an interactive element that would normally be focusable and copyable has been placed in a read-only (not disabled) state.

When `aria-readonly` is set to `true`, it means the user can read but not set the value of the widget. Read-only elements are still relevant to the user, so you should not prevent the user from navigating to the element or its focusable descendants or copying the value.

Examples include:

- Form elements which should not be changed.
- Row and column headers in a spreadsheet.
- The total value in a shopping cart.

If the element is unavailable for interaction, use `aria-disabled` instead.

> **Note:**
> When using semantic HTML form controls, if you set the `readonly` attribute, you don't need to include `aria-readonly="true"`.

> **Note:**
> The value of `` cannot be edited making `readonly` not relevant. However, when creating checkboxes with `role="checkbox"` the `aria-readonly` attribute _is_ supported.

## Values

- `true`
    The element is readonly.
- `false` (default)
    The element is not readonly.

## Associated interfaces

- `Element.ariaReadOnly`
    The `ariaReadOnly` property, part of the `Element` interface, reflects the value of the `aria-readonly` attribute.
- `ElementInternals.ariaReadOnly`
    The `ariaReadOnly` property, part of the `ElementInternals` interface, reflects the value of the `aria-readonly` attribute.

## Associated roles

Used in roles:

- `checkbox`
- `combobox`
- `grid`
- `gridcell`
- `listbox`
- `radiogroup`
- `slider`
- `spinbutton`
- `textbox`

Inherited into roles:

- `columnheader`
- `rowheader`
- `searchbox`
- `switch`
- `treegrid`

## See also

- HTML `readonly` attribute
- `aria-disabled`

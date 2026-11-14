---
title: "ARIA states and properties (attributes)"
tool: "mdn-accessibility"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/accessibility/aria/reference/attributes/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ARIA states and properties (attributes)

This page lists reference pages covering all the WAI-ARIA attributes discussed on MDN.

ARIA attributes enable modifying an element's states and properties as defined in the accessibility tree.

> **Note:**
> ARIA only modifies the accessibility tree, modifying how assistive technology presents the content to your users. ARIA doesn't change anything about an element's function or behavior. When not using semantic HTML elements for their intended purpose and default functionality, you must use JavaScript to manage behavior, focus, and ARIA states.

## ARIA attribute types

There are 4 categories of ARIA states and properties:

### Widget attributes

- `aria-autocomplete`
- `aria-checked`
- `aria-disabled`
- `aria-errormessage`
- `aria-expanded`
- `aria-haspopup`
- `aria-hidden`
- `aria-invalid`
- `aria-label`
- `aria-level`
- `aria-modal`
- `aria-multiline`
- `aria-multiselectable`
- `aria-orientation`
- `aria-placeholder`
- `aria-pressed`
- `aria-readonly`
- `aria-required`
- `aria-selected`
- `aria-sort`
- `aria-valuemax`
- `aria-valuemin`
- `aria-valuenow`
- `aria-valuetext`

### Live region attributes

- `aria-busy`
- `aria-live`
- `aria-relevant`
- `aria-atomic`

### Drag-and-Drop attributes

- `aria-dropeffect`
- `aria-grabbed`

### Relationship attributes

- `aria-activedescendant`
- `aria-colcount`
- `aria-colindex`
- `aria-colspan`
- `aria-controls`
- `aria-describedby`
- `aria-description`
- `aria-details`
- `aria-errormessage`
- `aria-flowto`
- `aria-labelledby`
- `aria-owns`
- `aria-posinset`
- `aria-rowcount`
- `aria-rowindex`
- `aria-rowspan`
- `aria-setsize`

## Global ARIA attributes

Some states and properties apply to all HTML elements regardless of whether an ARIA role is applied. These are defined as "Global" attributes. Global states and properties are supported by all roles and base markup elements.

Many of the above attributes are global, meaning they can be included on any element unless specifically disallowed:

- `aria-atomic`
- `aria-busy`
- `aria-controls`
- `aria-current`
- `aria-describedby`
- `aria-description`
- `aria-details`
- `aria-disabled`
- `aria-dropeffect`
- `aria-errormessage`
- `aria-flowto`
- `aria-grabbed`
- `aria-haspopup`
- `aria-hidden`
- `aria-invalid`
- `aria-keyshortcuts`
- `aria-label`
- `aria-labelledby`
- `aria-live`
- `aria-owns`
- `aria-relevant`
- `aria-roledescription`

By "specifically disallowed," all the above attributes are global except for the `aria-label` and `aria-labelledby` properties, which are not allowed on elements with role `presentation` nor its synonym `none` role.

## Index of states and properties

The following are the reference pages covering the WAI-ARIA states and properties described on MDN.

## See also

- Using ARIA: roles, states, and properties

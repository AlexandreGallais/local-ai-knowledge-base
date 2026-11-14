---
title: "ARIA: generic role"
tool: "mdn-accessibility"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/accessibility/aria/reference/roles/generic_role/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ARIA: generic role

The `generic` role creates a nameless container element which has no semantic meaning on its own.

> **Note:**
> The `generic` role is the implicit role of generic elements used by user agents. It is included here for completeness of documentation. It should not be used by web authors.

## Description

While ARIA is primarily used to express semantics, there are some elements that shouldn't expose a semantic name to assistive technologies. The `generic` role indicates an element's role is equivalent to that of the non-semantic `` and `` elements.

The `generic` role is intended for use as the implicit role of generic elements in host languages for use by user agents only; not for use by developers. Instead, to remove implicit accessibility semantics, use `presentation` or `none`, the `` and `` elements that have no semantic meaning, or semantic container roles such as `group` to semantically group descendants in a named container.

Like an element with role `presentation`, an element with `role="generic"` can provide a limited number of accessible states and properties for its descendants, such as `aria-live` attributes. However, unlike elements with role `presentation`, `generic` elements are exposed in accessibility APIs so that assistive technologies can gather certain properties such as layout and bounds.

Because the generic role is nameless, the `aria-labelledby` and `aria-label` attributes are prohibited. Because the role is generic, the `aria-roledescription` and `aria-brailleroledescription` attributes are also prohibited.

> **Note:**
> The element with `role="generic"` should not have an accessible name or role description.

### Associated WAI-ARIA roles, states, and properties

None. If a global ARIA state and property is set, `generic` or `none` will be ignored, and the implicit role of the element will be used.

## Examples

This role is for use by user agents and not by developers. As such, no appropriate example exists.

## See also

- HTML `` and `` elements
- `presentation` roles such as
- `group` role

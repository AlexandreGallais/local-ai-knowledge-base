---
title: "ARIA: definition role"
tool: "mdn-accessibility"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/accessibility/aria/reference/roles/definition_role/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ARIA: definition role

The `definition` ARIA role indicates the element is a definition of a term or concept.

## Description

The `definition` ARIA role can be included on an element that is a definition of a term or concept. Mark the term being defined with `role="term"` or the native `` element. To associate the term with its definition, set `aria-details` on the `term` element to the `id` of the `definition` element.

Elements with the `definition` role cannot have an accessible name; the `aria-braillelabel`, `aria-label`, and `aria-labelledby` properties are prohibited.

```html
<p>
  <span role="term">Mansplaining</span>,
  <span role="definition">
    a portmanteau of "man" and "explain", is the patronizing act of explaining
    without being asked to do so, to someone already learned on the topic, often
    after someone has already explained it
  </span>.
</p>
```

> **Note:**
> Instead of a `` with the `term` and `definition` roles, use the `` element. **Always use native element if available.**

```html
<p>
  <dfn>Mansplaining</dfn>, a portmanteau of "man" and "explain", is the
  patronizing act of explaining without being asked to do so, to someone already
  learned on the topic, often after someone has already explained it.
</p>
```

## See also

- The `term` role
- The `` element
- The `` element
- The `` element
- The `` element

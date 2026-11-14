---
title: "`<select>` HTML select element (part 2 of 2)"
tool: "mdn-html"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/html/reference/elements/select/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `<select>` HTML select element (part 2 of 2)

## Technical summary

       |
        Content categories

       |
        Flow content,
        phrasing content,
        interactive content,
        listed,
        labelable,
        resettable, and
        submittable
        form-associated element

       | Permitted content
       |

          `<option>`, `<optgroup>`, or `` elements, optionally preceded by a `` element with a nested `<selectedcontent>` element if a dropdown box.
          ``, `<script>`, `<template>`, and `<noscript>` elements.

       | Tag omission
       | None, both the starting and ending tag are mandatory.

       | Permitted parents
       |
        Any element that accepts
        phrasing content.

       | Implicit ARIA role
       |
        `combobox` with no
        `multiple` attribute and no
        `size` attribute greater than 1, otherwise
        `listbox`.

       | Permitted ARIA roles
       |
        `menu` with no
        `multiple` attribute and no
        `size` attribute greater than 1, otherwise `combobox`
        is permitted but not recommended.

       | DOM interface
       | `HTMLSelectElement`

## See also

- The `<option>` element
- The `<optgroup>` element
- Customizable select elements
- Events fired by `<select>`: `change`, `input`

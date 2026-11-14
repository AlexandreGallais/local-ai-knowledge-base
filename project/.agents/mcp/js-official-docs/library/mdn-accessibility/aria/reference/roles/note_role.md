---
title: "ARIA: note role"
tool: "mdn-accessibility"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/accessibility/aria/reference/roles/note_role/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ARIA: note role

A `note` role suggests a section whose content is parenthetic or ancillary to the main content.

## Description

The `note` role can be added to parenthetic or ancillary content if no other native element or other role fits the purpose.

### Associated WAI-ARIA roles, states, and properties

- `aria-label` or `aria-labelledby` (optional)
    Naming a note is optional, but can help screen reader users understand its context and purpose. The name can be provided using `aria-labelledby` if a visible label is present, otherwise with `aria-label`.

## Examples

```html
<h1>Madam C. J. Walker</h1>
<p>
  Madam C.J. Walker was an African American entrepreneur, philanthropist, and
  political and social activist.
</p>
<h2>Early Life</h2>
…
<h2>Career</h2>
…
<p role="note" class="highlight-box">
  At the height of the depression, Madam C. J. Walker trained 20,000 women to
  sell hair pomade door-to-door
</p>
<h2>Activism and Philanthropy</h2>
…
```

In the above Wikipedia style entry for Madam C.J. Walker, the `highlight-box` with role `note` could have been a `` if it contained a quote or `` in a `` if there was an associated image. In this case, as neither of those made sense, the `note` role was added to add semantics to the parenthetic content.

## See also

- Document structure roles

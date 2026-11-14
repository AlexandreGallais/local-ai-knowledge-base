---
title: "ARIA: widget role"
tool: "mdn-accessibility"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/accessibility/aria/reference/roles/widget_role/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ARIA: widget role

The **`widget`** role, an abstract role, is an interactive component of a graphical user interface (GUI).

> **Warning:**
> The `widget` role is an abstract role used for the ontology. It is included here for completeness of documentation. It should not be used by web authors.

## Description

The abstract `widget` role is a superclass role for some interactive GUI elements and grouping roles. `role="widget"` should not be confused with widgets roles, such as `option`, `menuitem`, and `searchbox`.

The `widget` role is a superclass role several abstract interactive GUI roles, including `command`, `composite`, `input`, `range`, and `separator` (if focusable), which should not be used by web authors.

The abstract `widget` role is also a superclass role for some grouping roles which can be used by web authors, including `gridcell`, `row`, `separator` (when not focusable), and `tab`, which can and should be used when appropriate. When the user navigates to one of these non-abstract roles of widget, keyboard events can switch to an application browsing mode, and pass <example-value> events through to the browser.

## See also

- ARIA: `roletype` role

- ARIA: `command` role
- ARIA: `composite` role
- ARIA: `gridcell` role
- ARIA: `input` role
- ARIA: `range` role
- ARIA: `row` role
- ARIA: `separator` role
- ARIA: `tab` role

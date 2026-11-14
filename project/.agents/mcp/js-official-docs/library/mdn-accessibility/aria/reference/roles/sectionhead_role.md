---
title: "ARIA: sectionhead role"
tool: "mdn-accessibility"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/accessibility/aria/reference/roles/sectionhead_role/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ARIA: sectionhead role

The **`sectionhead` role**, an abstract role, is superclass role for labels or summaries of the topic of its related section.

> **Warning:**
> The `sectionhead` role is an abstract role. It is included here for completeness of documentation. It should not be used by web authors.

## Description

The structural `sectionhead` role is an abstract role for the subclass roles that identify the labels or summaries of the sections they label. The role must not be used. The four subclasses — `columnheader`, `heading`, `rowheader`, and `tab`. There are HTML element equivalents, like, `<`<th scope="col">`>` for `columnheader`, `<`<th scope="row">`>` for rowheader, and any of the HTML headings, `<h1>` through `<h6>` for `heading`. The `tab` role does not currently have an HTML equivalent.

## See also

- ARIA: `structure` role
- ARIA: `columnheader` role
- ARIA: `heading` role
- ARIA: `rowheader` role
- ARIA: `tab` role

---
title: "ARIA: structure role"
tool: "mdn-accessibility"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/accessibility/aria/reference/roles/structure_role/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ARIA: structure role

The `structure` role is for document structural elements.

> **Warning:**
> The `structure` role is an abstract role. It is included here for completeness of documentation. It should not be used by web authors. Use HTML and subclass structure roles.

## Description

`Structure` is a superclass abstract role for document structures, like as `document`,
`rowgroup`, and `sectionhead`, that support the accessibility of dynamic web content by helping assistive technologies determine active content versus static document content. Some subclass roles, like
`section` role, are in turn superclasses of other roles.

The `structure` role is the superclass for all document structure roles, which are used to provide a structural description for a section of content. Most structure roles should no longer be used as browsers now support semantic HTML element with the same meaning. The structure roles without HTML equivalents, such as the `presentation` role which means content is presentational only, provide information on the document structure to assistive technologies such as screen readers as equivalent native HTML tags are not available.

## See also

- ARIA: `roletype` role
- ARIA: `generic` role
- ARIA: `presentation` role
- ARIA: `range` role
- ARIA: `section` role
- ARIA: `sectionhead` role

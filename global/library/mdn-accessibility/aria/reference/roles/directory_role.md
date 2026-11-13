---
title: "ARIA: directory role"
tool: "mdn-accessibility"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/accessibility/aria/reference/roles/directory_role/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ARIA: directory role

The `directory` role was for a list of references to members of a group, such as a static table of contents.

> **Warning:**
> The `directory` role was deprecated in ARIA 1.2

## Description

A directory is a static table of contents, whether linked or unlinked. This includes tables of contents built with lists, including nested lists. Dynamic tables of contents, however, might use a tree role instead.

The deprecated `directory` role was used for lists of references to members of a group, such as a static table of contents.
Use the `list` role instead. Or, better yet, use the `` or `` elements, as using `directory` does not provide any additional benefits to assistive technology users.

## See also

- The `list` role
- The `` element
- The `` element

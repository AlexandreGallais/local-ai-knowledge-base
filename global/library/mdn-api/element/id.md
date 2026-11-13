---
title: "Element: id property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/element/id/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Element: id property

The **`id`** property of the `Element` interface reflects the element's `id` content attribute.

If the `id` value is not the empty string, it must be unique in a document.

The `id` is often used with `getElementById()` to retrieve a particular element.
Another common case is to use an element's ID as a selector when styling the document with CSS.

> **Note:**
> Identifiers are case-sensitive, but you should avoid creating
> IDs that differ only in the capitalization.

## Value

A string.

## See also

- The DOM **id**
  global attribute.

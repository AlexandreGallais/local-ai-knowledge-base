---
title: "HTMLElement: contentEditable property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlelement/contenteditable/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLElement: contentEditable property

The **`contentEditable`** property of
the `HTMLElement` interface specifies whether or not the element is
editable.

This enumerated attribute can have the following values:

- `"true"` indicates that the element is `contenteditable`.
- `"false"` indicates that the element cannot be edited.
- `"plaintext-only"` indicates that the element's raw text is editable, but rich text formatting is disabled.

You can use the `HTMLElement.isContentEditable` property to test the
computed boolean value of this property.

If the attribute is missing or its value is invalid, its value is inherited from its parent element: so the element
is editable (or not) based on the parent element.

## Value

A string.

## See also

- `HTMLElement.isContentEditable`
- The `contenteditable` global attribute.

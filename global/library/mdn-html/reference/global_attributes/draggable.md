---
title: "`draggable` HTML global attribute"
tool: "mdn-html"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/html/reference/global_attributes/draggable/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `draggable` HTML global attribute

The **`draggable`** global attribute is an enumerated attribute that indicates whether the element can be dragged, either with native browser behavior or the HTML Drag and Drop API.

The `draggable` attribute may be applied to elements that strictly fall under the HTML namespace, which means that it cannot be applied to SVGs.
For more information about what namespace declarations look like, and what they do, see Namespace crash course.

`draggable` can have the following values:

- `true`: the element can be dragged.
- `false`: the element cannot be dragged.

> **Warning:**
> This attribute is _enumerated_ and not _Boolean_. A value of `true` or `false` is mandatory, and shorthand like `` is forbidden. The correct usage is ``.

If this attribute is not set, its default value is `auto`, which means drag behavior is the default browser behavior: only text selections, images, and links can be dragged. For other elements, the event `ondragstart` must be set for drag and drop to work, as shown in this comprehensive example.

## See also

- All global attributes.

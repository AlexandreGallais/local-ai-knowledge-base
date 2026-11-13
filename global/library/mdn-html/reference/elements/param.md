---
title: "`<param>` HTML object parameter element"
tool: "mdn-html"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/html/reference/elements/param/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `<param>` HTML object parameter element

The **`<param>`** HTML element defines parameters for an `<object>` element.

> **Note:**
> Use the `<object>` element with a `data` attribute to set the URL of an external resource.

## Attributes

This element includes the global attributes.

- `name` (deprecated) (non-standard)
    Name of the parameter.
- `value` (deprecated) (non-standard)
    Specifies the value of the parameter.
- `type` (deprecated) (non-standard)
    Only used if the `valuetype` is set to `ref`. Specifies the MIME type of values found at the URI specified by value.
- `valuetype` (deprecated) (non-standard)
    Specifies the type of the `value` attribute. Possible values are:
    - `data`: Default value. The value is passed to the object's implementation as a string.
    - `ref`: The value is a URI to a resource where run-time values are stored.
    - `object`: An ID of another `<object>` in the same document.

## Technical summary

       |
        Content categories

       | None.

       | Permitted content
       | None; it is a void element.

       | Tag omission
       | Must have a start tag and must not have an end tag.

       | Permitted parents
       |
        An `<object>` before any
        flow content.

       | Implicit ARIA role
       |
        No corresponding role

       | Permitted ARIA roles
       | No `role` permitted

       | DOM interface
       | `HTMLParamElement`

## See also

- `<object>`

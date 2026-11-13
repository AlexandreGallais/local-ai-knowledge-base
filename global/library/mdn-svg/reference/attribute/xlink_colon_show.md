---
title: "xlink:show"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/svg/reference/attribute/xlink_colon_show/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# xlink:show

The **`xlink:show`** attribute indicates how a linked resource should be opened and is meant for XLink-aware processors. In case of a conflict, the `target` attribute has priority, since it can express a wider range of values.

You can use this attribute with the following SVG elements:

- ``

## Usage notes

       | Value
       |
        `new` | `replace` | `embed` |
        `other` | `none`

       | Default value
       | `replace`

       | Animatable
       | No

- `new`
    This value specifies that the referenced resource is opened in a new window or tab. This is similar to the effect achieved by an HTML `` element with target set to `_blank`.
- `replace`
    This value specifies that the referenced resource is opened in the same window or tab. This is similar to the effect achieved by an HTML `` element with target set to `_self`.
- `embed`
    This value specifies that instead of linking to the resource it will be loaded and shown within the document. This is similar to the effect achieved by an HTML `` element.
- `other`
    This value indicates that other markup present in the link, i.e., the `target` attribute, determines its behavior.
- `none`
    This value specifies that there is no indication for how to refer to the linked resource.

## See also

- Definition of the `xlink:show` attribute in the XLink specification

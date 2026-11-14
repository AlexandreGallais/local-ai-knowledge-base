---
title: "xlink:arcrole"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/svg/reference/attribute/xlink_colon_arcrole/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# xlink:arcrole

The **`xlink:arcrole`** attribute specifies a contextual role for the element and corresponds to the RDF Primer notion of a property.

This contextual role can differ from the meaning of the resource when taken outside the context of this particular arc. For example, a resource might generically represent a "person," but in the context of a particular arc it might have the role of "mother" and in the context of a different arc it might have the role of "daughter."

You can use this attribute with the following SVG elements:

- ``
- `<animate>`
- `<animateMotion>`
- `<animateTransform>`
- `<feImage>`
- `<filter>`
- `<image>`
- `<linearGradient>`
- `<mpath>`
- `<pattern>`
- `<radialGradient>`
- `<script>`
- `<set>`
- `<textPath>`
- `<use>`

## Usage notes

       | Value
       |
        <code
          >&#x3C;iri></code
        >

       | Default value
       | None

       | Animatable
       | No

- `<iri>`
    This value specifies an IRI reference that identifies some resource that describes the intended property.

## See also

- Definition of the `xlink:arcrole` attribute in the XLink specification

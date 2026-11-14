---
title: "ElementInternals: ariaDetailsElements property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/elementinternals/ariadetailselements/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ElementInternals: ariaDetailsElements property

The **`ariaDetailsElements`** property of the `ElementInternals` interface is an array containing the element (or elements) that provide an accessible details for the element it is applied to.
The accessible details are similar to the accessible description (see `ariaDescribedByElements`), but provides more verbose information.

The `aria-details` topic contains additional information about how the attribute and property should be used.

## Value

An array of subclasses of `HTMLElement`.
The inner text of these elements can be joined with spaces to get the accessible details.

When read, the returned array is a static and read-only.
When written, the assigned array is copied: subsequent changes to the array do not affect the value of the property.

## Description

The property is a flexible alternative to using the `aria-details` attribute to set the accessible details information.
Unlike `aria-details`, the elements assigned to this property do not have to have an `id` attribute.

The property reflects the element's `aria-details` attribute when it is defined, but only for listed reference `id` values that match valid in-scope elements.
If the property is set, then the corresponding attribute is cleared.
For more information about reflected element references and scope see Reflected element references in the _Reflected attributes_ guide.

## Examples

The examples in the following documents are relevant:

- `Element.ariaDetailsElements` is the DOM equivalent of this property.
  It is used in the same way, but within the DOM instead of a shadow DOM and/or custom element.

## See also

- `aria-details` attribute
- `Element.ariaDetailsElements`
- Reflected element references in the _Attribute reflection_ guide.

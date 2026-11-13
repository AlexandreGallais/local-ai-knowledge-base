---
title: "ElementInternals: ariaDescribedByElements property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/elementinternals/ariadescribedbyelements/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ElementInternals: ariaDescribedByElements property

The **`ariaDescribedByElements`** property of the `ElementInternals` interface is an array containing the element (or elements) that provide an accessible description for the element it is applied to.
The accessible description is similar to the accessible label (see `ariaLabelledByElements`), but provides more verbose information.

The `aria-describedby` topic contains additional information about how the attribute and property should be used.

## Value

An array of subclasses of `HTMLElement`.
The inner text of these elements can be joined with spaces to get the accessible description.

When read, the returned array is a static and read-only.
When written, the assigned array is copied: subsequent changes to the array do not affect the value of the property.

## Description

The property is a flexible alternative to using the `aria-describedby` attribute to set the accessible description.
Unlike `aria-describedby`, the elements assigned to this property do not have to have an `id` attribute.

The property reflects the element's `aria-describedby` attribute when it is defined, but only for listed reference `id` values that match valid in-scope elements.
If the property is set, then the corresponding attribute is cleared.
For more information about reflected element references and scope see Reflected element references in the _Reflected attributes_ guide.

## Examples

The examples in the following documents are relevant:

- `Element.ariaDescribedByElements` is the DOM equivalent of this property.
  It is used in the same way, but within the DOM instead of a shadow DOM and/or custom element.

## See also

- `aria-describedby` attribute
- `Element.ariaDescribedByElements`
- Reflected element references in the _Attribute reflection_ guide

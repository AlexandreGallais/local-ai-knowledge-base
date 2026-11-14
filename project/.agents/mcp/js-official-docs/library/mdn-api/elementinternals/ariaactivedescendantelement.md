---
title: "Element: ariaActiveDescendantElement property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/elementinternals/ariaactivedescendantelement/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Element: ariaActiveDescendantElement property

The **`ariaActiveDescendantElement`** property of the `ElementInternals` interface represents the current active element when focus is on a `composite` widget, `combobox`, `textbox`, `group`, or `application`.

The `aria-activedescendant` topic contains additional information about how the attribute and property should be used.

## Value

A subclass of `HTMLElement` that represents the active descendant, or `null` if there is no active descendant.

## Description

The property is a flexible alternative to using the `aria-activedescendant` attribute.
Unlike `aria-activedescendant`, the element assigned to this property does not have to have an `id` attribute.

The property reflects the element's `aria-activedescendant` attribute when it is defined, but only for reference `id` values that match valid in-scope elements.
If the property is set, then the corresponding attribute is cleared.
For more information about reflected element references and scope see Reflected element references in the _Reflected attributes_ guide.

## See also

- `aria-activedescendant` attribute
- `Element.ariaActiveDescendantElement`
- Reflected element references in the _Attribute reflection_ guide.

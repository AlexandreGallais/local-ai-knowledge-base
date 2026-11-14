---
title: "CSS scoping"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/guides/scoping/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSS scoping

The **CSS scoping** module defines the CSS scoping and encapsulation mechanisms, focusing on the Shadow DOM scoping mechanism.

CSS styles are either global in scope or scoped to a shadow tree. Globally scoped styles apply to all the elements in the node tree that match the selector, including custom elements in that tree, but not to the shadow trees composing each custom element. Selectors and their associated style definitions don't bleed between scopes.

Within the CSS of a shadow tree, selectors don't select elements outside the tree, either in the global scope or in other shadow trees. Each custom element has its own shadow tree, which contains all the components that make up the custom element (but not the custom element, or "host", itself).

Sometimes it's useful to be able to style a host from inside the shadow tree context. The CSS scoping module makes this possible by defining selectors that:

- Enable a shadow tree to style its host.
- Enable external CSS to style elements within a shadow DOM (but only if the associated custom element is set up to accept external styles).

## Reference

### Selectors

- `:host`
- `:host()`
- `:host-context()`
- `::slotted`

## Guides

- Web components
    An introduction to the different technologies used to create reusable web components — custom elements whose functionality is encapsulated away from the rest of your code.

- Using shadow DOM
    Shadow DOM fundamentals, including attaching a shadow DOM to an element, adding to the shadow DOM tree, and styling.

- Using templates and slots
    Defining reusable HTML structure using `<template>` and `<slot>` elements, and using that structure inside web components.

- Using custom elements
    Introduction to the Custom Elements API, the JavaScript API used to create custom elements that encapsulate functionality.

## Related concepts

- CSS `:defined` pseudo-class
- CSS `::part` pseudo-element

- HTML `<template>` element
- HTML `<slot>` element
- HTML `slot` attribute

- Shadow tree glossary term
- DOM glossary term
- Compound selector term
- Selector list term

- Web components interfaces, properties, and methods
  - `CustomElementRegistry` interface
  - `Element` API
    - `Element.slot` property
    - `Element.assignedSlot` property
    - `Element.attachShadow()` method
  - `HTMLSlotElement` interface
  - `HTMLTemplateElement` interface
  - `ShadowRoot` interface

> **Note:**
> Despite the name, the `:scope` pseudo-class, which represents elements that are a reference point (or scope) for selectors to match against, is defined in the Selectors module. It is otherwise unrelated to the CSS scoping module, which is focused on scoping as it pertains to the Shadow DOM scoping mechanism.

## See also

- CSS selectors module
- CSS pseudo elements module
- CSS namespaces module
- CSS shadow-parts module
- Template, slot, and shadow on web.dev (2023)
- Custom element best practices on web.dev (2019)
